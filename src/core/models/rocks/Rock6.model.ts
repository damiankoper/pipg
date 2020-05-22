import Sprite from "../base/Sprite";
import { Vector, Bodies, Body } from "matter-js";
import * as PIXI from "pixi.js";

export default class Rock6 extends Sprite {
  constructor(position: Vector, scale: number) {
    const trees =
      PIXI.Loader.shared.resources["assets/spritesheets/rocks.json"]
        .spritesheet;
    const points = [
      Vector.create(29, 283),
      Vector.create(91, 70),
      Vector.create(335, 53),
      Vector.create(425, 99),
      Vector.create(430, 230),
      Vector.create(370, 360),
    ];
    super(
      position,
      scale,
      PIXI.Sprite.from(trees.textures["kam_6.png"]),
      points
    );
    Body.setMass(this.body,10000)
    this.body.friction = 10000
    this.body.frictionStatic = 10000
  }
}
