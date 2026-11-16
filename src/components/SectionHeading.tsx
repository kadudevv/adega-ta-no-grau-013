interface SectionHeadingProps {
  eyebrow: string;
  title: string;
  description?: string;
  align?: 'left' | 'center';
}

export default function SectionHeading({
  eyebrow,
  title,
  description,
  align = 'center',
}: SectionHeadingProps) {
  return (
    <div
      className={`mb-12 md:mb-16 ${align === 'center' ? 'text-center mx-auto max-w-2xl' : 'text-left max-w-2xl'}`}
    >
      <span className="inline-block px-3 py-1 text-xs font-semibold tracking-wider uppercase text-brand-400 bg-brand-400/10 rounded-full border border-brand-400/20 mb-4">
        {eyebrow}
      </span>
      <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight leading-tight">
        {title}
      </h2>
      {description && (
        <p className="mt-4 text-base md:text-lg text-gray-400 leading-relaxed">
          {description}
        </p>
      )}
    </div>
  );
}
