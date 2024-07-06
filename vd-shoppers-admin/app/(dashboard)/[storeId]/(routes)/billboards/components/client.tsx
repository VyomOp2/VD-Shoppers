"use client";

import { useParams, useRouter } from "next/navigation";
import { Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { BillboardCloumn, columns } from "./columns";
import { DataTable } from "@/components/ui/data-table";

interface BillboardClientProps {
	data: BillboardCloumn[];
}

export const BillboardClient: React.FC<BillboardClientProps> = ({ data }) => {
	const router = useRouter();
	const params = useParams();

	return (
		<>
			<div className="flex items-center justify-between mr-4">
				<Heading
					title={`Billboards (${data.length})`}
					description="Manage your Bilboards"
				/>
				<Button
					onClick={() =>
						router.push(`/${params.storeId}/billboards/new`)
					}
				>
					<Plus className="mr-2 h-5 w-5" />
					Add New
				</Button>
			</div>
			<Separator />
			<DataTable searchKey="label" columns={columns} data={data}/>
		</>
	);
};
