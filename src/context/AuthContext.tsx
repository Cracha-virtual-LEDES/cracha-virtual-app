"use client";

import { createContext, useEffect, useState } from "react";
import { parseCookies, setCookie, destroyCookie } from "nookies";

type AuthContextType = {
  isAuthenticaded: boolean;
  user: User | null;
  signIn: (credentials: SignInCredentials) => Promise<void>;
  signOut: () => Promise<void>;
};

type SignInCredentials = {
  email: string;
  password: string;
};

type User = {
  id: number;
  name: string;
  email: string;
  role: string;
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
      fetch("http://localhost:3000/api/token", {
        method: "GET",
      }).then((res) => {
        res.json().then((data) => {
          setUser(data?.data);
        });
      });
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

  async function signOut() {
    destroyCookie(undefined, "token");
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ user, isAuthenticaded, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}
