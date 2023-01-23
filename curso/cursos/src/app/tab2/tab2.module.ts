import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { Tab2PageRoutingModule } from './tab2-routing.module';
import { Tab2Page } from './tab2.page';
import { FirebaseService } from '../../../../../senac/uc/src/app/services/firebase.service';


@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,    
    Tab2PageRoutingModule
  ],
  declarations: [Tab2Page],
  providers: [FirebaseService]
})
export class Tab2PageModule {}
