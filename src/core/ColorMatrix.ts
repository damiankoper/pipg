export default class ColorMatrix {
  //http://andresgalante.com/RGBAtoFeColorMatrix/
  static blue(n: number = 1) {
    return [
      0.5 * n,
      0,
      0,
      0,
      0,
      0,
      0.5 * n,
      0,
      0,
      0,
      0,
      0,
      0.75 * n,
      0,
      0,
      0,
      0,
      0,
      1,
      0,
    ];
  }
}
