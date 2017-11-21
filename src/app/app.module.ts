import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import  firebase  from 'firebase';

import { MyApp } from './app.component';
import { TabsPage } from '../pages/tabs/tabs';
import { LibraryPage } from '../pages/library/library';
import { FavoritesPage } from '../pages/favorites/favorites';
import { QuotesPage } from '../pages/quotes/quotes';
import { QuotePage } from '../pages/quote/quote';
import { PopoverPage } from '../pages/popover/popover';
import { AddQuotePage } from '../pages/add-quote/add-quote';
import { SettingsPage } from '../pages/settings/settings';
import { QuotesService } from '../services/quotes';
import { SettingsService } from '../services/settings';
import { SigninPage } from '../pages/signin/signin';
import { SignupPage } from '../pages/signup/signup';
import { authService } from '../services/auth';
import { HttpModule } from '@angular/http';

@NgModule({
  declarations: [
    MyApp,
    TabsPage,
    LibraryPage,
    FavoritesPage,
    QuotesPage,
    QuotePage,
    AddQuotePage,
    SettingsPage,
    SigninPage,
    SignupPage,
    PopoverPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    TabsPage,
    LibraryPage,
    FavoritesPage,
    QuotesPage,
    QuotePage,
    AddQuotePage,
    SettingsPage,
    SigninPage,
    SignupPage,
    PopoverPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    QuotesService,
    SettingsService,
    authService,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
