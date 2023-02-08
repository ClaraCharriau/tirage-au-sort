import { Injectable } from '@angular/core';
import { CLASSMATES, Person } from 'src/app/mocks/classmate.mocks';

@Injectable({
  providedIn: 'root'
})
export class ClassmateListService {

  constructor() { }

  // Retourne toute la liste de la classe
  getAllClassmates(): Person[] {
    return CLASSMATES;
  }

  // Enregistrement de la liste dans localStorage
  private createClassmateList() {
    const newClassmateList = JSON.stringify(CLASSMATES);
    localStorage.setItem('classmates', newClassmateList);
  }

  getClassmateList() {
    const classmates = localStorage.getItem('classmates');
    if (classmates) {
      return JSON.parse(classmates);
    } else {
      this.createClassmateList();
      this.getClassmateList();
    }
  }

  // Trouver une personne par son nom
  getClassmateByName(lastName: string): Person | undefined {
    return CLASSMATES.find(person => person.lastName === lastName);
  }



}
