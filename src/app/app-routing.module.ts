import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {MobileAverageComponent} from './mobile-average/mobile-average.component';

const routes: Routes = [
  // {path: '*', component: MobileAverageComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
