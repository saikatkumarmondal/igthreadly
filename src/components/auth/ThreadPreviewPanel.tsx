const AUTOMATION_STAGES = [
  {
    id: "comment",
    eyebrow: "01 · Instagram Comment",
    title: '"GUIDE" 🙋‍♀️',
    meta: "@meherun.k · 2 seconds ago",
    highlight: false,
  },
  {
    id: "reply",
    eyebrow: "02 · AI Agent Reply",
    title: '"What is your monthly budget?"',
    meta: "IGThreadly AI · Instantly",
    highlight: false,
  },
  {
    id: "lead",
    eyebrow: "03 · Lead Qualified",
    title: "Saikat Kumar Mondal",
    meta: "Score 87 · Sales Pipeline",
    highlight: true,
  },
] as const;

export function ThreadPreviewPanel() {
  return (
    <div className="relative flex w-full flex-col justify-center overflow-hidden bg-ink px-14 py-20 text-paper">
      <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-brand-coral/20 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-32 -left-16 h-72 w-72 rounded-full bg-brand-teal/10 blur-3xl" />

      <p className="font-mono text-xs uppercase tracking-[0.2em] text-paper/50">
        LIVE AUTOMATION PREVIEW
      </p>
      <h2 className="mt-3 font-display text-3xl font-semibold leading-tight text-paper">
        From one comment,
        <br />
        to one qualified lead.
      </h2>

      <ol className="relative mt-12 space-y-8 border-l-2 border-dashed border-paper/20 pl-8">
        {AUTOMATION_STAGES.map((stage, index) => (
          <li
            key={stage.id}
            className="relative animate-stage-rise opacity-0"
            style={{ animationDelay: `${index * 180}ms` }}
          >
            <span
              className={`absolute -left-[2.35rem] top-1 h-3 w-3 rounded-full ${
                stage.highlight ? "bg-brand-teal" : "bg-paper/40"
              }`}
            />
            <p className="font-mono text-[11px] uppercase tracking-[0.15em] text-paper/45">
              {stage.eyebrow}
            </p>
            <p className="mt-1 font-display text-lg font-medium text-paper">
              {stage.title}
            </p>
            <p className="mt-0.5 text-sm text-paper/55">{stage.meta}</p>
          </li>
        ))}
      </ol>
    </div>
  );
}