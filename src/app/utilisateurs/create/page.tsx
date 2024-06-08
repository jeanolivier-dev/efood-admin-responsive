import HydrogenLayout from "@/components/layouts/layout";
import PageHeader from "@/components/page-header";
import CreateUser from "./CreateUser";
import Link from "next/link";
import { Button } from "rizzui";

const pageHeader = {
  title: "Créer un utilisateur",
  breadcrumb: [
    {
      href: "/",
      name: "Tableau de bord",
    },
    {
      href: "/utilisateurs",
      name: "Utilisateurs",
    },
    {
      name: "Ajouter un utilisateur",
    },
  ],
};
export default function CreateUserPage() {
  return (
    <HydrogenLayout>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb}>
        <Link href="/utilisateurs" className="mt-4 w-full @lg:mt-0 @lg:w-auto">
          <Button as="span" className="w-full @lg:w-auto" variant="outline">
            Annuler
          </Button>
        </Link>
      </PageHeader>
      <CreateUser />
    </HydrogenLayout>
  );
}
