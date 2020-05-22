import Sprite from "../base/Sprite";
import { Vector, Bodies, Body } from "matter-js";
import * as PIXI from "pixi.js";

export default class Rock1 extends Sprite {
  constructor(position: Vector, scale: number) {
    const trees =
      PIXI.Loader.shared.resources["assets/spritesheets/rocks.json"]
        .spritesheet;
    const points = [
      Vector.create(76, 578),
      Vector.create(84, 470),
      Vector.create(450, 146),
      Vector.create(690, 310),
      Vector.create(640, 400),
      Vector.create(430, 380),
      Vector.create(210, 610),
    ];
    super(
      position,
      scale,
      PIXI.Sprite.from(trees.textures["kam_1.png"]),
      points
    );
    Body.setMass(this.body,10000)
    this.body.friction = 10000
    this.body.frictionStatic = 10000
  }
}
