export interface BasicTextFieldProps {
	label: string;
	value: string | number;
	onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}
