import { format } from "date-fns";
import { toZonedTime } from "date-fns-tz";

import prismaDB from "@/lib/prismaDB";
import { CategoryClient } from "./components/client";
import { CategoryCloumn } from "./components/columns";

const CategoriesPage = async ({ params }: { params: { storeId: string } }) => {
	const categories = await prismaDB.category.findMany({
		where: {
			storeId: params.storeId,
		},
		include: {
			billboard: true,
		},
		orderBy: {
			createdAt: "desc",
		},
	});

	const timeZone = "Asia/Kolkata";

	const Formatedcategories: CategoryCloumn[] = categories.map((item) => {
		const zonedDate = toZonedTime(item.createdAt, timeZone);
		return {
			id: item.id,
			name: item.name,
			billboardLabel : item.billboard.label,
			createdAt: format(zonedDate, "MMMM do, yyyy"),
		};
	});

	return (
		<div className="flex-col">
			<div className="flex-1 space-y-4 p-8 pt-6">
				<CategoryClient data={Formatedcategories} />
			</div>
		</div>
	);
};

export default CategoriesPage;
