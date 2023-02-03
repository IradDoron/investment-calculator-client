import axios from 'axios';
import { useState } from 'react';
import { useSetRecoilState } from 'recoil';
import './App.css';

import { Box, Button, Card, Stack, TextField, Typography } from '@mui/material';

// components
import { CSVReader } from 'CSVReader';
import { Lines } from './components/Graph';
import { DivYieldAndEarnings } from './components/Graph/DivYieldAndEarnings';

// store
import {
	dividendYieldPerYearState,
	earningsFromDividendPerYearState,
	stockPricesState,
} from 'store';

// helpers
import { getFormattedData } from 'utils/helpers';

const URL = {
	development: 'http://localhost:5000/calc',
	production: 'https://investment-calculator-server.vercel.app/calc',
};

const App = () => {
	const [yearsAgo, setYearsAgo] = useState(20);
	const [ticket, setTicket] = useState('INTC');
	const [startInvest, setStartInvest] = useState(500);
	const [monthlyContribution, setMonthlyContribution] = useState(1000);
	const [stockFullName, setStockFullName] = useState(
		'Title Placeholder' as string
	);

	const setStockPrices = useSetRecoilState(stockPricesState);
	const setDividendYieldPerYear = useSetRecoilState(dividendYieldPerYearState);
	const setEarningsFromDividendPerYear = useSetRecoilState(
		earningsFromDividendPerYearState
	);

	const handleYearsAgoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setYearsAgo(Number(event.target.value));
	};

	const handleTicketChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setTicket(event.target.value);
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

	const handleSubmit = async () => {
		const url = URL.production;

		const config = {
			headers: {
				'Content-Type': 'application/json',
				'Access-Control-Allow-Origin': '*',
			},
		};

		const data = JSON.stringify({
			yearsAgo,
			ticket,
			startInvest,
			monthlyContribution,
		});

		try {
			const response = await axios.post(url, data, config);
			const rawData = response.data;
			const {
				dividendYieldPerYear,
				earningsFromDividendPerYear,
				stockPrices,
				stockFullName: stockFullNameRaw,
			} = rawData;

			const formattedStockPrices = getFormattedData(stockPrices);
			setStockPrices(formattedStockPrices);
			setDividendYieldPerYear(dividendYieldPerYear);
			setEarningsFromDividendPerYear(earningsFromDividendPerYear);
			setStockFullName(stockFullNameRaw);
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<>
			<CSVReader />
			{/* <Stack
				sx={{
					display: 'flex',
					flexDirection: 'column',
					justifyContent: 'start-flex',
					alignItems: 'center',
					width: '700px',
					gap: '24px',
					margin: '0 auto',
					paddingTop: '24px',
				}}
			>
				<Card
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
						<TextField
							label="Time of invesment [in years]"
							sx={{
								width: '240px',
							}}
							onChange={handleYearsAgoChange}
							value={yearsAgo}
						/>
						<TextField
							label="Stock Ticket"
							sx={{
								width: '240px',
							}}
							onChange={handleTicketChange}
							value={ticket}
						/>
					</Box>
					<Box
						sx={{
							display: 'flex',
							flexDirection: 'row',
							justifyContent: 'space-between',
							gap: '24px',
						}}
					>
						<TextField
							label="Initial investment"
							sx={{
								width: '240px',
							}}
							onChange={handleStartInvestChange}
							value={startInvest}
						/>
						<TextField
							label="Monthly contribution"
							sx={{
								width: '240px',
							}}
							onChange={handleMonthlyContributionChange}
							value={monthlyContribution}
						/>
					</Box>
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
				</Card>

				<Typography variant="h4">{stockFullName}</Typography>
			</Stack>
			<Lines />
			<DivYieldAndEarnings /> */}
		</>
	);
};

export default App;
