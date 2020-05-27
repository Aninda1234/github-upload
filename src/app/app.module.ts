import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';

import { NoSpecialCharsDirective } from './Directives/no-special-chars.directive';
import { AppComponent } from './app.component';
import { GitSearchComponent } from './git-search/git-search.component';
import { HomePageComponent } from './home-page/home-page.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { GitSearchService } from './Services/git-search.service';
import { GitCodeSearchService } from './Services/git-code-search.service';
import { UnifiedSearchService } from './Services/unified-search.service';
import { RepositoryDisplayComponent } from './repository-display/repository-display.component';
import { CodeDisplayComponent } from './code-display/code-display.component';
import { FadeDirective } from './Directives/fade.directive';
import { FavoriteTextPipe } from './Pipes/favorite-text.pipe';

@NgModule({
  declarations: [
    AppComponent,
    GitSearchComponent,
    HomePageComponent,
    NotFoundComponent,
    NoSpecialCharsDirective,
    RepositoryDisplayComponent,
    CodeDisplayComponent,
    FadeDirective,
    FavoriteTextPipe,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    // RouterModule.forRoot(
    //   appRoutes
    // ),
    RouterModule,
    AppRoutingModule,
    ReactiveFormsModule
  ],
  providers: [GitSearchService, GitCodeSearchService, UnifiedSearchService],
  bootstrap: [AppComponent]
})
export class AppModule { }
