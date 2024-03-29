"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export interface ICracha {
  id: number;
  verified: boolean;
  expirationDate: string;
  photoPath: string;
}

export interface IDataProps {
  id: number;
  name: string;
  email: string;
  CPF: string;
  role: string;
  cracha: ICracha;
}

export async function verifyUser() {
  const nextCookies = cookies();
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/token`, {
    method: "GET",
    headers: { Cookie: nextCookies.toString() },
  });
  if (!res.ok) return;

  const { data } = await res.json();
  if (!data.isAdmin) {
    redirect("/cracha");
  }
}

export async function getData(): Promise<IDataProps[]> {
  await verifyUser();

  const nextCookies = cookies();
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/admin`, {
    method: "GET",
    headers: { Cookie: nextCookies.toString() },
  });
  const data = await res.json();
  return data.pessoas;
}

export async function getCrachaFromPessoa(): Promise<ICracha> {
  const nextCookies = cookies();
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/cracha`, {
    method: "GET",
    headers: { Cookie: nextCookies.toString() },
    cache: "no-store",
  });
  if (!res.ok) {
    redirect("/");
  }
  const { cracha } = await res.json();
  return cracha;
}

export async function getUser() {
  const nextCookies = cookies();
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/token`, {
    method: "GET",
    headers: { Cookie: nextCookies.toString() },
    cache: "no-store",
  });
  if (!res.ok) {
    cookies().delete("token");
    redirect("/");
  }
  const { data } = await res.json();
  return data;
}
