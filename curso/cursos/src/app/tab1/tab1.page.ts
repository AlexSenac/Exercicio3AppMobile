import { Component, OnInit, ViewChild } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormGroupDirective,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { Alunos } from '../models/aluno.model';
import { Endereco } from '../models/endereco.model';
import { AulasService } from '../services/aulas.service';
import { CorreiosService } from '../services/correios.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
})
export class Tab1Page implements OnInit {
  aulaFormGroup!: FormGroup;
  @ViewChild('aulaFormGroupDirective')
  aulaFormGroupDirective!: FormGroupDirective;

  constructor(
    private aulasService: AulasService,
    private correiosService: CorreiosService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.aulaFormGroup = new FormGroup({
      nome: new FormControl('', [
        Validators.required,
        Validators.pattern(/^[a-zA-Z]/),
        Validators.minLength(6),
        Validators.maxLength(60),
      ]),
      cpf: new FormControl('', [
        Validators.required,
        Validators.pattern(/^\d{3}\.\d{3}\.\d{3}\-\d{2}$/),
      ]),
      email: new FormControl('', [
        Validators.required,
        Validators.pattern(/^[a-z0-9.]+@[a-z0-9]+\.[a-z]+\.([a-z]+)?$/i),
      ]),
      username: new FormControl('', [Validators.required]),
      senha: new FormControl('', [Validators.required]),
      categoria: new FormControl('', [Validators.required]),
      primeiraNota: new FormControl('', [Validators.required]),
      segundaNota: new FormControl('', [Validators.required]),      
      mediaFinal: new FormControl('', [Validators.required]),
      cep: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(12),
      ]),
      logradouro: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(100),
      ]),
      numero: new FormControl('', [
        Validators.required,
        Validators.minLength(1),
        Validators.maxLength(6),
        Validators.pattern(/^[0-9]+$/),
      ]),
      bairro: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(100),
      ]),
      localidade: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(100),
      ]),
    });
  }

  createAlunos(values: any) {
    let newAlunos: Alunos = { ...values };
    this.aulasService.save(newAlunos);
    console.log(newAlunos);
    this.aulaFormGroupDirective.reset();
  }

  calcular(): void {
    let primeiraNota = this.aulaFormGroup.get('primeiraNota')?.value;
    let segundaNota = this.aulaFormGroup.get('segundaNota')?.value;   
    let calcMedia = (parseInt(primeiraNota) + parseInt(segundaNota))/2;
    this.aulaFormGroup.patchValue({
      mediaFinal: calcMedia,
    });
    const resultFinal = '';
    if (calcMedia >= 6) {
      alert('Aluno aprovado!');
    } else {
      alert('Aluno reprovado!');
    }
  }

  loadEndereco() {
    const cep: string = this.aulaFormGroup.get('cep')?.value;
    this.correiosService.getEndereco(cep).subscribe({
      next: (result: Endereco) => {
        this.aulaFormGroup.patchValue({
          cep: result.cep,
          logradouro: result.logradouro,
          bairro: result.bairro,
          localidade: result.localidade,
        });
      },
      error: (err) => {
        console.error(err);
      },
    });
  }

  uploadImage(event: FileList) {
    const file = event.item(0);

    if (file?.type.split('/')[0] !== 'image') {
      console.error('Tipo de arquivo inválido');
      return;
    }
  }
}
