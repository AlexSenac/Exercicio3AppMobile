import { Injectable } from '@angular/core';
import {
  collection,
  collectionData,
  deleteDoc,
  doc,
  docSnapshots,
  Firestore,
  setDoc,
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Alunos } from '../models/aluno.model';

@Injectable({
  providedIn: 'root',
})
export class AulasService {
  constructor(private firestore: Firestore) {}

  save(alunos: Alunos): Promise<void> {
    const document = doc(collection(this.firestore, 'alunos'));
    return setDoc(document, alunos);
  }

  list(): Observable<Alunos[]> {
    const alunosCollection = collection(this.firestore, 'alunos');
    return collectionData(alunosCollection, { idField: 'id' }).pipe(
      map((result) => result as Alunos[])
    );
  }

  find(id: string): Observable<Alunos> {
    const document = doc(this.firestore, `alunos/${id}`);
    return docSnapshots(document).pipe(
      map((doc) => {
        const id = doc.id;
        const data = doc.data();
        return { id, ...data } as Alunos;
      })
    );
  }

  findByName(nome: string): Observable<Alunos[]> {
    const alunosList = this.list();
    return alunosList.pipe(
      map((alunos) =>
        alunos.filter((alunos) => {
          const fullName = alunos.nome.concat('', alunos.username);
          return fullName.toLowerCase().match(nome.toLowerCase());
        })
      )
    );
  }

  update(alunos: Alunos): Promise<void> {
    const document = doc(this.firestore, 'alunos', alunos?.id);
    const { id, ...data } = alunos;
    return setDoc(document, data);
  }

  delete(id: string): Promise<void> {
    const document = doc(this.firestore, 'alunos', id);
    console.log(document);
    return deleteDoc(document);
  }
}
