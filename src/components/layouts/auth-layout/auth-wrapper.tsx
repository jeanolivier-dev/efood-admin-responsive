"use client";

import Link from "next/link";
import Image from "next/image";
import authLogoImg from "@/app/assets/logo-e-food-orange.png";
import { Button, Title } from "rizzui";
import cn from "@/utils/class-names";
import { FcGoogle } from "react-icons/fc";
import { BsFacebook } from "react-icons/bs";
import OrSeparation from "./or-separation";

export default function AuthWrapper({
  children,
  title,
  isSocialLoginActive = false,
  isSignIn = false,
  className = "",
}: {
  children: React.ReactNode;
  title: React.ReactNode;
  isSocialLoginActive?: boolean;
  isSignIn?: boolean;
  className?: string;
}) {
  return (
    <>
      <div className="relative flex min-h-screen w-full flex-col justify-center bg-anzac-100 p-4 md:p-12 lg:p-28">
        <div
          className={cn(
            "mx-auto w-full max-w-md rounded-xl bg-white px-4 py-9 sm:px-6 md:max-w-xl md:px-10 md:py-12 lg:max-w-[700px] lg:px-16 xl:rounded-2xl 3xl:rounded-3xl dark:bg-gray-50",
            className
          )}
        >
          <div className="flex flex-col items-center">
            <Link
              href={"/"}
              className="mb-3 inline-block max-w-[200px] lg:mb-3"
            >
              <Image
                src={authLogoImg}
                alt="Isomorphic"
                className="dark:invert"
              />
            </Link>
            <Title
              as="h2"
              className="mb-7 text-center text-[26px] leading-snug md:text-3xl md:!leading-normal lg:mb-10 lg:text-4xl lg:leading-normal"
            >
              {title}
            </Title>
          </div>
          {isSocialLoginActive && (
            <>
              <div className="flex flex-col gap-4 pb-6 md:flex-row md:gap-6 md:pb-7">
                <Button className="h-11 w-full" variant="outline">
                  <BsFacebook className="me-2 h-5 w-5 shrink-0 text-primary" />
                  <span className="truncate">
                    S&apos;inscrire avec Facebook
                  </span>
                </Button>
                <Button variant="outline" className="h-11 w-full">
                  <FcGoogle className="me-2 h-5 w-5 shrink-0" />
                  <span className="truncate">S&apos;inscrire avec Google</span>
                </Button>
              </div>
              <OrSeparation
                title={`Ou, ${
                  isSignIn ? "Connectez-vous" : "Inscrivez-vous"
                } avec votre email`}
                isCenter
                className="mb-4"
              />
            </>
          )}
          {children}
        </div>
      </div>
    </>
  );
}
