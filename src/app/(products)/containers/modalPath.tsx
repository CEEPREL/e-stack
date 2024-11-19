// "use client";
// import SignIn from "@/app/(auth)/sign-in/page";
// import { Header } from "@/components/header/Header";
// import { usePathname, useRouter } from "next/navigation";
// import React from "react";
// import { ProductDisplay, getNewProducts } from "../page";

// export default function ModalPath() {
//   const router = useRouter();
//   const pathname = usePathname();
//   const isSignInPage = pathname === "/sign-in";

//   const closeModal = () => {
//     router.push("/"); // Navigate back to the homepage
//   };
//   return (
//     <div>
//       {isSignInPage && (
//         <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center">
//           <SignIn />
//           <button
//             onClick={closeModal}
//             className="absolute top-5 right-5 text-white bg-red-500 p-2 rounded"
//           >
//             Close
//           </button>
//         </div>
//       )}
//       <Header />
//       <ProductDisplay productsFetcher={getNewProducts} title="New" />
//     </div>
//   );
// }
