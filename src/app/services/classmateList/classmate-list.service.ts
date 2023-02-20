import { Injectable } from '@angular/core';
import { last } from 'rxjs';
import { CLASSMATES, Person } from 'src/app/mocks/classmate.mocks';

@Injectable({
  providedIn: 'root'
})
export class ClassmateListService {

  constructor() { }

  // PRESENCES
  private createPresenceList() {
    const newClassmateList = JSON.stringify(CLASSMATES);
    localStorage.setItem('presenceList', newClassmateList);
  }
  getPresenceList() {
    const classmates = localStorage.getItem('presenceList');
    if (classmates) {
      return JSON.parse(classmates);
    } else {
      this.createPresenceList();
      this.getPresenceList();
    }
  }

  // ABSENCES
  private createAbsenceList() {
    const newAbsenceList = JSON.stringify([]);
    localStorage.setItem('absenceList', newAbsenceList);
  }
  getAbsenceList() {
    const absences = localStorage.getItem('absenceList');
    if (absences) {
      return JSON.parse(absences);
    } else {
      this.createAbsenceList();
      this.getAbsenceList();
    }
  }

  // Enregistre une liste
  private saveList(list: Person[], index: string) {
    localStorage.setItem(index, JSON.stringify(list));
  }


  // Récupérer l'index d'une personne par son lastName
  getIndexByName(lastName: string, listOfPeople = this.getPresenceList()) {
    const classmateList: Person[] = listOfPeople;
    const personToFind = classmateList.find(person => person.lastName === lastName)
    console.log('personToFind', personToFind);
    if (personToFind) {
      return classmateList?.indexOf(personToFind);
    } else {
      return;
    }

  }


  // Retirer une personne de la liste de présence par son lastName
  removePersonFromPresence(lastName: string) {
    const presenceList: Person[] = this.getPresenceList();
    const index = this.getIndexByName(lastName);
    if(!index) return;
    presenceList.splice(index, 1);
    this.saveList(presenceList, 'presenceList');
  }

  removePersonFromAbsence(lastName: string) {
    const absenceList: Person[] = this.getAbsenceList();
    const index = this.getIndexByName(lastName, absenceList);
    if(index !== undefined) {
      absenceList.splice(index, 1);
      this.saveList(absenceList, 'absenceList');
    }
  }

  // Trouver une personne par son nom
  getClassmateByName(lastName: string): Person | undefined {
    return CLASSMATES.find(person => person.lastName === lastName);
  }

  // Rajouter une personne à la liste de présence
  addPersonToPresence(id: number) {

    let person: Person | undefined = CLASSMATES.find((classMate: Person,) => classMate.id === id);

    if(!person) return;

    // let person: Person | undefined = this.getClassmateByName(lastName);
    const presenceList: Person[] = this.getPresenceList();

    let isPresent: boolean = presenceList.some((presentPerson) => presentPerson.lastName === person?.lastName);
    if(!isPresent) {
        presenceList.push(person);
        this.removePersonFromAbsence(person.lastName);
        this.saveList(presenceList, 'presenceList');
      } else {
        console.log("cette personne n'existe pas : " + person.lastName);
        // TODO : trouver pq parfois l'objet est indéfini
      }

  }

  addPersonToAbsence(lastName: string) {

    let person: Person | undefined = this.getClassmateByName(lastName);
    const absenceList: Person[] = this.getAbsenceList();

    let isAbsent: boolean = absenceList.map(item => item.lastName).includes(lastName);

    if(person && !isAbsent) {
      absenceList.push(person);
      this.removePersonFromPresence(lastName);
      this.saveList(absenceList, 'absenceList');
    } else {
      console.log("cette personne n'existe pas ");
    }

  }


}
