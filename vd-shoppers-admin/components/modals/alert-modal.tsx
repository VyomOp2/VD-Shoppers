"use client";

import { useEffect, useState } from "react";
import { Modal } from "@/components/ui/modal";
import { Button } from "@/components/ui/button";

interface AlertModalProps {
	isOpen: boolean;
	onClose: () => void;
	onConfirm: () => void;
	loading: boolean;
}

export const AlertModal: React.FC<AlertModalProps> = ({
	isOpen,
	onClose,
	onConfirm,
	loading,
}) => {
	const [isMounted, setMounted] = useState(false);

	useEffect(() => {
		setMounted(true);
	}, []);

	if (!isMounted) {
		return null;
	}

	return (
		<Modal
			title="Are you Sure '_' "
			description="This Action cannot be Reverted"
			isOpen={isOpen}
			onClose={onClose}
		>
			<div className="pt-6 space-x-2 flex items-center justify-end w-full">
				<Button 
                disabled={loading} 
                variant="outline" 
                onClick={onClose}
                >
					Cancel
				</Button>
				<Button
					disabled={loading}
					variant="destructive"
					onClick={onConfirm}
				>
					Continue
				</Button>
			</div>
		</Modal>
	);
};
