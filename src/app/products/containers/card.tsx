import Image from "next/image";
import Link from "next/link";
import { type ProductInterface } from "../../../../types";

export const Card = ({
  id,
  category,
  image,
  name,
  price,
  stock,
}: ProductInterface) => {
  return (
    <div className="border border-slate-300 dark:border-gray-600 rounded-sm w-64 h-96 bg-white dark:bg-gray-800 shadow-md hover:shadow-lg transition-shadow">
      <Link href={`/products/${category}/${id}`}>
        <Image
          src={image || ""}
          alt={`${name} image`}
          width="288"
          height="288"
          title="Check product details"
          className="max-h-64 w-full object-cover cursor-pointer rounded-t-sm hover:opacity-80 transition-opacity"
        />
      </Link>
      <div className="px-1">
        <h2 className="text-xl font-semibold dark:text-white">
          {name}
          <span className="block text-sm text-slate-400 dark:text-gray-400 italic font-extralight">
            Stock: {stock}
          </span>
        </h2>
        <p className="pt-1 text-lg font-bold dark:text-white">₦ {price}</p>
        <div className="pt-2 w-full flex justify-center">
          <Link
            href={`/products/${category}/${id}`}
            className="border border-slate-300 dark:border-gray-600 rounded-md text-center w-28 h-9 flex items-center justify-center bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-all"
          >
            See details
          </Link>
        </div>
      </div>
    </div>
  );
};
