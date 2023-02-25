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

  // Récupérer la liste de présence et absence au lancement de l'app
  ngOnInit(): void {
    this.getAvailableClassmates();
  }

  // Au clic sur le bouton, lancement du jeu
  initGame(): void {
    if (this.gameRunning === false) {
      this.isGameRunning();
      this.shuffleClassmates();
      this.getRandomPerson();

    } else if (this.availableClassmates?.length === 0) {
      this.endGame = true;

    } else {
      this.getRandomPerson();
    }
  }

  // Le jeu est-il en cours ?
  isGameRunning(): boolean {
    this.gameRunning = true;
    return this.gameRunning
  }

  // Récupérer la liste de présence
  getAvailableClassmates(): void {
    this.availableClassmates = this.classmateListService.getPresenceList();
  }

  // Mélange la liste
  shuffleClassmates(): void {
    this.availableClassmates?.sort(() => Math.random() - 0.5);
  }

  // Obtenir une personne au hasard
  getRandomPerson(): Person | undefined {
    this.randomPerson = this.availableClassmates?.pop();
    return this.randomPerson
  }

  // Remettre à zéro
  reloadPage(): void {
    location.reload();
  }

}
