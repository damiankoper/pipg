import Sprite from "../base/Sprite";
import { Vector, Bodies, Body } from "matter-js";
import * as PIXI from "pixi.js";

export default class Rock5 extends Sprite {
  constructor(position: Vector, scale: number) {
    const trees =
      PIXI.Loader.shared.resources["assets/spritesheets/rocks.json"]
        .spritesheet;
    const points = [
      Vector.create(117, 107),
      Vector.create(244, 32),
      Vector.create(434, 141),
      Vector.create(494, 395),
      Vector.create(440, 526),
      Vector.create(254, 507),
      Vector.create(107, 274),
    ];
    super(
      position,
      scale,
      PIXI.Sprite.from(trees.textures["kam_5.png"]),
      points
    );
    Body.setMass(this.body,10000)
    this.body.friction = 10000
    this.body.frictionStatic = 10000
  }
}
