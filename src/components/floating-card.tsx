interface FloatingCardProps {
  children: React.ReactNode;
  className?: string;
}

export function FloatingCard({ children, className = '' }: FloatingCardProps) {
  return (
    <div className={`rounded-xl border border-fd-border bg-fd-card px-4 py-3 shadow-md ${className}`}>
      {children}
    </div>
  );
}
