// imports from 3rd party libraries
import { atom } from 'recoil';

// types
import { TicketAndIndex } from 'types';

export const dividendYieldPerYearState = atom({
	key: 'dividendYieldPerYearState',
	default: [],
});

export const earningsFromDividendPerYearState = atom({
	key: 'earningsFromDividendPerYearState',
	default: [],
});

export const stockPricesListState = atom({
	key: 'stockPricesListState',
	default: [],
});

export const yearsAgoState = atom<number>({
	key: 'yearsAgoState',
	default: 20,
});

export const startInvestState = atom<number>({
	key: 'startInvestState',
	default: 1000,
});

export const monthlyContributionState = atom<number>({
	key: 'monthlyInvestState',
	default: 100,
});

export const ticketAndIndexesState = atom<TicketAndIndex[]>({
	key: 'ticketAndIndexesState',
	default: [
		{
			ticket: 'INTC',
			index: 0.5,
		},
		{
			ticket: 'MCD',
			index: 0.5,
		},
	],
});

export const historicalDataState = atom({
	key: 'historicalDataState',
	default: [],
});

export const currentTicketState = atom({
	key: 'currentTicketState',
	default: '',
});
