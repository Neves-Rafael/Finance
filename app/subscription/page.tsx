import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { Navbar } from "../_components/navbar";

export default async function SubscriptionPage() {
  const { userId } = await auth();
  if (!userId) {
    return redirect("/login");
  }
  return (
    <>
      <Navbar />
    </>
  );
}
