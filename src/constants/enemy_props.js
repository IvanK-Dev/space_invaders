//Характеристики врагов
export const ENEMY_PROPS = {
  lvl1: {
    hpoint: 1,
    view: 'green',
    points: 10,
    shooting: false,
    shootSpeed: 0,
  },
  lvl2: {
    hpoint: 2,
    view: 'yellow',
    points: 15,
    shooting: false,
    shootSpeed: 0,
  },
  lvl3: {
    hpoint: 1,
    view: 'orange',
    points: 20,
    shooting: true,
    shootSpeed: -4,
  },
  lvl4: {
    hpoint: 2,
    view: 'purple',
    points: 25,
    shooting: true,
    shootSpeed: -2,
  },
  lvl5: {
    hpoint: 2,
    view: 'pink',
    points: 30,
    shooting: true,
    shootSpeed: -3,
  },
  lvl6: {
    hpoint: 50,
    view: 'brown',
    points: 100,
    shooting: true,
    shootSpeed: -2,
  },
};
