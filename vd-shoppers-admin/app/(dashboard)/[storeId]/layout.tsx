import prismaDB from "@/lib/prismaDB";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

import Navbar from "@/components/navbar";

export default async function DashboardLayout({
	children,
	params,
}: {
	children: React.ReactNode;
	params: { storeId: string };
}) {
	const { userId } = auth();

	if (!userId) {
		redirect("/sign-in");
	}

	const store = await prismaDB.store.findFirst({
		where: {
			id: params.storeId,
			userId,
		},
	});

	if (!store) {
		redirect("/");
	}

	return (
		<>
			<Navbar />
			<div>
				
			</div>
			{children}
		</>
	);
}
