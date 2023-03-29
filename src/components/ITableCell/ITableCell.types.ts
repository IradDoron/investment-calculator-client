export interface ITableCellProps {
	data: string | number;
	rowId: number;
	type: 'ticket' | 'index';
	readonly: boolean;
	updateRows: (id: number, type: string, newValue: string | number) => void;
}
