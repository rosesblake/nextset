import { Register } from "@/features/auth/pages/Register";
import { notFound } from "next/navigation";

export default async function RegisterPage({
  params,
}: {
  params: Promise<{ accountType: string }>;
}) {
  const { accountType } = await params;

  if (!["artist", "venue"].includes(accountType)) return notFound();

  return <Register accountType={accountType as "artist" | "venue"} />;
}
