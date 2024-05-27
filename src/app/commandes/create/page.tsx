import HydrogenLayout from "@/components/layouts/layout";
import PageHeader from "@/components/page-header";

const pageHeader = {
  title: "Commandes",
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
      name: "Ajouter une commande",
    },
  ],
};

export default function CreateOrderPage() {
  return (
    <HydrogenLayout>
      <PageHeader
        title={pageHeader.title}
        breadcrumb={pageHeader.breadcrumb}
      ></PageHeader>
    </HydrogenLayout>
  );
}
