import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NbaPredictionsComponent } from './components/nba-predictions/nba-predictions.component';
import { MlbPredictionsComponent } from './components/mlb-predictions/mlb-predictions.component';
import { JumbotronComponent } from './core/jumbotron/jumbotron.component';

const routes: Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full'},
    { path: 'home', component: JumbotronComponent },
  { path: 'nba-predictions', component: NbaPredictionsComponent },
  { path: 'mlb-predictions', component: MlbPredictionsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
