"use client";

import NewReleasesIcon from "@mui/icons-material/NewReleases";
import VerifiedIcon from "@mui/icons-material/Verified";
import { Avatar, Chip } from "@mui/material";

import { useRouter } from "next/navigation";
import { useContext } from "react";
import { ICracha, IDataProps } from "src/app/lib/actions";
import { AuthContext } from "src/context/AuthContext";
import styles from "./page.module.css";

interface IUser extends IDataProps {
  isAdmin: boolean;
}

interface Props {
  cracha: ICracha;
  user: IUser;
}

export default async function CardCracha({ cracha, user }: Props) {
  const { signOut } = useContext(AuthContext);
  const router = useRouter();

  return (
    <div className={styles.main}>
      <div className={styles.rightLogin}>
        <div className={styles.card}>
          <div className={styles.blob} />
          <div className={styles.title}>Crachá Ledes</div>
          <div className={styles.name}>{user.name}</div>
          <Avatar src={cracha.photoPath} sx={{ width: 100, height: 100 }} />
          <Chip
            label={user.role}
            sx={{
              backgroundColor: "#0099CB",
              color: "#FFF",
              margin: "10px",
            }}
          />
          <p>{user.email}</p>
          <div>
            {cracha?.verified && (
              <div className={styles.verified}>
                Verificado
                <VerifiedIcon sx={{ color: "#0099CB" }} />
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
            onClick={() => router.push("/cracha/editar-cracha")}
          >
            Editar
          </button>
          <button
            className={styles.btnLogin}
            onClick={async () => await signOut()}
          >
            Sair
          </button>
        </div>
        {user.isAdmin && (
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
  );
}
