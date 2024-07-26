"use client"

import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import Modal from "../ui/modal";

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
    loading
}) => {
    const [isMounted, setIsMounted] = useState(false);
    
    useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!isMounted) {
        return null;
    }

    return (
        <Modal
            title="هل أنت متأكد?"
            description="لا يمكن التراجع عن هذا الإجراء"
            isOpen={isOpen}
            onClose={onClose}
        >
            <div className="pt-6 space-x-2 flex items-center justify-end w-full">
                <Button disabled={loading} variant="outline" onClick={onClose}>
                أنسحب
                </Button>
                <Button disabled={loading} variant="destructive" onClick={onConfirm}>
                موافق
                </Button>
            </div>
        </Modal>
    )
}