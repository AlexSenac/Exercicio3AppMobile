import { Component, OnInit, ViewChild } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormGroupDirective,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Alunos } from 'src/app/models/aluno.model';
import { AulasService } from 'src/app/services/aulas.service';

@Component({
  selector: 'app-alunos-details',
  templateUrl: './alunos-details.page.html',
  styleUrls: ['./alunos-details.page.scss'],
})
export class AlunosDetailsPage implements OnInit {
  aulaFormGroup!: FormGroup;
  @ViewChild('aulaFormGroupDirective')
  aulaFormGroupDirective!: FormGroupDirective;
  public alunos!: Alunos;

  constructor(
    private aulasService: AulasService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    this.aulasService.find(id!).subscribe({
      next: (data: Alunos) => {
        if (!data) {
          this.router.navigateByUrl('/tabs/list');
        } else {
          this.alunos = data;

          this.aulaFormGroup = new FormGroup({
            nome: new FormControl(this.alunos.nome, Validators.required),
            cpf: new FormControl(this.alunos.cpf, Validators.required),
            email: new FormControl(this.alunos.email, Validators.required),
            username: new FormControl(
              this.alunos.username,
              Validators.required
            ),
            senha: new FormControl(this.alunos.senha, Validators.required),
            categoria: new FormControl(
              this.alunos.categoria,
              Validators.required
            ),
            primeiraNota: new FormControl(
              this.alunos.primeiraNota,
              Validators.required
            ),
            segundaNota: new FormControl(
              this.alunos.segundaNota,
              Validators.required
            ),
            mediaFinal: new FormControl(
              this.alunos.mediaFinal,
              Validators.required
            ),
            cep: new FormControl(this.alunos.cep, Validators.required),
            logradouro: new FormControl(
              this.alunos.logradouro,
              Validators.required
            ),
            numero: new FormControl(this.alunos.numero, Validators.required),
            bairro: new FormControl(this.alunos.bairro, Validators.required),
            localidade: new FormControl(
              this.alunos.localidade,
              Validators.required
            ),
          });
        }
      },
      error: (err) => console.error(`Error on get aluno data. Error: ${err}`),
    });
  }

  editAlunos(values: any) {
    let updateAlunos: Alunos = { id: this.alunos.id, ...values };
    this.aulasService
      .update(updateAlunos)
      .then(() => this.router.navigateByUrl('/tabs/list'))
      .catch((err) => console.error(err));

    this.aulaFormGroupDirective.reset();
  }

  deleteAlunos() {
    this.aulasService
      .delete(this.alunos.id)
      .then(() => this.router.navigateByUrl('/tabs/list'))
      .catch((err) => console.error(err));
  }
}
