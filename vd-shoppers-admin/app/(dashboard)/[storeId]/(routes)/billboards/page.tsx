import { format } from "date-fns";
import { toZonedTime } from "date-fns-tz";

import prismaDB from "@/lib/prismaDB";
import { BillboardClient } from "./components/client";
import { BillboardCloumn } from "./components/columns";

const BillboardsPage = async ({ params }: { params: { storeId: string } }) => {
	const billboards = await prismaDB.billboard.findMany({
		where: {
			storeId: params.storeId,
		},
		orderBy: {
			createdAt: "desc",
		},
	});

	const timeZone = "Asia/Kolkata";

	const FormatedBillboards: BillboardCloumn[] = billboards.map((item) => {
		const zonedDate = toZonedTime(item.createdAt, timeZone);
		return {
			id: item.id,
			label: item.label,
			createdAt: format(zonedDate, "MMMM do, yyyy"),
		};
	});

	return (
		<div className="flex-col">
			<div className="flex-1 space-y-4 p-8 pt-6">
				<BillboardClient data={FormatedBillboards} />
			</div>
		</div>
	);
};

export default BillboardsPage;
