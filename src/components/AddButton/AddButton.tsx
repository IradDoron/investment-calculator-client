import { Button } from '@mui/material';

export const AddButton = () => {
	const handleAddClick = () => {
		console.log('add');
	};
	return (
		<Button
			variant="contained"
			sx={{
				width: 'fit-content',
				height: 'fit-content',
				padding: '8px 16px',
			}}
			onClick={handleAddClick}
		>
			Add
		</Button>
	);
};
