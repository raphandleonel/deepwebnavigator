import { SearchResult } from "@/interfaces";
import Link from "next/link";

const ResultCard = ({ result }: { result: SearchResult }) => (
  <Link href={`/${result.slug}`} passHref>
    <div className="bg-white dark:bg-gray-700 shadow-md rounded-md p-4 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600 transition">
      <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100 truncate">
        {result.title}
      </h3>
      <p className="text-sm text-gray-500 dark:text-gray-300">
        {result.category} | {new Date(result.publishedAt).toLocaleDateString()}
      </p>
    </div>
  </Link>
);

export default ResultCard;
