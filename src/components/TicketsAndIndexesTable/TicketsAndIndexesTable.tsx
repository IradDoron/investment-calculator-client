// imports from 3rd party libraries
import { Delete } from '@mui/icons-material';
import {
	Button,
	IconButton,
	Paper,
	Stack,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	TextField,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';

// types
import { TicketsIndexesTableProps } from 'components/TicketsAndIndexesTable/TicketsAndIndexesTable.types';
import { TicketAndIndex } from 'types';

// components
import { ITableCell } from 'components/ITableCell';
import { TrashButton } from 'components/TrashButton';

// store
import { ticketAndIndexesState } from 'store';

export interface Row {
	id: number;
	ticket: string;
	index: number;
}

export const createData = (id: number, ticket: string, index: number) => {
	return { id, ticket, index };
};

export const createRows = (ticketsAndIndexes: TicketAndIndex[]): Row[] => {
	const rows = ticketsAndIndexes.map((item, rowIndex) => {
		const { ticket, index } = item;
		return createData(rowIndex, ticket, index);
	});
	return rows;
};

export const TicketsAndIndexesTable = () => {
	const [ticketAndIndexes, setTicketAndIndexes] = useRecoilState(
		ticketAndIndexesState
	);

	const [rows, setRows] = useState<Row[]>(createRows(ticketAndIndexes));

	console.log('ticketAndIndexes', ticketAndIndexes);

	console.log('rows', rows);

	const updateRows = (id: number, type: string, newValue: string | number) => {
		const newRows: any = rows.map((row) => {
			// TODO: fix any
			if (row.id === id) {
				if (type === 'ticket') {
					return { ...row, ticket: newValue };
				} else if (type === 'index') {
					return { ...row, index: newValue };
				}
			}
			return row;
		});

		setRows(newRows);
	};

	const deleteRow = (id: number) => {
		console.log('deleteRow', id);
		const newRows = rows.filter((row) => row.id !== id);
		console.log('newRows', newRows);
		setRows(newRows);
	};

	useEffect(() => {
		const updateTicketAndIndexes = () => {
			const newTicketAndIndexes = rows.map((row) => {
				const { ticket, index } = row;
				return { ticket, index };
			});
			setTicketAndIndexes(newTicketAndIndexes);
		};
		updateTicketAndIndexes();
	}, [rows, setTicketAndIndexes]);

	return (
		<TableContainer component={Paper}>
			<Table sx={{ minWidth: 650 }} aria-label="simple table">
				<TableHead>
					<TableRow>
						<TableCell>Ticket</TableCell>
						<TableCell align="right">Index</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{rows.map((row, rowIndex) => {
						const { ticket, index } = row;
						return (
							<TableRow
								key={rowIndex}
								sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
							>
								<ITableCell
									data={ticket}
									rowId={rowIndex}
									type="ticket"
									readonly={true}
									updateRows={updateRows}
								/>
								<ITableCell
									data={index}
									rowId={rowIndex}
									type="index"
									readonly={false}
									updateRows={updateRows}
								/>
								<TableCell align="right">
									<TrashButton rowId={rowIndex} deleteRow={deleteRow} />
								</TableCell>
							</TableRow>
						);
					})}
				</TableBody>
			</Table>
		</TableContainer>
	);
};
