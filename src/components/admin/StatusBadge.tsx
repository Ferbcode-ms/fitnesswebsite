interface StatusBadgeProps {
  status: "published" | "draft" | "new" | "contacted" | "completed" | "cancelled" | boolean;
}

export function StatusBadge({ status }: StatusBadgeProps) {
  if (typeof status === "boolean") {
    return status ? (
      <span className="inline-flex items-center rounded-md bg-emerald-50 px-2 py-0.5 text-xs font-medium text-emerald-700 ring-1 ring-inset ring-emerald-600/20">
        Enabled
      </span>
    ) : (
      <span className="inline-flex items-center rounded-md bg-gray-50 px-2 py-0.5 text-xs font-medium text-gray-600 ring-1 ring-inset ring-gray-500/10">
        Disabled
      </span>
    );
  }

  const styles: Record<string, string> = {
    published: "bg-emerald-50 text-emerald-700 ring-emerald-600/20",
    draft: "bg-amber-50 text-amber-700 ring-amber-600/20",
    new: "bg-blue-50 text-blue-700 ring-blue-600/20",
    contacted: "bg-purple-50 text-purple-700 ring-purple-600/20",
    completed: "bg-emerald-50 text-emerald-700 ring-emerald-600/20",
    cancelled: "bg-red-50 text-red-700 ring-red-600/20",
  };

  const style = styles[status] || "bg-gray-50 text-gray-700 ring-gray-500/10";

  return (
    <span
      className={`inline-flex items-center rounded-md px-2 py-0.5 text-xs font-medium uppercase tracking-wider ring-1 ring-inset ${style}`}
    >
      {status}
    </span>
  );
}
