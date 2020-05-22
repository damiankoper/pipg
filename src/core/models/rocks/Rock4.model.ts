import Sprite from "../base/Sprite";
import { Vector, Bodies, Body } from "matter-js";
import * as PIXI from "pixi.js";

export default class Rock4 extends Sprite {
  constructor(position: Vector, scale: number) {
    const trees =
      PIXI.Loader.shared.resources["assets/spritesheets/rocks.json"]
        .spritesheet;
    const points = [
      Vector.create(30, 300),
      Vector.create(150, 186),
      Vector.create(208, 81),
      Vector.create(360, 63),
      Vector.create(517, 138),
      Vector.create(506, 326),
      Vector.create(331, 417),
    ];
    super(
      position,
      scale,
      PIXI.Sprite.from(trees.textures["kam_4.png"]),
      points
    );
    Body.setMass(this.body,10000)
    this.body.friction = 10000
    this.body.frictionStatic = 10000
  }
}
