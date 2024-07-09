import prismaDB from "@/lib/prismaDB";

import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { isUndefined } from "util";
import { string } from "zod";

export async function POST(
	req: Request,
	{ params }: { params: { storeId: string } }
) {
	try {
		const body = await req.json();
		const { userId } = auth();
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

		const product = await prismaDB.product.create({
			data: {
				name,
				price,
				categoryId,
				colorId,
				sizeId,
				images: {
					createMany: {
						data: [
							...images.map(( image : { url: string }) => image ),
						]
					}
				},
				isFeatured,
				isArchived,
				storeId: params.storeId,
			},
		}
	);

	return NextResponse.json(product);
	
} catch (error) {
		return new NextResponse("PRODUCT Error", { status: 500 });
	}
}

export async function GET(
	req: Request,
	{ params }: { params: { storeId: string } }
) {
	try {

		const { searchParams } = new URL(req.url);
		const categoryId = searchParams.get("categoryId") || undefined;
		const sizeId = searchParams.get("sizeId") || undefined;
		const colorId = searchParams.get("colorId") || undefined;
		const isFeatured = searchParams.get("isFeatured");

		if (!params.storeId) {
			return new NextResponse("Store ID is Required", { status: 400 });
		}

		const products = await prismaDB.product.findMany({
			where : {
                storeId : params.storeId,
				categoryId,
				colorId,
				sizeId,
				isFeatured : isFeatured ? true : undefined,
				isArchived : false,
            },
			include : {
				images : true,
				category : true,
				color : true,
				size : true,	
			},
			orderBy : {
				createdAt : 'desc',
			},
		});

		return NextResponse.json(products);
	} catch (error) {
		return new NextResponse("PRODUCT Error", { status: 500 });
	}
}
