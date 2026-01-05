import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import 'bootstrap';
import { HomeComponent } from './pages/home/home.component';
import { AboutComponent } from './pages/about/about.component';
import { PracticeareaComponent } from './pages/practicearea/practicearea.component';
import { BlogComponent } from './pages/blog/blog.component';
import { GalleryComponent } from './pages/gallery/gallery.component';
import { ContactusComponent } from './pages/contactus/contactus.component';
import { CareerComponent } from './pages/career/career.component';
import { BlogDetailsComponent } from './pages/blog-details/blog-details.component';
import { ServiceComponent } from './pages/service/service.component';
import { ServiceDetailsComponent } from './pages/service-details/service-details.component';
import { TeamDetailsComponent } from './pages/team-details/team-details.component';
import { ResourcesComponent } from './pages/resources/resources.component';
const routes: Routes = [
  {path:'', component: HomeComponent},
  {path:'about', component: AboutComponent},
  {path:'practice-area', component: PracticeareaComponent},
  {path:'blog', component: BlogComponent},
  {path:'resources', component: ResourcesComponent},
  {path:'gallery', component: GalleryComponent},
  {path:'contactus', component: ContactusComponent},
  {path:'career', component: CareerComponent},
  {path:'blog-details/:slug', component: BlogDetailsComponent},
  {path:'service', component: ServiceComponent},
  {path:'service-details/:id', component: ServiceDetailsComponent},
  {path:'team-details', component:TeamDetailsComponent},
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      scrollPositionRestoration: 'enabled',
      anchorScrolling: 'enabled',
    }),
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
