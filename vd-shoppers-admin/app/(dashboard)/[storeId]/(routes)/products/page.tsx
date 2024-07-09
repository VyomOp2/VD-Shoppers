import { format } from "date-fns";
import { toZonedTime } from "date-fns-tz";

import prismaDB from "@/lib/prismaDB";
import { formatter } from "@/lib/utils";

import { ProductClient } from "@/app/(dashboard)/[storeId]/(routes)/products/components/client";
import { ProductColumn } from "@/app/(dashboard)/[storeId]/(routes)/products/components/columns";

const ProductsPage = async ({ params }: { params: { storeId: string } }) => {
	const products = await prismaDB.product.findMany({
		where: {
			storeId: params.storeId,
		},
		include: {
			category: true,
			size: true,
			color: true,
		},
		orderBy: {
			createdAt: "desc",
		},
	});

	const timeZone = "Asia/Kolkata";

	const FormatedProducts: ProductColumn[] = products.map((item) => {
		const zonedDate = toZonedTime(item.createdAt, timeZone);
		return {
			id: item.id,
			name: item.name,
			isFeatured: item.isFeatured,
			isArchived: item.isArchived,
			price: formatter.format(item.price),
			category: item.category.name,
			color: item.color.value,
			size: item.size.name,
			createdAt: format(zonedDate, "MMMM do, yyyy"),
		};
	});

	return (
		<div className="flex-col">
			<div className="flex-1 space-y-4 p-8 pt-6">
				<ProductClient data={FormatedProducts} />
			</div>
		</div>
	);
};

export default ProductsPage;
