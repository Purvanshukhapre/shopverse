"use client";

import { useEffect, useState } from "react";
import Router from "next/router";
import Loading from "@/app/loading";

export default function NavigationLoader() {
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    const handleStart = () => setIsActive(true);
    const handleComplete = () => setIsActive(false);

    Router.events.on("routeChangeStart", handleStart);
    Router.events.on("routeChangeComplete", handleComplete);
    Router.events.on("routeChangeError", handleComplete);

    return () => {
      Router.events.off("routeChangeStart", handleStart);
      Router.events.off("routeChangeComplete", handleComplete);
      Router.events.off("routeChangeError", handleComplete);
    };
  }, []);

  if (!isActive) {
    return null;
  }

  return <Loading />;
}
