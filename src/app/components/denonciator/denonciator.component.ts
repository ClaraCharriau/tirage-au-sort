import { Component } from '@angular/core';
import { CLASSMATES, Person } from 'src/app/mocks/classmate.mocks';

@Component({
  selector: 'app-denonciator',
  templateUrl: './denonciator.component.html',
  styleUrls: ['./denonciator.component.css']
})
export class DenonciatorComponent {

  // Mock
  classmates: Person[] = CLASSMATES;

  gameRunning: boolean = false;
  endGame: Boolean = false;
  availableClassmates?: Person[] = new Array();
  randomPerson?: Person;

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


  isGameRunning() {
    this.gameRunning = true;
  }

  getAvailableClassmates() {
    for (let i = 0 ; i < CLASSMATES.length ; i++ ) {
      this.availableClassmates?.push(CLASSMATES[i]);
    }
  }

  shuffleClassmates() {
    this.availableClassmates?.sort(()=> Math.random() - 0.5);
  }

  getRandomPerson() {
    this.randomPerson = this.availableClassmates?.pop();
    return this.randomPerson
  }



}
