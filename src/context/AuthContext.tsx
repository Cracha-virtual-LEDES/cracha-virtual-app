"use client";

import { createContext, useEffect, useState } from "react";
import { parseCookies, setCookie } from "nookies";

type AuthContextType = {
  isAuthenticaded: boolean;
  user: User | null;
  signIn: (credentials: SignInCredentials) => Promise<void>;
};

type SignInCredentials = {
  email: string;
  password: string;
};

type User = {
  id: number;
  name: string;
  email: string;
  isAdmin: boolean;
};

export const AuthContext = createContext({} as AuthContextType);

export default function AuthProvider({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [user, setUser] = useState<User | null>(null);
  const isAuthenticaded = !!user;

  useEffect(() => {
    const { token: token } = parseCookies();

    if (token) {
      // endpoint para validar o token e retornar dados do usuário
      // console.log("token", token);
    }
  }, []);

  async function signIn({ email, password }: SignInCredentials) {
    const res = await fetch("http://localhost:3000/api/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    });

    if (res.ok) {
      const { token } = await res.json();

      setCookie(undefined, "token", token, {
        maxAge: 60 * 60 * 1, // 1 hour
      });

      if (typeof window !== "undefined") {
        window.location.href = "/cracha";
      }
    }
  }

  return (
    <AuthContext.Provider value={{ user, isAuthenticaded, signIn }}>
      {children}
    </AuthContext.Provider>
  );
}
