// types
import { TicketAndIndex } from 'types';

export const getFormattedDataForSubmission = (
	yearsAgo: number,
	startInvest: number,
	monthlyContribution: number,
	ticketAndIndexes: TicketAndIndex[]
) => {
	// if (!data) return [];
	// const formattedData = data.map((item: any) => {
	// 	const { date, value, contribution } = item;
	// 	const fullDate = new Date(date);
	// 	const numericDate = fullDate.getTime();
	// 	return {
	// 		date: numericDate,
	// 		value,
	// 		contribution,
	// 	};
	// });
	// return formattedData;
	return null;
};

// output structure:

// {
//     yearsAgo: number (ex: 5),
//     startInvest: number (ex: 10000),
//     monthlyContribution: number (ex: 100),
//     ticketsAndIndexes:
//         [
//             {
//                 ticket: string (ex: "INTC"),
//                 index: number (ex: 0),
//             }
//         ]
// }
