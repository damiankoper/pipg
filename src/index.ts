import Game from './core/Game'
import './style/index';
import * as decomp from 'poly-decomp'
const w = window as any
w['decomp'] = decomp

let game = new Game()