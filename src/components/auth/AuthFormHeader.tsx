interface AuthFormHeaderProps {
  eyebrow: string;
  title: string;
  description: string;
}

export function AuthFormHeader({ eyebrow, title, description }: AuthFormHeaderProps) {
  return (
    <div className="mb-8">
      <p className="font-mono text-xs uppercase tracking-[0.2em] text-brand-coral">
        {eyebrow}
      </p>
      <h1 className="mt-2 font-display text-3xl font-semibold text-ink">{title}</h1>
      <p className="mt-2 text-sm text-ink-soft">{description}</p>
    </div>
  );
}