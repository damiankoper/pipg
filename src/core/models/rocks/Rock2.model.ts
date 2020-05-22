import Sprite from "../base/Sprite";
import { Vector, Bodies, Body } from "matter-js";
import * as PIXI from "pixi.js";

export default class Rock2 extends Sprite {
  constructor(position: Vector, scale: number) {
    const trees =
      PIXI.Loader.shared.resources["assets/spritesheets/rocks.json"]
        .spritesheet;
    const points = [
      Vector.create(37, 77),
      Vector.create(208, 53),
      Vector.create(500, 300),
      Vector.create(435, 610),
      Vector.create(88, 308),
    ];
    super(
      position,
      scale,
      PIXI.Sprite.from(trees.textures["kam_2.png"]),
      points
    );
    Body.setMass(this.body,10000)
    this.body.friction = 10000
    this.body.frictionStatic = 10000
  }
}
