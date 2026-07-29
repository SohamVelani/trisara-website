interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  centered?: boolean;
  light?: boolean;
}

export default function SectionHeading({
  eyebrow,
  title,
  subtitle,
  centered = false,
  light = false,
}: SectionHeadingProps) {
  return (
    <div className={centered ? 'text-center' : ''}>
      {eyebrow && (
        <p
          className={`text-xs font-semibold uppercase tracking-widest mb-3 ${
            light ? 'text-trisara-teal-300' : 'text-trisara-teal-500'
          }`}
        >
          {eyebrow}
        </p>
      )}
      <h2
        className={`text-3xl sm:text-4xl font-bold leading-tight ${
          light ? 'text-white' : 'text-trisara-dark'
        }`}
      >
        {title}
      </h2>
      {centered && (
        <div className="mt-3 h-1 w-14 rounded-full bg-gradient-brand mx-auto" />
      )}
      {!centered && (
        <div className="mt-3 h-1 w-14 rounded-full bg-gradient-brand" />
      )}
      {subtitle && (
        <p
          className={`mt-4 text-base sm:text-lg leading-relaxed ${
            light ? 'text-gray-300' : 'text-gray-600'
          } ${centered ? 'max-w-2xl mx-auto' : 'max-w-2xl'}`}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}
