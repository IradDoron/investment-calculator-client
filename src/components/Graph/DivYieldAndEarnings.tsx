import * as am5 from '@amcharts/amcharts5';
import am5themes_Animated from '@amcharts/amcharts5/themes/Animated';
import * as am5xy from '@amcharts/amcharts5/xy';
import { useLayoutEffect } from 'react';
import { useRecoilValue } from 'recoil';

// store
import {
	dividendYieldPerYearState,
	earningsFromDividendPerYearState,
} from 'store';

export const DivYieldAndEarnings = () => {
	const dividendYieldPerYear = useRecoilValue(dividendYieldPerYearState);
	const earningsFromDividendPerYear = useRecoilValue(
		earningsFromDividendPerYearState
	);

	const formatData = (
		dividendYieldPerYear: any,
		earningsFromDividendPerYear: any
	) => {
		const formattedData = [] as any;
		console.log('dividendYieldPerYear', dividendYieldPerYear);
		console.log('earningsFromDividendPerYear', earningsFromDividendPerYear);
		if (!dividendYieldPerYear || !earningsFromDividendPerYear)
			return formattedData;
		for (let i = 0; i < dividendYieldPerYear.length; i++) {
			const year = dividendYieldPerYear[i].year;
			const fullDate = new Date(Number(year), 0, 1).getTime();
			formattedData.push({
				date: fullDate,
				dividendYield: dividendYieldPerYear[i].value,
				earnings: earningsFromDividendPerYear[i].value,
			});
		}

		return formattedData;
	};

	useLayoutEffect(() => {
		var root = am5.Root.new('chart3div');

		const chartData = formatData(
			dividendYieldPerYear,
			earningsFromDividendPerYear
		);

		root.setThemes([am5themes_Animated.new(root)]);

		var chart = root.container.children.push(
			am5xy.XYChart.new(root, {
				panY: false,
				wheelY: 'zoomX',
				layout: root.verticalLayout,
			})
		);

		// Craete Y-axis
		var yAxis1 = chart.yAxes.push(
			am5xy.ValueAxis.new(root, {
				renderer: am5xy.AxisRendererY.new(root, {}),
			})
		);

		var yAxis2 = chart.yAxes.push(
			am5xy.ValueAxis.new(root, {
				renderer: am5xy.AxisRendererY.new(root, {}),
			})
		);

		// Create X-Axis
		var xAxis = chart.xAxes.push(
			am5xy.DateAxis.new(root, {
				baseInterval: { timeUnit: 'year', count: 1 },
				renderer: am5xy.AxisRendererX.new(root, {
					minGridDistance: 20,
				}),
			})
		);

		// Create series
		function createSeries(name: string, field: string, yAxis: any) {
			var series = chart.series.push(
				am5xy.ColumnSeries.new(root, {
					name: name,
					xAxis: xAxis,
					yAxis: yAxis,
					valueYField: field,
					valueXField: 'date',
					tooltip: am5.Tooltip.new(root, {
						labelText: '[bold]{name}[/]\n{valueY}',
					}),
				})
			);
			series.columns.template.setAll({
				fillOpacity: 0.5,
				strokeWidth: 2,
				cornerRadiusTL: 5,
				cornerRadiusTR: 5,
			});
			series.data.setAll(chartData);
		}

		createSeries('Dividend Yield', 'dividendYield', yAxis1);
		createSeries('Earnings', 'earnings', yAxis2);

		// Add cursor
		chart.set('cursor', am5xy.XYCursor.new(root, {}));

		// Add legend
		let legend = chart.children.push(
			am5.Legend.new(root, {
				useDefaultMarker: true,
				nameField: chart.series.values[0].get('name'),
				fillField: 'color',
				strokeField: 'color',
				centerX: am5.percent(50),
				x: am5.percent(50),
				layout: root.verticalLayout,
			})
		);

		legend.data.setAll(chart.series.values);

		return () => {
			root.dispose();
		};
	}, [dividendYieldPerYear, earningsFromDividendPerYear]);

	return <div id="chart3div" style={{ width: '100%', height: '500px' }}></div>;
};
