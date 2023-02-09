import { Component } from '@angular/core';
import { Person } from 'src/app/mocks/classmate.mocks';
import { ClassmateListService } from 'src/app/services/classmateList/classmate-list.service';

@Component({
  selector: 'app-denonciator',
  templateUrl: './denonciator.component.html',
  styleUrls: ['./denonciator.component.css']
})
export class DenonciatorComponent {

  gameRunning: boolean = false;
  endGame: boolean = false;
  availableClassmates?: Person[];
  randomPerson?: Person;

  constructor(public classmateListService: ClassmateListService) { }

  initGame() {
    if (this.gameRunning === false) {
      this.isGameRunning();
      this.getAvailableClassmates();
      this.shuffleClassmates();
      this.getRandomPerson();
      console.log("false", this.availableClassmates);

    } else if (this.availableClassmates?.length === 0) {
      this.endGame = true;

    } else {
      this.getRandomPerson();
      console.log("true", this.availableClassmates);
    }

  }

  // Le jeu est-il en cours ?
  isGameRunning() {
    this.gameRunning = true;
  }

  // Récupérer la liste de présence
  getAvailableClassmates() {
    this.availableClassmates = this.classmateListService.getPresenceList();
  }

  // Mélange la liste
  shuffleClassmates() {
    this.availableClassmates?.sort(() => Math.random() - 0.5);
  }

  // Obtenir une personne au hasard
  getRandomPerson() {
    this.randomPerson = this.availableClassmates?.pop();
    return this.randomPerson
  }

}
