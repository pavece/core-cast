'use client';

import { ColumnDef, flexRender, getCoreRowModel, getFilteredRowModel, useReactTable } from '@tanstack/react-table';

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { useState } from 'react';
import { RowActions } from './row-actions';
import { User } from './columns';
import { Button } from '@/components/ui/button';
import { RefreshCcw } from 'lucide-react';

interface DataTableProps<TData, TValue> {
	columns: ColumnDef<TData, TValue>[];
	data: TData[];
	onRefresh: () => void;
}

export function UsersTable<TData, TValue>({ columns, data, onRefresh }: DataTableProps<TData, TValue>) {
	const [searchText, setSearchText] = useState('');
	const table = useReactTable({
		data,
		columns,
		state: {
			globalFilter: searchText,
		},
		getCoreRowModel: getCoreRowModel(),
		onGlobalFilterChange: setSearchText,
		globalFilterFn: 'includesString',

		getFilteredRowModel: getFilteredRowModel(),
	});

	return (
		<>
			<div className='mb-2 mt-4 flex justify-between flex-col md:flex-row gap-2'>
				<div className='flex gap-2'>
					<Button onClick={onRefresh}>
						<RefreshCcw /> Refresh
					</Button>
					<Input
						placeholder='Search users...'
						className='w-[300px]'
						onChange={e => setSearchText(e.target.value)}
						value={searchText}
					/>
				</div>

				<RowActions userId={(table.getSelectedRowModel().rows?.[0]?.original as User)?.id} />
			</div>
			<div className='overflow-hidden rounded-md border'>
				<Table>
					<TableHeader>
						{table.getHeaderGroups().map(headerGroup => (
							<TableRow key={headerGroup.id}>
								{headerGroup.headers.map(header => {
									return (
										<TableHead key={header.id}>
											{header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
										</TableHead>
									);
								})}
							</TableRow>
						))}
					</TableHeader>
					<TableBody>
						{table.getRowModel().rows?.length ? (
							table.getRowModel().rows.map(row => (
								<TableRow key={row.id} data-state={row.getIsSelected() && 'selected'}>
									{row.getVisibleCells().map(cell => (
										<TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
									))}
								</TableRow>
							))
						) : (
							<TableRow>
								<TableCell colSpan={columns.length} className='h-24 text-center'>
									No results.
								</TableCell>
							</TableRow>
						)}
					</TableBody>
				</Table>
			</div>
		</>
	);
}
