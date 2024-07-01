import prismaDB from "@/lib/prismaDB";

const BillboardPage = async ({
	params,
}: {
	params: { billboardId: string };
}) => {
	const billboards = await prismaDB.billboard.findUnique({
		where: { id: params.billboardId },
	});

	return <div>Existing Billboard : {billboards?.label}</div>;
};

export default BillboardPage;
