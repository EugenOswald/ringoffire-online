import { Component, OnInit } from '@angular/core';
import { Game } from '../../models/game';
import { MatDialog } from '@angular/material/dialog';
import { DialogAddPlayerComponent } from '../dialog-add-player/dialog-add-player.component';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss'],
})
export class GameComponent implements OnInit {
  pickCardAnimation = false;
  enoughPlayers = false;
  currentCard: string = '';
  game: Game;

  constructor(public dialog: MatDialog) {}

  ngOnInit() {
    this.newGame();
  }

  newGame() {
    this.game = new Game(); // die Variabel bekommt ein neues von dem, was wir angelegt haben.
    console.log(this.game);
  }

  takeCard() {
    if (this.enoughPlayers) {
      if (!this.pickCardAnimation) {
        this.currentCard = this.game.stack.pop(); // Pop gibt uns den letzten Wert des Arrays entfernt und angezeigt
        this.pickCardAnimation = true;

        this.game.currentPlayer++;
        this.game.currentPlayer =
          this.game.currentPlayer % this.game.players.length;
        setTimeout(() => {
          this.pickCardAnimation = false;
          this.game.playedCard.push(this.currentCard);
        }, 1000);
      }
    } else {this.openDialog();}
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogAddPlayerComponent);

    dialogRef.afterClosed().subscribe((name: string) => {
      if (name && name.length > 0) {
        this.game.players.push(name);
        if (name.length > 2) {
          this.enoughPlayers = true;
        }
      }
    });
  }
}
