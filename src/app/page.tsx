"use client";

import { useContext } from "react";
import styles from "./page.module.css";
import { useForm } from "react-hook-form";
import { AuthContext } from "src/context/AuthContext";

type FormInput = {
  email: string;
  password: string;
};

export default function Home() {
  const { register, handleSubmit } = useForm<FormInput>();
  const { signIn } = useContext(AuthContext);

  const handleSignIn = async (data: FormInput) => {
    await signIn(data);
    console.log(data);
  };

  return (
    <>
      <div className={styles.mainLogin}>
        <div className={styles.rightLogin}>
          <div className={styles.cardLogin}>
            <h1>LOGIN</h1>
            <div className={styles.textfield}>
              <label>E-mail</label>
              <input type="text" placeholder="Usuário" {...register("email")} />
            </div>
            <div className={styles.textfield}>
              <label>Senha</label>
              <input
                type="password"
                placeholder="Senha"
                {...register("password")}
              />
            </div>
            <button
              className={styles.btnLogin}
              onClick={() => handleSubmit(handleSignIn)()}
            >
              Entrar
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
