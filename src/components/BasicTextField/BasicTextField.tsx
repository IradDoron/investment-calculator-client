// imports from 3rd party libraries
import { TextField } from '@mui/material';

// types
import { BasicTextFieldProps } from 'components/BasicTextField/BasicTextField.types';

export const BasicTextField = ({
	label,
	value,
	onChange,
}: BasicTextFieldProps) => {
	return (
		<TextField
			label={label}
			value={value}
			onChange={onChange}
			sx={{
				width: '240px',
			}}
		/>
	);
};
