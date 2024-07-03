"use client";

import { useParams, useRouter } from "next/navigation";
import { Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";

export const BillboardClient = () => {

    const router = useRouter();
    const params = useParams();

	return (
		<>
			<div className="flex items-center justify-between">
				<Heading
                    title="Billboards (0)"
                    description="Manage your Bilboards"
                />
                <Button onClick={() => router.push(`/${params.storeId}/billboards/new`)}>
                    <Plus className="mr-2 h-5 w-5" />
                    Add New Billboard
                </Button>
			</div>
            <Separator />
		</>
	);
};
