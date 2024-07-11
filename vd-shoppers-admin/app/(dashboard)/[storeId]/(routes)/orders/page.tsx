import { format } from "date-fns";
import { toZonedTime } from "date-fns-tz";

import prismaDB from "@/lib/prismaDB";
import { formatter } from "@/lib/utils";

import { OrderClient } from "@/app/(dashboard)/[storeId]/(routes)/orders/components/client";

import { OrderColumn } from "@/app/(dashboard)/[storeId]/(routes)/orders/components/columns";


const OrdersPage = async ({ params }: { params: { storeId: string } }) => {
	const orders = await prismaDB.order.findMany({
		where: {
			storeId: params.storeId,
		},
		include: {
			orderItems: {
				include: {
					product: true,
				},
			},
		},
		orderBy: {
			createdAt: "desc",
		},
	});

	const timeZone = "Asia/Kolkata";

	const FormatedOrders: OrderColumn[] = orders.map((item) => {
		const zonedDate = toZonedTime(item.createdAt, timeZone);
		return {
			id: item.id,
			phone: item.phone,
			address: item.address,
			products: item.orderItems
				.map((orderItem) => orderItem.product.name)
				.join(", "),
			totalPrice: formatter.format(
				item.orderItems.reduce((total, item) => {
					return total + Number(item.product.price);
				}, 0)
			),
			ispaid: item.isPaid,
			createdAt: format(zonedDate, "MMMM do, yyyy"),
		};
	});

	return (
		<div className="flex-col">
			<div className="flex-1 space-y-4 p-8 pt-6">
				<OrderClient data={FormatedOrders} />
			</div>
		</div>
	);
};

export default OrdersPage;
