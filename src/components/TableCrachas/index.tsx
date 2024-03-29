"use client";

import VerifiedIcon from "@mui/icons-material/Verified";

import Image from "next/image";
import { useEffect, useState } from "react";

import { IDataProps, getData } from "src/app/lib/actions";

import styles from "./page.module.css";

interface Props extends React.PropsWithChildren {
  data: IDataProps[];
}

export default function TableCrachas({ data }: Props) {
  const [crachas, setCrachas] = useState<IDataProps[]>([]);

  useEffect(() => {
    setCrachas(data);
  }, [data]);

  async function verificarCracha(id: number) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/admin`, {
      method: "PATCH",
      body: JSON.stringify({ id }),
    });
    if (!res.ok) {
      alert("erro");
      return;
    }
    const reloadCrachas = await getData();
    setCrachas(reloadCrachas);
  }

  return (
    <table className={styles.table}>
      <tbody>
        {crachas.map((item) => (
          <tr key={item.id}>
            <td className={styles.img}>
              <Image
                src={item.cracha.photoPath}
                width={40}
                height={40}
                alt={item.name}
              />
            </td>
            <td className={styles.name}>{item.name}</td>
            <td className={styles.email}>{item.email}</td>
            <td className={styles.cpf}>{item.CPF}</td>
            <td className={styles.role}>{item.role}</td>
            <td className={styles.expDate}>
              {Intl.DateTimeFormat("pt-BR").format(
                new Date(item.cracha.expirationDate)
              )}
            </td>
            <td className={styles.verified}>
              {item.cracha.verified ? (
                <VerifiedIcon sx={{ color: "#0099CB" }} />
              ) : (
                <button onClick={() => verificarCracha(item.cracha.id)}>
                  Aceitar
                </button>
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
