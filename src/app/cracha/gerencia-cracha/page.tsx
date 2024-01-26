import TableCrachas from "src/components/TableCrachas";
import { getData } from "./actions";
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
