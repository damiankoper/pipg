import Scene from "./base/Scene";
import Camera from "../camera/Camera";
import { Engine, Vector, Body } from "matter-js";
import SceneObject from "./base/SceneObject";
import Tree9 from "../models/trees/Tree9.model";
import Tree8 from "../models/trees/Tree8.model";
import Tree7 from "../models/trees/Tree7.model";
import Tree6 from "../models/trees/Tree6.model";
import Tree5 from "../models/trees/Tree5.model";
import Tree4 from "../models/trees/Tree4.model";
import Tree3 from "../models/trees/Tree3.model";
import Tree2 from "../models/trees/Tree2.model";
import Tree1 from "../models/trees/Tree1.model";
import Shape from "../models/base/Shape";
import Sokrates from "../models/Sokrates.model";
import * as PIXI from "pixi.js";
import Title from "../models/Title.model";
import ColorMatrix from "../ColorMatrix";
import Rock1 from "../models/rocks/Rock1.model";
import Rock2 from "../models/rocks/Rock2.model";
import Rock3 from "../models/rocks/Rock3.model";
import Rock4 from "../models/rocks/Rock4.model";
import Rock5 from "../models/rocks/Rock5.model";
import Rock6 from "../models/rocks/Rock6.model";



export default class MainScene extends Scene {
  private app: PIXI.Application;
  constructor(app: PIXI.Application, camera: Camera) {
    super(camera, [
      "assets/spritesheets/title.json",
      "assets/spritesheets/trees.json",
      "assets/spritesheets/b1_run.json",
      "assets/spritesheets/b1_idle.json",
      "assets/spritesheets/b1_jump.json",
      "assets/spritesheets/rocks.json",
    ]);
    this.app = app;
  }

  setup(container: PIXI.Container, engine: Engine): void {
    const foreforeground = this.camera.getLayer(1.05);
    const foreground = this.camera.getLayer(1);
    const middleground = this.camera.getLayer(0.7);
    const background = this.camera.getLayer(0.2);
    const foreforegroundObjects: SceneObject[] = [];
    const foregroundObjects: SceneObject[] = [];
    const middlegroundObjects: SceneObject[] = [];
    const backgroundObjects: SceneObject[] = [];

    /* INIT START */

    const middleMatrixFilter = new PIXI.filters.ColorMatrixFilter();
    middleMatrixFilter.matrix = ColorMatrix.blue(0.6);
    const backMatrixFilter = new PIXI.filters.ColorMatrixFilter();
    backMatrixFilter.matrix = ColorMatrix.blue(0.05);

    middleground.filters = [new PIXI.filters.BlurFilter(5), middleMatrixFilter];
    background.filters = [new PIXI.filters.BlurFilter(5), backMatrixFilter];

    this.app.renderer.backgroundColor = 0x19022a;

    foregroundObjects.push(new Tree3(new PIXI.Point(60, 435), 0.07));
    foregroundObjects.push(new Tree3(new PIXI.Point(-700, 395), 0.11));
    foregroundObjects.push(new Tree2(new PIXI.Point(-500, 210), 0.3));
    foregroundObjects.push(new Tree1(new PIXI.Point(310, 220), 0.3));

    foregroundObjects.push(new Rock1(new PIXI.Point(300, 0), 0.2));
    foregroundObjects.push(new Rock2(new PIXI.Point(360, -50), 0.2));
    foregroundObjects.push(new Rock3(new PIXI.Point(370, -100), 0.2));
    foregroundObjects.push(new Rock4(new PIXI.Point(380, -120), 0.2));
    foregroundObjects.push(new Rock5(new PIXI.Point(360, -120), 0.2));
    foregroundObjects.push(new Rock6(new PIXI.Point(450, -130), 0.2));

/*     const redBlock = new Shape(
      new PIXI.Point(0, 0),
      [
        Vector.create(0, 0),
        Vector.create(0, 100),
        Vector.create(100, 100),
        Vector.create(100, 0),
      ],
      0xde3249
    );
    foregroundObjects.push(redBlock); */

    const ground1 = new Shape(
      new PIXI.Point(-1700, 300),
      [
        Vector.create(-1000, 200),
        Vector.create(2000, 200),
        Vector.create(2800, 0),
        Vector.create(3100, 0),
        Vector.create(40000, 0),
        Vector.create(40000, 400),
        Vector.create(-1000, 400),
      ],
      0x555555
    );
    Body.setStatic(ground1.body, true);
    foregroundObjects.push(ground1);

    middlegroundObjects.push(new Tree3(new PIXI.Point(-900, 50), 0.26));
    middlegroundObjects.push(new Tree6(new PIXI.Point(-700, 130), 0.2));
    middlegroundObjects.push(new Tree7(new PIXI.Point(-400, 20), 0.3));
    //middlegroundObjects.push(new Tree8(new PIXI.Point(200, 100), 0.3));
    //middlegroundObjects.push(new Tree9(new PIXI.Point(500, 100), 0.3));
    middlegroundObjects.push(new Tree3(new PIXI.Point(200, 20), 0.3));

    const ground2 = new Shape(
      new PIXI.Point(-1700, 300),
      [
        Vector.create(0, 0),
        Vector.create(2000, 0),
        Vector.create(2700, 100),
        Vector.create(4000, -100),
        Vector.create(40000, -100),
        Vector.create(40000, 400),
        Vector.create(0, 400),
      ],
      0x555555
    );
    Body.setStatic(ground2.body, true);
    ground2.body.isSensor = true;
    middlegroundObjects.push(ground2);

    const x = -100
    const sokrates = new Sokrates(new PIXI.Point(x, 350), 0.1);
    const title = new Title(new PIXI.Point(-140, 210), 0.6);
    title.sokrates = sokrates;

    this.camera.follow(sokrates);
    foregroundObjects.push(sokrates);
    foreforegroundObjects.push(title);

    backgroundObjects.push(new Tree3(new PIXI.Point(-500, -200), 0.5));
    backgroundObjects.push(new Tree6(new PIXI.Point(400, 0), 0.6));


    /* INIT END */

    foreforegroundObjects.forEach((s) => s.setup(foreforeground, engine));
    this.objects.push(...foreforegroundObjects);
    foregroundObjects.forEach((s) => s.setup(foreground, engine));
    this.objects.push(...foregroundObjects);
    middlegroundObjects.forEach((s) => s.setup(middleground));
    this.objects.push(...middlegroundObjects);
    backgroundObjects.forEach((s) => s.setup(background));
    this.objects.push(...backgroundObjects);

    [background, middleground, foreground, foreforeground].forEach((g) => {
      try {
        container.getChildIndex(g);
      } catch (e) {
        container.addChild(g);
      }
    });
  }
}
