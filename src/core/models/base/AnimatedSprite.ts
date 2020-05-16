import { Vector, World, Bodies, Body, Engine, Events, IPair } from "matter-js";
import * as PIXI from "pixi.js";

export default abstract class AnimatedSprite {
  public mainSprite: PIXI.AnimatedSprite;
  public sprites: PIXI.AnimatedSprite[];
  public body: Body;

  private pixiToMass: Vector;

  constructor(
    position: Vector,
    scale: number,
    mainSprite: PIXI.AnimatedSprite,
    sprites: PIXI.AnimatedSprite[]
  ) {
    this.sprites = sprites;

    this.mainSprite = mainSprite;
    this.mainSprite.scale = new PIXI.Point(scale, scale);
    this.mainSprite.calculateBounds();
    this.body = Bodies.rectangle(
      position.x,
      position.y,
      this.mainSprite.width,
      this.mainSprite.height
    );

    this.pixiToMass = Vector.sub(this.body.position, this.body.bounds.min);
    this.sprites.forEach((s) => {
      s.scale = new PIXI.Point(scale, scale);
      s.visible = false;
      s.pivot.set(
        this.pixiToMass.x / scale,
        this.pixiToMass.y / scale
      );
    });
    this.mainSprite.visible = true;
  }

  setMainSprite(sprite: PIXI.AnimatedSprite) {
    this.mainSprite.visible = false;
    this.mainSprite = sprite;
    this.mainSprite.visible = true;
    this.mainSprite.play();
  }

  setup(container: PIXI.Container, engine: Engine) {
    this.sprites.forEach((s) => {
      container.addChild(s);
    });
    World.addBody(engine.world, this.body);
    this.update();

    Events.on(engine, "collisionStart", (event) => {
      const pairs = event.pairs;
      pairs.forEach((pair) => {
        if (pair.bodyA == this.body) {
          this.onCollisionStart(pair.bodyB);
        } else if (pair.bodyB == this.body) {
          this.onCollisionStart(pair.bodyA);
        }
      });
    });

    Events.on(engine, "collisionEnd", (event) => {
      const pairs = event.pairs;
      pairs.forEach((pair) => {
        if (pair.bodyA == this.body) {
          this.onCollisionEnd(pair.bodyB);
        } else if (pair.bodyB == this.body) {
          this.onCollisionEnd(pair.bodyA);
        }
      });
    });
  }

  update() {
    this.mainSprite.position.set(this.body.position.x, this.body.position.y);
    this.mainSprite.rotation = this.body.angle;
  }

  static createSprite(spritesheet: string): PIXI.AnimatedSprite {
    const sheet = PIXI.Loader.shared.resources[spritesheet].spritesheet;

    const frames: PIXI.Texture[] = [];
    Object.keys(sheet.textures)
      .sort()
      .forEach((key) => {
        frames.push(sheet.textures[key]);
      });

    return new PIXI.AnimatedSprite(frames);
  }

  onCollisionStart(body: Body) {}

  onCollisionEnd(body: Body) {}
}
