import Sprite from "../base/Sprite";
import { Vector } from "matter-js";
import * as PIXI from "pixi.js";

export default class Tree7 extends Sprite {
  constructor(position: Vector, scale: number) {
    const trees =
      PIXI.Loader.shared.resources["assets/spritesheets/trees.json"]
        .spritesheet;
    super(position, scale, PIXI.Sprite.from(trees.textures["Drzewo_7_scale.png"]));
    this.body.isSensor = true
    this.body.isStatic = true
  }
}
