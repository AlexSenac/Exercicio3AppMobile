import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { AulasService } from '../services/aulas.service';
import { CorreiosService } from '../services/correios.service';
import { Tab1PageRoutingModule } from './tab1-routing.module';
import { Tab1Page } from './tab1.page';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    Tab1PageRoutingModule,
  ],
  declarations: [Tab1Page],
  providers: [AulasService, CorreiosService],
})
export class Tab1PageModule {}
