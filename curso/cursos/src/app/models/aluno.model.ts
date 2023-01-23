import { Materias } from './aula.enum';
import { Endereco } from './endereco.model';
export class Alunos {
  id!: string;
  nome!: string;
  cpf!: string;
  email!: string;
  username!: string;
  senha!: string;
  categoria!: Materias;
  primeiraNota!: number;
  segundaNota!: number;
  mediaFinal!: number;
  cep!: string;
  logradouro!: string;
  bairro!: string;
  localidade!: string;
  numero!: number;
  endereco!: Endereco;
}
