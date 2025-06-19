import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";

export default async function Dashboard() {
  const session = await getServerSession(authOptions);

  if (!session) {
    return <div>Please log in to access this page.</div>;
  }

  return <div>Welcome {session.user?.email}!</div>;
}
