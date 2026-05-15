// Top-level: design canvas housing both variants, + tweaks panel.

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "fnAccent": "#c8492a",
  "cmdAccentHue": 115,
  "monoFamily": "JetBrains Mono"
}/*EDITMODE-END*/;

const FN_PALETTES = [
  '#c8492a', // persimmon (default)
  '#3a5a40', // forest
  '#385f9c', // indigo
  '#8a6d1f', // ochre
];

const CMD_HUES = [
  { value: 115, label: 'chartreuse' },
  { value: 30,  label: 'terracotta' },
  { value: 220, label: 'ice' },
  { value: 320, label: 'magenta' },
];

const MONO_FONTS = ['JetBrains Mono', 'IBM Plex Mono', 'Fira Code', 'Geist Mono'];

// Derive a soft, deep, etc. companion from the chosen hex for Field Notes.
function deriveFnVars(hex) {
  // crude hex -> rgb -> hsl mute/soft variants
  const h = hex.replace('#', '');
  const r = parseInt(h.slice(0, 2), 16);
  const g = parseInt(h.slice(2, 4), 16);
  const b = parseInt(h.slice(4, 6), 16);
  const deep = `rgb(${Math.max(0, r - 50)}, ${Math.max(0, g - 30)}, ${Math.max(0, b - 20)})`;
  const soft = `rgba(${r}, ${g}, ${b}, 0.13)`;
  return { '--fn-accent': hex, '--fn-accent-deep': deep, '--fn-accent-soft': soft };
}

function deriveCmdVars(hue) {
  return {
    '--cmd-accent':       `oklch(0.86 0.18 ${hue})`,
    '--cmd-accent-soft':  `oklch(0.86 0.18 ${hue} / 0.10)`,
    '--cmd-accent-deep':  `oklch(0.70 0.16 ${hue})`,
  };
}

function App() {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);

  // apply tweak values to :root so CSS reads them everywhere
  React.useEffect(() => {
    const root = document.documentElement;
    const fn = deriveFnVars(t.fnAccent);
    const cmd = deriveCmdVars(t.cmdAccentHue);
    Object.entries({ ...fn, ...cmd }).forEach(([k, v]) => root.style.setProperty(k, v));
    root.style.setProperty(
      '--mono-stack',
      `"${t.monoFamily}", ui-monospace, monospace`,
    );
    // direct font-family overrides on the variant hosts
    document.querySelectorAll('.fn-host, .cmd-root, .cmd-statusbar').forEach((el) => {
      el.style.fontFamily = `"${t.monoFamily}", ui-monospace, monospace`;
    });
  }, [t.fnAccent, t.cmdAccentHue, t.monoFamily]);

  const FieldNotes = window.FieldNotes;
  const CommandSurface = window.CommandSurface;

  return (
    <>
      <DesignCanvas>
        <DCSection id="portfolio" title="waseemahmed.in — redesign" subtitle="Two directions · pan + zoom · click any frame to focus">
          <DCArtboard id="field-notes" label="A · Field Notes" width={1280} height={3300}>
            <div className="variant-host fn-host" data-screen-label="A Field Notes">
              <FieldNotes />
            </div>
          </DCArtboard>
          <DCArtboard id="command-surface" label="B · Command Surface" width={1280} height={3300}>
            <div className="variant-host" data-screen-label="B Command Surface">
              <CommandSurface />
            </div>
          </DCArtboard>
        </DCSection>
      </DesignCanvas>

      <TweaksPanel title="Tweaks">
        <TweakSection label="A · Field Notes" />
        <TweakColor
          label="Accent"
          value={t.fnAccent}
          options={FN_PALETTES}
          onChange={(v) => setTweak('fnAccent', v)}
        />

        <TweakSection label="B · Command Surface" />
        <TweakRadio
          label="Accent hue"
          value={t.cmdAccentHue}
          options={CMD_HUES}
          onChange={(v) => setTweak('cmdAccentHue', v)}
        />

        <TweakSection label="Typography (both)" />
        <TweakSelect
          label="Mono family"
          value={t.monoFamily}
          options={MONO_FONTS}
          onChange={(v) => setTweak('monoFamily', v)}
        />
      </TweaksPanel>
    </>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
