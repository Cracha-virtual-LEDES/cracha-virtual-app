"use client";

import { redirect } from "next/navigation";
import { parseCookies } from "nookies";
import { useEffect } from "react";

export default function Cracha() {
  useEffect(() => {
    const { token: token } = parseCookies();
    if (!token) {
      redirect("/");
    }
  }, []);
  return (
    <>
      <h1>Crachá</h1>
    </>
  );
}
