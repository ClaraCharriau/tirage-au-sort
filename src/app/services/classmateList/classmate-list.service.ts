import { Injectable } from '@angular/core';
import { CLASSMATES, Person } from 'src/app/mocks/classmate.mocks';

@Injectable({
  providedIn: 'root'
})
export class ClassmateListService {

  constructor() { }

  // PRESENCES - LOCAL STORAGE
  private createPresenceList(): void {
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

  // ABSENCES - LOCAL STORAGE
  private createAbsenceList(): void {
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
  private saveList(list: Person[], index: string): void {
    localStorage.setItem(index, JSON.stringify(list));
  }

  // Trouver une personne par son nom
  getClassmateByName(lastName: string): Person | undefined {
    return CLASSMATES.find(person => person.lastName === lastName);
  }

  // Trouver l'index d'une personne par son id
  getIndexById(id: number, listOfClassmates = this.getPresenceList()) {

    const classmateList: Person[] = listOfClassmates;
    const personToFind = classmateList.find(person => person.id === id)

    if (personToFind) {
      return classmateList?.indexOf(personToFind);
    } else {
      return
    }
  }

  // Retirer une personne de la liste de présence par son id
  removePersonFromPresence(id: number): void {
    const presenceList: Person[] = this.getPresenceList();
    const index = this.getIndexById(id);
    if (!index) return;
    presenceList.splice(index, 1);
    this.saveList(presenceList, 'presenceList');
  }

  // Retirer une personne de la liste d'absence par son id
  removePersonFromAbsence(id: number): void {
    const absenceList: Person[] = this.getAbsenceList();
    const index = this.getIndexById(id, absenceList);
    if (index !== undefined) {
      absenceList.splice(index, 1);
      this.saveList(absenceList, 'absenceList');
    }
  }

  // Ajouter une personne à la liste d'absence
  addPersonToAbsence(lastName: string): void {

    let person: Person | undefined = this.getClassmateByName(lastName);
    const absenceList: Person[] = this.getAbsenceList();

    if (!person) return;
    let id = person?.id;

    let isAbsent: boolean = absenceList.map(item => item.id).includes(id);

    if (person && !isAbsent) {
      absenceList.push(person);
      this.removePersonFromPresence(person.id);
      this.saveList(absenceList, 'absenceList');
    } else {
      console.log("addToAbsence impossible : ", person?.lastName);
    }

  }

  // Rajouter une personne à la liste de présence
  addPersonToPresence(id: number): void {

    let person: Person | undefined = CLASSMATES.find((classmate: Person) => classmate.id === id);

    if (!person) return;

    const presenceList: Person[] = this.getPresenceList();

    let isPresent: boolean = presenceList.some((presentPerson) => presentPerson.lastName === person?.lastName);

    if (!isPresent) {
      presenceList.push(person);
      this.removePersonFromAbsence(person.id);
      this.saveList(presenceList, 'presenceList');
    } else {
      console.log("addToPresence impossible : " + person.lastName);
    }

  }


}
