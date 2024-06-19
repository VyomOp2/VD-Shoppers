import prismaDB from "@/lib/prismaDB";
import { BillboardsForm } from "./components/billboards-form";

const BillboardsPage = async ({
	params,
}: {
	params: { billboardsId: string };
}) => {
	const billboards = await prismaDB.billboard.findUnique({
		where: {
			id: params.billboardsId,
		},
	});

	return (
		<div className="flex-col">
			<div className="flex-1 space-y-4 p-8 pt-6">
				{/* <BillboardsForm initialData={billboards} /> */}
				<div>Existing Billboard : {billboards?.label}</div>
			</div>
		</div>
	);
};

export default BillboardsPage;
