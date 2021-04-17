import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
// primeng UI Components
import { ToastModule } from 'primeng/toast';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ProgressSpinnerModule} from 'primeng/progressspinner';
import {GalleriaModule} from 'primeng/galleria';
import {AutoCompleteModule} from 'primeng/autocomplete';

import { APP_BASE_HREF } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { HomepageComponent } from './homepage/homepage.component';
import { AboutComponent } from './about/about.component';
import { FrameworkComponent } from './framework/framework.component';
// import { MovieListComponent } from './movie-list/movie-list.component';
import { CreateComponent } from './create/create.component';
import { DetailsPageComponent } from './details-page/details-page.component';
import { PageHeaderComponent } from './page-header/page-header.component';
import { RatingStarsComponent } from './rating-stars/rating-stars.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { PetListComponent } from './pet-list/pet-list.component';

@NgModule({
  declarations: [
    HomepageComponent,
    AboutComponent,
    FrameworkComponent,
    // MovieListComponent,
    CreateComponent,
    DetailsPageComponent,
    PageHeaderComponent,
    RatingStarsComponent,
    PetListComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot([
      {
        path: '',
        component: HomepageComponent
      },
      {
        path: 'about',
        component: AboutComponent
      },
      {
        path: 'list',
        component: PetListComponent
      },
      {
        path: 'list/:movieid',
        component: DetailsPageComponent
      },
      {
        path: 'new',
        component: CreateComponent
      },
      {
        path: 'edit/:movieid',
        component: CreateComponent
      }
    ]),
    ToastModule,
    BrowserAnimationsModule,
    ProgressSpinnerModule,
    GalleriaModule,
    AutoCompleteModule,
    NgbModule
  ],
  providers: [],
  bootstrap: [FrameworkComponent]
})
export class AppModule { }
