type BrandLogoProps = {
  size?: 'sm' | 'md' | 'lg';
  showWordmark?: boolean;
  theme?: 'dark' | 'light';
  caption?: string;
  className?: string;
};

const sizeMap = {
  sm: {
    shell: 'h-12 w-12 rounded-[18px]',
    icon: 'h-[54%] w-[54%]',
    gap: 'gap-2.5',
    title: 'text-[1.55rem]',
    caption: 'text-[0.62rem]',
    captionWidth: 'max-w-[16ch]',
  },
  md: {
    shell: 'h-14 w-14 rounded-[20px]',
    icon: 'h-[54%] w-[54%]',
    gap: 'gap-3',
    title: 'text-[1.9rem]',
    caption: 'text-[0.72rem]',
    captionWidth: 'max-w-[18ch]',
  },
  lg: {
    shell: 'h-[4.45rem] w-[4.45rem] rounded-[24px]',
    icon: 'h-[55%] w-[55%]',
    gap: 'gap-3.5',
    title: 'text-[3rem] sm:text-[3.15rem]',
    caption: 'text-[0.82rem]',
    captionWidth: 'max-w-[18ch]',
  },
} as const;

export default function BrandLogo({
  size = 'md',
  showWordmark = true,
  theme = 'dark',
  caption,
  className = '',
}: BrandLogoProps) {
  const styles = sizeMap[size];
  const titleColor = theme === 'light' ? 'text-white' : 'text-slate-950';
  const captionColor = theme === 'light' ? 'text-blue-100/84' : 'text-slate-500';

  return (
    <div className={`flex min-w-0 items-center ${styles.gap} ${className}`}>
      <div
        className={`relative flex shrink-0 items-center justify-center overflow-hidden ${styles.shell}`}
        style={{
          background:
            'linear-gradient(135deg, #0f1f4d 0%, #1d4ed8 72%, #60a5fa 100%)',
          boxShadow: '0 24px 48px -28px rgba(29, 78, 216, 0.75)',
        }}
      >
        <div className="absolute inset-[1.5px] rounded-[inherit] border border-white/12" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.26),transparent_58%)]" />

        <div className="relative z-10 flex h-full w-full items-center justify-center">
          <svg viewBox="0 0 64 64" className={`block ${styles.icon}`} aria-hidden="true">
            <path
              d="M18 15v17c0 9.6 5.6 15 14 15s14-5.4 14-15V15"
              stroke="white"
              strokeWidth="5.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
            />
            <circle cx="18" cy="15" r="4.5" fill="white" />
            <circle cx="46" cy="15" r="4.5" fill="white" />
            <path
              d="M32 18v23"
              stroke="rgba(255,255,255,0.38)"
              strokeWidth="3.5"
              strokeLinecap="round"
              strokeDasharray="5 6"
            />
            <circle cx="32" cy="49" r="5" fill="#F8B73C" />
          </svg>
        </div>
      </div>

      {showWordmark ? (
        <div className={`min-w-0 ${styles.captionWidth}`}>
          <div className={`font-display font-semibold leading-none ${styles.title} ${titleColor}`}>
            UniGo
          </div>

          {caption ? (
            <div
              className={`mt-1.5 font-semibold uppercase leading-[1.2] tracking-[0.12em] ${styles.caption} ${captionColor}`}
            >
              {caption}
            </div>
          ) : null}
        </div>
      ) : null}
    </div>
  );
}
