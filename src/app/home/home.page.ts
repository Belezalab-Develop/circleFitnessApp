import { Component } from '@angular/core';
import { AnalyticsService } from '../services/analytics.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  enabled = this.analyticsService.analyticsEnabled;

  constructor(private analyticsService: AnalyticsService) { }

  setUser() {
   this.analyticsService.setUser();
  }

  setProperty() {
    this.analyticsService.setProperty();
  }

  logEvent() {
    this.analyticsService.logEvent();
  }


  toggleDataCollection() {
    this.analyticsService.toggleAnalytics();
    this.enabled = this.analyticsService.analyticsEnabled;
  }

}
