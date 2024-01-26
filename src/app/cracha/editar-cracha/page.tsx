import { getUser } from "src/app/lib/actions";
import EditForm from "src/components/EditForm";

export default async function Home() {
  const user = await getUser();

  return <EditForm user={user} />;
}
