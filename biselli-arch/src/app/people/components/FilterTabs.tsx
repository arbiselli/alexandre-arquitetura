"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";

const FilterTabs = () => {
  const searchParams = useSearchParams();
  const currentQuery = searchParams.get("q");

  return (
    <nav className="flex items-center space-x-6 mb-8">
      <Link
        href="/people"
        className={`${
          !currentQuery ? "font-bold" : ""
        } text-black hover:text-gray-600 text-lg`}
      ></Link>
      <span className="text-gray-300"></span>
      <Link
        href="/people?q=partners"
        className={`${
          currentQuery === "partners" ? "font-bold" : ""
        } text-black hover:text-gray-600 text-lg`}
      ></Link>
      <span className="text-gray-300"></span>
      <Link
        href="/people?q=leadership"
        className={`${
          currentQuery === "leadership" ? "font-bold" : ""
        } text-black hover:text-gray-600 text-lg`}
      ></Link>
    </nav>
  );
};

export default FilterTabs;
