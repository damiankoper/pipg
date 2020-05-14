import * as PIXI from "pixi.js";
import { Engine, Vector, Body } from "matter-js";
import Polygon from "./models/Polygon";

export default class Game {
  private app = new PIXI.Application();
  private engine = Engine.create();
  private polygons:Polygon[] = []

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

    // Normalize cords
    app.stage.position.set(width / 2, height / 2);
    app.stage.scale.set(width / 1280, height / 720);
    // Resize window
    app.renderer.resize(width, height);
  }

  setup() {
    const p = new Polygon(
      new PIXI.Point(0, 0),
      [
        Vector.create(0, 0),
        Vector.create(0, 100),
        Vector.create(100, 100),
        Vector.create(100, 0),
      ],
      0xde3249
    );
    const g = new Polygon(
      new PIXI.Point(-300, 300),
      [
        Vector.create(0, 0),
        Vector.create(700, 50),
        Vector.create(700, 100),
        Vector.create(0, 100),
      ],
      0xaaaaaa
    );
    
    g.body.isStatic = true
    g.setup(this.app.stage, this.engine);
    p.setup(this.app.stage, this.engine);
    
    this.polygons.push(p, g)
  }

  loop(delta: number) {
    Engine.update(this.engine, (1000 / 60) * delta);
    this.polygons.forEach(p=>p.update())
  }
}
