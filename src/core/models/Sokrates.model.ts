import { Vector, Body, Engine } from "matter-js";
import * as PIXI from "pixi.js";
import AnimatedSprite from "./base/AnimatedSprite";

enum CharacterState {
  Idle,
  WalkingLeft,
  WalkingRight,
  MovingLeft,
  MovingRight,
}

export default class Sokrates extends AnimatedSprite {
  private runSprite: PIXI.AnimatedSprite;
  private idleSprite: PIXI.AnimatedSprite;
  private jumpSprite: PIXI.AnimatedSprite;
  private walkSprite: PIXI.AnimatedSprite;

  private state: CharacterState;
  private isInTheAir: boolean;
  private stableCollTimeout?: number;

  readonly runSpeed: number;
  readonly walkSpeed: number;
  private isShift: boolean;

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
    const walkSprite = AnimatedSprite.createSprite(
      "assets/spritesheets/b1_walk.json"
    );

    super(position, scale, idleSprite, [
      idleSprite,
      runSprite,
      jumpSprite,
      walkSprite,
    ]);
    Body.setInertia(this.body, Infinity);
    this.body.sleepThreshold = -1;
    this.state = CharacterState.Idle;
    this.isInTheAir = false;
    this.runSpeed = 6;
    this.walkSpeed = 3;
    this.isShift = false;

    this.runSprite = runSprite;
    this.idleSprite = idleSprite;
    this.jumpSprite = jumpSprite;
    this.walkSprite = walkSprite;

    this.runSprite.animationSpeed = 0.25;
    this.walkSprite.animationSpeed = 0.13;
    this.idleSprite.loop = false;
    this.jumpSprite.animationSpeed = 0.1;
    this.jumpSprite.loop = false;

    runSprite.pivot.x += 25 / scale;
    walkSprite.pivot.x += 25 / scale;
    walkSprite.pivot.y += 5 / scale;
    walkSprite.scale.y *= 0.9;
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
          Vector.create(
            Math.min(this.body.velocity.x, this.runSpeed),
            this.body.velocity.y
          )
        );
        break;
      case CharacterState.MovingRight:
        Body.setVelocity(
          this.body,
          Vector.create(this.getSpeed(), this.body.velocity.y)
        );
        break;
      case CharacterState.MovingLeft:
        Body.setVelocity(
          this.body,
          Vector.create(-this.getSpeed(), this.body.velocity.y)
        );
        break;
    }
    this.updateDirection();
  }

  private getSpeed() {
    return this.isShift ? this.runSpeed : this.walkSpeed;
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
        case "Shift":
          this.isShift = true;
          break;
        case "D":
        case "d":
          this.state = CharacterState.MovingRight;
          break;
        case "A":
        case "a":
          this.state = CharacterState.MovingLeft;
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
        case "Shift":
          this.isShift = false;
          break;
        case "D":
        case "d":
          if (this.state == CharacterState.MovingRight)
            this.state = CharacterState.Idle;
          break;
        case "A":
        case "a":
          if (this.state == CharacterState.MovingLeft) {
            this.state = CharacterState.Idle;
          }
          break;
      }
      this.changeSprite();
    });
  }

  onCollisionActive(body: Body) {
    this.setInTheAir(body);
  }
  onCollisionStart(body: Body) {
    this.setInTheAir(body);
  }

  private setInTheAir(body: Body) {
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
      }, 50);
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
        case CharacterState.MovingLeft:
        case CharacterState.MovingRight:
          if (this.isShift) this.setMainSprite(this.runSprite);
          else this.setMainSprite(this.walkSprite);
          break;
      }
  }
}
