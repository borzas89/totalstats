import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgbCollapseModule } from '@ng-bootstrap/ng-bootstrap';
import { NavbarComponent } from './core/navbar/navbar.component';
import { NbaPredictionsComponent } from './components/nba-predictions/nba-predictions.component';
import { MlbPredictionsComponent } from './components/mlb-predictions/mlb-predictions.component';
import { PredictionService } from './service/prediction.service';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { HttpClientJsonpModule, HttpClientModule} from "@angular/common/http";
import { PredictionCardComponent } from './components/prediction-card/prediction-card.component';
import { FooterComponent } from './core/footer/footer.component';
import { JumbotronComponent } from './core/jumbotron/jumbotron.component';
import {MatOptionModule} from "@angular/material/core";
import {FormsModule} from "@angular/forms";
import { ForbiddenComponent } from './page/forbidden/forbidden.component';
import { AcbPredictionsComponent } from './components/acb-predictions/acb-predictions.component';
import { MlbResultsComponent } from './components/mlb-results/mlb-results.component';
import { MlbDetailsComponent } from './components/mlb-details/mlb-details.component';
import { WnbaPredictionsComponent } from './components/wnba-predictions/wnba-predictions.component';
import { NflPredictionsComponent } from './components/nfl-predictions/nfl-predictions.component';
import { DeepLinkTestComponent } from './components/deep-link-test/deep-link-test.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    NbaPredictionsComponent,
    MlbPredictionsComponent,
    PredictionCardComponent,
    FooterComponent,
    JumbotronComponent,
    ForbiddenComponent,
    AcbPredictionsComponent,
    MlbResultsComponent,
    MlbDetailsComponent,
    WnbaPredictionsComponent,
    NflPredictionsComponent,
    DeepLinkTestComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    HttpClientJsonpModule,
    MatTableModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatInputModule,
    NgbModule,
    NgbCollapseModule,
    MatOptionModule,
    FormsModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
