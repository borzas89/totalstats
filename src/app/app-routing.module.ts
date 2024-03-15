import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NbaPredictionsComponent } from './components/nba-predictions/nba-predictions.component';
import { MlbPredictionsComponent } from './components/mlb-predictions/mlb-predictions.component';

const routes: Routes = [
  {path: '', redirectTo: 'mlb-predictions', pathMatch: 'full'},
  { path: 'nba-predictions', component: NbaPredictionsComponent},
  { path: 'mlb-predictions', component: MlbPredictionsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
