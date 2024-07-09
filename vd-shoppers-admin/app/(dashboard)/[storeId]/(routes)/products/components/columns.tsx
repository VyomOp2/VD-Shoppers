"use client";

import { Button } from "@/components/ui/button";

import { CellAction } from "@/app/(dashboard)/[storeId]/(routes)/products/components/cell-actions";

import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type ProductColumn = {
	id: string;
	name: string;
	price: string
	size: string
	color: string
	category: string
	isFeatured: boolean
	isArchived: boolean
	createdAt: string;
};

export const columns: ColumnDef<ProductColumn>[] = [
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
		accessorKey: "category",
		header: ({ column }) => {
			return (
			  <Button
				variant="ghost"
				onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
			  >
				Category
				<ArrowUpDown className="ml-2 h-4 w-4" />
			  </Button>
			)
		  },
	},
	{
		accessorKey: "price",
		header: ({ column }) => {
			return (
			  <Button
				variant="ghost"
				onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
			  >
				Price
				<ArrowUpDown className="ml-2 h-4 w-4" />
			  </Button>
			)
		  },
	},
	{
		accessorKey: "size",
		header: ({ column }) => {
			return (
			  <Button
				variant="ghost"
				onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
			  >
				Size
				<ArrowUpDown className="ml-2 h-4 w-4" />
			  </Button>
			)
		  },
	},
	{
		accessorKey: "color",
		header: "Color",
		cell: ({ row }) => (
			<div className="flex items-center gap-x-2">
				{row.original.color}
				<div
					className="h-6 w-6 rounded-full border"
					style={{ backgroundColor: row.original.color }}
				/>
			</div>
		)
	},
	{
		accessorKey: "isArchived",
		header: "Archived"
	},
	{
		accessorKey: "isFeatured",
		header: "Featured"
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
