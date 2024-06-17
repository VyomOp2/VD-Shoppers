"use client";

import { AlertModal } from "@/components/modals/alert-modal";
import { ApiAlert } from "@/components/ui/api-alert";
import { Button } from "@/components/ui/button";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Heading } from "@/components/ui/heading";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { useOrigin } from "@/hooks/use-origin";
import { zodResolver } from "@hookform/resolvers/zod";
import { Billboard, Store } from "@prisma/client";

import axios from "axios";
import { Trash } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import * as z from "zod";

interface BillboardsFormProps {
	initialData: Billboard | null;
}

const formSchema = z.object({
	label: z.string().min(3, "Label is required"),
	imageURL : z.string().min(1)
});

type BillboardsFormValues = z.infer<typeof formSchema>;

export const BillboardsForm: React.FC<BillboardsFormProps> = ({ initialData }) => {
	const params = useParams();
	const router = useRouter();
	const origin = useOrigin();
	const [open, setOpen] = useState(false);
	const [loading, setLoading] = useState(false); 

	const title = initialData ? "Edit Billboard" : "Create Billboard"
	const description = initialData ? "Edit a Billboard" : "Create a Billboard"
	const toastMessage = initialData ? "Billboard Updated" : " Billboard Created"
	const action = initialData ? "Save Changes" : "Create"
	
	const form = useForm<BillboardsFormValues>({
		resolver: zodResolver(formSchema),
		defaultValues: initialData || {
			label: "",
			imageURL : "",
		} 
	});

	const onSubmit = async (data: BillboardsFormValues) => {
		try {
			setLoading(true);
			await axios.patch(`/api/stores/${params.storeId}` , data);
			router.refresh();
			toast.success("Store Updated.");
		} catch (error) {
			toast.error("Something went wrong.")
		} finally {
			setLoading(false);
		}
	};

	const onDelete = async () => {
		try {
			setLoading(true);
			await axios.delete(`/api/stores/${params.storeId}`);
			router.refresh();
			router.push("/");
			toast.success("Store Deleted.");
		} catch (error) {
			toast.error("Make sure you removed all Products and Categories first.")
		} finally {
			setLoading(false);
			setOpen(false);
		}
	}

	return (
		<>
			<AlertModal 
				isOpen={open}
				onClose={() => setOpen(false)}
				onConfirm={onDelete}
				loading={loading}
			/>
			<div className="flex items-center justify-between">
				<Heading
					title={title}
					description={description}
				/>
				{initialData && (
					<Button
					disabled={loading}
					variant="destructive"
					size="icon"
					onClick={() => setOpen(true)}
					>
						<Trash className="h-4 w-4" />
					</Button>
				)}
			</div>
			<Separator />
			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(onSubmit)}
					className="space-y-8 w-full"
				>
					<div className="grid grid-cols-3 gap-8">
						<FormField
							control={form.control}
							name="label"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Label</FormLabel>
									<FormControl>
										<Input
											disabled={loading}
											placeholder="Billboard Label"
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					</div>
					<Button
						disabled={loading}
						className="mll-auto"
						type="submit"
					>
						{action}
					</Button>
				</form>
			</Form>
			<Separator />
		</>
	);
};

