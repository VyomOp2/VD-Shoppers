import { UserButton } from "@clerk/nextjs";
import { MainNav } from "@/components/main-nav";
import StoreSwitcher from "@/components/store-switcher";
import { auth } from "@clerk/nextjs/server";

import { redirect } from "next/navigation";
import prismaDB from "@/lib/prismaDB";

const Navbar = async () => {
	const { userId } = auth();

	if (!userId) {
		redirect("/sign-in");
	}

	const stores = await prismaDB.store.findMany({
		where: {
			userId,
		},
	});

	return (
		<div className="border-b">
			<div className="flex h-16 items-center px-4">
				<StoreSwitcher items={stores} />

				<div></div>
				<MainNav className="mx-6" />
				<div className="ml-auto flex items-center space-x-4">
					<UserButton afterSignOutUrl="/" />
				</div>
			</div>
		</div>
	);
};

export default Navbar;
