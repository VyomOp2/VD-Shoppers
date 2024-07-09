"use client";

import { useParams, useRouter } from "next/navigation";
import { Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { DataTable } from "@/components/ui/data-table";
import { ApiList } from "@/components/ui/api-list";

import { ProductColumn, columns } from "@/app/(dashboard)/[storeId]/(routes)/products/components/columns";


interface ProductClientProps {
	data: ProductColumn[];
}

export const ProductClient: React.FC<ProductClientProps> = ({ data }) => {
	const router = useRouter();
	const params = useParams();

	return (
		<>
			<div className="flex items-center justify-between mr-4">
				<Heading
					title={`Products (${data.length})`}
					description="Manage Products of your Store"
				/>
				<Button
					onClick={() =>
						router.push(`/${params.storeId}/products/new`)
					}
				>
					<Plus className="mr-2 h-5 w-5" />
					Add New
				</Button>
			</div>
			<Separator />
			<DataTable searchKey="name" columns={columns} data={data} />
			<Heading title="API" description="API Calls for Products" />
			<Separator />
			<ApiList entityName="products" entityIdName="productId" />
		</>
	);
};
