"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { Header } from "@/components/header/Header";
import SignIn from "../(auth)/sign-in/page";
import { MainProductDispay } from "./containers/gridProduct";
export default function Page() {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Check the query parameter on initial load or router change
  useEffect(() => {
    if (router.query.signin) {
      setIsModalOpen(true);
    }
  }, [router.query]);

  const handleModalOpen = () => {
    setIsModalOpen(true);
    // Optionally, update the URL to include the query parameter
    router.push({ query: { ...router.query, signin: true } }, undefined, {
      shallow: true,
    });
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    // Optionally, remove the query parameter from the URL
    const { signin, ...rest } = router.query;
    router.push({ query: { ...rest } }, undefined, { shallow: true });
  };

  return (
    <>
      <Header handleclick={handleModalOpen} />
      <MainProductDispay />
      {isModalOpen && <SignIn onClose={handleModalClose} />}
    </>
  );
}
