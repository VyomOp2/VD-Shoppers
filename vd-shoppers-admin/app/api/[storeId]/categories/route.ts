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
		const { name, billboardId } = body;

		if (!userId) {
			return new NextResponse("Unauthenticated", { status: 401 });
		}

		if (!name) {
			return new NextResponse("Name is Required", { status: 400 });
		}

		if (!billboardId) {
			return new NextResponse("Billboard ID is Required", { status: 400 });
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

		const category = await prismaDB.category.create({
			data: {
				name,
				billboardId,
				storeId: params.storeId,
			},
		});

		return NextResponse.json(category);
	} catch (error) {
		return new NextResponse("CATEGORY Error", { status: 500 });
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

		const category = await prismaDB.category.findMany({
			where : {
                storeId : params.storeId
            }
		});

		return NextResponse.json(category);
	} catch (error) {
		return new NextResponse("CATEGORY Error", { status: 500 });
	}
}
