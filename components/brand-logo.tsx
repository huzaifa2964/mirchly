import { cn } from "@/lib/utils";

type BrandLogoProps = {
  className?: string;
  compact?: boolean;
};

export function BrandLogo({ className, compact = false }: BrandLogoProps) {
  return (
    <div className={cn("inline-flex items-center gap-3", className)} aria-label="Mirchly logo">
      <div className="relative grid h-10 w-10 place-items-center overflow-hidden rounded-xl border border-white/15 bg-gradient-to-br from-[#111] via-[#1a1a1a] to-[#0a0a0a] shadow-[0_10px_30px_-16px_rgba(255,77,0,0.7)]">
        <div className="absolute -top-6 -right-4 h-10 w-10 rounded-full bg-[#FF4D00]/30 blur-xl" />
        <svg
          viewBox="0 0 40 40"
          className="relative z-10 h-6 w-6"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          role="img"
          aria-label="Mirchly monogram"
        >
          <path d="M8 29V11H13L20 22L27 11H32V29H27V18L20 28L13 18V29H8Z" fill="#FFD700" />
          <path d="M27.5 9.8C28.6 7.7 30.5 6.6 33 6.5C32.4 8.9 30.8 10.5 28.2 11.2" stroke="#FF4D00" strokeWidth="1.8" strokeLinecap="round" />
        </svg>
      </div>

      <div className="leading-none">
        <p className="font-display text-2xl tracking-[0.18em] text-[#FFD700]">MIRCHLY</p>
        {!compact && <p className="mt-1 text-[10px] tracking-[0.22em] text-white/50">MODERN HERITAGE KITCHEN</p>}
      </div>
    </div>
  );
}
