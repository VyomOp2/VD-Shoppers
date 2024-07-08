import { ObjectId } from "mongodb";

import prismaDB from "@/lib/prismaDB";

import { SizeForm } from "@/app/(dashboard)/[storeId]/(routes)/sizes/[sizeId]/components/size-form";

const SizePage = async ({
	params,
}: {
	params: { sizeId: string };
}) => {
	let size = null;

	if (ObjectId.isValid(params.sizeId)) {
		size = await prismaDB.size.findUnique({
			where: {
				id: params.sizeId,
			},
		});
	}

	return (
		<div className="flex-col">
			<div className="flex-1 space-y-4 p-8 pt-6">
				<SizeForm initialData={size} />
			</div>
		</div>
	);
};

export default SizePage;
