import HydrogenLayout from "@/components/layouts/layout";
import Link from "next/link";
import { PiPlusBold } from "react-icons/pi";
import { Button } from "rizzui";
import PageHeader from "@/components/page-header";
import TablesList from "./TablesList";

const pageHeader = {
  title: "Tables",
  breadcrumb: [
    {
      name: "Tableau de bord",
      href: "/",
    },
    {
      name: "Tables",
    },
  ],
};

export default function TablePage() {
  return (
    <HydrogenLayout>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb}>
        <div className="mt-4 flex items-center gap-3 @lg:mt-0">
          <Link href={"/tables/create"} className="w-full @lg:w-auto">
            <Button as="span" className="w-full @lg:w-auto">
              <PiPlusBold className="me-1.5 h-[17px] w-[17px]" />
              Ajouter une table
            </Button>
          </Link>
        </div>
      </PageHeader>
      <TablesList />
    </HydrogenLayout>
  );
}
