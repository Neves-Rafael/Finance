import Image from "next/image";
import { Button } from "../_components/ui/button";

export default function LoginPage() {
  return (
    <div className="grid h-full grid-cols-2">
      <div className="m-auto flex max-w-[500px] flex-col justify-center">
        <Image src="/logo.svg" width={200} height={40} alt="Finance logo" className="mb-8" />
        <h1 className="font-bold text-4xl mb-3">Bem-Vindo</h1>

        <p className="text-muted-foreground text-lg mb-8">
          A Finance AI é uma plataforma de gestão financeira que utiliza IA para monitorar suas
          movimentações, e oferecer insights personalizados, facilitando o controle do seu
          orçamento.
        </p>

        <Button variant={"outline"}>
          <Image src="/google-icon.svg" alt="login com o google" width={24} height={24} />
          Entrar com google
        </Button>
      </div>

      <div className="relative h-full w-full bg-red-600 overflow-hidden">
        <Image src="/login.png" alt="Faça login" fill className="object-cover" />
      </div>
    </div>
  );
}
