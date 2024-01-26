"use client";

import NewReleasesIcon from "@mui/icons-material/NewReleases";
import VerifiedIcon from "@mui/icons-material/Verified";
import { redirect, useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import GridLoader from "react-spinners/GridLoader";

// import { Chip } from "@nextui-org/chip";

import { Avatar, Chip } from "@mui/material";
import { AuthContext } from "src/context/AuthContext";
import styles from "./page.module.css";

interface ICrachaProps {
  id: number;
  expirationDate: string;
  pessoaId: number;
  verified: boolean;
  photoPath: string;
}

export default function Cracha() {
  const { user, isAuthenticaded, signOut } = useContext(AuthContext);
  const router = useRouter();
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
        console.log(data?.cracha);
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
              <div className={styles.blob} />
              <div className={styles.title}>Crachá Ledes</div>
              <div className={styles.name}>{user?.name}</div>
              <Avatar
                src={cracha?.photoPath}
                sx={{ width: 100, height: 100 }}
              />
              <Chip
                label={user?.role}
                sx={{
                  backgroundColor: "#0099CB",
                  color: "#FFF",
                  margin: "10px",
                }}
              />
              <p>{user?.email}</p>
              <div>
                {cracha?.verified && (
                  <div className={styles.verified}>
                    Verificado
                    <VerifiedIcon sx={{ color: "#00CB14" }} />
                  </div>
                )}
                {!cracha?.verified && (
                  <div className={styles.verified}>
                    Verificado
                    <NewReleasesIcon sx={{ color: "#A8A8A8" }} />
                  </div>
                )}
              </div>
              <div>
                Validade:{" "}
                {(() => {
                  const date = new Date(cracha?.expirationDate as string);
                  return `${date.getDate().toString().padStart(2, "0")}/${(
                    date.getMonth() + 1
                  )
                    .toString()
                    .padStart(2, "0")}/${date.getFullYear()}`;
                })()}
              </div>
            </div>
            <div className={styles.action}>
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
            {user?.isAdmin && (
              <div className={styles.action}>
                <button
                  className={styles.btnCracha}
                  onClick={() => router.push("/cracha/gerencia-cracha")}
                >
                  Gerenciar Crachás
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
