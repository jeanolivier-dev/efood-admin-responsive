import Link from "next/link";
import HydrogenLayout from "@/components/layouts/layout";
import PageHeader from "@/components/page-header";
import { Button } from "rizzui";
import CreateDishe from "@/app/plats/create/CreateDishe";
import { db } from "@/database/dbConnection";
import { Menu } from "@/database/schema";

const pageHeader = {
  title: "Ajouter un plat",
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

export default async function CreateDishePage() {
  const menu = await db.select().from(Menu);

  return (
    <>
      <HydrogenLayout>
        <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb}>
          <Link href="/plats" className="mt-4 w-full @lg:mt-0 @lg:w-auto">
            <Button as="span" className="w-full @lg:w-auto" variant="outline">
              Annuler
            </Button>
          </Link>
        </PageHeader>

        <CreateDishe menu={menu} />
      </HydrogenLayout>
    </>
  );
}
