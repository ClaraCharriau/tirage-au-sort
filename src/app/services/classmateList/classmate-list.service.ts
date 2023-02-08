import { Injectable } from '@angular/core';
import { CLASSMATES, Person } from 'src/app/mocks/classmate.mocks';

@Injectable({
  providedIn: 'root'
})
export class ClassmateListService {

  constructor() { }

  // Enregistrement de la liste dans localStorage
  private createClassmateList() {
    const newClassmateList = JSON.stringify([this.getAllClassmates()]);
    localStorage.setItem('classmate', newClassmateList);
  }

  public getClassmateList() {
    const classmates = localStorage.getItem('classmates');
    if(classmates) {
      return JSON.parse(classmates);
    } else {
      this.createClassmateList();
      this.getClassmateList();
    }
  }

  // Retourne toute la liste de la classe
  getAllClassmates(): Person[] {
    return CLASSMATES;
  }
  // Trouver une personne par son nom
  getClassmateByName(lastName: string): Person | undefined {
    return CLASSMATES.find(person => person.lastName === lastName);
  }



}
