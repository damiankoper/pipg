import { Vector, World, Bodies, Body, Engine } from "matter-js";
import * as PIXI from "pixi.js";
import SceneObject from "../../scene/base/SceneObject";

export default abstract class Sprite implements SceneObject {
  public sprite: PIXI.Sprite;
  public body: Body;

  protected pixiToMass: Vector;

  constructor(
    position: Vector,
    scale: number,
    sprite: PIXI.Sprite,
    points?: Vector[]
  ) {
    this.sprite = sprite;
    this.sprite.scale = new PIXI.Point(scale, scale);
    this.sprite.calculateBounds();
    if (points) {
      this.body = Bodies.fromVertices(position.x, position.y, [
        points.map((v) => {
          v.x *= scale;
          v.y *= scale;
          return v;
        }),
      ]);
    } else {
      this.body = Bodies.rectangle(
        position.x,
        position.y,
        this.sprite.width,
        this.sprite.height
      );
    }
    this.pixiToMass = Vector.sub(this.body.position, this.body.bounds.min);
    this.sprite.pivot.set(this.pixiToMass.x / scale, this.pixiToMass.y / scale);
  }

  setup(container: PIXI.Container, engine?: Engine) {
    container.addChild(this.sprite);
    if (engine) World.addBody(engine.world, this.body);
    this.update();
  }

  update() {
    this.sprite.position.set(this.body.position.x, this.body.position.y);
    this.sprite.rotation = this.body.angle;
  }
}
