import { X } from 'lucide-react';
import type { ReactNode } from 'react';
import { Button } from '../ui/button';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import { cn } from '../../lib/utils';

interface CustomRightDrawerProps {
    trigger?: ReactNode;
    title?: string;
    description?: string;
    children: ReactNode;
    open?: boolean;
    onOpenChange?: (open: boolean) => void;
    onSubmit?: () => void;
    submitText?: string;
    cancelText?: string;
}

export function CustomRightDrawer({
    trigger,
    title = "Sozlamalar",
    description,
    children,
    open,
    onOpenChange,
    onSubmit,
    submitText = "Saqlash",
    cancelText = "Bekor qilish",
}: CustomRightDrawerProps) {
    return (
        <DialogPrimitive.Root open={open} onOpenChange={onOpenChange}>
            {trigger && (
                <DialogPrimitive.Trigger asChild>
                    {trigger}
                </DialogPrimitive.Trigger>
            )}

            <DialogPrimitive.Portal>
                <DialogPrimitive.Overlay
                    className={cn(
                        "fixed inset-0 z-50 bg-black/50 backdrop-blur-sm",
                        "data-[state=open]:animate-in data-[state=closed]:animate-out",
                        "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0"
                    )}
                />

                <DialogPrimitive.Content
                    className={cn(
                        "fixed right-0 top-0 z-50 h-full w-full max-w-md bg-white shadow-2xl",
                        "flex flex-col",
                        "data-[state=open]:animate-in data-[state=closed]:animate-out",
                        "data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right",
                        "duration-300"
                    )}
                >

                    <div className="flex items-center justify-between border-b p-6">
                        <div>
                            <DialogPrimitive.Title className="text-lg font-semibold">
                                {title}
                            </DialogPrimitive.Title>
                            {description && (
                                <DialogPrimitive.Description className="text-sm text-muted-foreground mt-1">
                                    {description}
                                </DialogPrimitive.Description>
                            )}
                        </div>
                        <DialogPrimitive.Close asChild>
                            <Button variant="ghost" size="icon">
                                <X className="h-5 w-5" />
                                <span className="sr-only">Yopish</span>
                            </Button>
                        </DialogPrimitive.Close>
                    </div>

                    <div className="flex-1 overflow-y-auto p-6">
                        {children}
                    </div>

                    {(onSubmit || cancelText) && (
                        <div className="border-t p-6 flex gap-3 justify-end bg-gray-50">
                            <DialogPrimitive.Close asChild>
                                <Button variant="outline">{cancelText}</Button>
                            </DialogPrimitive.Close>
                            {onSubmit && (
                                <Button onClick={onSubmit}>{submitText}</Button>
                            )}
                        </div>
                    )}
                </DialogPrimitive.Content>
            </DialogPrimitive.Portal>
        </DialogPrimitive.Root>
    );
}