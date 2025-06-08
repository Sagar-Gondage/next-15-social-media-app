import { redirect } from "next/navigation";

import { validateRequest } from "@/auth";

export default async function Layout({ children }) {
  const { user } = await validateRequest();

  if (user) redirect("/");

  return <>{children}</>;
}
