## Links
- [ ] [Frontend: https://investment-calculator-irad-matan.netlify.app/](https://investment-calculator-irad-matan.netlify.app/)

## Features requests (in priority order)
- [ ] Add a range selector
- [ ] Add mobile support
- [ ] Add ability for select a range from the chart and calculate changing precent
- [ ] Add a loader when the data is loading
- [ ] Add an option to select stock tickets by company name
- [ ] Support multiple graphs
- [ ] Supporting the index of the multiple stocks
- [ ] Add a button to download the chart as an image
- [ ] Add a button to download the chart as a csv file
- [ ] When there are no dividends, show a message

## Completed features
- [x] Create new chart with the series:
    - [x] Add dividend per year graph
    - [x] Add dividend yield per year graph
- [x] Add a title as the full name of the stock
    - [x] Get it from the backend with yahoo finance api (ticket to name)
- [x] Add legends to the graphs
- [x] Add data numbers near the cursor
- [x] Add a selection menu for the stock tickets


give to matan array:

{
    yearsAgo: number (ex: 5),
    startInvest: number (ex: 10000),
    monthlyContribution: number (ex: 100),
    ticketsAndIndexes:
        [
            {
                ticket: string (ex: "INTC"),
                index: number (ex: 0),
            }
        ]
}






