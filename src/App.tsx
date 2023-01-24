import axios from 'axios';
import { useState } from 'react';
import './App.css';

import { Box, Button, Card, Stack, TextField, Typography } from '@mui/material';

const URL = {
	development: 'http://localhost:5000',
	production: 'https://investment-calculator-server.vercel.app/',
};

const App = () => {
	const [timeOfInvestment, setTimeOfInvestment] = useState(0);
	const [stockTicket, setStockTicket] = useState('');
	const [initialInvestment, setInitialInvestment] = useState(0);
	const [monthlyContribution, setMonthlyContribution] = useState(0);

	const [results, setResults] = useState('');

	console.log(results);

	const handleTimeOfInvestmentChange = (
		event: React.ChangeEvent<HTMLInputElement>
	) => {
		setTimeOfInvestment(Number(event.target.value));
	};

	const handleStockTicketChange = (
		event: React.ChangeEvent<HTMLInputElement>
	) => {
		setStockTicket(event.target.value);
	};

	const handleInitialInvestmentChange = (
		event: React.ChangeEvent<HTMLInputElement>
	) => {
		setInitialInvestment(Number(event.target.value));
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
			timeOfInvestment,
			stockTicket,
			initialInvestment,
			monthlyContribution,
		});

		try {
			const response = await axios.post(url, data, config);
			setResults(response.data);
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<>
			<Stack
				sx={{
					display: 'flex',
					flexDirection: 'column',
					justifyContent: 'start-flex',
					alignItems: 'center',
					height: '100vh',
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
							onChange={handleTimeOfInvestmentChange}
							value={timeOfInvestment}
						/>
						<TextField
							label="Stock Ticket"
							sx={{
								width: '240px',
							}}
							onChange={handleStockTicketChange}
							value={stockTicket}
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
							onChange={handleInitialInvestmentChange}
							value={initialInvestment}
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
				<Card
					sx={{
						width: '100%',
					}}
				>
					<Typography variant="h4">Results</Typography>
					<Typography variant="body1">Placeholder</Typography>
				</Card>
			</Stack>
		</>
	);
};

export default App;
