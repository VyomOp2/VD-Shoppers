import prismaDB from "@/lib/prismaDB";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function GET(
	_req: Request,
	{ params }: { params: { storeId: string , sizeId : string } }
) {
	try {

		if (!params.sizeId) {
			return new NextResponse("SIZE ID is Required", { status: 400 });
		}

		const size = await prismaDB.size.findUnique({
			where: {
				id: params.sizeId,
			},
		});

		return NextResponse.json(size);
	} catch (error) {
		console.log("[SIZE_GET]", error);
		return new NextResponse("Error", { status: 500 });
	}
};

export async function PATCH(
	req: Request,
	{ params }: { params: { storeId: string , sizeId : string } }
) {
	try {
		const { userId } = auth();
		const body = await req.json();
		const { name , value } = body;

		if (!userId) {
			return new NextResponse("Unauthenticated", { status: 401 });
		}

		if (!name) {
			return new NextResponse("Name is Required", { status: 400 });
		}

		if (!value) {
			return new NextResponse("Value is Required", { status: 400 });
		}


		if (!params.sizeId) {
			return new NextResponse("SIZE ID is Required", { status: 400 });
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

		const size = await prismaDB.size.updateMany({
			where: {
				id: params.sizeId,
			},
			data: {
				name,
				value,
			},
		});

		return NextResponse.json(size);
	} catch (error) {
		console.log("[SIZE_PATCH]", error);
		return new NextResponse("Error", { status: 500 });
	}
}

export async function DELETE(
	_req: Request,
	{ params }: { params: { storeId: string , sizeId : string } }
) {
	try {
		const { userId } = auth();

		if (!userId) {
			return new NextResponse("Unauthenticated", { status: 401 });
		}

		if (!params.sizeId) {
			return new NextResponse("SIZE ID is Required", { status: 400 });
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

		const size = await prismaDB.size.deleteMany({
			where: {
				id: params.sizeId,
			},
		});

		return NextResponse.json(size);
	} catch (error) {
		console.log("[SIZE_DELETE]", error);
		return new NextResponse("Error", { status: 500 });
	}
};
