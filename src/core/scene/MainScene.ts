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
import ColorMatrix from "./ColorMatrix";
import Rock1 from "../models/rocks/Rock1.model";
import Rock2 from "../models/rocks/Rock2.model";
import Rock3 from "../models/rocks/Rock3.model";
import Rock4 from "../models/rocks/Rock4.model";
import Rock5 from "../models/rocks/Rock5.model";
import Rock6 from "../models/rocks/Rock6.model";
import chance from "chance";
import * as particles from "pixi-particles";
import _ from "lodash";
import * as Color from "color";
import ParticleConfig from "./ParticleConfig";
import SpartialSound from "../sound/SpartialSound";
import MainTheme from "./sound/MainTheme.sound";
import Mushroom1 from "../models/mushrooms/Mushroom1.model";
import Mushroom2 from "../models/mushrooms/Mushroom2.model";
import Mushroom7 from "../models/mushrooms/Mushroom7.model";
import Mushroom6 from "../models/mushrooms/Mushroom6.model";

export default class MainScene extends Scene {
  rainEmitter?: particles.Emitter;
  middleMatrixFilter?: PIXI.filters.ColorMatrixFilter;
  backMatrixFilter?: PIXI.filters.ColorMatrixFilter;
  forestAmbient?: SpartialSound;

