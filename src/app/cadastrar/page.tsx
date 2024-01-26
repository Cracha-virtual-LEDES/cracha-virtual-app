"use client";

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import styles from "./page.module.css";

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

export default function Home() {
  const { register, handleSubmit } = useForm<FormInput>();
  const router = useRouter();

  const verifyPhoto = async (data: any) => {
    if (data !== undefined && data !== null) {
      return await toBase64(data);
    }
    return "";
  };

  const handleRegister = async (data: FormInput) => {
    const photoPath = await verifyPhoto(data.photoPath?.[0]);
    if (data.password !== data.passwordVerify)
      alert("As senhas não estão iguais");

    const res = await fetch(`${process.env.API_URL}/api/user`, {
      method: "POST",
      body: JSON.stringify({
        pessoa: { ...data, photoPath: undefined, passwordVerify: undefined },
        cracha: { photoPath: photoPath },
      }),
    });

    if (res.ok) {
      router.push("/");
    }
  };

  return (
    <>
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.card}>
            <div className={styles.title}>Crie a sua conta</div>
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
          </div>
          <div className={styles.action}>
            <button
              className={styles.btnLogin}
              onClick={() => handleSubmit(handleRegister)()}
            >
              Criar conta
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
