import HydrogenLayout from "@/components/layouts/layout";
import Link from "next/link";
import { PiPlusBold } from "react-icons/pi";
import { Button } from "rizzui";
import PageHeader from "@/components/page-header";
import MenuList from "./MenuList";

const pageHeader = {
  title: "Menu",
  breadcrumb: [
    {
      name: "Tableau de bord",
      href: "/",
    },
    {
      name: "Menu",
    },
  ],
};

export default function MenuPage() {
  return (
    <HydrogenLayout>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb}>
        <div className="mt-4 flex items-center gap-3 @lg:mt-0">
          <Link href={"/menu/create"} className="w-full @lg:w-auto">
            <Button as="span" className="w-full @lg:w-auto">
              <PiPlusBold className="me-1.5 h-[17px] w-[17px]" />
              Ajouter un menu
            </Button>
          </Link>
        </div>
      </PageHeader>
      <MenuList />
    </HydrogenLayout>
  );
}
