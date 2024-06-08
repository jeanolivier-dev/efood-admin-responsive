import HydrogenLayout from "@/components/layouts/layout";
import PageHeader from "@/components/page-header";
import Link from "next/link";
import { Button } from "rizzui";
import CreateTable from "./CreateTable";

const pageHeader = {
  title: "Ajouter une table",
  breadcrumb: [
    {
      href: "/",
      name: "Tableau de bord",
    },
    {
      href: "/tables",
      name: "Tables",
    },
    {
      name: "Ajouter une table",
    },
  ],
};

export default function CreateTablePage() {
  return (
    <HydrogenLayout>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb}>
        <Link href="/tables" className="mt-4 w-full @lg:mt-0 @lg:w-auto">
          <Button as="span" className="w-full @lg:w-auto" variant="outline">
            Annuler
          </Button>
        </Link>
      </PageHeader>
      <CreateTable />
    </HydrogenLayout>
  );
}
