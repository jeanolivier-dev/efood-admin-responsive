import HydrogenLayout from "@/components/layouts/layout";
import PageHeader from "@/components/page-header";
import Link from "next/link";
import { Button } from "rizzui";
import { PiPlusBold } from "react-icons/pi";
import UsersList from "./UsersList";

const pageHeader = {
  title: "Utilisateurs",
  breadcrumb: [
    {
      name: "Tableau de bord",
      href: "/",
    },
    {
      name: "Utilisateurs",
    },
  ],
};

export default function UsersPage() {
  return (
    <HydrogenLayout>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb}>
        <div className="mt-4 flex items-center gap-3 @lg:mt-0">
          <Link href={"/utilisateurs/create"} className="w-full @lg:w-auto">
            <Button as="span" className="w-full @lg:w-auto">
              <PiPlusBold className="me-1.5 h-[17px] w-[17px]" />
              Ajouter un utilisateur
            </Button>
          </Link>
        </div>
      </PageHeader>
      <UsersList />
    </HydrogenLayout>
  );
}
