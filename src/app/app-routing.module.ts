
/* eslint-disable max-len */
import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
//TODO: recordar colocar el guard en las rutas que necesiten authenticacion
const routes: Routes = [

  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },

  {
    path: 'login',
    loadChildren: () => import('./pages/auth/login/login.module').then( m => m.LoginPageModule),
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
  {
    path: 'app-information',
    loadChildren: () => import('./pages/static/app-information/app-information.module').then( m => m.AppInformationPageModule)
  },
  {
    path: 'functioning',
    loadChildren: () => import('./pages/static/functioning/functioning.module').then( m => m.FunctioningPageModule)
  },
  {
    path: 'terms',
    loadChildren: () => import('./pages/static/terms/terms.module').then( m => m.TermsPageModule)
  },
  {
    path: 'contact',
    loadChildren: () => import('./pages/static/contact/contact.module').then( m => m.ContactPageModule)
  },
  {
    path: 'subscriptions',
    loadChildren: () => import('./pages/static/subscriptions/subscriptions.module').then( m => m.SubscriptionsPageModule)
  },
  {
    path: 'food-detail',
    loadChildren: () => import('./pages/nutrition/food-detail/food-detail.module').then( m => m.FoodDetailPageModule)
  },
  {
    path: 'suplements',
    loadChildren: () => import('./pages/nutrition/suplements/suplements.module').then( m => m.SuplementsPageModule)
  },
  {
    path: 'image-modal',
    loadChildren: () => import('./pages/auxiliar/image-modal/image-modal.module').then( m => m.ImageModalPageModule)
  },
  {
    path: 'user-workout-details',
    loadChildren: () => import('./pages/user/user-workout-details/user-workout-details.module').then( m => m.UserWorkoutDetailsPageModule)
  },
  {
    path: 'profile',
    loadChildren: () => import('./pages/user/profile/profile.module').then( m => m.ProfilePageModule)
  },
  {
    path: 'workout-settings',
    loadChildren: () => import('./pages/workOuts/workout-settings/workout-settings.module').then( m => m.WorkoutSettingsPageModule)
  },
  {
    path: 'workout-video-details',
    loadChildren: () => import('./pages/workOuts/workout-video-details/workout-video-details.module').then( m => m.WorkoutVideoDetailsPageModule)
  },
  {
    path: 'workout-video-finish',
    loadChildren: () => import('./pages/workOuts/workout-video-finish/workout-video-finish.module').then( m => m.WorkoutVideoFinishPageModule)
  },
  {
    path: 'influencer-workout',
    loadChildren: () => import('./pages/influencers/influencer-workout/influencer-workout.module').then( m => m.InfluencerWorkoutPageModule)
  },
  {
    path: 'influencer-nutrition',
    loadChildren: () => import('./pages/influencers/influencer-nutrition/influencer-nutrition.module').then( m => m.InfluencerNutritionPageModule)
  },
  {
    path: 'influencer-abs',
    loadChildren: () => import('./pages/influencers/influencer-abs/influencer-abs.module').then( m => m.InfluencerAbsPageModule)
  },
  {
    path: 'influencer-lifestyle',
    loadChildren: () => import('./pages/influencers/influencer-lifestyle/influencer-lifestyle.module').then( m => m.InfluencerLifestylePageModule)
  },
  {
    path: 'preview-page',
    loadChildren: () => import('./pages/auxiliar/preview-page/preview-page.module').then( m => m.PreviewPagePageModule)
  },
  {
    path: 'profile-to-show',
    loadChildren: () => import('./pages/user/profile-to-show/profile-to-show.module').then( m => m.ProfileToShowPageModule)
  },
  {
    path: 'galery-to-show',
    loadChildren: () => import('./pages/user/galery-to-show/galery-to-show.module').then( m => m.GaleryToShowPageModule)
  },
  {
    path: 'user-galery',
    loadChildren: () => import('./pages/user/user-galery/user-galery.module').then( m => m.UserGaleryPageModule)
  },
  {
    path: 'last-chats',
    loadChildren: () => import('./pages/chat/last-chats/last-chats.module').then( m => m.LastChatsPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
