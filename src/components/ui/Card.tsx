interface CardProps {
    children: React.ReactNode;
    className?: string;
    onClick?: () => void;
  }
  
  export function Card({ children, className, onClick }: CardProps) {
    return (
      <div
        onClick={onClick}
        className={`p-4 rounded-lg border shadow-sm hover:shadow-md transition-shadow ${
          onClick ? 'cursor-pointer' : ''
        } ${className}`}
      >
        {children}
      </div>
    );
  }