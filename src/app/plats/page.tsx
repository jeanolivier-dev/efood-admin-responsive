import HydrogenLayout from "@/components/layouts/layout";
import Link from "next/link";
import { PiPlusBold } from "react-icons/pi";
import { Button } from "rizzui";
import PageHeader from "@/components/page-header";
import DishesList from "@/app/plats/DishesList";
import { db } from "@/database/dbConnection";
import { Dishes } from "@/database/schema";

const pageHeader = {
  title: "Plats",
  breadcrumb: [
    {
      name: "Tableau de bord",
      href: "/",
    },
    {
      name: "Plats",
    },
  ],
};

export default async function DishesPage() {
  const dishes = await db.select().from(Dishes);

  return (
    <HydrogenLayout>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb}>
        <div className="mt-4 flex items-center gap-3 @lg:mt-0">
          <Link href={"/plats/create"} className="w-full @lg:w-auto">
            <Button as="span" className="w-full @lg:w-auto">
              <PiPlusBold className="me-1.5 h-[17px] w-[17px]" />
              Ajouter un plat
            </Button>
          </Link>
        </div>
      </PageHeader>
      <DishesList dishes={dishes} />
    </HydrogenLayout>
  );
}
