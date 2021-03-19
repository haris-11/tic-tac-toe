import { Component, HostBinding, OnInit } from '@angular/core';
import * as confetti from 'canvas-confetti';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  randomNum = Math.random() * 4;
  title = 'tic-tac-toe';
  squares: any[];
  xIsNext: boolean;
  winnerFound = false;
  value;
  boardLength;
  winner;
  toggleControl = new FormControl(false);
  @HostBinding('class') className = '';

  constructor() { }
  ngOnInit() {
    this.squares = [];
    this.xIsNext = Math.random() < 0.5;
    this.resetGame();
    let rows = new Array(3);
    for (let x = 0; x < 3; x++) {
      rows[x] = new Array(3);
    }
    this.squares = rows;
  }

  resetGame() {
    this.squares = [];
    this.squares.push(Array(3).fill(""));
    this.squares.push(Array(3).fill(""));
    this.squares.push(Array(3).fill(""));
    this.winner = null;
    this.winnerFound = false;
    this.xIsNext = Math.random() < 0.5;
  }

  get NextPlayer() {
    return this.xIsNext ? 'X' : 'O';
  }

  handleClickEvent(i, j: number) {
    if (!this.squares[i][j]) {
      this.squares[i][j] = (this.NextPlayer);
      this.xIsNext = !this.xIsNext;
    }
    if (this.winnerFound && this.winner) {
      this.resetGame();
    }
    this.checkForWinner();
  }

  checkForWinner() {
    this.checkHorizontal();
    this.checkVertical();
    this.checkDiagonals();
    this.winner;
    if (this.winnerFound && this.winner) {
      this.launch();
    }
  }
  checkHorizontal() {
    for (let i = 0; i < this.squares.length; i++) {
      if (this.squares[i][0] && this.squares[i][1] && this.squares[i][0] === this.squares[i][1] && this.squares[i][0] === this.squares[i][2]) {
        this.winnerFound = true;
        this.winner = this.squares[i][0];
        console.log(i);
      }
    }
  }

  checkVertical() {
    for (let i = 0; i < this.squares.length; i++) {
      if (this.squares[0][i] && this.squares[1][i] && this.squares[0][i] === this.squares[1][i] && this.squares[0][i] === this.squares[2][i]) {
        this.winnerFound = true;
        this.winner = this.squares[0][i];
      }
    }
  }

  checkDiagonals() {
    if (this.squares[1][1] &&
      ((this.squares[1][1] === this.squares[0][0] && this.squares[1][1] === this.squares[2][2]) ||
        (this.squares[1][1] === this.squares[2][0] && this.squares[1][1] === this.squares[0][2]))) {
      this.winnerFound = true;
      this.winner = this.squares[1][1];
    }
  }

  launch() {
    confetti.create(undefined, { resize: true, useWorker: false })({
      angle: 100,
      spread: 250,
      startVelocity: 80,
      particleCount: 900,
      ticks: 400,
      origin: {
        x: 0.5,
        y: 0.8
      }
    });
  }
}
