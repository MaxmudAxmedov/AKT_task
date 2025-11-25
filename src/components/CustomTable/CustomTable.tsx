import React from "react"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "../ui/table"

import { cn } from "../../lib/utils"

export interface Column<T> {
    key: keyof T | string
    label: React.ReactNode
    render?: (value: any, row: T, index: number) => React.ReactNode
}

interface DataTableProps<T> {
    columns: Column<T>[]
    data: T[]
    loading?: boolean
    emptyMessage?: string
    className?: string
}

export default function CustomTable<T extends { id?: number | string }>({
    columns = [],
    data = [],
    loading = false,
    emptyMessage,
    className,
}: DataTableProps<T>) {
    if (!columns.length) {
        return (
            <div className="text-center py-8 text-muted-foreground">
                Columns aniqlanmagan.
            </div>
        )
    }

    if (loading) {
        return (
            <div className="space-y-3">
                {[...Array(5)].map((_, i) => (
                    <div key={i} className="h-12 bg-muted/50 animate-pulse rounded-md" />
                ))}
            </div>
        )
    }

    return (
        <div
            className={cn(
                "max-h-[calc(100vh-210px)] overflow-y-auto border rounded-md",
                className
            )}
        >
            <Table className="w-full border-collapsec">
                <TableHeader className="sticky top-0 z-10 bg-background shadow-sm">
                    <TableRow>
                        {columns.map((col) => (
                            <TableHead
                                key={String(col.key)}
                                className="capitalize font-semibold text-sm border-b h-12"
                            >
                                {col.label}
                            </TableHead>
                        ))}
                    </TableRow>
                </TableHeader>

                <TableBody>
                    {data.length > 0 ? (
                        data.map((row, index) => (
                            <TableRow
                                key={row.id ?? index}
                                className="h-14 hover:bg-muted/50 transition-colors"
                            >
                                {columns.map((col) => {
                                    const cellValue = row[col.key as keyof T]

                                    return (
                                        <TableCell key={String(col.key)} className="text-sm">
                                            {col.render
                                                ? col.render(cellValue, row, index)
                                                : String(cellValue ?? "-")}
                                        </TableCell>
                                    )
                                })}
                            </TableRow>
                        ))
                    ) : (
                        <TableRow>
                            <TableCell
                                colSpan={columns.length}
                                className="text-center py-12 text-muted-foreground"
                            >
                                {emptyMessage || ("information_not_found")}
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </div>
    )
}