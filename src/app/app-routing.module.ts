import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [

  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },

  {
    path: 'login',
    loadChildren: () => import('./pages/auth/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'wizard',
    loadChildren: () => import('./pages/auth/wizard/wizard.module').then( m => m.WizardPageModule)
  },
  {
    path: 'home-auth',
    loadChildren: () => import('./pages/home-auth/home-auth.module').then( m => m.HomeAuthPageModule)
  },
  {
    path: 'workouts-list',
    loadChildren: () => import('./pages/workOuts/workouts-list/workouts-list.module').then( m => m.WorkoutsListPageModule)
  },
  {
    path: 'nutrition-list',
    loadChildren: () => import('./pages/nutrition/nutrition-list/nutrition-list.module').then( m => m.NutritionListPageModule)
  },
  {
    path: 'influencer-list',
    loadChildren: () => import('./pages/influencers/influencer-list/influencer-list.module').then( m => m.InfluencerListPageModule)
  },
  {
    path: 'chats',
    loadChildren: () => import('./pages/chat/chats/chats.module').then( m => m.ChatsPageModule)
  },
  {
    path: 'workout-details',
    loadChildren: () => import('./pages/workOuts/workout-details/workout-details.module').then( m => m.WorkoutDetailsPageModule)
  },
  {
    path: 'nutrition-details',
    loadChildren: () => import('./pages/nutrition/nutrition-details/nutrition-details.module').then( m => m.NutritionDetailsPageModule)
  },
  {
    path: 'influencer-details',
    loadChildren: () => import('./pages/influencers/influencer-details/influencer-details.module').then( m => m.InfluencerDetailsPageModule)
  },
  {
    path: 'chat',
    loadChildren: () => import('./pages/chat/chat/chat.module').then( m => m.ChatPageModule)
  },
  {
    path: 'user-workout',
    loadChildren: () => import('./pages/user/user-workout/user-workout.module').then( m => m.UserWorkoutPageModule)
  },
  {
    path: 'user-nutrition',
    loadChildren: () => import('./pages/user/user-nutrition/user-nutrition.module').then( m => m.UserNutritionPageModule)
  },
  {
    path: 'profile-settings',
    loadChildren: () => import('./pages/user/profile-settings/profile-settings.module').then( m => m.ProfileSettingsPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
