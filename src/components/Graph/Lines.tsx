import * as am5 from '@amcharts/amcharts5';
import am5themes_Animated from '@amcharts/amcharts5/themes/Animated';
import * as am5xy from '@amcharts/amcharts5/xy';
import { useLayoutEffect } from 'react';
import { useRecoilValue } from 'recoil';

// helpers
import { getFormattedData } from 'utils/helpers';

// store
import { stockPricesState } from 'store';

export const Lines = () => {
	const stockPrices = useRecoilValue(stockPricesState);

	useLayoutEffect(() => {
		const root = am5.Root.new('chart2div');

		root.setThemes([am5themes_Animated.new(root)]);

		const chart = root.container.children.push(
			am5xy.XYChart.new(root, {
				panY: false,
				wheelY: 'zoomX',
				layout: root.verticalLayout,
			})
		);

		// Create Y-axis
		const yAxis = chart.yAxes.push(
			am5xy.ValueAxis.new(root, {
				renderer: am5xy.AxisRendererY.new(root, {}),
			})
		);

		// Create X-Axis
		const xAxis = chart.xAxes.push(
			am5xy.DateAxis.new(root, {
				groupData: true,
				baseInterval: { timeUnit: 'day', count: 1 },
				renderer: am5xy.AxisRendererX.new(root, {}),
			})
		);

		// Create series
		function createSeries(name: string, field: string) {
			var series = chart.series.push(
				am5xy.LineSeries.new(root, {
					name: name,
					xAxis: xAxis,
					yAxis: yAxis,
					valueYField: field,
					valueXField: 'date',
					tooltip: am5.Tooltip.new(root, {
						// labelText: '[bold]{name}[/]\n{valueX.formatDate()}: {valueY}',
						labelText: '[bold]{name}[/]\n{valueY}',
					}),
					legendLabelText: '{name}',
					legendValueText: '{valueY}',
					legendRangeLabelText: '{valueY.open}-{valueY.close}',
					legendRangeValueText: '{valueY.low}-{valueY.high}',
				})
			);

			series.strokes.template.set('strokeWidth', 2);

			series.data.setAll(getFormattedData(stockPrices));
		}

		createSeries('Value', 'value');
		createSeries('Contribution', 'contribution');

		// Add cursor
		chart.set(
			'cursor',
			am5xy.XYCursor.new(root, {
				behavior: 'zoomXY',
				xAxis: xAxis,
			})
		);

		xAxis.set(
			'tooltip',
			am5.Tooltip.new(root, {
				themeTags: ['axis'],
			})
		);

		yAxis.set(
			'tooltip',
			am5.Tooltip.new(root, {
				themeTags: ['axis'],
			})
		);

		chart.set(
			'scrollbarX',
			am5.Scrollbar.new(root, {
				orientation: 'horizontal',
			})
		);

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
	}, [stockPrices]);

	return <div id="chart2div" style={{ width: '100%', height: '500px' }}></div>;
};
