import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Person } from 'src/app/mocks/classmate.mocks';
import { ClassmateListService } from 'src/app/services/classmateList/classmate-list.service';

@Component({
  selector: 'app-gestion-absences',
  templateUrl: './gestion-absences.component.html',
  styleUrls: ['./gestion-absences.component.css']
})
export class GestionAbsencesComponent {

  public absenceForm!: FormGroup;
  classmates: Person[] = [];
  absenceList: Person[] = [];
  affichageWomen: boolean = false;
  affichageMen: boolean = false;

  constructor(public classmateListService: ClassmateListService, private formBuilder: FormBuilder) {}


  ngOnInit() {
    this.getPresenceList();
    this.getAbsenceList();
    this.initAbsenceForm();

    this.affichageWomen = this.checkForWomen();
    this.affichageMen = this.checkForMen();
  }

  getPresenceList() {
    this.classmates = this.classmateListService.getPresenceList();
  }

  getAbsenceList() {
    this.absenceList = this.classmateListService.getAbsenceList();
  }

  initAbsenceForm() {
    this.absenceForm = this.formBuilder.group({
      classmates: [null]
    })
  }

  onFormSubmit() {
    // Mettre la personne dans la liste des absents
    this.classmateListService.addPersonToAbsence(this.absenceForm.value.classmates)

    // rafraichir le composant, pour mettre à jour le sélecteur
    this.ngOnInit();
  }

  addPersonBack(id: number) {
    this.classmateListService.addPersonToPresence(id);
    this.ngOnInit();
  }

  // Pour l'affichage des absentes
  checkForWomen() {
    let absenceList: Person[] = this.classmateListService.getAbsenceList();

    if(absenceList.length > 0 && absenceList.map(item => item.genre).includes("Femme")) {
      return true
    } else {
      return false
    }
  
  }
  checkForMen() {
    let absenceList: Person[] = this.classmateListService.getAbsenceList();

    if(absenceList.length > 0 && absenceList.map(item => item.genre).includes("Homme")) {
      return true
    } else {
      return false
    }
  
  }

}
