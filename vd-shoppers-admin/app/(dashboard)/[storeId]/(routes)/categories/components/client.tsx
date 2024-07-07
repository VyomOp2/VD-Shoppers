"use client";

import { useParams, useRouter } from "next/navigation";
import { Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { CategoryColumn, columns } from "./columns";
import { DataTable } from "@/components/ui/data-table";
import { ApiList } from "@/components/ui/api-list";

interface CategoryClientProps {
	data: CategoryColumn[];
}

export const CategoryClient: React.FC<CategoryClientProps> = ({ data }) => {
	const router = useRouter();
	const params = useParams();

	return (
		<>
			<div className="flex items-center justify-between mr-4">
				<Heading
					title={`Categories (${data.length})`}
					description="Manage your Categories"
				/>
				<Button
					onClick={() =>
						router.push(`/${params.storeId}/categories/new`)
					}
				>
					<Plus className="mr-2 h-5 w-5" />
					Add New
				</Button>
			</div>
			<Separator />
			<DataTable searchKey="name" columns={columns} data={data} />
			<Heading title="API" description="API Calls for Categories" />
			<Separator />
			<ApiList entityName="categories" entityIdName="categoryId" />
		</>
	);
};
