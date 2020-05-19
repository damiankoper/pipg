import Sprite from "./base/Sprite";
import { Vector } from "matter-js";
import * as PIXI from "pixi.js";
import Sokrates from "./Sokrates.model";
import _ from "lodash";
export default class Title extends Sprite {
  public sokrates?: Sokrates;

  constructor(position: Vector, scale: number) {
    const trees =
      PIXI.Loader.shared.resources["assets/spritesheets/title.json"]
        .spritesheet;
    super(position, scale, PIXI.Sprite.from(trees.textures["napis.png"]));
    this.body.isSensor = true;
    this.body.isStatic = true;
  }

  update() {
    super.update();
    if (this.sokrates) {
      this.sprite.alpha = _.clamp(
        1-Math.abs(this.sokrates.body.position.x - this.body.position.x)/500,
        0,
        1
      );
    }
  }
}
