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
		const { name, value } = body;

		if (!userId) {
			return new NextResponse("Unauthenticated", { status: 401 });
		}

		if (!name) {
			return new NextResponse("Name is Required", { status: 400 });
		}

		if (!value) {
			return new NextResponse("Hex Code is Required", { status: 400 });
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

		const color = await prismaDB.color.create({
			data: {
				name,
				value,
				storeId: params.storeId,
			},
		});

		return NextResponse.json(color);
	} catch (error) {
		return new NextResponse("COLOR Error", { status: 500 });
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

		const colors = await prismaDB.color.findMany({
			where : {
                storeId : params.storeId
            }
		});

		return NextResponse.json(colors);
	} catch (error) {
		return new NextResponse("COLOR Error", { status: 500 });
	}
}
