import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
	try {
	} catch (error) {
		const { userId } = auth();
        const body = await req.json();
        const { name } = body;

		if (!userId) {
			return new NextResponse("Unauthorsed", { status: 401 });
		}

		console.log(" [Store_POST] ", error);
		return new NextResponse("Internal Error", { status: 500 });
	}
}
