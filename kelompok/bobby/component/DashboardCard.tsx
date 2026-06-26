type DashboardCardProps = {
  title: string;
  value: string;
};

export default function DashboardCard({
  title,
  value,
}: DashboardCardProps) {
  return (
    <div className="group relative overflow-hidden rounded-[30px] border border-white/40 bg-white/90 p-7 shadow-xl backdrop-blur-sm transition duration-300 hover:-translate-y-2 hover:shadow-2xl">

      {/* Glow */}
      <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-cyan-400/10 blur-3xl transition group-hover:bg-cyan-400/20"></div>

      {/* Title */}
      <p className="text-sm font-semibold tracking-wide text-slate-500">
        {title}
      </p>

      {/* Value */}
      <h3 className="mt-5 text-4xl font-black tracking-tight text-slate-950">
        {value}
      </h3>

      {/* Bottom */}
      <div className="mt-6 flex items-center justify-between">

        <span className="rounded-full bg-cyan-100 px-3 py-1 text-xs font-bold text-cyan-800">
          Updated
        </span>

        <div className="h-3 w-3 rounded-full bg-cyan-500 shadow-lg shadow-cyan-400"></div>

      </div>

    </div>
  );
}