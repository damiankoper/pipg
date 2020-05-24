import _ from "lodash";
import * as PIXI from "pixi.js";
import { EmitterConfig, ValueList } from "pixi-particles";
export default class ParticleConfig {
  static get rainTextures() {
    return _.values(
      PIXI.Loader.shared.resources["assets/spritesheets/rain.json"].spritesheet
        .textures
    );
  }
  static rain = {
    alpha: {
      start: 0.5,
      end: 0.5,
    },
    scale: {
      start: 0.8,
      end: 0.8,
    },
    color: {
      start: "ffffff",
      end: "ffffff",
    },
    speed: {
      start: 2000,
      end: 2000,
    },
    startRotation: {
      min: 65,
      max: 65,
    },
    rotationSpeed: {
      min: 0,
      max: 0,
    },
    lifetime: {
      min: 0.81,
      max: 0.81,
    },
    blendMode: "overlay",
    frequency: 0.004,
    emitterLifetime: 0,
    maxParticles: 1000,
    pos: {
      x: 0,
      y: 0,
    },
    addAtBack: false,
    spawnType: "rect",
    spawnRect: {
      x: -1280 / 2 - 200,
      y: -720,
      w: 1500,
      h: 720,
    },
  };
  static get sparclesTextures() {
    return _.values(
      PIXI.Loader.shared.resources["assets/spritesheets/sparcles.json"]
        .spritesheet.textures
    );
  }
  static sparcles: EmitterConfig = {
    alpha: {
      list: [
        { value: 0, time: 0 },
        { value: 1, time: 0.4 },
        { value: 1, time: 0.6 },
        { value: 0, time: 1 },
      ],
    },
    scale: {
      list: [
        { value: 1, time: 0 },
        { value: 1, time: 1 },
      ],
    },
    color: {
      list: [
        { value: "ffffff", time: 0 },
        { value: "ffffff", time: 1 },
      ],
    },
    speed: {
      list: [
        { value: 8, time: 0 },
        { value: 8, time: 1 },
      ],
    },
    startRotation: {
      min: 0,
      max: 360,
    },
    rotationSpeed: {
      min: 0,
      max: 0,
    },
    lifetime: {
      min: 2,
      max: 2,
    },
    blendMode: "add",
    frequency: 0.15,
    emitterLifetime: 0,
    maxParticles: 1000,
    pos: {
      x: 0,
      y: 0,
    },
    addAtBack: true,
    spawnType: "rect",
    spawnRect: {
      x: -1280 / 2,
      y: -720 / 2,
      w: 1280,
      h: 720,
    },
  };
}
