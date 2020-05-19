import { Engine } from "matter-js";
import * as PIXI from "pixi.js";

export default interface SceneObject {
  setup(container: PIXI.Container, engine?: Engine): void;
  update(): void;
}
