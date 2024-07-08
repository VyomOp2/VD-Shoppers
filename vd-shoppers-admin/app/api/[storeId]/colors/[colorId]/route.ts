import prismaDB from "@/lib/prismaDB";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function GET(
	_req: Request,
	{ params }: { params: { storeId: string , colorId : string } }
) {
	try {

		if (!params.colorId) {
			return new NextResponse("COLOR ID is Required", { status: 400 });
		}

		const color = await prismaDB.color.findUnique({
			where: {
				id: params.colorId,
			},
		});

		return NextResponse.json(color);
	} catch (error) {
		console.log("[COLOR_GET]", error);
		return new NextResponse("Error", { status: 500 });
	}
};

export async function PATCH(
	req: Request,
	{ params }: { params: { storeId: string , colorId : string } }
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
			return new NextResponse("Hex Code is Required", { status: 400 });
		}

		if (!params.colorId) {
			return new NextResponse("COLOR ID is Required", { status: 400 });
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

		const color = await prismaDB.color.updateMany({
			where: {
				id: params.colorId,
			},
			data: {
				name,
				value,
			},
		});

		return NextResponse.json(color);
	} catch (error) {
		console.log("[COLOR_PATCH]", error);
		return new NextResponse("Error", { status: 500 });
	}
}

export async function DELETE(
	_req: Request,
	{ params }: { params: { storeId: string , colorId : string } }
) {
	try {
		const { userId } = auth();

		if (!userId) {
			return new NextResponse("Unauthenticated", { status: 401 });
		}

		if (!params.colorId) {
			return new NextResponse("COLOR ID is Required", { status: 400 });
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

		const color = await prismaDB.color.deleteMany({
			where: {
				id: params.colorId,
			},
		});

		return NextResponse.json(color);
	} catch (error) {
		console.log("[COLOR_DELETE]", error);
		return new NextResponse("Error", { status: 500 });
	}
};
