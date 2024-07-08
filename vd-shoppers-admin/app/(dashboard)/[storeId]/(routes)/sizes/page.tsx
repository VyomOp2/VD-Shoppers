import { format } from "date-fns";
import { toZonedTime } from "date-fns-tz";

import prismaDB from "@/lib/prismaDB";
import { SizeClient } from "./components/client";

import { SizeColumn } from "@/app/(dashboard)/[storeId]/(routes)/sizes/components/columns";

const SizesPage = async ({ params }: { params: { storeId: string } }) => {
	const sizes = await prismaDB.size.findMany({
		where: {
			storeId: params.storeId,
		},
		orderBy: {
			createdAt: "desc",
		},
	});

	const timeZone = "Asia/Kolkata";

	const FormatedSizes: SizeColumn[] = sizes.map((item) => {
		const zonedDate = toZonedTime(item.createdAt, timeZone);
		return {
			id: item.id,
			name: item.name,
			value: item.value,
			createdAt: format(zonedDate, "MMMM do, yyyy"),
		};
	});

	return (
		<div className="flex-col">
			<div className="flex-1 space-y-4 p-8 pt-6">
				<SizeClient data={FormatedSizes} />
			</div>
		</div>
	);
};

export default SizesPage;
