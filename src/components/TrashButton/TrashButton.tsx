// imports from 3rd party libraries
import { Delete } from '@mui/icons-material';
import { IconButton } from '@mui/material';

export const TrashButton = ({ rowId, deleteRow }: any) => {
	const handleDelete = () => {
		deleteRow(rowId);
	};

	return (
		<IconButton onClick={handleDelete}>
			<Delete />
		</IconButton>
	);
};
