import prismaDB from "@/lib/prismaDB";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function GET(
	_req: Request,
	{ params }: { params: { storeId: string , billboardId : string } }
) {
	try {

		if (!params.billboardId) {
			return new NextResponse("Billboard ID is Required", { status: 400 });
		}

		const billboard = await prismaDB.billboard.deleteMany({
			where: {
				id: params.billboardId,
			},
		});

		return NextResponse.json(billboard);
	} catch (error) {
		console.log("[BILLBOARD_GET]", error);
		return new NextResponse("Error", { status: 500 });
	}
};

export async function PATCH(
	req: Request,
	{ params }: { params: { storeId: string , billboardId : string } }
) {
	try {
		const { userId } = auth();
		const body = await req.json();
		const { label , imageURL } = body;

		if (!userId) {
			return new NextResponse("Unauthenticated", { status: 401 });
		}

		if (!label) {
			return new NextResponse("Label is Required", { status: 400 });
		}

		if (!imageURL) {
			return new NextResponse("Image URL is Required", { status: 400 });
		}


		if (!params.billboardId) {
			return new NextResponse("Billboard ID is Required", { status: 400 });
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

		const billboard = await prismaDB.billboard.updateMany({
			where: {
				id: params.billboardId,
			},
			data: {
				label,
				imageURL,
			},
		});

		return NextResponse.json(billboard);
	} catch (error) {
		console.log("[BILLBOARD_PATCH]", error);
		return new NextResponse("Error", { status: 500 });
	}
}

export async function DELETE(
	_req: Request,
	{ params }: { params: { storeId: string , billboardId : string } }
) {
	try {
		const { userId } = auth();

		if (!userId) {
			return new NextResponse("Unauthenticated", { status: 401 });
		}

		if (!params.billboardId) {
			return new NextResponse("Billboard ID is Required", { status: 400 });
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

		const billboard = await prismaDB.billboard.deleteMany({
			where: {
				id: params.billboardId,
			},
		});

		return NextResponse.json(billboard);
	} catch (error) {
		console.log("[BILLBOARD_DELETE]", error);
		return new NextResponse("Error", { status: 500 });
	}
};
