import Link from "next/link";

interface DashboardSectionProps {
  title: string;
  icon?: React.ReactNode;
  viewAllHref?: string;
  children: React.ReactNode;
}

export function DashboardSection({ title, icon, viewAllHref, children }: DashboardSectionProps) {
  return (
    <section className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h2 className="flex items-center gap-2 text-lg font-semibold">
          {icon}
          {title}
        </h2>
        {viewAllHref && (
          <Link href={viewAllHref} className="text-sm text-muted-foreground hover:text-foreground">
            View all
          </Link>
        )}
      </div>
      {children}
    </section>
  );
}
