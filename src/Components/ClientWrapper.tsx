"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Loader from "@/Components/Loader";

export default function ClientWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const timeout = setTimeout(() => {
      setLoading(false);
    }, 600); // Adjust timing if needed

    return () => clearTimeout(timeout);
  }, [pathname]);

  return (
    <>
      <Loader show={loading} />
      {children}
    </>
  );
}
