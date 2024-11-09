"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";

const FilterTabs = () => {
  const searchParams = useSearchParams();
  const currentFilter = searchParams.get("filter");

  return (
    <div className="flex gap-4 mb-8">
      <Link href="/people" className={!currentFilter ? "font-bold" : ""}>
        All
      </Link>
      <Link
        href="/people?filter=partners"
        className={currentFilter === "partners" ? "font-bold" : ""}
      >
        Partners
      </Link>
      <Link
        href="/people?filter=leadership"
        className={currentFilter === "leadership" ? "font-bold" : ""}
      >
        Leadership
      </Link>
    </div>
  );
};

export default FilterTabs;
