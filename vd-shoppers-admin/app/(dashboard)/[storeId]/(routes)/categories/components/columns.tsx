"use client";

import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react"
import { CellAction_categories } from "@/app/(dashboard)/[storeId]/(routes)/categories/components/cell-actions";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type CategoryColumn = {
	id: string;
	name: string;
	billboardLabel: string; 
	createdAt: string;
};

export const columns: ColumnDef<CategoryColumn>[] = [
	{
		accessorKey: "name",
		header: ({ column }) => {
			return (
			  <Button
				variant="ghost"
				onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
			  >
				Name
				<ArrowUpDown className="ml-2 h-4 w-4" />
			  </Button>
			)
		  },
	},
	{
		accessorKey: "billboard",
		header: ({ column }) => {
			return (
			  <Button
				variant="ghost"
				onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
			  >
				Billboard
				<ArrowUpDown className="ml-2 h-4 w-4" />
			  </Button>
			)
		  },
		  cell : ({ row }) => row.original.billboardLabel,
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
		cell : ({ row }) => <CellAction_categories data_categories={row.original} />
	}
];
