import React from "react";
import Link from "next/link";
import { Input, Text, Button, Password, Switch } from "rizzui";

export default function LoginForm() {
  return (
    <>
      <form>
        <div className="space-y-5 lg:space-y-6">
          <Input
            type="email"
            label="Email"
            placeholder="Entrez votre email"
            className="[&>label>span]:font-medium"
          />
          <Password
            label="Mot de passe"
            placeholder="Entrez votre mot de passe"
            className="[&>label>span]:font-medium"
          />
          <div className="flex items-center justify-between lg:pb-2">
            <Switch label="Se souvenir de moi" />
            <Link
              href="#"
              className="h-auto p-0 text-sm font-semibold text-gray-600 underline transition-colors hover:text-anzac-400 hover:no-underline"
            >
              Mot de passe oublié?
            </Link>
          </div>

          <Button className="w-full" type="submit">
            Connectez-vous
          </Button>
        </div>
      </form>
      <Text className="mt-5 text-center text-[15px] leading-loose text-gray-500 md:mt-7 lg:mt-9 lg:text-base">
        Vous n&apos;avez pas de compte?{" "}
        <Link
          href="/auth/signup"
          className="font-semibold text-gray-700 transition-colors hover:text-anzac-400"
        >
          Inscrivez-vous
        </Link>
      </Text>
    </>
  );
}
