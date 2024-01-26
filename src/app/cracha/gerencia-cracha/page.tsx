import { getData } from "src/app/lib/actions";

import TableCrachas from "src/components/TableCrachas";

import styles from "./page.module.css";

export default async function GerenciaCracha() {
  const crachas = await getData();

  return (
    <div className={styles.main}>
      <div className={styles.logo} />
      <p>Crachás</p>
      <TableCrachas data={crachas} />
    </div>
  );
}
