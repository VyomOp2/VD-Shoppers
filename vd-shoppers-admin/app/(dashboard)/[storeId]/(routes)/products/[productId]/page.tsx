import { ObjectId } from "mongodb";
import prismaDB from "@/lib/prismaDB";
import { ProductForm } from "@/app/(dashboard)/[storeId]/(routes)/products/[productId]/components/product-form";

const ProductPage = async ({
	params,
}: {
	params: { productId: string };
}) => {
	let product = null;

	if (ObjectId.isValid(params.productId)) {
		product = await prismaDB.product.findUnique({
			where: {
				id: params.productId,
			},
			include: {
				images: true,
			}
		});
	}

	return (
		<div className="flex-col">
			<div className="flex-1 space-y-4 p-8 pt-6">
				<ProductForm initialData={product} />
			</div>
		</div>
	);
};

export default ProductPage;
