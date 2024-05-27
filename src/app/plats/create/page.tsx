import Link from "next/link";
import HydrogenLayout from "@/components/layouts/layout";
import { PiPlusBold } from "react-icons/pi";
import PageHeader from "@/components/page-header";
import { Button } from "rizzui";
import CreateDishe from "@/app/plats/create/CreateDishe";

const pageHeader = {
  title: "Create Product",
  breadcrumb: [
    {
      href: "/",
      name: "Tableau de bord",
    },
    {
      href: "/plats",
      name: "Plats",
    },
    {
      name: "Ajouter un plat",
    },
  ],
};

export default function CreateDishePage() {
  return (
    <>
      <HydrogenLayout>
        <PageHeader title="Créer un plat" breadcrumb={pageHeader.breadcrumb}>
          <Link href="/plats" className="mt-4 w-full @lg:mt-0 @lg:w-auto">
            <Button as="span" className="w-full @lg:w-auto" variant="outline">
              Annuler
            </Button>
          </Link>
        </PageHeader>

        <CreateDishe />
      </HydrogenLayout>
    </>
  );
}
