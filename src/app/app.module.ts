import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HighchartsChartModule } from 'highcharts-angular';

import { AppComponent } from './app.component';

import { StocksComponent } from './stocks/stocks.component';

@NgModule({
  declarations: [AppComponent, StocksComponent],
  imports: [BrowserModule, HighchartsChartModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
