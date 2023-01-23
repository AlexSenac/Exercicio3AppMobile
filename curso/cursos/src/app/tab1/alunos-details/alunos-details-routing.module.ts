import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AlunosDetailsPage } from './alunos-details.page';

const routes: Routes = [
  {
    path: '',
    component: AlunosDetailsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AlunosDetailsPageRoutingModule {}
