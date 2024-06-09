import LoginForm from "./login-form";
import AuthWrapper from "@/components/layouts/auth-layout/auth-wrapper";

export default function Login() {
  return (
    <AuthWrapper
      title={
        <>
          <span className="text-anzac-400 bg-clip-text text-transparent">
            Ravie de vous revoir !
          </span>{" "}
          <br />
          Connectez vous pour utiliser votre menu digital.
        </>
      }
      //isSignIn
      //isSocialLoginActive={true}
    >
      <LoginForm />
    </AuthWrapper>
  );
}
