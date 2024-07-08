import { format } from "date-fns";
import { toZonedTime } from "date-fns-tz";

import prismaDB from "@/lib/prismaDB";
import { ColorClient } from "@/app/(dashboard)/[storeId]/(routes)/colors/components/client";
import { ColorColumn } from "@/app/(dashboard)/[storeId]/(routes)/colors/components/columns";

const ColorsPage = async ({ params }: { params: { storeId: string } }) => {
	const colors = await prismaDB.color.findMany({
		where: {
			storeId: params.storeId,
		},
		orderBy: {
			createdAt: "desc",
		},
	});

	const timeZone = "Asia/Kolkata";

	const FormatedColors: ColorColumn[] = colors.map((item) => {
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
				<ColorClient data={FormatedColors} />
			</div>
		</div>
	);
};

export default ColorsPage;