  constructor(
    protected readonly app: PIXI.Application,
    protected readonly camera: Camera
  ) {
    super(camera, [
      "assets/spritesheets/title.json",
      "assets/spritesheets/trees.json",
      "assets/spritesheets/b1_run.json",
      "assets/spritesheets/b1_idle.json",
      "assets/spritesheets/b1_jump.json",
      "assets/spritesheets/b1_walk.json",
      "assets/spritesheets/rain.json",
      "assets/spritesheets/rocks.json",
      "assets/spritesheets/sparcles.json",
      "assets/spritesheets/mushrooms.json",
    ]);
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

    const rainEmitter = new particles.Emitter(
      foreforeground,
      ParticleConfig.rainTextures,
      ParticleConfig.rain
    );
    this.rainEmitter = rainEmitter;
    this.emitters.push(rainEmitter);

    const sparclesEmitter1 = new particles.Emitter(
      foreground,
      ParticleConfig.sparclesTextures,
      ParticleConfig.sparcles
    );
    this.emitters.push(sparclesEmitter1);

    const sparclesEmitter2 = new particles.Emitter(
      middleground,
      ParticleConfig.sparclesTextures,
      ParticleConfig.sparcles
    );
    this.emitters.push(sparclesEmitter2);

    const middleMatrixFilter = new PIXI.filters.ColorMatrixFilter();
    middleMatrixFilter.matrix = ColorMatrix.blue(0.6);
    this.middleMatrixFilter = middleMatrixFilter;
    const backMatrixFilter = new PIXI.filters.ColorMatrixFilter();
    backMatrixFilter.matrix = ColorMatrix.blue(0.05);
    this.backMatrixFilter = backMatrixFilter;

    middleground.filters = [new PIXI.filters.BlurFilter(5), middleMatrixFilter];
    background.filters = [new PIXI.filters.BlurFilter(5), backMatrixFilter];

    this.app.renderer.backgroundColor = 0x19022a;

    foregroundObjects.push(new Tree3(new PIXI.Point(60, 435), 0.15));
    foregroundObjects.push(new Tree3(new PIXI.Point(-700, 395), 0.24));
    foregroundObjects.push(new Tree2(new PIXI.Point(-500, 210), 0.65));
    foregroundObjects.push(new Tree1(new PIXI.Point(310, 240), 0.65));

    foregroundObjects.push(new Tree7(new PIXI.Point(-1900, 180), 0.8));
    foregroundObjects.push(new Tree3(new PIXI.Point(-2100, 330), 0.4));

    foregroundObjects.push(new Mushroom1(new PIXI.Point(1200, 65), 0.5));
    foregroundObjects.push(new Mushroom7(new PIXI.Point(1360, 220), 0.7));
    foregroundObjects.push(new Mushroom6(new PIXI.Point(1280, 255), 0.7));
    foregroundObjects.push(new Tree4(new PIXI.Point(2000, 60), 0.6));
    foregroundObjects.push(new Tree4(new PIXI.Point(4000, 120), 0.5));

    let rocks = 20;
    const rocksTypes = [Rock1, Rock2, Rock3, Rock4, Rock5, Rock6];

    for (let index = 0; index < rocks; index++) {
      const RandomRock = rocksTypes[chance().integer({ min: 0, max: 5 })];
      foregroundObjects.push(
        new RandomRock(
          new PIXI.Point(500 + chance().integer({ min: -50, max: 50 }), 0),
          chance().floating({ min: 0.05, max: 0.15 })
        )
      );
    }

    for (let index = 0; index < rocks; index++) {
      const RandomRock = rocksTypes[chance().integer({ min: 0, max: 5 })];
      foregroundObjects.push(
        new RandomRock(
          new PIXI.Point(2000 + chance().integer({ min: -90, max: 1200 }), 100),
          chance().floating({ min: 0.1, max: 0.15 })
        )
      );
    }

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

    const wallLeft = new Shape(
      new PIXI.Point(-1980, -2000),
      [
        Vector.create(0, 0),
        Vector.create(100, 0),
        Vector.create(100, 3000),
        Vector.create(0, 3000),
      ],
      0x555555
    );
    Body.setStatic(wallLeft.body, true);
    wallLeft.graphics.visible = false;
    foregroundObjects.push(wallLeft);

    middlegroundObjects.push(new Tree3(new PIXI.Point(-900, 60), 0.56));
    middlegroundObjects.push(new Tree6(new PIXI.Point(-700, 60), 0.49));
    middlegroundObjects.push(new Tree7(new PIXI.Point(-400, 20), 0.69));
    middlegroundObjects.push(new Tree3(new PIXI.Point(200, 0), 0.69));
    middlegroundObjects.push(new Tree4(new PIXI.Point(600, 80), 0.69));
    middlegroundObjects.push(new Mushroom2(new PIXI.Point(950, 65), 0.75));
    middlegroundObjects.push(new Mushroom1(new PIXI.Point(1600, 0), 0.8));

    for (let index = 0; index < 6; index++) {
      middlegroundObjects.push(
        new Mushroom6(
          new PIXI.Point(
            2500 + index * chance().integer({ max: 500, min: 100 }),
            155
          ),
          0.7 + chance().floating({ min: 0, max: 0.1 })
        )
      );
    }

    const ground2 = new Shape(
      new PIXI.Point(-1700, 300),
      [
        Vector.create(-200, 0),
        Vector.create(2000, 0),
        Vector.create(2700, 100),
        Vector.create(4000, -100),
        Vector.create(40000, -100),
        Vector.create(40000, 400),
        Vector.create(-200, 400),
      ],
      0x555555
    );
    Body.setStatic(ground2.body, true);
    ground2.body.isSensor = true;
    middlegroundObjects.push(ground2);

    const x = -1700;
    const sokrates = new Sokrates(new PIXI.Point(x, 350), 0.1);
    const title = new Title(new PIXI.Point(-140, 210), 0.6);
    title.sokrates = sokrates;

    this.camera.follow(sokrates);
    foregroundObjects.push(sokrates);
    foreforegroundObjects.push(title);

    backgroundObjects.push(new Tree3(new PIXI.Point(-500, -200), 1));
    backgroundObjects.push(new Tree6(new PIXI.Point(400, 0), 1.2));

    const forestAmbient = new SpartialSound(
      "assets/sound/rain.mp3",
      Vector.create(0, 0),
      (d) => 0.6
    );
    forestAmbient.setCamera(this.camera);
    this.forestAmbient = forestAmbient;
    const mainTheme = new MainTheme();
    mainTheme.setCamera(this.camera);
    this.sounds.push(forestAmbient, mainTheme);

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

  paramsList: {
    color: Color | number;
    px: number;
    rainSpawnChance: number;
    backFilter: number;
    middleFilter: number;
  }[] = [
    {
      color: 0x19022a,
      rainSpawnChance: 1,
      px: 4000,
      backFilter: 0.05,
      middleFilter: 0.6,
    },
    {
      color: 0x17c3fc,
      rainSpawnChance: -0.1,
      px: 5200,
      backFilter: 1,
      middleFilter: 1.2,
    },
  ]
    .sort((a, b) => a.px - b.px)
    .map(
      (c: {
        color: any;
        px: number;
        rainSpawnChance: number;
        backFilter: number;
        middleFilter: number;
      }) => {
        c.color = Color.rgb([
          c.color >> 16,
          (c.color >> 8) & 0x0000ff,
          c.color & 0x0000ff,
        ]);
        return c;
      }
    );

  private color2Number(color: Color) {
    return (color.red() << 16) + (color.green() << 8) + color.blue();
  }

  update(delta: number) {
    super.update(delta);
    if (this.paramsList.length === 1) {
      this.app.renderer.backgroundColor = this.color2Number(
        this.paramsList[0].color as Color
      );
      if (this.rainEmitter)
        this.rainEmitter.spawnChance = this.paramsList[0].rainSpawnChance;
      if (this.middleMatrixFilter)
        this.middleMatrixFilter.matrix = ColorMatrix.blue(
          this.paramsList[0].middleFilter
        );
      if (this.backMatrixFilter)
        this.backMatrixFilter.matrix = ColorMatrix.blue(
          this.paramsList[0].backFilter
        );
    } else if (this.paramsList.length > 1) {
      const x = -this.camera.getPosition().x;
      if (x < this.paramsList[0].px) {
        this.app.renderer.backgroundColor = this.color2Number(
          this.paramsList[0].color as Color
        );
        if (this.rainEmitter)
          this.rainEmitter.spawnChance = this.paramsList[0].rainSpawnChance;
        if (this.middleMatrixFilter)
          this.middleMatrixFilter.matrix = ColorMatrix.blue(
            this.paramsList[0].middleFilter
          );
        if (this.backMatrixFilter)
          this.backMatrixFilter.matrix = ColorMatrix.blue(
            this.paramsList[0].backFilter
          );
      } else {
        for (let i = 0; i < this.paramsList.length - 1; i++) {
          const prev = this.paramsList[i];
          const next = this.paramsList[i + 1];
          const inRange = _.inRange(x, prev.px, next.px);
          if (inRange) {
            const lerp = (x - prev.px) / (next.px - prev.px);
            const prevColor = prev.color as Color;
            const nextColor = next.color as Color;
            const currentColor = Color.hsv([
              prevColor.hue() + (nextColor.hue() - prevColor.hue()) * lerp,
              prevColor.saturationv() +
                (nextColor.saturationv() - prevColor.saturationv()) * lerp,
              prevColor.value() +
                (nextColor.value() - prevColor.value()) * lerp,
            ]);

            this.app.renderer.backgroundColor = this.color2Number(currentColor);
            if (this.rainEmitter)
              this.rainEmitter.spawnChance =
                prev.rainSpawnChance +
                (next.rainSpawnChance - prev.rainSpawnChance) * lerp;
            if (this.middleMatrixFilter)
              this.middleMatrixFilter.matrix = ColorMatrix.blue(
                prev.middleFilter +
                  (next.middleFilter - prev.middleFilter) * lerp
              );
            if (this.backMatrixFilter)
              this.backMatrixFilter.matrix = ColorMatrix.blue(
                prev.backFilter + (next.backFilter - prev.backFilter) * lerp
              );

            if (this.forestAmbient) {
              this.forestAmbient.fadeFn = (d) =>
                prev.rainSpawnChance +
                (next.rainSpawnChance - prev.rainSpawnChance) * lerp;
            }
          }
        }
      }
    }
  }
}
