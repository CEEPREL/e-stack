// "use client";
import { useState } from "react";
import HomePage from "./(products)/page";
import { Header } from "@/components/header/Header";
import { MainProductDispay } from "./(products)/containers/gridProduct";

export default function Main() {
  return (
    <>
      <HomePage>
        <MainProductDispay />
      </HomePage>
    </>
  );
}
