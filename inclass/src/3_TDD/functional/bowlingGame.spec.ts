import { createBowlingGame } from "./bowlingGame";

describe('Pruebas Funcionales del Juego de Bolos', () => {
  let juego = createBowlingGame();

  beforeEach(() => {
    juego = juego.resetState();
  });

  it('debería obtener un juego de 0 puntos', () => {
    juego = rollManyTimes(20, 0, juego);
    expect(juego.getFinalScore()).toBe(0);
  });

  it('debería obtener un juego de todo unos', () => {
    juego = rollManyTimes(20, 1, juego);
    expect(juego.getFinalScore()).toBe(20);
  });

  it('debería obtener un juego con un spare', () => {
    juego = rollSpare(juego);
    juego = juego.rollBall(3);

    juego = rollManyTimes(17, 0, juego);
    expect(juego.getFinalScore()).toBe(16);
  });

  it('debería obtener un juego con un strike', () => {
    juego = juego.rollBall(10);
    juego = juego.rollBall(3);
    juego = juego.rollBall(3);

    juego = rollManyTimes(16, 0, juego);
    expect(juego.getFinalScore()).toBe(22);
  });

  it('debería ser un juego perfecto', () => {
    juego = rollManyTimes(12, 10, juego);
    expect(juego.getFinalScore()).toBe(300);
  });
});

function rollSpare(game: any) {
  game = game.rollBall(5);
  game = game.rollBall(5);
  return game;
}

function rollManyTimes(rolls: number, pins: number, game: any) {
  for (let i = 0; i < rolls; i++) {
    game = game.rollBall(pins);
  }
  return game;
}
