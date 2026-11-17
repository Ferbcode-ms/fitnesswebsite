import { ReactNode } from "react";

interface AdminCardProps {
  title?: string;
  description?: string;
  action?: ReactNode;
  children: ReactNode;
  className?: string;
}

export function AdminCard({ title, description, action, children, className = "" }: AdminCardProps) {
  return (
    <div className={`rounded-xl border border-[#E8DFD8] bg-white shadow-xs overflow-hidden ${className}`}>
      {(title || action) && (
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#E8DFD8] bg-[#FBF8F5]/50 px-6 py-4">
          <div>
            {title && (
              <h3 className="font-[family-name:var(--font-heading)] text-lg tracking-wider font-bold text-[var(--color-burgundy)]">
                {title}
              </h3>
            )}
            {description && <p className="text-xs text-gray-500 mt-0.5">{description}</p>}
          </div>
          {action && <div className="shrink-0">{action}</div>}
        </div>
      )}
      <div className="p-6">{children}</div>
    </div>
  );
}
