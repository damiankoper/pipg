import { Vector, Body, Engine } from "matter-js";
import * as PIXI from "pixi.js";
import AnimatedSprite from "./base/AnimatedSprite";

enum CharacterState {
  Idle,
  WalkingLeft,
  WalkingRight,
  RunningLeft,
  RunningRight,
}

export default class Sokrates extends AnimatedSprite {
  private runSprite: PIXI.AnimatedSprite;
  private idleSprite: PIXI.AnimatedSprite;
  private jumpSprite: PIXI.AnimatedSprite;

  private state: CharacterState;
  private isInTheAir: boolean;
  private stableCollTimeout?: number;

  readonly runSpeed: number;
  

  constructor(position: Vector, scale: number) {
    const runSprite = AnimatedSprite.createSprite(
      "assets/spritesheets/b1_run.json"
    );
    const idleSprite = AnimatedSprite.createSprite(
      "assets/spritesheets/b1_idle.json"
    );
    const jumpSprite = AnimatedSprite.createSprite(
      "assets/spritesheets/b1_jump.json"
    );

    super(position, scale, idleSprite, [idleSprite, runSprite, jumpSprite]);
    Body.setInertia(this.body, Infinity);
    this.state = CharacterState.Idle;
    this.isInTheAir = false;
    this.runSpeed = 6

    this.runSprite = runSprite;
    this.idleSprite = idleSprite;
    this.jumpSprite = jumpSprite;

    this.runSprite.animationSpeed = 0.25;
    this.idleSprite.loop = false;
    this.jumpSprite.animationSpeed = 0.1;
    this.jumpSprite.loop = false;

    runSprite.pivot.x += 25 / scale;
    jumpSprite.pivot.x += 25 / scale;
    jumpSprite.pivot.y += 15 / scale;
    jumpSprite.scale.x *= 0.9;
    jumpSprite.scale.y *= 0.9;
  }

  setup(container: PIXI.Container, engine: Engine) {
    super.setup(container, engine);
    this.setEvents();
  }

  update() {
    super.update();
    switch (this.state) {
      case CharacterState.Idle:
        Body.setVelocity(
          this.body,
          Vector.create(Math.min(this.body.velocity.x, this.runSpeed), this.body.velocity.y)
        );
        break;
      case CharacterState.RunningRight:
        Body.setVelocity(this.body, Vector.create(this.runSpeed, this.body.velocity.y));
        break;
      case CharacterState.RunningLeft:
        Body.setVelocity(this.body, Vector.create(-this.runSpeed, this.body.velocity.y));
        break;
    }
    this.updateDirection();
  }

  private updateDirection() {
    if (
      Math.sign(this.body.velocity.x) != Math.sign(this.mainSprite.scale.x) &&
      Math.round(Math.abs(this.body.velocity.x)) > 0
    ) {
      this.sprites.forEach((s) => (s.scale.x *= -1));
    }
  }

  setEvents() {
    window.addEventListener("keydown", (e) => {
      switch (e.key) {
        case "d":
          this.state = CharacterState.RunningRight;
          break;
        case "a":
          this.state = CharacterState.RunningLeft;
          break;
        case " ":
          if (!this.isInTheAir) {
            this.jumpSprite.gotoAndStop(0);
            this.setMainSprite(this.jumpSprite);
            setTimeout(() => {
              Body.setVelocity(
                this.body,
                Vector.create(this.body.velocity.x, -10)
              );
            }, 100);
          }
          break;
      }
      this.changeSprite();
    });
    window.addEventListener("keyup", (e) => {
      switch (e.key) {
        case "d":
          if (this.state == CharacterState.RunningRight)
            this.state = CharacterState.Idle;
          break;
        case "a":
          if (this.state == CharacterState.RunningLeft) {
            this.state = CharacterState.Idle;
          }
          break;
      }
      this.changeSprite();
    });
  }

  onCollisionStart(body: Body) {
    if (
      Math.abs(this.body.bounds.max.y - body.bounds.max.y) > 10 &&
      body.isSensor == false
    ) {
      clearTimeout(this.stableCollTimeout);
      this.isInTheAir = false;
      this.changeSprite();
    }
  }

  onCollisionEnd(body: Body) {
    if (
      Math.abs(this.body.bounds.max.y - body.bounds.max.y) > 10 &&
      body.isSensor == false
    ) {
      this.stableCollTimeout = setTimeout(() => {
        this.isInTheAir = true;
        this.changeSprite();
      }, 10);
    }
  }

  private changeSprite() {
    if (this.isInTheAir) {
      this.setMainSprite(this.jumpSprite);
    } else
      switch (this.state) {
        case CharacterState.Idle:
          this.setMainSprite(this.idleSprite);
          break;
        case CharacterState.RunningLeft:
        case CharacterState.RunningRight:
          this.setMainSprite(this.runSprite);
          break;
      }
  }
}
