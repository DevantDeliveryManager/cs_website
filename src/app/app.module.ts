import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { AboutComponent } from './pages/about/about.component';
import { HeaderComponent } from './pages/shared/header/header.component';
import { FooterComponent } from './pages/shared/footer/footer.component';
import { PracticeareaComponent } from './pages/practicearea/practicearea.component';
import { BlogComponent } from './pages/blog/blog.component';
import { GalleryComponent } from './pages/gallery/gallery.component';
import { ContactusComponent } from './pages/contactus/contactus.component';
import { CareerComponent } from './pages/career/career.component';
import { BlogDetailsComponent } from './pages/blog-details/blog-details.component';
import { ServiceComponent } from './pages/service/service.component';
import { ServiceDetailsComponent } from './pages/service-details/service-details.component';
import { TeamDetailsComponent } from './pages/team-details/team-details.component';
import { OurPartnerComponent } from './pages/our-partner/our-partner.component';
import { ResourcesComponent } from './pages/resources/resources.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AboutComponent,
    HeaderComponent,
    FooterComponent,
    PracticeareaComponent,
    BlogComponent,
    GalleryComponent,
    ContactusComponent,
    CareerComponent,
    BlogDetailsComponent,
    ServiceComponent,
    ServiceDetailsComponent,
    TeamDetailsComponent,
    OurPartnerComponent,
    ResourcesComponent,

  ],
  imports: [
    BrowserAnimationsModule,
    AppRoutingModule,
    BrowserModule,
    FormsModule,
    HttpClientModule,
    BsDropdownModule.forRoot(),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
