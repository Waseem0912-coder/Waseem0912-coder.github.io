// Direction B — "Command Surface"
// Dark dashboard / systems readout. Chartreuse + terracotta on warm-cool dark.
// Recruiter-grabbing: typed name, cycling role line, animated metric strip,
// live "currently" log, GPU gauge, before/after impact bars.

const CMD = (() => {
  const c = window.CONTENT;
  if (!c) return () => null;

  // ─────────────────────────────────────────────────────────────
  // primitives
  // ─────────────────────────────────────────────────────────────

  function useLocalTime() {
    const [t, setT] = React.useState(new Date());
    React.useEffect(() => {
      const id = setInterval(() => setT(new Date()), 1000);
      return () => clearInterval(id);
    }, []);
    const pad = (n) => String(n).padStart(2, '0');
    return `${pad(t.getHours())}:${pad(t.getMinutes())}:${pad(t.getSeconds())} PT`;
  }

  // Typewriter — types out text one char at a time, then leaves the cursor blinking.
  // Pass `keepCursor={false}` to hide the cursor once typing completes (useful when
  // multiple Typewriters are stacked — only the last one should retain a cursor).
  function Typewriter({ text, speed = 90, delay = 0, className = '', keepCursor = true }) {
    const [out, setOut] = React.useState('');
    const [done, setDone] = React.useState(false);
    React.useEffect(() => {
      let cancelled = false;
      let i = 0;
      const start = setTimeout(() => {
        const id = setInterval(() => {
          if (cancelled) return;
          i++;
          setOut(text.slice(0, i));
          if (i >= text.length) {
            clearInterval(id);
            setDone(true);
          }
        }, speed);
      }, delay);
      return () => { cancelled = true; clearTimeout(start); };
    }, [text, speed, delay]);
    const showCursor = !done || keepCursor;
    return (
      <span className={className}>
        {out}
        {showCursor && (
          <span className={`cmd-cursor ${done ? 'cmd-cursor-idle' : ''}`}>▌</span>
        )}
      </span>
    );
  }

  // Animated counter — counts from 0 → target on mount (or when target changes).
  function Counter({ to, suffix = '', duration = 1400, delay = 0 }) {
    const [n, setN] = React.useState(0);
    React.useEffect(() => {
      let raf;
      const t0 = performance.now() + delay;
      const ease = (x) => 1 - Math.pow(1 - x, 3);
      const tick = (now) => {
        const t = Math.max(0, Math.min(1, (now - t0) / duration));
        setN(Math.round(ease(t) * to));
        if (t < 1) raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
      return () => cancelAnimationFrame(raf);
    }, [to, duration, delay]);
    return <>{n}{suffix}</>;
  }

  // Cycles through items with a fade swap.
  function Cycle({ items, interval = 2400, className = '' }) {
    const [i, setI] = React.useState(0);
    const [vis, setVis] = React.useState(true);
    React.useEffect(() => {
      const id = setInterval(() => {
        setVis(false);
        setTimeout(() => {
          setI((x) => (x + 1) % items.length);
          setVis(true);
        }, 220);
      }, interval);
      return () => clearInterval(id);
    }, [items.length, interval]);
    return (
      <span className={`cmd-cycle ${className} ${vis ? 'on' : 'off'}`}>
        {items[i]}
      </span>
    );
  }

  // Marquee strip
  function MarqueeStrip({ items }) {
    return (
      <div className="cmd-marquee">
        <div className="cmd-marquee-track">
          {[...items, ...items].map((s, i) => (
            <span key={i} className="cmd-marquee-item">{s}</span>
          ))}
        </div>
      </div>
    );
  }

  // Animated sparkline (decorative; "tok/s")
  function Sparkline({ height = 44, width = 260 }) {
    const [pts, setPts] = React.useState(() =>
      Array.from({ length: 32 }, () => 0.35 + Math.random() * 0.6));
    React.useEffect(() => {
      const id = setInterval(() => {
        setPts((p) => [...p.slice(1), 0.35 + Math.random() * 0.6]);
      }, 650);
      return () => clearInterval(id);
    }, []);
    const stepX = width / (pts.length - 1);
    const d = pts.map((v, i) => `${i === 0 ? 'M' : 'L'} ${i * stepX} ${height - v * (height - 4) - 2}`).join(' ');
    const area = `${d} L ${width} ${height} L 0 ${height} Z`;
    const last = pts[pts.length - 1];
    return (
      <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} style={{ display: 'block' }}>
        <defs>
          <linearGradient id="cmd-spark-fill" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="var(--cmd-accent)" stopOpacity="0.35" />
            <stop offset="100%" stopColor="var(--cmd-accent)" stopOpacity="0" />
          </linearGradient>
        </defs>
        <path d={area} fill="url(#cmd-spark-fill)" />
        <path d={d} fill="none" stroke="var(--cmd-accent)" strokeWidth="1.6" />
        <circle cx={width} cy={height - last * (height - 4) - 2} r="2.6" fill="var(--cmd-accent)" />
      </svg>
    );
  }

  // Animated GPU "utilization" gauge (decorative — picks a wandering target).
  function GpuGauge() {
    const [v, setV] = React.useState(72);
    React.useEffect(() => {
      const id = setInterval(() => {
        setV((cur) => Math.max(40, Math.min(96, cur + (Math.random() - 0.5) * 18)));
      }, 900);
      return () => clearInterval(id);
    }, []);
    return (
      <div className="cmd-gauge">
        <div className="cmd-gauge-bar">
          <div className="cmd-gauge-fill" style={{ width: `${v}%` }} />
          {Array.from({ length: 20 }).map((_, i) => (
            <span key={i} className="cmd-gauge-tick" style={{ left: `${(i / 20) * 100}%` }} />
          ))}
        </div>
        <div className="cmd-gauge-foot">
          <span>A100 · 80GB</span>
          <span className="cmd-accent">{Math.round(v)}%</span>
        </div>
      </div>
    );
  }

  // Before/after animated comparison bar
  function ImpactBar({ before, after, inverted = false }) {
    const max = Math.max(before.value, after.value);
    const [render, setRender] = React.useState(false);
    React.useEffect(() => {
      const id = setTimeout(() => setRender(true), 60);
      return () => clearTimeout(id);
    }, []);
    const wBefore = render ? (before.value / max) * 100 : 0;
    const wAfter  = render ? (after.value / max) * 100 : 0;
    return (
      <div className="cmd-impact-bars">
        <div className="cmd-impact-row">
          <div className="cmd-impact-label">{before.label}</div>
          <div className="cmd-impact-track">
            <div className="cmd-impact-fill cmd-impact-before" style={{ width: `${wBefore}%` }} />
            <span className="cmd-impact-val">{before.value}{before.unit}</span>
          </div>
        </div>
        <div className="cmd-impact-row">
          <div className="cmd-impact-label">{after.label}</div>
          <div className="cmd-impact-track">
            <div className="cmd-impact-fill cmd-impact-after" style={{ width: `${wAfter}%` }} />
            <span className="cmd-impact-val cmd-accent">{after.value}{after.unit}</span>
          </div>
        </div>
      </div>
    );
  }

  // ─────────────────────────────────────────────────────────────
  // small UI atoms
  // ─────────────────────────────────────────────────────────────

  function Panel({ label, meta, children, span, style }) {
    return (
      <div className="cmd-panel" style={{ gridColumn: span ? `span ${span}` : undefined, ...style }}>
        <div className="cmd-panel-head">
          <span className="cmd-panel-label">{label}</span>
          {meta && <span className="cmd-panel-meta">{meta}</span>}
        </div>
        <div className="cmd-panel-body">{children}</div>
      </div>
    );
  }

  function Tag({ children, tone = 'mute' }) {
    return <span className={`cmd-tag cmd-tag-${tone}`}>{children}</span>;
  }

  function Bullets({ items }) {
    return (
      <ul className="cmd-ul">
        {items.map((b, i) => (
          <li key={i}><span className="cmd-bullet">▸</span>{b}</li>
        ))}
      </ul>
    );
  }

  // ─────────────────────────────────────────────────────────────
  // sections
  // ─────────────────────────────────────────────────────────────

  function StatusBar() {
    const time = useLocalTime();
    return (
      <div className="cmd-statusbar">
        <div>
          <span className="cmd-dot" /> ONLINE
          <span className="cmd-sep">/</span>
          {c.identity.location}
          <span className="cmd-sep">/</span>
          partner-engineer @ samsung
        </div>
        <div className="cmd-status-right">
          <span>localtime {time}</span>
          <span className="cmd-sep">/</span>
          <span>waseemahmed.in</span>
        </div>
      </div>
    );
  }

  function Hero() {
    return (
      <header className="cmd-hero">
        <div className="cmd-hero-id">
          <span>// engineer profile · loaded</span>
          <span>id:waseem09</span>
        </div>

        <h1 className="cmd-name">
          <Typewriter text="Waseem" delay={120} speed={130} keepCursor={false} />
          <br />
          <Typewriter text="Ahmed." delay={1000} speed={130} />
        </h1>

        <div className="cmd-role-row">
          <div className="cmd-role">
            <span className="cmd-role-prefix">▸ role</span>
            Software + AI/ML engineer. Currently <em>building and shipping</em>&nbsp;
            <Cycle items={c.cycle} className="cmd-cycle-strong" />
            &nbsp;at <span className="cmd-accent">Samsung Research America</span>.
          </div>
        </div>

        <div className="cmd-hero-strip">
          <span className="cmd-strip-label">stack in rotation</span>
          <MarqueeStrip items={['llama.cpp', 'vLLM', 'transformers', 'PyTorch', 'FAISS', 'InternVL 2.5', 'Whisper', 'LoRA', 'Open-CLIP', 'BERT', 'A100', 'Android']} />
        </div>
      </header>
    );
  }

  function MetricsStrip() {
    return (
      <section className="cmd-metrics">
        {c.metrics.map((m, i) => (
          <div key={m.label} className="cmd-metric">
            <div className="cmd-metric-val">
              <Counter to={m.value} suffix={m.suffix} delay={i * 140} />
            </div>
            <div className="cmd-metric-lab">{m.label}</div>
            <div className="cmd-metric-sub">{m.sub}</div>
          </div>
        ))}
      </section>
    );
  }

  function NowPanel() {
    const n = c.now;
    return (
      <Panel label={`now / featured`} meta={`since ${n.since} · ${n.status}`} span={12}>
        <div className="cmd-now">
          <div className="cmd-now-main">
            <div className="cmd-now-title">
              <span className="cmd-now-role">{n.title}</span>
              <span className="cmd-now-co">{n.company}</span>
            </div>
            <div className="cmd-now-div">{n.division} · {n.location}</div>
            <p className="cmd-now-summary">{n.summary}</p>

            <div className="cmd-current">
              <div className="cmd-current-label">▸ currently active</div>
              {c.currently.map((row, i) => (
                <div key={i} className="cmd-current-row" style={{ animationDelay: `${i * 110}ms` }}>
                  <span className={`cmd-current-status cmd-current-${row.status}`}>
                    {row.status}
                  </span>
                  <span className="cmd-current-text">{row.text}</span>
                </div>
              ))}
            </div>

            <Bullets items={n.highlights} />
          </div>

          <div className="cmd-now-side">
            <div className="cmd-now-card">
              <div className="cmd-now-card-label">inference stack</div>
              <div className="cmd-stackgrid">
                {n.stack.map((s) => (
                  <div key={s} className="cmd-stackchip">{s}</div>
                ))}
              </div>
            </div>

            <div className="cmd-now-card">
              <div className="cmd-now-card-label">tok/s · simulated</div>
              <Sparkline />
              <div className="cmd-now-card-foot">
                <span>last 32s</span>
                <span className="cmd-accent">~live</span>
              </div>
            </div>

            <div className="cmd-now-card">
              <div className="cmd-now-card-label">gpu utilization</div>
              <GpuGauge />
            </div>
          </div>
        </div>
      </Panel>
    );
  }

  function ImpactPanel() {
    return (
      <Panel label="impact.shipped" meta={`${c.impact.length} measured wins`} span={12}>
        <div className="cmd-impact-grid">
          {c.impact.map((m, i) => (
            <div key={m.id} className="cmd-impact-card">
              <div className="cmd-impact-head">
                <div>
                  <div className="cmd-impact-kind">{m.stack}</div>
                  <div className="cmd-impact-title">{m.title}</div>
                </div>
                <div className="cmd-impact-lift">{m.lift}</div>
              </div>
              <ImpactBar before={m.before} after={m.after} />
            </div>
          ))}
        </div>
      </Panel>
    );
  }

  function ExperiencePanel() {
    const items = c.experience.filter((x) => x.id !== 'samsung-pe');
    return (
      <Panel label="experience.log" meta={`${items.length} prior records`} span={7}>
        <div className="cmd-exp">
          {items.map((x) => (
            <div key={x.id} className="cmd-exp-row">
              <div className="cmd-exp-when">
                <div className="cmd-exp-date">{x.from}</div>
                <div className="cmd-exp-dash">│</div>
                <div className="cmd-exp-date cmd-mute">{x.to}</div>
              </div>
              <div className="cmd-exp-body">
                <div className="cmd-exp-title">{x.title}</div>
                <div className="cmd-exp-org">{x.org} · {x.where}</div>
                <div className="cmd-exp-tags">
                  {x.tags.map((t) => <Tag key={t}>{t}</Tag>)}
                </div>
                <Bullets items={x.bullets.slice(0, 2)} />
              </div>
            </div>
          ))}
        </div>
      </Panel>
    );
  }

  function ProjectsPanel() {
    const [active, setActive] = React.useState(c.projects[0].id);
    const cur = c.projects.find((p) => p.id === active);
    return (
      <Panel label="selected_projects" meta={`${c.projects.length}`} span={5}>
        <div className="cmd-proj-tabs">
          {c.projects.map((p) => (
            <button
              key={p.id}
              className={`cmd-proj-tab ${p.id === active ? 'on' : ''}`}
              onClick={() => setActive(p.id)}
            >
              {p.title.split(' — ')[0]}
            </button>
          ))}
        </div>
        <div className="cmd-proj-body">
          <div className="cmd-proj-kind">{cur.kind}</div>
          <div className="cmd-proj-title">{cur.title}</div>
          <div className="cmd-proj-metric">
            <span className="cmd-proj-metric-val">{cur.metric.value}</span>
            <span className="cmd-proj-metric-lab">{cur.metric.label}</span>
          </div>
          <p className="cmd-proj-blurb">{cur.blurb}</p>
          <div className="cmd-proj-stack">
            {cur.stack.map((s) => <Tag key={s} tone="accent">{s}</Tag>)}
          </div>
          <div className="cmd-proj-divider">case notes ▾</div>
          <Bullets items={cur.detail} />
        </div>
      </Panel>
    );
  }

  function SkillsPanel() {
    return (
      <Panel label="toolkit.readout" meta="languages · models · infra" span={8}>
        <div className="cmd-skills-grid">
          {c.skills.map((s) => (
            <div key={s.group}>
              <div className="cmd-skills-group">{s.group}</div>
              <div className="cmd-skills-items">
                {s.items.map((it) => <span key={it} className="cmd-skill-item">{it}</span>)}
              </div>
            </div>
          ))}
        </div>
      </Panel>
    );
  }

  function PatentsPanel() {
    return (
      <Panel label="patents.queue" meta={`${c.patents.length} in flight`} span={4}>
        {c.patents.map((p, i) => (
          <div key={p.id} className="cmd-patent">
            <div className="cmd-patent-head">
              <span className="cmd-patent-id">PAT/{String(i + 1).padStart(2, '0')}</span>
              <Tag tone="accent2">{p.status}</Tag>
            </div>
            <div className="cmd-patent-area">{p.area}</div>
            <div className="cmd-patent-note">{p.note}</div>
          </div>
        ))}
      </Panel>
    );
  }

  function AwardPanel() {
    const a = c.achievement;
    return (
      <Panel label="recognition" meta={a.year} span={7}>
        <div className="cmd-award">
          <div>
            <div className="cmd-award-title">{a.title}</div>
            <div className="cmd-award-sub">{a.subtitle}</div>
            <p className="cmd-now-summary">{a.body}</p>
          </div>
          <Bullets items={a.bullets} />
        </div>
      </Panel>
    );
  }

  function EducationPanel() {
    const e = c.education;
    return (
      <Panel label="education" meta={`${e.from} → ${e.to}`} span={5}>
        <div className="cmd-edu-title">{e.school}</div>
        <div className="cmd-edu-sub">{e.degree} · {e.where}</div>
        <div className="cmd-edu-cw-label">relevant coursework</div>
        <div className="cmd-edu-cw">
          {e.coursework.map((cw) => <span key={cw} className="cmd-skill-item">{cw}</span>)}
        </div>
      </Panel>
    );
  }

  function Foot() {
    return (
      <footer className="cmd-foot">
        <div className="cmd-foot-prompt">
          <span className="cmd-accent">~</span>
          <span className="cmd-mute"> ahmed@samsung </span>
          <span className="cmd-accent2">$</span>
          <span className="cmd-foot-cmd"> contact --reason</span>
          <span className="cmd-cursor">▌</span>
        </div>
        <div className="cmd-foot-grid">
          <a href={`mailto:${c.identity.email}`} className="cmd-foot-link">
            <span className="cmd-mute">email →</span>
            <span>{c.identity.email}</span>
          </a>
          <a href={c.identity.linkedin} target="_blank" rel="noreferrer" className="cmd-foot-link">
            <span className="cmd-mute">linkedin →</span>
            <span>/in/waseem09</span>
          </a>
          <a href={c.identity.resume} target="_blank" rel="noreferrer" className="cmd-foot-link">
            <span className="cmd-mute">résumé →</span>
            <span>Main_Resume.pdf</span>
          </a>
        </div>
        <div className="cmd-foot-copy">
          © {new Date().getFullYear()} Waseem Ahmed · all signals preserved.
        </div>
      </footer>
    );
  }

  return function CommandSurface() {
    return (
      <div className="cmd-root">
        <StatusBar />
        <div className="cmd-frame">
          <Hero />
          <MetricsStrip />
          <div className="cmd-grid">
            <NowPanel />
            <ImpactPanel />
            <ExperiencePanel />
            <ProjectsPanel />
            <SkillsPanel />
            <PatentsPanel />
            <AwardPanel />
            <EducationPanel />
          </div>
          <Foot />
        </div>
      </div>
    );
  };
})();

window.CommandSurface = CMD;
