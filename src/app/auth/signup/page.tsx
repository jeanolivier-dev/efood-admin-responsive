import React from "react";
import SignUpForm from "./sign-up-form";
import AuthWrapper from "@/components/layouts/auth-layout/auth-wrapper";

export default function SignUpPage() {
  return (
    <AuthWrapper
      title={
        <>
          <span className="text-anzac-400 bg-clip-text text-transparent">
            Bienvenue
          </span>
          <br />
          Inscrivez vous pour profiter de notre menu digital
        </>
      }
      //isSocialLoginActive={true}
    >
      <SignUpForm />
    </AuthWrapper>
  );
}
