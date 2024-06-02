import Link from "next/link";
import { Button } from "@/components/ui/button";
import { PiPlusBold } from "react-icons/pi";
import {
  Card,
  CardDescription,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import HydrogenLayout from "@/components/layouts/layout";

import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function Home() {
  return (
    <HydrogenLayout>
      <div className="pb-4">
        <Card className="sm:col-span-2" x-chunk="dashboard-05-chunk-0">
          <CardHeader className="pb-3">
            <CardTitle>Bonjour 👋🏼 !</CardTitle>
            <CardDescription className="max-w-lg text-balance leading-relaxed">
              Voici ce qui se passe dans votre restaurant aujourd&apos;hui.
              Consultez les statistiques immédiatement.
            </CardDescription>
          </CardHeader>
          <CardFooter>
            <Link href={"/plats/create"}>
              <Button>
                <PiPlusBold className="me-1.5 h-[17px] w-[17px]" />
                Ajouter un plat
              </Button>
            </Link>
          </CardFooter>
        </Card>
      </div>
      <div className="pb-4 grid gap-4 sm:grid-cols-2 ">
        <Card x-chunk="dashboard-05-chunk-1">
          <CardHeader className="pb-2">
            <CardDescription>Cette semaine</CardDescription>
            <CardTitle className="text-4xl">502 500 CFA</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-xs text-muted-foreground">
              +25% par rapport à la semaine dernière
            </div>
          </CardContent>
          <CardFooter>
            <Progress value={25} aria-label="25% increase" />
          </CardFooter>
        </Card>
        <Card x-chunk="dashboard-05-chunk-2">
          <CardHeader className="pb-2">
            <CardDescription>Ce mois</CardDescription>
            <CardTitle className="text-4xl">2 535 500 CFA</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-xs text-muted-foreground">
              +10% par rapport au mois dernier
            </div>
          </CardContent>
          <CardFooter>
            <Progress value={12} aria-label="12% increase" />
          </CardFooter>
        </Card>
      </div>
      <div>
        <Card>
          <CardHeader>
            <CardTitle>Commandes</CardTitle>
            <CardDescription>
              Commandes récentes de votre restaurant.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Client</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="hidden md:table-cell">Date</TableHead>
                  <TableHead className="text-right">Montant</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow className="bg-accent">
                  <TableCell>
                    <div className="font-medium">Table 4</div>
                  </TableCell>
                  <TableCell>
                    <Badge className="text-xs" variant="secondary">
                      Payé
                    </Badge>
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    2023-06-23
                  </TableCell>
                  <TableCell className="text-right">25000 CFA</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <div className="font-medium">Table 1</div>
                  </TableCell>
                  <TableCell>
                    <Badge className="text-xs" variant="outline">
                      Service en cours
                    </Badge>
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    2023-06-24
                  </TableCell>
                  <TableCell className="text-right">15000 CFA</TableCell>
                </TableRow>
                {/* <TableRow>
                          <TableCell>
                            <div className="font-medium">Liam Johnson</div>
                            <div className="hidden text-sm text-muted-foreground md:inline">
                              liam@example.com
                            </div>
                          </TableCell>
                          <TableCell className="hidden sm:table-cell">
                            Sale
                          </TableCell>
                          <TableCell className="hidden sm:table-cell">
                            <Badge className="text-xs" variant="secondary">
                              Fulfilled
                            </Badge>
                          </TableCell>
                          <TableCell className="hidden md:table-cell">
                            2023-06-23
                          </TableCell>
                          <TableCell className="text-right">$250.00</TableCell>
                        </TableRow> */}
                <TableRow>
                  <TableCell>
                    <div className="font-medium">Table 6</div>
                  </TableCell>

                  <TableCell>
                    <Badge className="text-xs" variant="secondary">
                      Payé
                    </Badge>
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    2023-06-25
                  </TableCell>
                  <TableCell className="text-right">8000 CFA</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <div className="font-medium">Table 8</div>
                  </TableCell>
                  <TableCell>
                    <Badge className="text-xs" variant="secondary">
                      Payé
                    </Badge>
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    2023-06-23
                  </TableCell>
                  <TableCell className="text-right">45000 CFA</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </HydrogenLayout>
  );
}
