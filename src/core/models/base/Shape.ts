import * as PIXI from "pixi.js";
import { Engine, Body, Bodies, Vector, World } from "matter-js";
import _ from "lodash";
export default class Polygon {
  public points: Vector[];
  public color: number;

  public graphics: PIXI.Graphics;
  public body: Body;

  private pixiToMass: Vector;

  constructor(position: Vector, points: Vector[], color: number) {
    this.points = points;
    this.color = color;

    this.graphics = new PIXI.Graphics();
    this.graphics.beginFill(color);
    this.graphics.drawPolygon(
      this.points.reduce((a, b) => {
        a.push(b.x, b.y);
        return a;
      }, [])
    );
    this.graphics.endFill();

    this.body = Bodies.fromVertices(position.x, position.y, [points]);
    this.pixiToMass = Vector.sub(this.body.position, this.body.bounds.min);
    this.graphics.pivot.set(this.pixiToMass.x, this.pixiToMass.y);
  }

  setup(container: PIXI.Container, engine?: Engine) {
    container.addChild(this.graphics);
    if (engine) World.addBody(engine.world, this.body);
    this.update();
  }

  update() {
    this.graphics.position.set(this.body.position.x, this.body.position.y);
    this.graphics.rotation = this.body.angle;
  }
}
