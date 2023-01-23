import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Alunos } from '../models/aluno.model';
import { AulasService } from '../services/aulas.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  alunos!: Observable<Alunos[]>

  constructor(private aulasService: AulasService,
    private router: Router) {
    this.alunos = this.aulasService.list();
  }

  newAlunos() {
    this.router.navigateByUrl('/tabs/register');
  }

  editAlunos(id: string) {
    this.router.navigateByUrl(`/tabs/details/${id}`);
  }

}
