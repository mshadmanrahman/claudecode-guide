interface FloatingCardProps {
  children: React.ReactNode;
  className?: string;
}

export function FloatingCard({ children, className = '' }: FloatingCardProps) {
  return (
    <div className={`rounded-xl border border-fd-border bg-[var(--glass)] backdrop-blur-[16px] backdrop-saturate-[1.2] px-4 py-3 ${className}`}>
      {children}
    </div>
  );
}
