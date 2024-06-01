import HydrogenLayout from "@/components/layouts/layout";
import CreateMenu from "@/app/menu/create/CreateMenu";
import PageHeader from "@/components/page-header";
import { Button } from "rizzui";
import Link from "next/link";

const pageHeader = {
  title: "Créer un menu",
  breadcrumb: [
    {
      href: "/",
      name: "Tableau de bord",
    },
    {
      href: "/menu",
      name: "Menu",
    },
    {
      name: "Créer un menu",
    },
  ],
};

export default function CreateMenuPage() {
  return (
    <HydrogenLayout>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb}>
        <Link href="/menu" className="mt-4 w-full @lg:mt-0 @lg:w-auto">
          <Button as="span" className="w-full @lg:w-auto" variant="outline">
            Annuler
          </Button>
        </Link>
      </PageHeader>
      <CreateMenu />
    </HydrogenLayout>
  );
}
