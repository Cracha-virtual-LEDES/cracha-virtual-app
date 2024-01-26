import { redirect } from "next/navigation";
import FormLogin from "src/components/FormLogin";
import { getData } from "./lib/actions";

export default async function Home() {
  const user = await getData();
  if (!!user) {
    redirect("/cracha");
  }

  return <FormLogin />;
}
