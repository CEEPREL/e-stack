"use client";

import { SectionContainer } from "@/app/components/section-container/section-container";
import { CardsContainer } from "../containers/cardContainer";

interface ParamsInterface {
  params: {
    category: string;
  };
}

export default function Category({ params }: ParamsInterface) {
  return (
    <SectionContainer>
      <CardsContainer params={params} />
    </SectionContainer>
  );
}
