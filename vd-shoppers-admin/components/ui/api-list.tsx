"use client";

import { useParams } from "next/navigation";

import { useOrigin } from "@/hooks/use-origin";
import { ApiAlert } from "@/components/ui/api-alert";

interface ApiListProps {
	entityName: string;
	entityIdName: string;
}

export const ApiList: React.FC<ApiListProps> = ({
	entityName,
	entityIdName,
}) => {
	const params = useParams();
	const origin = useOrigin();

	const baseURL = `${origin}/api/${params.storeId}`;

	return (
		<>
			<ApiAlert
				title="GET"
				variant="public"
				description={`${baseURL}/${entityName}`}
			/>
            <ApiAlert
				title="GET"
				variant="public"
				description={`${baseURL}/${entityName}/{${entityIdName}}`}
			/>
            <ApiAlert
				title="POST"
				variant="admin"
				description={`${baseURL}/${entityName}`}
			/>
            <ApiAlert
				title="PATCH"
				variant="admin"
				description={`${baseURL}/${entityName}/{${entityIdName}}`}
			/>
            <ApiAlert
				title="DELETE"
				variant="admin"
				description={`${baseURL}/${entityName}`}
			/>
		</>
	);
};
