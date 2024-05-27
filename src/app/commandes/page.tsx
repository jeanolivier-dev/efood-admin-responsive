import HydrogenLayout from "@/components/layouts/layout";
import Link from "next/link";
import { Button } from "rizzui";
import PageHeader from "@/components/page-header";
import { PiPlusBold } from "react-icons/pi";
import OrderList from "@/app/commandes/OrderList";

const pageHeader = {
  title: "Commandes",
  breadcrumb: [
    {
      name: "Tableau de bord",
      href: "/",
    },
    {
      name: "Commandes",
    },
  ],
};

export default function OrdersPage() {
  return (
    <HydrogenLayout>
      <PageHeader title="Commandes" breadcrumb={pageHeader.breadcrumb}>
        <div className="mt-4 flex items-center gap-3 @lg:mt-0">
          <Link href={"commandes/create"} className="w-full @lg:w-auto">
            <Button as="span" className="w-full @lg:w-auto">
              <PiPlusBold className="me-1.5 h-[17px] w-[17px]" />
              Ajouter une commande
            </Button>
          </Link>
        </div>
      </PageHeader>
      <OrderList />
    </HydrogenLayout>
  );
}
