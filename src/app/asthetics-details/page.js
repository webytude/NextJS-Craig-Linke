"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Aesthetics() {
  const router = useRouter();

  useEffect(() => {
    router.replace('/asthetics-details/new-heritage')
  }, [router])
}
