import styles from "./page.module.css";

export default function Home() {
  return (
    <main className={styles.main}>
      <div className={styles.mainLogin}>
        <div className={styles.leftLogin}>
          <h1>
            Faça login teste
            <br />E entre para o nosso time
          </h1>
        </div>
        <div className={styles.rightLogin}>
          <div className={styles.cardLogin}>
            <h1>LOGIN</h1>
            <div className={styles.textfield}>
              <label>Usuário</label>
              <input type="text" name="usuario" placeholder="Usuário" />
            </div>
            <div className={styles.textfield}>
              <label>Senha</label>
              <input type="password" name="password" placeholder="Senha" />
            </div>
            <button className={styles.btnLogin}>Login</button>
          </div>
        </div>
      </div>
    </main>
  );
}
