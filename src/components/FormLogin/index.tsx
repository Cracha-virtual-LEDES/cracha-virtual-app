"use client";

import Link from "next/link";
import { useContext, useEffect } from "react";
import { useForm } from "react-hook-form";
import { AuthContext } from "src/context/AuthContext";
import styles from "./page.module.css";

type FormInput = {
  email: string;
  password: string;
};

export default function FormLogin() {
  const { register, handleSubmit } = useForm<FormInput>();
  const { signIn } = useContext(AuthContext);

  useEffect(() => console.log(process.env.NEXT_PUBLIC_API_URL));

  const handleSignIn = async (data: FormInput) => {
    await signIn(data);
  };

  function submitForm(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    handleSubmit(handleSignIn)();
  }

  return (
    <>
      <div className={styles.mainLogin}>
        <div className={styles.background}>
          <div className={styles.rightLogin}>
            <form className={styles.cardLogin} onSubmit={submitForm}>
              <h1>LOGIN</h1>
              <div className={styles.textfield}>
                <label>E-mail</label>
                <input
                  type="text"
                  placeholder="Usuário"
                  {...register("email")}
                />
              </div>
              <div className={styles.textfield}>
                <label>Senha</label>
                <input
                  type="password"
                  placeholder="Senha"
                  {...register("password")}
                />
              </div>
              <button type="submit" className={styles.btnLogin}>
                Entrar
              </button>
              <Link href="/cadastrar" style={{ color: "white" }}>
                Cadastrar-se
              </Link>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
