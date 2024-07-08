import { ObjectId } from "mongodb";

import prismaDB from "@/lib/prismaDB";

import { ColorForm } from "@/app/(dashboard)/[storeId]/(routes)/colors/[colorId]/components/color-form";

const ColorPage = async ({
	params,
}: {
	params: { colorId: string };
}) => {
	let color = null;

	if (ObjectId.isValid(params.colorId)) {
		color = await prismaDB.color.findUnique({
			where: {
				id: params.colorId,
			},
		});
	}

	return (
		<div className="flex-col">
			<div className="flex-1 space-y-4 p-8 pt-6">
				<ColorForm initialData={color} />
			</div>
		</div>
	);
};

export default ColorPage;
