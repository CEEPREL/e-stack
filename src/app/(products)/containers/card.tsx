import Image from "next/image";
import Link from "next/link";
import { type ProductInterface } from "../../../../types";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export const ProductCards = ({
  id,
  imagePath,
  name,
  priceInCents,
  description,
}: ProductInterface) => {
  return (
    <div className=" border border-slate-300 dark:border-gray-600 rounded-sm bg-white dark:bg-gray-800 shadow-md hover:shadow-lg transition-shadow">
      {/* Image Section */}
      <Link href={`/${id}/product-details`}>
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
        <span className="block text-xs text-slate-400 dark:text-gray-400 italic font-light whitespace-nowrap overflow-hidden text-ellipsis">
          Description:{" "}
          {(description?.split(" ").length ?? 0) > 6
            ? description?.split(" ").slice(0, 6).join(" ") + "..."
            : description || "No description available"}
        </span>

        <p className="pt-2 text-sm font-bold dark:text-white">
          ₦ {priceInCents?.toLocaleString()}
        </p>
        <div className="pt-3 flex justify-center ">
          <Button className="border text-black border-slate-300 dark:border-gray-600 rounded-md text-center w-28 h-9 flex items-center justify-center bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-all">
            <Link href={`/${id}/purchase`}>Buy</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export function Skeletal() {
  return (
    <Card className="overflow-hidden flex flex-col animate-pulse w-32 h-56 sm:w-44 sm:h-72 md:w-56 md:h-88 lg:w-64 lg:h-96 bg-white dark:bg-gray-800 shadow-md">
      <div className="w-full aspect-video bg-gray-300 rounded-t-sm" />
      <CardHeader className="p-2">
        <CardTitle>
          <div className="w-3/4 h-6 rounded-full bg-gray-300" />
        </CardTitle>
        <CardDescription>
          <div className="w-1/2 h-4 rounded-full bg-gray-300 mt-2" />
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-2 p-2">
        <div className="w-full h-4 rounded-full bg-gray-300" />
        <div className="w-full h-4 rounded-full bg-gray-300" />
        <div className="w-3/4 h-4 rounded-full bg-gray-300" />
      </CardContent>
      <CardFooter className="pt-3 flex justify-center">
        <Button className="w-28 h-9 " disabled size="lg"></Button>
      </CardFooter>
    </Card>
  );
}
