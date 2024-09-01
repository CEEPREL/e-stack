import Category from "./products/[category]/page";

interface ParamsInterface {
  params?: {
    category: string;
  };
}

export default function Main({ params }: ParamsInterface) {
  return (
    <>
      <Category params={{ category: "" }} />
    </>
  );
}
