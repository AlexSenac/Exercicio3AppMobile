import { Component, OnInit, ViewChild } from '@angular/core';
import {
  FormGroup,
  FormGroupDirective,
  FormControl,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { Alunos } from '../models/aluno.model';
import { AulasService } from '../services/aulas.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss'],
})
export class Tab3Page implements OnInit {
  alunosList!: Alunos[];
  searchFG!: FormGroup;

  @ViewChild('searchFGD') searchFGD!: FormGroupDirective;

  constructor(
    private toastController: ToastController,
    private aulasService: AulasService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.searchFG = new FormGroup({
      nome: new FormControl('', Validators.required),
    });
  }

  search(alunos: any) {
    this.aulasService.findByName(alunos.nome).subscribe({
      next: (result) => {
        if (!result) {
          this.presentToast(`Nome não encontrado: ${alunos.nome}`);
        }
        this.alunosList = result as Alunos[];
      },
      error: (err) => {
        console.log(err);
        this.presentToast(`Service unavailable`);
      },
    });
    this.searchFG.reset();
  }

  async presentToast(msg: string) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 2500,
      position: 'middle',
    });
    await toast.present();
  }

  editAlunos(id: string) {
    this.router.navigateByUrl(`/tabs/details/${id}`);
  }
}
