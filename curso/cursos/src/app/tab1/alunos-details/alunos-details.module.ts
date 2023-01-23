import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AlunosDetailsPageRoutingModule } from './alunos-details-routing.module';

import { AlunosDetailsPage } from './alunos-details.page';
import { HttpClientModule } from '@angular/common/http';
import { AulasService } from 'src/app/services/aulas.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,

    IonicModule,
    AlunosDetailsPageRoutingModule
  ],
  declarations: [AlunosDetailsPage],
  providers:[AulasService]
})
export class AlunosDetailsPageModule {}
