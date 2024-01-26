"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";

import { useRouter } from "next/navigation";
import styles from "./page.module.css";

type FormInput = {
  name?: string;
  CPF?: string;
  email?: string;
  password?: string;
  passwordVerify?: string;
  role?: string;
  photoPath?: string;
};

interface Props {
  user: FormInput;
}

const toBase64 = (file: any) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
  });

export default async function EditForm({ user }: Props) {
  const { register, handleSubmit, setValue } = useForm<FormInput>();
  const router = useRouter();

  const verifyPhoto = async (data: any) => {
    if (data !== undefined && data !== null) {
      return await toBase64(data);
    }
    return "";
  };

  const handleEdit = async (data: FormInput) => {
    if (data.password !== data.passwordVerify)
      alert("As senhas não estão iguais");

    const photo = await verifyPhoto(data.photoPath?.[0]);
    const res = await fetch(`${process.env.API_URL}/api/user`, {
      method: "PUT",
      body: JSON.stringify({
        ...data,
        photoPath: undefined,
        passwordVerify: undefined,
      }),
    });

    if (res.ok) {
      window.location.href = "/cracha";
    }
  };

  useEffect(() => {
    setValue("name", user.name as string);
    setValue("CPF", user.CPF as string);
    setValue("email", user.email as string);
    setValue("role", user.role as string);
  }, [setValue]);

  return (
    <>
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.card}>
            <div className={styles.title}>Editar cadastro</div>
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
              onClick={() => handleSubmit(handleEdit)()}
            >
              Enviar
            </button>
            <button
              className={styles.btnLogin}
              onClick={() => router.push("/cracha")}
            >
              Cancelar
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
