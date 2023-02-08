import { Component } from '@angular/core';
import { Person } from 'src/app/mocks/classmate.mocks';
import { ClassmateListService } from 'src/app/services/classmateList/classmate-list.service';

@Component({
  selector: 'app-gestion-absences',
  templateUrl: './gestion-absences.component.html',
  styleUrls: ['./gestion-absences.component.css']
})
export class GestionAbsencesComponent {

  constructor(public classmateListService: ClassmateListService) {}

  classmates: Person[] = [];

  ngOnInit() {
    this.getClassmatesList();
  }

  getClassmatesList() {
    this.classmates = this.classmateListService.getClassmateList();
  }

}
