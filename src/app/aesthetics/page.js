"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Aesthetics() {
  const router = useRouter();

  useEffect(() => {
    router.replace('/aesthetics/new-heritage')
  }, [router])
}
