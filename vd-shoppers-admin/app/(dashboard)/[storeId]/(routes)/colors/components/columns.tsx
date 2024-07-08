"use client";

import { Button } from "@/components/ui/button";
import { CellAction } from "@/app/(dashboard)/[storeId]/(routes)/colors/components/cell-actions";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type ColorColumn = {
	id: string;
	name: string;
	value: string;
	createdAt: string;
};

export const columns: ColumnDef<ColorColumn>[] = [
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
		accessorKey: "value",
		header: ({ column }) => {
			return (
			  <Button
				variant="ghost"
				onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
			  >
				Value
				<ArrowUpDown className="ml-2 h-4 w-4" />
			  </Button>
			)
		  },
		cell: ({ row }) => (
			<div className="flex items-center gap-z-2">
				{row.original.value}
				<div
					className="h-6 w-6 rounded-full border"
					style={{ backgroundColor : row.original.value }}
				/>
			</div>
		)
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
