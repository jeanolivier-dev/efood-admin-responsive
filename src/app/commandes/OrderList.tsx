import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { MoreHorizontal } from "lucide-react";

export default function OrderList() {
  const date = new Date();
  const order = [
    {
      id: 1,
      customers: "Table 4",
      status: "Servi",
      created_at: date.toDateString(),
      amount: 2500,
    },
    {
      id: 2,
      customers: "Table 1",
      status: "Service en cours",
      created_at: date.toDateString(),
      amount: 9500,
    },
    {
      id: 3,
      customers: "Table 3",
      status: "Payé",
      created_at: date.toDateString(),
      amount: 2500,
    },
    {
      id: 4,
      customers: "Table 6",
      status: "Cuisson en cours",
      created_at: date.toDateString(),
      amount: 12000,
    },
  ];

  return (
    <Card>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Client</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="hidden md:table-cell">Date</TableHead>
              <TableHead>Montant</TableHead>
              <TableHead className="sr-only">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {order.map(({ id, customers, status, created_at, amount }) => (
              <TableRow key={id} className="bg-accent">
                <TableCell>
                  <div className="font-medium">{customers}</div>
                </TableCell>
                <TableCell>
                  <Badge className="text-xs" variant="outline">
                    {status}
                  </Badge>
                </TableCell>
                <TableCell className="hidden md:table-cell">
                  {created_at}
                </TableCell>
                <TableCell>{amount} CFA</TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button aria-haspopup="true" size="icon" variant="ghost">
                        <MoreHorizontal className="h-4 w-4" />
                        <span className="sr-only">Toggle menu</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="bg-white">
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <Link href="#">
                        <DropdownMenuItem className="hover:bg-anzac-500 hover:text-white rounded-md">
                          Voir
                        </DropdownMenuItem>
                      </Link>
                      <Link href="#">
                        <DropdownMenuItem className="hover:bg-anzac-500 hover:text-white rounded-md">
                          Modifier
                        </DropdownMenuItem>
                      </Link>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}

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
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
