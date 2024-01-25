import { redirect } from "next/navigation";
import { cookies } from "next/headers";

export default async function Cracha() {
  await getServersideProps();
  return (
    <>
      <h1>Crachá</h1>
    </>
  );
}

async function getServersideProps() {
  const token = cookies().get("token");
  console.log(token);
  if (!token) {
    redirect("/");
  }
}
