import * as PIXI from "pixi.js";
import { Engine, Body, Bodies, Vector, World } from "matter-js";
import _ from "lodash";
import SceneObject from "../../scene/base/SceneObject";
export default class Shape implements SceneObject {
  public points: Vector[];
  public color: number;

  public graphics: PIXI.Graphics;
  public body: Body;

  private pixiToMass: Vector;

  constructor(position: Vector, points: Vector[], color: number) {
    this.points = points;
    this.color = color;
  
    const min = Vector.create(0, 0);
    this.points.forEach((point) => {
      min.x = Math.min(point.x, min.x);
      min.y = Math.min(point.y, min.y);
    });

    if (min.x < 0) {
      this.points.forEach((point) => {
        point.x -= min.x;
      });
      position.x+=min.x
    }
    if (min.y < 0) {
      this.points.forEach((point) => {
        point.y -= min.y;
      });
      position.y+=min.y
    }

    this.graphics = new PIXI.Graphics();
    this.graphics.beginFill(color);
    this.graphics.drawPolygon(
      this.points.reduce((a, b) => {
        a.push(b.x, b.y);
        return a;
      }, [])
    );
    this.graphics.endFill();

    this.body = Bodies.fromVertices(0, 0, [points]);
    this.pixiToMass = Vector.sub(this.body.position, this.body.bounds.min);
    this.graphics.pivot.set(this.pixiToMass.x, this.pixiToMass.y);

    Body.setPosition(
      this.body,
      Vector.sub(position, Vector.mult(this.pixiToMass, -1))
    );
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
