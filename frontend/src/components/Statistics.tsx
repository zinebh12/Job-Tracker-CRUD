import type { ApplicationsResponse } from "@/types/applications";

const Statistics = ({ data }: { data: ApplicationsResponse }) => {
  return (
    <div className="grid w-full grid-cols-2 gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-4">
      {/* Total Applications */}
      <div className="rounded-2xl border border-sage-light bg-white p-4 shadow-sm transition duration-200 hover:-translate-y-0.5 hover:shadow-md sm:p-5">
        <div className="flex flex-col gap-2">
          <h2 className="whitespace-nowrap text-[10px] font-semibold uppercase tracking-wide text-forest/60 sm:text-sm">
            Total Applications
          </h2>

          <span className="text-3xl font-semibold text-deep-forest sm:text-4xl">
            {data.stats.total}
          </span>
        </div>
      </div>

      {/* Active Applications */}
      <div className="rounded-2xl border border-sage-light bg-white p-4 shadow-sm transition duration-200 hover:-translate-y-0.5 hover:shadow-md sm:p-5">
        <div className="flex flex-col gap-2">
          <h2 className="whitespace-nowrap text-[10px] font-semibold uppercase tracking-wide text-forest/60 sm:text-sm">
            Active Applications
          </h2>

          <span className="text-3xl font-semibold text-green sm:text-4xl">
            {data.stats.active}
          </span>
        </div>
      </div>

      {/* Rejections */}
      <div className="rounded-2xl border border-sage-light bg-white p-4 shadow-sm transition duration-200 hover:-translate-y-0.5 hover:shadow-md sm:p-5">
        <div className="flex flex-col gap-2">
          <h2 className="whitespace-nowrap text-[10px] font-semibold uppercase tracking-wide text-forest/60 sm:text-sm">
            Rejections
          </h2>

          <span className="text-3xl font-semibold text-red-600 sm:text-4xl">
            {data.stats.rejected}
          </span>
        </div>
      </div>

      {/* Offers */}
      <div className="rounded-2xl border border-sage-light bg-white p-4 shadow-sm transition duration-200 hover:-translate-y-0.5 hover:shadow-md sm:p-5">
        <div className="flex flex-col gap-2">
          <h2 className="whitespace-nowrap text-[10px] font-semibold uppercase tracking-wide text-forest/60 sm:text-sm">
            Offers
          </h2>

          <span className="text-3xl font-semibold text-deep-forest sm:text-4xl">
            {data.stats.offer}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Statistics;
