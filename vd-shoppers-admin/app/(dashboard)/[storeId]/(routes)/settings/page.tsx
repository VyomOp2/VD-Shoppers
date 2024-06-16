import prismaDB from "@/lib/prismaDB";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { SettingsForm } from "@/app/(dashboard)/[storeId]/(routes)/settings/components/setting-form";

interface SettingsPageProps {
	params: {
		storeId: string;
	};
}

const SettingsPage: React.FC<SettingsPageProps> = async ({ params }) => {
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
		<div className="flex-1 space-y-4 p-8 pt-6">
			<SettingsForm initialData={store} />
		</div>
	);
};

export default SettingsPage;
