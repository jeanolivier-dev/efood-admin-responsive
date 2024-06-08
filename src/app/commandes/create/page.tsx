import HydrogenLayout from "@/components/layouts/layout";
import PageHeader from "@/components/page-header";
import Link from "next/link";
import { Button } from "rizzui";
import CreateOrder from "./CreateOrder";

const pageHeader = {
  title: "Créer une commande",
  breadcrumb: [
    {
      href: "/",
      name: "Tableau de bord",
    },
    {
      href: "/commandes",
      name: "Commandes",
    },
    {
      name: "Créer une commande",
    },
  ],
};

export default function CreateOrderPage() {
  return (
    <HydrogenLayout>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb}>
        <Link href="/commandes" className="mt-4 w-full @lg:mt-0 @lg:w-auto">
          <Button as="span" className="w-full @lg:w-auto" variant="outline">
            Annuler
          </Button>
        </Link>
      </PageHeader>
      <CreateOrder />
    </HydrogenLayout>
  );
}
