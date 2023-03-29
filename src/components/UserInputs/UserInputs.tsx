// imports from 3rd party libraries
import { Delete } from '@mui/icons-material';
import {
	Autocomplete,
	Box,
	Button,
	Card,
	IconButton,
	Paper,
	Stack,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	TextField,
} from '@mui/material';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useRecoilState, useSetRecoilState } from 'recoil';

// store
import {
	historicalDataState,
	monthlyContributionState,
	startInvestState,
	ticketAndIndexesState,
	yearsAgoState,
} from 'store';

// data
import stockNames from 'data/stockNames.json';

// components
import { AddButton } from 'components/AddButton';
import { BasicTextField } from 'components/BasicTextField';
import { TicketsAndIndexesTable } from 'components/TicketsAndIndexesTable';

// helpers
import { getFormattedDataForSubmission } from 'components/UserInputs/UserInputs.helpers';

// constants
import { URL } from 'utils/consts';

export const UserInputs = () => {
	const [yearsAgo, setYearsAgo] = useRecoilState(yearsAgoState);
	const [ticketAndIndexes, setTicketAndIndexes] = useRecoilState(
		ticketAndIndexesState
	);
	const [startInvest, setStartInvest] = useRecoilState(startInvestState);
	const [monthlyContribution, setMonthlyContribution] = useRecoilState(
		monthlyContributionState
	);

	const handleYearsAgoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setYearsAgo(Number(event.target.value));
	};

	const handleStartInvestChange = (
		event: React.ChangeEvent<HTMLInputElement>
	) => {
		setStartInvest(Number(event.target.value));
	};

	const handleMonthlyContributionChange = (
		event: React.ChangeEvent<HTMLInputElement>
	) => {
		setMonthlyContribution(Number(event.target.value));
	};

	const [stockNamesDict, setStockNamesDict] = useState({} as any);

	useEffect(() => {
		const stockNamesDict = JSON.parse(JSON.stringify(stockNames));
		setStockNamesDict(stockNamesDict);
	}, []);

	/* old submit button TODO: delete this when the new one works

	// const handleSubmit = async () => {
	// 	const url = URL.production;

	// 	const config = {
	// 		headers: {
	// 			'Content-Type': 'application/json',
	// 			'Access-Control-Allow-Origin': '*',
	// 		},
	// 	};

	// 	const data = JSON.stringify({
	// 		yearsAgo,
	// 		ticket,
	// 		startInvest,
	// 		monthlyContribution,
	// 	});

	// 	try {
	// 		const response = await axios.post(url, data, config);
	// 		const rawData = response.data;
	// 		const {
	// 			dividendYieldPerYear,
	// 			earningsFromDividendPerYear,
	// 			stockPrices,
	// 			stockFullName: stockFullNameRaw,
	// 		} = rawData;

	// 		const formattedStockPrices = getFormattedData(stockPrices);
	// 		setStockPrices(formattedStockPrices);
	// 		setDividendYieldPerYear(dividendYieldPerYear);
	// 		setEarningsFromDividendPerYear(earningsFromDividendPerYear);
	// 		setStockFullName(stockFullNameRaw);
	// 	} catch (error) {
	// 		console.log(error);
	// 	}
	// };

	*/

	const testData = [
		{
			ticket: 'INTC',
			index: 0.33,
		},
		{
			ticket: 'AMD',
			index: 0.33,
		},
		{
			ticket: 'NVDA',
			index: 0.33,
		},
	];

	return (
		<Stack
			sx={{
				width: '100%',
				padding: '24px',
				display: 'flex',
				alignItems: 'center',
				flexDirection: 'column',
				gap: '24px',
			}}
		>
			<Box
				sx={{
					display: 'flex',
					flexDirection: 'row',
					justifyContent: 'space-between',
					gap: '24px',
				}}
			>
				<Stack spacing={6}>
					<Stack
						direction="row"
						sx={{
							gap: '24px',
							justifyContent: 'space-between',
							alignItems: 'center',
						}}
					>
						<Autocomplete
							id="stock-name"
							options={Object.keys(stockNamesDict)}
							getOptionLabel={(option) => option}
							style={{ width: 300 }}
							renderInput={(params) => (
								<TextField {...params} label="Stock Name" margin="normal" />
							)}
							onChange={(event, newValue) => {
								// if (newValue) setTicket(newValue);
							}}
						/>
						<AddButton />
					</Stack>

					<BasicTextField
						label="Time of invesment [in years]"
						onChange={handleYearsAgoChange}
						value={yearsAgo}
					/>
					<BasicTextField
						label="Start invest"
						onChange={handleStartInvestChange}
						value={startInvest}
					/>

					<BasicTextField
						label="Monthly contribution"
						onChange={handleMonthlyContributionChange}
						value={monthlyContribution}
					/>
				</Stack>
				<Stack>
					<TicketsAndIndexesTable />
				</Stack>
			</Box>
		</Stack>
	);
};
