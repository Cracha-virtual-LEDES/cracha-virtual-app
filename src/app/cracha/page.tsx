"use client";

import { redirect } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import Image from "next/image";
import GridLoader from "react-spinners/GridLoader";

import styles from "./page.module.css";
import { AuthContext } from "src/context/AuthContext";

interface ICrachaProps {
  id: number;
  expirationDate: string;
  pessoaId: number;
  verified: boolean;
  photoPath: string;
}

export default function Cracha() {
  const { user, isAuthenticaded, signOut } = useContext(AuthContext);
  const [cracha, setCracha] = useState<ICrachaProps | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isAuthenticaded) {
      redirect("/");
    }
  }, [isAuthenticaded]);

  useEffect(() => {
    fetch("http://localhost:3000/api/cracha", {
      method: "GET",
    }).then((response) => {
      response.json().then((data) => {
        setCracha(data?.cracha);
        setLoading(false);
      });
    });
  }, []);

  const handleSignOut = async () => {
    await signOut();
  };

  return (
    <>
      {loading && (
        <div className={styles.main}>
          <div className={styles.rightLogin}>
            <GridLoader
              color={"#fff"}
              loading={loading}
              size={30}
              aria-label="Loading Spinner"
              data-testid="loader"
            />
          </div>
        </div>
      )}

      {!loading && (
        <div className={styles.main}>
          <div className={styles.rightLogin}>
            <div className={styles.card}>
              <Image
                src={cracha?.photoPath as string}
                alt="foto-cracha"
                width={80}
                height={80}
              />
              <h1>{user?.name}</h1>
              <h2>{user?.role}</h2>
              <p>
                {(() => {
                  const date = new Date(cracha?.expirationDate as string);
                  return `${date.getDate().toString().padStart(2, "0")}/${(
                    date.getMonth() + 1
                  )
                    .toString()
                    .padStart(2, "0")}/${date.getFullYear()}`;
                })()}
              </p>
              <h1>{cracha?.verified}</h1>
              <button
                className={styles.btnLogin}
                // onClick={() => handleSubmit(handleRegister)()}
              >
                Editar
              </button>
              <button
                className={styles.btnLogin}
                onClick={() => handleSignOut()}
              >
                Sair
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
