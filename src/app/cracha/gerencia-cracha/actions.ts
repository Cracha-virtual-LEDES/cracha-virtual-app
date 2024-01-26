"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export interface IDataProps {
  id: number;
  name: string;
  email: string;
  CPF: string;
  role: string;
  cracha: {
    id: number;
    verified: boolean;
    expirationDate: string;
    photoPath: string;
  };
}

export async function verifyUser() {
  const nextCookies = cookies();
  const res = await fetch("http://localhost:3000/api/token", {
    method: "GET",
    headers: { Cookie: nextCookies.toString() },
  });

  if (!res.ok) {
    redirect("/");
  }
  const { data } = await res.json();
  if (!data.isAdmin) {
    redirect("/cracha");
  }
}

export async function getData(): Promise<IDataProps[]> {
  await verifyUser();

  const nextCookies = cookies();
  const res = await fetch("http://localhost:3000/api/admin", {
    method: "GET",
    headers: { Cookie: nextCookies.toString() },
  });
  if (!res.ok) {
    console.log(res);

    redirect("/");
  }
  const data = await res.json();
  return data.pessoas;
}
