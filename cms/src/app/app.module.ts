import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
// import { ContactsComponent } from './contacts/contacts.component';
// import { ContactDetailComponent } from './contact-detail/contact-detail.component';
// import { ContactListComponent } from './contact-list/contact-list.component';
import { HeaderComponent } from './header.component';

@NgModule({
  declarations: [

  ],
  imports: [
    BrowserModule,
    AppComponent,
    // ContactsComponent,
    // ContactDetailComponent,
    // ContactListComponent,
    HeaderComponent
  ],
  providers: [],
  bootstrap: []
})
export class AppModule { }
