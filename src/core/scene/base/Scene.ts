import SceneObject from "./SceneObject";
import { Engine } from "matter-js";
import * as PIXI from "pixi.js";
import Camera from "../../camera/Camera";
import * as particles from "pixi-particles";
import SpartialSound from "../../sound/SpartialSound";

export default abstract class Scene implements SceneObject {
  protected camera: Camera;
  protected objects: SceneObject[] = [];
  protected emitters: particles.Emitter[] = [];
  protected sounds: SpartialSound[] = [];

  constructor(camera: Camera, spritesheets: string[]) {
    this.camera = camera;
    spritesheets.forEach((s) => PIXI.Loader.shared.add(s));
  }

  setup(container: PIXI.Container, engine: Engine): void {}

  update(delta: number): void {
    this.objects.forEach((p) => p.update(delta));

    const camPos = this.camera.getPosition();
    this.emitters.forEach((e) => {
      e.updateSpawnPos(-camPos.x, -camPos.y);
      e.update(delta / 1000);
    });

    this.sounds.forEach((s) => s.update(delta));
  }
}
