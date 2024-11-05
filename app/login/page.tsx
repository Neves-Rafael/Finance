import { SignInButton } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import Image from "next/image";
import { redirect } from "next/navigation";
import { Button } from "../_components/ui/button";

export default async function LoginPage() {
  const { userId } = await auth();

  if (userId) {
    redirect("/");
  }

  return (
    <div className="grid h-full grid-cols-2">
      <div className="m-auto flex max-w-[500px] flex-col justify-center">
        <Image src="/logo.svg" width={200} height={40} alt="Finance logo" className="mb-8" />
        <h1 className="mb-3 font-bold text-4xl">Bem-Vindo</h1>

        <p className="mb-8 text-lg text-muted-foreground">
          A Finance AI é uma plataforma de gestão financeira que utiliza IA para monitorar suas
          movimentações, e oferecer insights personalizados, facilitando o controle do seu
          orçamento.
        </p>

        <SignInButton>
          <Button variant={"outline"}>
            <Image src="/google-icon.svg" alt="login com o google" width={24} height={24} />
            Entrar com google
          </Button>
        </SignInButton>
      </div>

      <div className="relative h-full w-full overflow-hidden">
        <Image src="/login.png" alt="Faça login" fill className="object-cover" />
      </div>
    </div>
  );
}
