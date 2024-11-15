import Image from "next/image";
import Link from "next/link";
import { type ProductInterface } from "../../../../types";

export const Card = ({
  id,
  imagePath,
  name,
  priceInCents,
  description,
}: ProductInterface) => {
  return (
    <div className="border border-slate-300 dark:border-gray-600 rounded-sm bg-white dark:bg-gray-800 shadow-md hover:shadow-lg transition-shadow">
      {/* Image Section */}
      <Link href={`/products/${id}/viewProduct`}>
        <div className="relative w-full aspect-square">
          <Image
            src={`/${imagePath.replace(/^public\//, "")}` || ""}
            alt={`${name} image`}
            fill
            title="Check product details"
            className="object-cover cursor-pointer rounded-t-sm hover:opacity-80 transition-opacity"
          />
        </div>
      </Link>

      {/* Details Section */}
      <div className="px-3 py-2">
        <h2 className="text-sm font-semibold dark:text-white truncate">
          {name}
        </h2>
        <span className="block text-xs text-slate-400 dark:text-gray-400 italic font-light">
          Description:{" "}
          {(description?.split(" ").length ?? 0) > 6
            ? description?.split(" ").slice(0, 6).join(" ") + "..."
            : description || "No description available"}
        </span>
        <p className="pt-2 text-sm font-bold dark:text-white">
          ₦ {priceInCents?.toLocaleString()}
        </p>
        <div className="pt-3 flex justify-center">
          <Link
            href={`/products/${id}/purchase`}
            className="border border-slate-300 dark:border-gray-600 rounded-md text-center w-28 h-9 flex items-center justify-center bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-all"
          >
            Buy
          </Link>
        </div>
      </div>
    </div>
  );
};
