import { atom } from 'recoil';

export const dividendYieldPerYearState = atom({
	key: 'dividendYieldPerYearState',
	default: [],
});

export const earningsFromDividendPerYearState = atom({
	key: 'earningsFromDividendPerYearState',
	default: [],
});

export const stockPricesState = atom({
	key: 'stockPricesState',
	default: [],
});
