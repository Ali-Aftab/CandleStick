import { Component, OnInit } from '@angular/core';
import axios from 'axios';
import * as HighCharts from 'highcharts/highstock';

@Component({
  selector: 'app-stocks',
  templateUrl: './stocks.component.html',
  styleUrls: ['./stocks.component.css'],
})
export class StocksComponent implements OnInit {
  oneStockData = {};
  apiKey = 'ENTER KEY HERE';
  title = 'myHighchart';
  oneStockArr = [];
  stockName = 'AAPL';

  stockData = [];

  HighCharts = HighCharts;
  chartOptions = {
    rangeSelector: {
      selected: 1,
    },
    title: {
      text: 'Stock Chart',
    },
    series: [
      {
        type: 'candlestick',
        name: `${this.stockName} stock`,
        data: this.stockData,
      },
    ],
  };
  // formatToChart(data) {
  //   let arrChart = [];
  //   for (let i = 0; i < data.length; i++) {
  //     const el = data[i];
  //     const onePoint = [el[0], el[1], el[2], el[3], el[4]];
  //     arrChart.push(onePoint);
  //   }
  //   this.stockData = arrChart;
  // }

  async refreshData(stockName) {
    // stockName = 'AAPL';
    const fullURL = `https://www.quandl.com/api/v3/datasets/WIKI/${stockName}.json?api_key=${this.apiKey}`;
    this.stockName = stockName;

    setInterval(async function () {
      const everyTwo = await axios.get(fullURL);
      this.oneStockData = everyTwo.data.dataset;
      this.oneStockArr = everyTwo.data.dataset.data;
      console.log(this.oneStockData);
      let arrChart = [];
      for (let i = 0; i < everyTwo.data.dataset.data.length; i++) {
        const el = everyTwo.data.dataset.data[i];
        const convertDate = Date.parse(el[0]);
        // console.log(convertDate);
        const onePoint = [convertDate, el[1], el[2], el[3], el[4]];
        arrChart.push(onePoint);
      }
      this.stockData = arrChart;
    }, 2 * 60 * 1000);
  }

  constructor() {}

  async ngOnInit(): Promise<void> {
    await this.refreshData('AAPL');
  }
}
