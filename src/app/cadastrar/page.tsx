"use client";

import { useForm } from "react-hook-form";
import styles from "./page.module.css";
import Link from "next/link";
import { useContext } from "react";
import { AuthContext } from "src/context/AuthContext";

type FormInput = {
  name: string;
  CPF: string;
  email: string;
  password: string;
  passwordVerify: string;
  role: string;
  photoPath: string;
};

const toBase64 = (file: any) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
  });

// TODO: validar fomrulario
export default function Home() {
  // const { isAuthenticaded} = useContext(AuthContext);
  const { register, handleSubmit } = useForm<FormInput>();

  const handleRegister = async (data: FormInput) => {
    console.log(data.photoPath);
    const photoPath = await toBase64(data.photoPath[0]);

    await fetch("http://localhost:3000/api/user", {
      method: "POST",
      body: JSON.stringify({
        pessoa: { ...data, photoPath: undefined, passwordVerify: undefined },
        cracha: { photoPath: photoPath },
      }),
    });
  };

  return (
    <>
      <div className={styles.mainLogin}>
        <div className={styles.rightLogin}>
          <div className={styles.cardLogin}>
            <h1>Cadastro</h1>
            <div className={styles.textfield}>
              <label>Nome completo</label>
              <input type="text" placeholder="Usuário" {...register("name")} />
            </div>
            <div className={styles.textfield}>
              <label>CPF</label>
              <input type="text" placeholder="Usuário" {...register("CPF")} />
            </div>
            <div className={styles.textfield}>
              <label>Cargo</label>
              <input type="text" placeholder="Usuário" {...register("role")} />
            </div>
            <div className={styles.textfield}>
              <label>Foto</label>
              <input
                type="file"
                placeholder="Usuário"
                {...register("photoPath")}
              />
            </div>
            <div className={styles.textfield}>
              <label>E-mail</label>
              <input
                type="email"
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
            <div className={styles.textfield}>
              <label>Confirme a senha</label>
              <input
                type="password"
                placeholder="Senha"
                {...register("passwordVerify")}
              />
            </div>
            <button
              className={styles.btnLogin}
              onClick={() => handleSubmit(handleRegister)()}
            >
              Cadastrar
            </button>
            <Link href="/" style={{ color: "white" }}>
              Fazer login
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
