interface FloatingCardProps {
  children: React.ReactNode;
  className?: string;
}

export function FloatingCard({ children, className = '' }: FloatingCardProps) {
  return (
    <div className={`glass rounded-xl px-4 py-3 ${className}`}>
      {children}
    </div>
  );
}
