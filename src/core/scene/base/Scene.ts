import SceneObject from "./SceneObject";
import { Engine } from "matter-js";
import * as PIXI from "pixi.js";
import Camera from "../../camera/Camera";

export default abstract class Scene implements SceneObject {
  protected camera: Camera;
  protected objects: SceneObject[] = [];

  constructor(camera: Camera, spritesheets: string[]) {
    this.camera = camera;
    spritesheets.forEach((s) => PIXI.Loader.shared.add(s));
  }

  setup(container: PIXI.Container, engine: Engine): void {}

  update(): void {
    this.objects.forEach((p) => p.update());
  }
}
