// Direction A — "Field Notes"
// Paper / editorial. Single column, ink on cream, persimmon accent.
// Mono-driven (JetBrains Mono) with a serif for the wordmark.

const FN = (() => {
  const c = window.CONTENT;
  if (!c) return () => null;

  const fnStyles = {
    root: {
      position: 'relative',
      background: 'var(--fn-paper)',
      color: 'var(--fn-ink)',
      fontFamily: '"JetBrains Mono", ui-monospace, monospace',
      fontSize: 14,
      lineHeight: 1.6,
      padding: '64px 0 96px',
      minHeight: '100%',
      overflow: 'hidden',
    },
    page: {
      maxWidth: 880,
      margin: '0 auto',
      padding: '0 80px',
      position: 'relative',
    },
    metaTop: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'baseline',
      fontSize: 11,
      letterSpacing: '0.08em',
      textTransform: 'uppercase',
      color: 'var(--fn-ink-mute)',
      marginBottom: 56,
      borderBottom: '1px solid var(--fn-rule)',
      paddingBottom: 14,
    },
    name: {
      fontFamily: '"Instrument Serif", "Source Serif 4", Georgia, serif',
      fontStyle: 'italic',
      fontWeight: 400,
      fontSize: 76,
      lineHeight: 0.95,
      letterSpacing: '-0.01em',
      margin: 0,
      color: 'var(--fn-ink)',
    },
    nameAmp: { color: 'var(--fn-accent)', fontStyle: 'italic' },
    role: {
      marginTop: 24,
      fontSize: 13,
      lineHeight: 1.7,
      maxWidth: 560,
      color: 'var(--fn-ink-mute)',
    },
    sectionWrap: { marginTop: 72 },
    sectionHead: {
      display: 'grid',
      gridTemplateColumns: '64px 1fr auto',
      alignItems: 'baseline',
      gap: 16,
      borderBottom: '1px solid var(--fn-ink)',
      paddingBottom: 8,
      marginBottom: 28,
    },
    sectionNum: {
      fontSize: 11,
      color: 'var(--fn-accent)',
      letterSpacing: '0.1em',
    },
    sectionTitle: {
      fontSize: 13,
      fontWeight: 500,
      letterSpacing: '0.12em',
      textTransform: 'uppercase',
      color: 'var(--fn-ink)',
    },
    sectionMeta: {
      fontSize: 11,
      color: 'var(--fn-ink-mute)',
      letterSpacing: '0.06em',
    },
    // a row with marginalia on the left for dates / numbers
    row: {
      display: 'grid',
      gridTemplateColumns: '64px 1fr',
      gap: 16,
      marginBottom: 28,
      alignItems: 'baseline',
    },
    gutter: {
      fontSize: 10.5,
      color: 'var(--fn-ink-mute)',
      letterSpacing: '0.06em',
      paddingTop: 2,
    },
    h3: {
      fontSize: 15,
      fontWeight: 500,
      margin: 0,
      letterSpacing: '-0.005em',
      color: 'var(--fn-ink)',
    },
    p: {
      margin: '8px 0 0',
      color: 'var(--fn-ink-mute)',
      maxWidth: '60ch',
    },
    chips: {
      display: 'flex',
      flexWrap: 'wrap',
      gap: '6px 8px',
      marginTop: 12,
    },
    chip: {
      fontSize: 10.5,
      padding: '3px 8px',
      borderRadius: 1,
      border: '1px solid var(--fn-rule-strong)',
      color: 'var(--fn-ink-mute)',
      background: 'transparent',
      letterSpacing: '0.04em',
    },
    chipFilled: {
      fontSize: 10.5,
      padding: '3px 8px',
      borderRadius: 1,
      background: 'var(--fn-accent-soft)',
      color: 'var(--fn-accent-deep)',
      letterSpacing: '0.04em',
    },
    ul: { margin: '10px 0 0', padding: 0, listStyle: 'none' },
    li: {
      position: 'relative',
      paddingLeft: 18,
      color: 'var(--fn-ink-mute)',
      margin: '6px 0',
      maxWidth: '64ch',
    },
    liDash: {
      position: 'absolute',
      left: 0,
      color: 'var(--fn-accent)',
    },
  };

  function SectionHead({ num, title, meta }) {
    return (
      <div style={fnStyles.sectionHead}>
        <span style={fnStyles.sectionNum}>§ {num}</span>
        <span style={fnStyles.sectionTitle}>{title}</span>
        <span style={fnStyles.sectionMeta}>{meta}</span>
      </div>
    );
  }

  function Bullets({ items }) {
    return (
      <ul style={fnStyles.ul}>
        {items.map((b, i) => (
          <li key={i} style={fnStyles.li}>
            <span style={fnStyles.liDash}>—</span>
            {b}
          </li>
        ))}
      </ul>
    );
  }

  function Hero() {
    return (
      <header>
        <div style={fnStyles.metaTop}>
          <span>field notes &nbsp;·&nbsp; v.{new Date().getFullYear()}.1</span>
          <span>{c.identity.location}</span>
          <span>{c.identity.site}</span>
        </div>

        <h1 style={fnStyles.name}>
          Waseem<br />
          <span style={fnStyles.nameAmp}>Ahmed.</span>
        </h1>
        <p style={fnStyles.role}>
          {c.identity.tagline}
        </p>
        <div style={{ display: 'flex', gap: 18, marginTop: 24, fontSize: 12, flexWrap: 'wrap' }}>
          <a href={`mailto:${c.identity.email}`} style={{
            color: 'var(--fn-ink)', textDecoration: 'none',
            borderBottom: '1px solid var(--fn-accent)', paddingBottom: 1,
          }}>{c.identity.email}</a>
          <a href={c.identity.linkedin} target="_blank" rel="noreferrer"
             style={{ color: 'var(--fn-ink-mute)', textDecoration: 'none' }}>
            ↗ linkedin/in/waseem09
          </a>
          <a href={c.identity.resume} target="_blank" rel="noreferrer"
             style={{ color: 'var(--fn-ink-mute)', textDecoration: 'none' }}>
            ↗ résumé.pdf
          </a>
        </div>
      </header>
    );
  }

  function Now() {
    const n = c.now;
    return (
      <section style={fnStyles.sectionWrap}>
        <SectionHead num="01" title="Now" meta={`since ${n.since}`} />
        <div style={{
          background: 'var(--fn-block)',
          padding: '24px 28px',
          borderLeft: '2px solid var(--fn-accent)',
          marginBottom: 12,
        }}>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 12, flexWrap: 'wrap' }}>
            <span style={{ ...fnStyles.h3, fontSize: 18 }}>{n.title}</span>
            <span style={{ fontSize: 12, color: 'var(--fn-ink-mute)' }}>·</span>
            <span style={{ fontSize: 13, color: 'var(--fn-accent-deep)' }}>{n.company}</span>
          </div>
          <div style={{ fontSize: 11.5, color: 'var(--fn-ink-mute)', letterSpacing: '0.04em', marginTop: 4 }}>
            {n.division} &nbsp;·&nbsp; {n.location}
            &nbsp;·&nbsp;
            <span style={{ color: 'var(--fn-accent-deep)' }}>● {n.status}</span>
          </div>
          <p style={{ ...fnStyles.p, marginTop: 16 }}>{n.summary}</p>
          <div style={fnStyles.chips}>
            {n.stack.map((s) => <span key={s} style={fnStyles.chipFilled}>{s}</span>)}
          </div>
        </div>
        <Bullets items={n.highlights} />
      </section>
    );
  }

  function ExperienceList() {
    // skip current samsung-pe (in NOW)
    const items = c.experience.filter((x) => x.id !== 'samsung-pe');
    return (
      <section style={fnStyles.sectionWrap}>
        <SectionHead num="02" title="Prior work" meta={`${items.length} entries`} />
        {items.map((x) => (
          <div key={x.id} style={fnStyles.row}>
            <div style={fnStyles.gutter}>
              {x.from}<br />
              <span style={{ opacity: 0.5 }}>↓</span><br />
              {x.to}
            </div>
            <div>
              <h3 style={fnStyles.h3}>{x.title}</h3>
              <div style={{ fontSize: 11.5, color: 'var(--fn-ink-mute)', marginTop: 2 }}>
                {x.org} &nbsp;·&nbsp; {x.where}
              </div>
              <Bullets items={x.bullets} />
              <div style={fnStyles.chips}>
                {x.tags.map((t) => <span key={t} style={fnStyles.chip}>{t}</span>)}
              </div>
            </div>
          </div>
        ))}
      </section>
    );
  }

  function Projects() {
    const [open, setOpen] = React.useState(c.projects[0].id);
    return (
      <section style={fnStyles.sectionWrap}>
        <SectionHead num="03" title="Selected projects" meta={`${c.projects.length} case studies`} />
        {c.projects.map((p, i) => {
          const isOpen = open === p.id;
          return (
            <div key={p.id} style={{
              borderTop: '1px solid var(--fn-rule)',
              padding: '18px 0',
            }}>
              <button onClick={() => setOpen(isOpen ? null : p.id)} style={{
                all: 'unset', cursor: 'pointer', display: 'grid',
                gridTemplateColumns: '64px 1fr auto auto',
                gap: 16, alignItems: 'baseline', width: '100%',
              }}>
                <span style={fnStyles.gutter}>P/{String(i + 1).padStart(2, '0')}</span>
                <span style={{ ...fnStyles.h3 }}>{p.title}</span>
                <span style={{ fontSize: 11, color: 'var(--fn-accent-deep)' }}>{p.metric.value}</span>
                <span style={{ fontSize: 14, color: 'var(--fn-ink-mute)' }}>
                  {isOpen ? '−' : '+'}
                </span>
              </button>
              <div style={{
                marginLeft: 80, marginTop: 6,
                fontSize: 11.5, color: 'var(--fn-ink-mute)',
                letterSpacing: '0.04em',
              }}>
                {p.kind} &nbsp;·&nbsp; {p.stack.join(' / ')}
              </div>
              <div style={{ marginLeft: 80, marginTop: 8 }}>
                <p style={fnStyles.p}>{p.blurb}</p>
                {isOpen && (
                  <div style={{ marginTop: 12, paddingTop: 12, borderTop: '1px dashed var(--fn-rule)' }}>
                    <div style={{
                      fontSize: 10.5, letterSpacing: '0.1em',
                      textTransform: 'uppercase', color: 'var(--fn-accent-deep)',
                      marginBottom: 8,
                    }}>
                      Case notes
                    </div>
                    <Bullets items={p.detail} />
                    <div style={{
                      marginTop: 16, padding: '10px 14px',
                      background: 'var(--fn-block)',
                      display: 'inline-block',
                    }}>
                      <span style={{ fontSize: 22, color: 'var(--fn-accent)' }}>{p.metric.value}</span>
                      &nbsp;<span style={{ fontSize: 11, color: 'var(--fn-ink-mute)' }}>{p.metric.label}</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </section>
    );
  }

  function Skills() {
    return (
      <section style={fnStyles.sectionWrap}>
        <SectionHead num="04" title="Toolkit" meta="languages · models · infra" />
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '28px 40px' }}>
          {c.skills.map((s) => (
            <div key={s.group}>
              <div style={{
                fontSize: 10.5, letterSpacing: '0.12em',
                textTransform: 'uppercase', color: 'var(--fn-accent-deep)',
                marginBottom: 8,
              }}>
                {s.group}
              </div>
              <div style={{ fontSize: 12.5, color: 'var(--fn-ink-mute)', lineHeight: 1.8 }}>
                {s.items.join('  ·  ')}
              </div>
            </div>
          ))}
        </div>
      </section>
    );
  }

  function Patents() {
    return (
      <section style={fnStyles.sectionWrap}>
        <SectionHead num="05" title="Patents in progress" meta="authoring · drafting" />
        {c.patents.map((p, i) => (
          <div key={p.id} style={fnStyles.row}>
            <div style={fnStyles.gutter}>PAT/{String(i + 1).padStart(2, '0')}</div>
            <div>
              <div style={{ display: 'flex', gap: 12, alignItems: 'baseline' }}>
                <h3 style={fnStyles.h3}>{p.area}</h3>
                <span style={{
                  fontSize: 10,
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  color: 'var(--fn-accent-deep)',
                  border: '1px solid var(--fn-accent-deep)',
                  padding: '1px 6px',
                }}>
                  {p.status}
                </span>
              </div>
              <p style={fnStyles.p}>{p.note}</p>
            </div>
          </div>
        ))}
      </section>
    );
  }

  function Award() {
    const a = c.achievement;
    return (
      <section style={fnStyles.sectionWrap}>
        <SectionHead num="06" title="Recognition" meta={a.year} />
        <div style={fnStyles.row}>
          <div style={fnStyles.gutter}>⌘</div>
          <div>
            <h3 style={fnStyles.h3}>{a.title}</h3>
            <div style={{ fontSize: 12, color: 'var(--fn-accent-deep)', marginTop: 2 }}>
              {a.subtitle}
            </div>
            <p style={fnStyles.p}>{a.body}</p>
            <Bullets items={a.bullets} />
          </div>
        </div>
      </section>
    );
  }

  function Education() {
    const e = c.education;
    return (
      <section style={fnStyles.sectionWrap}>
        <SectionHead num="07" title="Education" meta={`${e.from} → ${e.to}`} />
        <div style={fnStyles.row}>
          <div style={fnStyles.gutter}>EDU</div>
          <div>
            <h3 style={fnStyles.h3}>{e.school}</h3>
            <div style={{ fontSize: 12, color: 'var(--fn-ink-mute)', marginTop: 2 }}>
              {e.degree} &nbsp;·&nbsp; {e.where}
            </div>
            <div style={{ marginTop: 12 }}>
              <div style={{
                fontSize: 10.5, letterSpacing: '0.12em',
                textTransform: 'uppercase', color: 'var(--fn-accent-deep)',
                marginBottom: 6,
              }}>
                Relevant coursework
              </div>
              <div style={{ fontSize: 12, color: 'var(--fn-ink-mute)', lineHeight: 1.8 }}>
                {e.coursework.join('  ·  ')}
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  function Foot() {
    return (
      <section style={{ ...fnStyles.sectionWrap, marginTop: 96 }}>
        <div style={{
          borderTop: '1px solid var(--fn-ink)',
          paddingTop: 24,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'baseline',
          flexWrap: 'wrap',
          gap: 16,
        }}>
          <div>
            <div style={{
              fontFamily: '"Instrument Serif", Georgia, serif',
              fontStyle: 'italic',
              fontSize: 32,
              lineHeight: 1,
            }}>
              Get in touch.
            </div>
            <p style={{ ...fnStyles.p, marginTop: 10, fontSize: 13 }}>
              Best for LLM serving, ML systems, and full-stack AI product work.
            </p>
          </div>
          <div style={{ fontSize: 12, lineHeight: 1.9, textAlign: 'right' }}>
            <div>
              <a href={`mailto:${c.identity.email}`} style={{
                color: 'var(--fn-ink)',
                borderBottom: '1px solid var(--fn-accent)',
                textDecoration: 'none',
                paddingBottom: 1,
              }}>{c.identity.email}</a>
            </div>
            <div style={{ color: 'var(--fn-ink-mute)' }}>
              <a href={c.identity.linkedin} target="_blank" rel="noreferrer"
                 style={{ color: 'inherit', textDecoration: 'none' }}>
                ↗ linkedin/in/waseem09
              </a>
            </div>
            <div style={{ color: 'var(--fn-ink-mute)', marginTop: 8, fontSize: 10.5, letterSpacing: '0.08em' }}>
              © {new Date().getFullYear()} W.AHMED · ALL RIGHTS RESERVED
            </div>
          </div>
        </div>
      </section>
    );
  }

  return function FieldNotes() {
    return (
      <div style={fnStyles.root}>
        <div style={fnStyles.page}>
          <Hero />
          <Now />
          <ExperienceList />
          <Projects />
          <Skills />
          <Patents />
          <Award />
          <Education />
          <Foot />
        </div>
      </div>
    );
  };
})();

window.FieldNotes = FN;
