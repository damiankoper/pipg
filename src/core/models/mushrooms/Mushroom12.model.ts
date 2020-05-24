import Sprite from "../base/Sprite";
import { Vector } from "matter-js";
import * as PIXI from "pixi.js";

export default class Mushroom12 extends Sprite {
  constructor(position: Vector, scale: number) {
    const trees =
      PIXI.Loader.shared.resources["assets/spritesheets/mushrooms.json"]
        .spritesheet;
    super(position, scale, PIXI.Sprite.from(trees.textures["grzyb_12.png"]));
    this.body.isSensor = true
    this.body.isStatic = true
  }
}
