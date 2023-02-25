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


  // Récupérer l'index d'une personne par son id
  getIndexById(id: number) {

    const classmateList: Person[] = this.getPresenceList();
    const personToFind = classmateList.find(person => person.id === id)

    if (personToFind) {
      return classmateList?.indexOf(personToFind);
    } else {
      return 0
    }

  }


  // Retirer une personne de la liste de présence par son id
  removePersonFromPresence(id: number) {
    const presenceList: Person[] = this.getPresenceList();
    const index = this.getIndexById(id);
    presenceList.splice(index, 1);
    this.saveList(presenceList, 'presenceList');
  }

  removePersonFromAbsence(id: number) {
    const absenceList: Person[] = this.getAbsenceList();
    const index = this.getIndexById(id);
    absenceList.splice(index, 1);
    this.saveList(absenceList, 'absenceList');
  }

  // Trouver une personne par son nom
  getClassmateByName(id: number): Person | undefined {
    return CLASSMATES.find(person => person.id === id);
  }

  // Rajouter une personne à la liste de présence
  addPersonToPresence(id: number) {

    let person: Person | undefined = this.getClassmateByName(id);
    const presenceList: Person[] = this.getPresenceList();

    let isPresent: boolean = presenceList.map(item => item.id).includes(id);

    if(person && !isPresent) {
        presenceList.push(person);
        this.removePersonFromAbsence(id);
        this.saveList(presenceList, 'presenceList');
      } else {
        console.log("cette personne n'existe pas : " + id + " " + person + " " + presenceList);
        // TODO : trouver pq parfois l'objet est indéfini
      }

  }

  addPersonToAbsence(id: number) {

    let person: Person | undefined = this.getClassmateByName(id);
    const absenceList: Person[] = this.getAbsenceList();

    let isAbsent: boolean = absenceList.map(item => item.id).includes(id);

    if(person && !isAbsent) {
      absenceList.push(person);
      this.removePersonFromPresence(id);
      this.saveList(absenceList, 'absenceList');
    } else {
      console.log("cette personne n'existe pas ");
    }

  }


}
