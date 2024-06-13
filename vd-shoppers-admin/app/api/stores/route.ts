import prismaDB from "@/lib/prismaDB";

import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
	try {
		const { userId } = auth();
		const body = await req.json();
		const { name } = body;

		if (!userId) {
			return new NextResponse("Unauthorsed", { status: 401 });
		}

		if (!name) {
			return new NextResponse("Name is Required" , {status: 400})
		}

		const store = await prismaDB.store.create({
			data: {
				userId,
				name
			}
		})

	} catch (error) {
		return new NextResponse("Internal Error", { status: 500 });
	}
}
