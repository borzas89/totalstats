import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AcbPredictionsComponent } from './components/acb-predictions/acb-predictions.component';
import { NbaPredictionsComponent } from './components/nba-predictions/nba-predictions.component';
import { NflPredictionsComponent } from './components/nfl-predictions/nfl-predictions.component';
import { WnbaPredictionsComponent } from './components/wnba-predictions/wnba-predictions.component';
import { MlbPredictionsComponent } from './components/mlb-predictions/mlb-predictions.component';
import { MlbResultsComponent } from './components/mlb-results/mlb-results.component';
import { MlbDetailsComponent } from './components/mlb-details/mlb-details.component';
import { JumbotronComponent } from './core/jumbotron/jumbotron.component';
import { DeepLinkTestComponent } from './components/deep-link-test/deep-link-test.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full'},
  { path: 'home', component: JumbotronComponent },
  { path: 'nba-predictions', component: NbaPredictionsComponent },
  { path: 'wnba-predictions', component: WnbaPredictionsComponent },
  { path: 'mlb-predictions', component: MlbPredictionsComponent },
  { path: 'acb-predictions', component: AcbPredictionsComponent },
  { path: 'nfl-predictions', component: NflPredictionsComponent },
  { path: 'mlb-results', component: MlbResultsComponent },
  { path: 'mlb-details/:date/:gamePk', component: MlbDetailsComponent },
  { path: 'secret-deep-link-test', component: DeepLinkTestComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
