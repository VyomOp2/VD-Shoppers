"use client";

import { Button } from "@/components/ui/button";
import { CellAction } from "@/app/(dashboard)/[storeId]/(routes)/billboards/components/cell-actions";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type BillboardCloumn = {
	id: string;
	label: string;
	createdAt: string;
};

export const columns: ColumnDef<BillboardCloumn>[] = [
	{
		accessorKey: "label",
		header: ({ column }) => {
			return (
			  <Button
				variant="ghost"
				onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
			  >
				Label
				<ArrowUpDown className="ml-2 h-4 w-4" />
			  </Button>
			)
		  },
	},
	{
		accessorKey: "createdAt",
		header: ({ column }) => {
			return (
			  <Button
				variant="ghost"
				onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
			  >
				Date
				<ArrowUpDown className="ml-2 h-4 w-4" />
			  </Button>
			)
		  },
	},
	{
		id : "actions",
		cell : ({ row }) => <CellAction data={row.original} />
	}
];
