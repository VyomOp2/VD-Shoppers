import prismaDB from "@/lib/prismaDB";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function GET(
	_req: Request,
	{ params }: { params: { storeId: string , categoryId : string } }
) {
	try {

		if (!params.categoryId) {
			return new NextResponse("Category ID is Required", { status: 400 });
		}

		const category = await prismaDB.category.findUnique({
			where: {
				id: params.categoryId,
			},
		});

		return NextResponse.json(category);
	} catch (error) {
		console.log("[CATEGORY_GET]", error);
		return new NextResponse("Error", { status: 500 });
	}
};

export async function PATCH(
	req: Request,
	{ params }: { params: { storeId: string , categoryId : string } }
) {
	try {
		const { userId } = auth();
		const body = await req.json();
		const { name , billboardId } = body;

		if (!userId) {
			return new NextResponse("Unauthenticated", { status: 401 });
		}

		if (!name) {
			return new NextResponse("Name is Required", { status: 400 });
		}

		if (!billboardId) {
			return new NextResponse("Billboard ID is Required", { status: 400 });
		}


		if (!params.categoryId) {
			return new NextResponse("CATEGORY ID is Required", { status: 400 });
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

		const category = await prismaDB.category.updateMany({
			where: {
				id: params.categoryId,
			},
			data: {
				name,
				billboardId,
			},
		});

		return NextResponse.json(category);
	} catch (error) {
		console.log("[CATEGORY_PATCH]", error);
		return new NextResponse("Error", { status: 500 });
	}
}

export async function DELETE(
	_req: Request,
	{ params }: { params: { storeId: string , categoryId : string } }
) {
	try {
		const { userId } = auth();

		if (!userId) {
			return new NextResponse("Unauthenticated", { status: 401 });
		}

		if (!params.categoryId) {
			return new NextResponse("CATEGORY ID is Required", { status: 400 });
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

		const category = await prismaDB.category.deleteMany({
			where: {
				id: params.categoryId,
			},
		});

		return NextResponse.json(category);
	} catch (error) {
		console.log("[CATEGORY_DELETE]", error);
		return new NextResponse("Error", { status: 500 });
	}
};
