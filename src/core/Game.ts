import * as PIXI from "pixi.js";
import { Engine, Vector } from "matter-js";
import Camera from "./camera/Camera";
import MainScene from "./scene/MainScene";

export default class Game {
  private app = new PIXI.Application();
  private engine = Engine.create({ enableSleeping: true });

  private camera = new Camera();
  private mainScene: MainScene = new MainScene(this.app, this.camera);

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
    PIXI.Loader.shared.load((loader) => {
      this.mainScene.setup(this.app.stage, this.engine);
    });
  }

  loop(delta: number) {
    const ms = (1000 / 60) * delta
    Engine.update(this.engine, ms);
    this.mainScene.update(ms);
    this.camera.update(delta);
  }
}
