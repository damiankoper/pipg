import * as PIXI from "pixi.js";
import { Engine, Vector } from "matter-js";
import Shape from "./models/base/Shape";
import Sprite from "./models/base/Sprite";
import Tree3 from "./models/Tree3.model";
import Sokrates from "./models/Sokrates.model";
import AnimatedSprite from "./models/base/AnimatedSprite";
import Camera from "./camera/Camera";

export default class Game {
  private app = new PIXI.Application();
  private engine = Engine.create();

  private camera = new Camera();

  // TODO: Make Scene abstraction
  private objects: (Shape | Sprite | AnimatedSprite)[] = [];

  constructor() {
    document.body.appendChild(this.app.view);
    window.addEventListener("resize", () => this.resize(this.app));
    this.resize(this.app);
    this.app.ticker.add((delta) => this.loop(delta));

    this.setup();
  }

  resize(app: PIXI.Application) {
    const width = window.innerWidth;
    const height = (window.innerWidth * 9) / 16;

    this.camera.setWindowSize(Vector.create(width, height));

    // Normalize cords
    app.stage.position.set(width / 2, height / 2);
    app.stage.scale.set(width / 1280, height / 720);
    // Resize window
    app.renderer.resize(width, height);
  }

  setup() {
    PIXI.Loader.shared
      .add("assets/spritesheets/trees.json")
      .add("assets/spritesheets/b1_run.json")
      .add("assets/spritesheets/b1_idle.json")
      .add("assets/spritesheets/b1_jump.json")
      .load((loader) => {
        const foreground = this.camera.getLayer(1);
        const middleground = this.camera.getLayer(0.7);

        const tree = new Tree3(new PIXI.Point(60, 180), 0.1);
        const tree2 = new Tree3(new PIXI.Point(-300, 150), 0.15);

        const p = new Shape(
          new PIXI.Point(0, 0),
          [
            Vector.create(0, 0),
            Vector.create(0, 100),
            Vector.create(100, 100),
            Vector.create(100, 0),
          ],
          0xde3249
        );
        const g = new Shape(
          new PIXI.Point(0, 300),
          [
            Vector.create(0, 0),
            Vector.create(4000, 0),
            Vector.create(4000, 100),
            Vector.create(0, 100),
          ],
          0xaaaaaa
        );
        g.body.isStatic = true;

        const g2 = new Shape(
          new PIXI.Point(0, 300),
          [
            Vector.create(0, 0),
            Vector.create(800, 0),
            Vector.create(1000, -100),
            Vector.create(1200, -100),
            Vector.create(1400, 0),
            Vector.create(2000, 0),
            Vector.create(2000, 100),
            Vector.create(0, 100),
            Vector.create(0, 0),
          ],
          0x777777
        );
        g2.body.isSensor = true;
        g2.body.isStatic = true;

        const sokrates = new Sokrates(new PIXI.Point(-200, 0), 0.1);

        this.objects.push(tree, tree2, sokrates);
        this.objects.push(g, p);

        this.objects.forEach((s) => s.setup(foreground, this.engine));

        g2.setup(middleground);
        this.app.stage.addChild(middleground);
        this.app.stage.addChild(foreground);
        this.camera.follow(sokrates);
      });
  }

  loop(delta: number) {
    Engine.update(this.engine, (1000 / 60) * delta);
    this.objects.forEach((p) => p.update());
    this.camera.update(delta);
  }
}
