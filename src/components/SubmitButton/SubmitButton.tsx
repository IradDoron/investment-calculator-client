// imports from 3rd party libraries
import { Button } from '@mui/material';
import axios from 'axios';
import { useRecoilState, useSetRecoilState } from 'recoil';

// store
import {
	dividendYieldPerYearState,
	earningsFromDividendPerYearState,
	monthlyContributionState,
	startInvestState,
	stockPricesListState,
	ticketAndIndexesState,
	yearsAgoState,
} from 'store';

// constants
import { URL } from 'utils/consts';

export const SubmitButton = () => {
	const [yearsAgo, setYearsAgo] = useRecoilState(yearsAgoState);
	const [ticketAndIndexes, setTicketAndIndexes] = useRecoilState(
		ticketAndIndexesState
	);
	const [startInvest, setStartInvest] = useRecoilState(startInvestState);
	const [monthlyContribution, setMonthlyContribution] = useRecoilState(
		monthlyContributionState
	);

	const setDividendYieldPerYear = useSetRecoilState(dividendYieldPerYearState);
	const setEarningsFromDividendPerYear = useSetRecoilState(
		earningsFromDividendPerYearState
	);
	const setStockPricesList = useSetRecoilState(stockPricesListState);

	const handleSubmit = async () => {
		const url = URL.production;

		const config = {
			headers: {
				'Content-Type': 'application/json',
				'Access-Control-Allow-Origin': '*',
			},
		};

		const composedDataForSubmission = {
			yearsAgo,
			startInvest,
			monthlyContribution,
			ticketAndIndexes,
		};

		const formmatedDataForSubmission = JSON.stringify(
			composedDataForSubmission
		);

		try {
			const response = await axios.post(
				url,
				formmatedDataForSubmission,
				config
			);
			const rawData = response.data;

			setDividendYieldPerYear(rawData.dividendYieldPerYear);
			setEarningsFromDividendPerYear(rawData.earningsFromDividendPerYear);
			setStockPricesList(rawData.stockPricesList);
		} catch (error) {
			console.log(error);
		}
	};
	return (
		<Button
			variant="contained"
			sx={{
				width: 'fit-content',
				alignSelf: 'center',
			}}
			onClick={handleSubmit}
		>
			Submit
		</Button>
	);
};
