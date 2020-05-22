import Sprite from "../base/Sprite";
import { Vector, Bodies, Body } from "matter-js";
import * as PIXI from "pixi.js";

export default class Rock3 extends Sprite {
  constructor(position: Vector, scale: number) {
    const trees =
      PIXI.Loader.shared.resources["assets/spritesheets/rocks.json"]
        .spritesheet;
    const points = [
      Vector.create(122, 95),
      Vector.create(512, 68),
      Vector.create(695, 234),
      Vector.create(584, 447),
      Vector.create(366, 465),
      Vector.create(130, 300),
    ];
    super(
      position,
      scale,
      PIXI.Sprite.from(trees.textures["kam_3.png"]),
      points
    );
    Body.setMass(this.body,10000)
    this.body.friction = 10000
    this.body.frictionStatic = 10000
  }
}
