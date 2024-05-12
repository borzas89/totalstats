import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AcbPredictionsComponent } from './components/acb-predictions/acb-predictions.component';
import { NbaPredictionsComponent } from './components/nba-predictions/nba-predictions.component';
import { MlbPredictionsComponent } from './components/mlb-predictions/mlb-predictions.component';
import { MlbResultsComponent } from './components/mlb-results/mlb-results.component';
import { MlbDetailsComponent } from './components/mlb-details/mlb-details.component';
import { JumbotronComponent } from './core/jumbotron/jumbotron.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full'},
  { path: 'home', component: JumbotronComponent },
  { path: 'nba-predictions', component: NbaPredictionsComponent },
  { path: 'mlb-predictions', component: MlbPredictionsComponent },
  { path: 'acb-predictions', component: AcbPredictionsComponent },
  { path: 'mlb-results', component: MlbResultsComponent },
  { path: 'mlb-details/:id', component: MlbDetailsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
