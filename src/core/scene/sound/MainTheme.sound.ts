import SpartialSound from "../../sound/SpartialSound";
import { Vector } from "matter-js";

export default class MainTheme extends SpartialSound {
  private playTimeout = 0;
  private isPlaying = false;

  constructor() {
    super(
      "assets/sound/mainTheme.mp3",
      Vector.create(0, 0),
      (d) => 1,
      false,
      true
    );
  }

  update(delta: number) {
    if (this.camera && !this.sound.isPlaying && !this.isPlaying) {
      if (-this.camera.getPosition().x >= -140) {
        this.isPlaying = true;
        this.playTimeout = setTimeout(() => {
          this.sound.play();
        }, 100);
      } else {
        clearTimeout(this.playTimeout);
      }
    }
    super.update(delta);
  }
}
