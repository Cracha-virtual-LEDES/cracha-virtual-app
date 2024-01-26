"use client";

import { useRouter } from "next/navigation";
import { destroyCookie, setCookie } from "nookies";
import { createContext } from "react";

type AuthContextType = {
  signIn: (credentials: SignInCredentials) => Promise<void>;
  signOut: () => Promise<void>;
};

type SignInCredentials = {
  email: string;
  password: string;
};

export const AuthContext = createContext({} as AuthContextType);

export default function AuthProvider({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const router = useRouter();

  async function signIn({ email, password }: SignInCredentials) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/login`, {
      method: "POST",
      body: JSON.stringify({ email, password }),
    });

    if (res.ok) {
      const { token } = await res.json();

      setCookie(undefined, "token", token, {
        maxAge: 60 * 60 * 1, // 1 hour
      });

      router.push("/cracha");
    }
  }

  async function signOut() {
    destroyCookie(undefined, "token");
    router.push("/");
  }

  return (
    <AuthContext.Provider value={{ signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}
