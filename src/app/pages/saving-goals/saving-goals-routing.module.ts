import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SavingGoalsComponent } from './saving-goals.component';

const routes: Routes = [
  {
    path: 'saving-goals',
    component: SavingGoalsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SavingGoalsRoutingModule {}
