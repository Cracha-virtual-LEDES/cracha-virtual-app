import { getData } from "src/app/lib/actions";

import TableCrachas from "src/components/TableCrachas";

import Image from "next/image";
import styles from "./page.module.css";

import Link from "next/link";
import logo from "../../../../public/ledes.png";

export default async function GerenciaCracha() {
  const crachas = await getData();

  return (
    <div className={styles.main}>
      <Link href={"/cracha"}>
        <Image
          className={styles.logo}
          src={logo}
          width={212}
          height={172}
          alt="Ledes"
        />
      </Link>
      <h1>Crachás</h1>
      <TableCrachas data={crachas} />
    </div>
  );
}
