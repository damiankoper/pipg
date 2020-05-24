import Sound from "pixi-sound";
import SceneObject from "../scene/base/SceneObject";
import { Engine, Vector } from "matter-js";
import Camera from "../camera/Camera";
import _ from "lodash";
export default class SpartialSound implements SceneObject {
  protected readonly sound: Sound.Sound;
  protected camera?: Camera;

  public position: Vector;
  public fadeFn: (d: number) => number;

  constructor(
    filename: string,
    position: Vector = Vector.create(0, 0),
    fadeFn = (d: number) => 1,
    autoPlay: boolean = true,
    loop: boolean = true
  ) {
    this.sound = Sound.Sound.from({
      url: filename,
      autoPlay,
      loop,
      preload: true,
      singleInstance: true
    });
    this.position = position;
    this.fadeFn = fadeFn;
  }

  setCamera(camera: Camera) {
    this.camera = camera;
  }

  setup(container: PIXI.Container, engine?: Engine): void {}

  update(delta: number): void {
    if (this.camera) {
      const distance = Vector.magnitude(
        Vector.sub(this.position, this.camera.getPosition())
      );
      this.sound.volume = _.clamp(this.fadeFn(distance), 0, 1);
    } else this.sound.volume = this.fadeFn(0);
  }
}
