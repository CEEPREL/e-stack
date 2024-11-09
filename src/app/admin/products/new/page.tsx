import React from "react";
import PageHeader from "../_components/pageHeader";
import ProductForm from "./_components/productForm";

export default function page() {
  return (
    <>
      <PageHeader>Add New product</PageHeader>
      <ProductForm />
    </>
  );
}
