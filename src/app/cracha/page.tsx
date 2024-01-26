import { getCrachaFromPessoa, getUser } from "src/app/lib/actions";
import CardCracha from "src/components/CardCracha";

export default async function Cracha() {
  const cracha = await getCrachaFromPessoa();
  const user = await getUser();

  return (
    <>
      <CardCracha cracha={cracha} user={user} />
    </>
  );
}
