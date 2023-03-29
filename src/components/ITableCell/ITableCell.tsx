// imports from 3rd party libraries
import { TableCell, TextField } from '@mui/material';
import { useState } from 'react';

// types
import { ITableCellProps } from 'components/ITableCell/ITableCell.types';

export const ITableCell = ({
	data,
	rowId,
	type,
	readonly,
	updateRows,
}: ITableCellProps) => {
	const [currentValue, setCurrentValue] = useState(data);

	const handleCellClick = () => {};

	const handleBlur = () => {
		updateRows(rowId, type, currentValue);
	};

	const handleFocus = () => {};

	const handleCurrentValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (readonly) return;
		setCurrentValue(e.target.value);
	};

	return (
		<TableCell
			onClick={handleCellClick}
			onBlur={handleBlur}
			onFocus={handleFocus}
			sx={{
				'&:hover': {
					backgroundColor: 'rgba(0, 0, 0, 0.04)',
				},
				'&:focus': {
					backgroundColor: 'rgba(102, 109, 145, 0.4)',
				},
			}}
		>
			<TextField
				type="text"
				value={currentValue}
				onChange={handleCurrentValueChange}
			/>
		</TableCell>
	);
};
