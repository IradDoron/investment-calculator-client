// imports from 3rd party libraries
import { Stack, Typography } from '@mui/material';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useSetRecoilState } from 'recoil';
import './App.css';

// components
import { UserInputs } from 'components/UserInputs';
import { Lines } from './components/Graph';
import { DivYieldAndEarnings } from './components/Graph/DivYieldAndEarnings';

// store
import {
	dividendYieldPerYearState,
	earningsFromDividendPerYearState,
	stockPricesListState,
} from 'store';

const App = () => {
	const [stockFullName, setStockFullName] = useState(
		'Title Placeholder' as string
	);

	const setStockPrices = useSetRecoilState(stockPricesListState);
	const setDividendYieldPerYear = useSetRecoilState(dividendYieldPerYearState);
	const setEarningsFromDividendPerYear = useSetRecoilState(
		earningsFromDividendPerYearState
	);

	return (
		<>
			<Stack
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
				<UserInputs />
				<Typography variant="h4">{stockFullName}</Typography>
			</Stack>
			{/* <Lines />
			<DivYieldAndEarnings /> */}
		</>
	);
};

export default App;
