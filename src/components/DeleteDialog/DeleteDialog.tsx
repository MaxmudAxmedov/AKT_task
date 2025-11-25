import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "../ui/dialog"
import { Button } from "../ui/button"
import { Textarea } from "../ui/textarea"
import { useTranslation } from "react-i18next"

interface DeleteConfirmDialogProps {
    open: boolean
    onOpenChange: (open: boolean) => void
    title?: string
    entityName: string
    reason: string
    onReasonChange: (reason: string) => void
    onConfirm: () => void
    onCancel?: () => void
    isLoading?: boolean
}

export default function DeleteDialog({
    open,
    onOpenChange,
    title,
    entityName,
    reason,
    onReasonChange,
    onConfirm,
    onCancel,
    isLoading = false,
}: DeleteConfirmDialogProps) {
    const { t } = useTranslation()

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle className="text-red-600">
                        {title || t("user_delete_title")}
                    </DialogTitle>
                </DialogHeader>

                <div className="space-y-5">
                    <div>
                        <p className="text-sm text-muted-foreground mb-3">
                            <strong>{entityName}</strong> {t("user_delete_reason")}:
                        </p>
                        <Textarea
                            placeholder={t("user_delete_message")}
                            value={reason}
                            onChange={(e) => onReasonChange(e.target.value)}
                            className="min-h-28 resize-none"
                            autoFocus
                        />
                    </div>

                    <div className="flex justify-end gap-3">
                        <Button
                            variant="outline"
                            onClick={() => {
                                onCancel?.()
                                onOpenChange(false)
                            }}
                            disabled={isLoading}
                        >
                            {t("close")}
                        </Button>
                        <Button
                            variant="destructive"
                            onClick={onConfirm}
                            disabled={!reason.trim() || isLoading}
                        // loading={isLoading}
                        >
                            {t("delete")}
                        </Button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}