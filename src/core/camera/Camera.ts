import * as PIXI from "pixi.js";
import { Vector, Body } from "matter-js";
import AnimatedSprite from "../models/base/AnimatedSprite";

export default class Camera {
  private position = Vector.create(0, 0);
  private windowSize = Vector.create(1280, 720);
  private followObject?: AnimatedSprite;
  private followPadding = Vector.create(200, 600);
  private layers = new Map<number, PIXI.Container>();

  setPosition(vector: Vector) {
    this.position = Vector.clone(vector);
    this.followObject = undefined;
  }

  setWindowSize(size: Vector) {
    this.windowSize = size;
  }

  follow(object: AnimatedSprite) {
    this.followObject = object;
  }

  getLayer(distance: number) {
    if (!this.layers.has(distance)) {
      this.layers.set(distance, new PIXI.Container());
    }
    return this.layers.get(distance);
  }

  update(deltaTime: number) {
    if (this.followObject) {
      const position = this.followObject.mainSprite.getGlobalPosition();
      const leftX =
        (this.followPadding.x * this.windowSize.x) / 1280 - position.x;
      const rightX =
        position.x -
        this.windowSize.x +
        (this.followPadding.x * this.windowSize.x) / 1280;

      if (leftX > 0) {
        this.position.x += leftX * deltaTime;
      } else if (rightX > 0) {
        this.position.x -= rightX * deltaTime;
      }

      const topX =
        (this.followPadding.y * this.windowSize.y) / 1280 - position.y;
      const bottomX =
        position.y -
        this.windowSize.y +
        (this.followPadding.y * this.windowSize.y) / 1280;

      if (topX > 0) {
        this.position.y += topX * deltaTime;
      } else if (bottomX > 0) {
        this.position.y -= bottomX * deltaTime;
      }
    }
    this.updateLayers();
  }

  private updateLayers() {
    this.layers.forEach((layer, key) => {
      layer.position.x = this.position.x * key;
      layer.position.y = this.position.y * key;
    });
  }
}