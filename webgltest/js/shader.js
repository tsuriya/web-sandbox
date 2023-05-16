

// const VS_CODE = `
// void main() {
//   gl_Position = vec4(0.0, 0.0, 0.0, 1.0);  // 画面中央
//   gl_PointSize = 50.0;  // 頂点サイズ
// }`;

// const FS_CODE = `
// void main() {
//   gl_FragColor = vec4(0.0, 1.0, 0.0, 1.0);  // RGBA（緑色）
// }`;

const VS_CODE = `
attribute vec4 a_Position;
void main() {
  gl_Position = a_Position;
  gl_PointSize = 50.0;  // 頂点サイズ
}`;

const FS_CODE = `
void main() {
  gl_FragColor = vec4(0.0, 0.0, 0.0, 1.0);  // RGBA
}`;


export {VS_CODE, FS_CODE};