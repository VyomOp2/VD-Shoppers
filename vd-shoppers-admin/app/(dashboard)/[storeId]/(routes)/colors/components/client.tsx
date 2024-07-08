"use client";

import { useParams, useRouter } from "next/navigation";
import { Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { DataTable } from "@/components/ui/data-table";
import { ApiList } from "@/components/ui/api-list";
import { ColorColumn, columns } from "@/app/(dashboard)/[storeId]/(routes)/colors/components/columns";

interface ColorClientProps {
	data: ColorColumn[];
}

export const ColorClient: React.FC<ColorClientProps> = ({ data }) => {
	const router = useRouter();
	const params = useParams();

	return (
		<>
			<div className="flex items-center justify-between mr-4">
				<Heading
					title={`Colors (${data.length})`}
					description="Manage Colors for your Store"
				/>
				<Button
					onClick={() =>
						router.push(`/${params.storeId}/colors/new`)
					}
				>
					<Plus className="mr-2 h-5 w-5" />
					Add New
				</Button>
			</div>
			<Separator />
			<DataTable searchKey="name" columns={columns} data={data} />
			<Heading title="API" description="API Calls for Colors" />
			<Separator />
			<ApiList entityName="colors" entityIdName="colorId" />
		</>
	);
};
