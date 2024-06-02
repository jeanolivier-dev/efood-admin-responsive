"use client";
import authLogoImg from "@/app/assets/logo-e-food-orange.png";
import Image from "next/image";
import Link from "next/link";
import SearchWidget from "@/components/search/search";
import HeaderMenuRight from "@/components/layouts/header-menu-right";
import StickyHeader from "@/components/layouts/sticky-header";
import { ActionIcon, Title } from "rizzui";
import cn from "@/utils/class-names";
import { usePathname } from "next/navigation";
import { menuItems } from "@/components/layouts/menu-items";
import { Fragment, useState } from "react";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <div
        onClick={() => setIsOpen((prev) => !prev)}
        className={`bg-gray-900/50 ${
          isOpen ? "block" : "hidden"
        } fixed top-0 left-0 h-dvh w-screen z-50 cursor-pointer `}
      ></div>
      <MobileSidebar isOpen={isOpen} />
      <StickyHeader className="z-[40] 2xl:py-5 3xl:px-8  4xl:px-10">
        <div className="flex w-full max-w-2xl items-center">
          <ActionIcon
            aria-label="Open Sidebar Menu"
            variant="text"
            className={cn("me-3 h-auto w-auto p-0 sm:me-4 xl:hidden")}
            onClick={() => setIsOpen((prev) => !prev)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="h-6 w-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 6.75h16.5M3.75 12H12m-8.25 5.25h16.5"
              />
            </svg>
          </ActionIcon>
          <Link
            href={"/"}
            aria-label="Site Logo"
            className="me-4 shrink-0 text-gray-800 max-w-[120px] hover:text-gray-900 lg:me-5 xl:hidden"
          >
            <Image src={authLogoImg} alt="Isomorphic" className="dark:invert" />
          </Link>

          <SearchWidget />
        </div>

        <HeaderMenuRight />
      </StickyHeader>
    </>
  );
}

function MobileSidebar({ isOpen }: { isOpen: boolean }) {
  const pathname = usePathname();
  return (
    <aside
      className={`fixed z-[100] h-dvh top-0 left-0 w-[270px] border-e-2 backdrop-blur-xl bg-white border-gray-100  2xl:w-72 ${
        !isOpen ? "-translate-x-full" : "translate-x-0"
      } transition-all`}
    >
      <div className="sticky top-0 max-w-[180px] z-40 bg-gray-0/10 px-6 pb-5 pt-5 2xl:px-8 2xl:pt-6 dark:bg-gray-100/5">
        <Link
          href={"/"}
          aria-label="Site Logo"
          className="text-gray-800 hover:text-gray-900"
        >
          <Image src={authLogoImg} alt="Isomorphic" className="dark:invert" />
        </Link>
      </div>

      <div className="mt-4 pb-3 3xl:mt-6 z-50">
        {menuItems.map((item, index) => {
          const isActive = pathname === (item?.href as string);

          return (
            <Fragment key={item.name + "-" + index}>
              {item?.href ? (
                <>
                  <Link
                    href={item?.href}
                    className={cn(
                      "group relative mx-3 my-0.5 flex items-center justify-between rounded-md px-3 py-2 font-medium capitalize lg:my-1 2xl:mx-5 2xl:my-2",
                      isActive
                        ? "before:top-2/5 text-primary before:absolute before:-start-3 before:block before:h-4/5 before:w-1 before:rounded-ee-md before:rounded-se-md before:bg-primary 2xl:before:-start-5"
                        : "text-gray-700 transition-colors duration-200 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-700/90"
                    )}
                  >
                    <div className="flex items-center truncate">
                      {item?.icon && (
                        <span
                          className={cn(
                            "me-2 inline-flex h-5 w-5 items-center justify-center rounded-md [&>svg]:h-[20px] [&>svg]:w-[20px]",
                            isActive
                              ? "text-primary"
                              : "text-gray-800 dark:text-gray-500 dark:group-hover:text-gray-700"
                          )}
                        >
                          {item?.icon}
                        </span>
                      )}
                      <span className="truncate">{item.name}</span>
                    </div>
                  </Link>
                </>
              ) : (
                <Title
                  as="h6"
                  className={cn(
                    "mb-2 truncate px-6 text-xs font-normal uppercase tracking-widest text-gray-500 2xl:px-8",
                    index !== 0 && "mt-6 3xl:mt-7"
                  )}
                >
                  {item.name}
                </Title>
              )}
            </Fragment>
          );
        })}
      </div>
    </aside>
  );
}
