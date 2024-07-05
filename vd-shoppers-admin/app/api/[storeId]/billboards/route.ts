import prismaDB from "@/lib/prismaDB";

import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function POST(
	req: Request,
	{ params }: { params: { storeId: string } }
) {
	try {
		const body = await req.json();
		const { userId } = auth();
		const { label, imageURL } = body;

		if (!userId) {
			return new NextResponse("Unauthenticated", { status: 401 });
		}

		if (!label) {
			return new NextResponse("Label is Required", { status: 400 });
		}

		if (!imageURL) {
			return new NextResponse("Image URL is Required", { status: 400 });
		}

		if (!params.storeId) {
			return new NextResponse("Store ID is Required", { status: 400 });
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

		const billboard = await prismaDB.billboard.create({
			data: {
				label,
				imageURL,
				storeId: params.storeId,
			},
		});

		return NextResponse.json(billboard);
	} catch (error) {
		return new NextResponse("BILLBOARD Error", { status: 500 });
	}
}

export async function GET(
	req: Request,
	{ params }: { params: { storeId: string } }
) {
	try {
		if (!params.storeId) {
			return new NextResponse("Store ID is Required", { status: 400 });
		}

		const billboards = await prismaDB.billboard.findMany({
			where : {
                storeId : params.storeId
            }
		});

		return NextResponse.json(billboards);
	} catch (error) {
		return new NextResponse("BILLBOARD Error", { status: 500 });
	}
}
