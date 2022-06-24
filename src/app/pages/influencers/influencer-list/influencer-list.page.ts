import { CachingService } from './../../../services/auxiliar/caching.service';
import { FormBuilder } from '@angular/forms';
import { AuthProvider } from './../../../providers/auth/auth';
import { NavController } from '@ionic/angular';
import { ApiInfluencersService } from './../../../services/influencers/api-influencers.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-influencer-list',
  templateUrl: './influencer-list.page.html',
  styleUrls: ['./influencer-list.page.scss'],
})
export class InfluencerListPage implements OnInit {
  influencersList: any;
  constructor(
    private router: Router,
    public navCtrl: NavController,
    public authService: AuthProvider,
   private storageService: CachingService
  ) { }

  ngOnInit() {
    console.log('InfluencerPage');
    this.getData();
  }
  getData(){
    this.storageService.getCachedRequest('all','-influencers').then(
      (response: any) => {
        this.influencersList = response;
        console.log(this.influencersList);
      },
      (err) => { }
    );
  }

  toggleDetails(data) {
    if (data.showDetails) {
      data.showDetails = false;
      data.icon = 'custom-dropdown';
    } else {
      data.showDetails = true;
      data.icon = 'custom-droptop';
    }
  }

  goDetail(influencer: any) {
    this.router.navigate(['/influencer-details'], { state: { influencer } });
  }


  goInfluencerWorkout(influencer: any) {
    this.router.navigate(['influencer-workout'], { state: { influencer } });
  }

  goInfluencerNutrition(influencer: any) {
    this.router.navigate(['influencer-nutrition'], { state: { influencer } });
  }

}
