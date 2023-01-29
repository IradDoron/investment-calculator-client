export const getFormattedData = (data: any) => {
	if (!data) return [];
	const formattedData = data.map((item: any) => {
		const { date, value, contribution } = item;
		const fullDate = new Date(date);
		const numericDate = fullDate.getTime();
		return {
			date: numericDate,
			value,
			contribution,
		};
	});
	return formattedData;
};
