import prismaDB from "@/lib/prismaDB";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function GET(
	_req: Request,
	{ params }: { params: { storeId: string , productId : string } }
) {
	try {

		if (!params.productId) {
			return new NextResponse("Product ID is Required", { status: 400 });
		}

		const product = await prismaDB.product.findUnique({
			where: {
				id: params.productId,
			},
			include: {
				images: true,
				category : true,
				color : true,
				size : true,
			},
		});

		return NextResponse.json(product);
	} catch (error) {
		console.log("[PRODUCT_GET]", error);
		return new NextResponse("Error", { status: 500 });
	}
};

export async function PATCH(
	req: Request,
	{ params }: { params: { storeId: string , productId : string } }
) {
	try {
		const { userId } = auth();
		const body = await req.json();
		const { 
			name,
			price,
			categoryId,
			colorId,
			sizeId,
			images,
			isFeatured,
			isArchived,
		} = body;

		if (!userId) {
			return new NextResponse("Unauthenticated", { status: 401 });
		}

		if (!name) {
			return new NextResponse("Name is Required", { status: 400 });
		}

		if (!categoryId) {
			return new NextResponse("Category ID is Required", { status: 400 });
		}

		if (!colorId) {
			return new NextResponse("Color ID is Required", { status: 400 });
		}

		if (!sizeId) {
			return new NextResponse("Size ID is Required", { status: 400 });
		}

		if (!images || !images.lenght) {
			return new NextResponse("Images are Required", { status: 400 });
		}

		const storeByuserId = await prismaDB.store.findFirst({
            where: {
                id: params.storeId,
                userId,
            },
        })

        if (!storeByuserId) {
            return new NextResponse("Unauthorized" , {status: 403 })
        }

		await prismaDB.product.update({
			where : {
				id : params.productId,
			},
			data: {
				name,
				price,
				categoryId,
				colorId,
				sizeId,
				images: {
					deleteMany: {},
				},
				isFeatured,
				isArchived,
				storeId: params.storeId,
			},
		}
	);

	const product = await prismaDB.product.update({
		where : {
			id : params.productId,
		},
		data : {
			images : {
				createMany : {
					data : [
						...images.map((image : { url : string }) => image),
					]
				}
			}
		}
	})
		return NextResponse.json(product);
	} catch (error) {
		console.log("[PRODUCT_PATCH]", error);
		return new NextResponse("Error", { status: 500 });
	}
}

export async function DELETE(
	_req: Request,
	{ params }: { params: { storeId: string , productId : string } }
) {
	try {
		const { userId } = auth();

		if (!userId) {
			return new NextResponse("Unauthenticated", { status: 401 });
		}

		if (!params.productId) {
			return new NextResponse("Product ID is Required", { status: 400 });
		}

		const storeByuserId = await prismaDB.store.findFirst({
            where: {
                id: params.storeId,
                userId,
            },
        })

        if (!storeByuserId) {
            return new NextResponse("Unauthorized" , {status: 403 })
        }

		const product = await prismaDB.product.deleteMany({
			where: {
				id: params.productId,
			},
		});

		return NextResponse.json(product);
	} catch (error) {
		console.log("[PRODUCT_DELETE]", error);
		return new NextResponse("Error", { status: 500 });
	}
};
