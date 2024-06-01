"use client";

import Link from "next/link";
import { Input, Text, Password, Switch, Button } from "rizzui";

export default function SignUpForm() {
  return (
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
        <Password
          placeholder="Confirmez votre mot de passe"
          className="[&>label>span]:font-medium"
        />
        <div className="col-span-2 flex items-start pb-1 text-gray-700">
          <Switch
            className="[&>label>span.transition]:shrink-0 [&>label>span]:font-medium"
            label={
              <Text className="ps-1 text-gray-500">
                En vous inscrivant, vous acceptez nos{" "}
                <Link
                  href="/"
                  className="font-semibold text-gray-700 transition-colors hover:text-primary"
                >
                  Conditions
                </Link>{" "}
                &{" "}
                <Link
                  href="/"
                  className="font-semibold text-gray-700 transition-colors hover:text-primary"
                >
                  Politique de confidentialité
                </Link>
              </Text>
            }
          />
        </div>
        <Button className="w-full" color="primary">
          S&apos;inscrire
        </Button>
      </div>
    </form>
  );
}
