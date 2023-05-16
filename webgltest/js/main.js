import { initGL } from './glutil.js';
import { VS_CODE, FS_CODE } from './shader.js';


function render(gl) {
  // gl.clearColor(0, 0, 0.5, 1.0);
  // gl.clear(gl.COLOR_BUFFER_BIT);
  // gl.drawArrays(gl.POINTS, 0, 1);


  const vertices = new Float32Array([
    0.0, 0.5,    // 1つ目の頂点座標
    -0.5, -0.5,  // 2つ目の頂点座標
    0.5, -0.5,    // 3つ目の頂点座標
    // 1.0,  0.5,    // 3つ目の頂点座標
    // 0.0, 0.5,    // 1つ目の頂点座標
  ]);

  const vertexBuffer = gl.createBuffer();
  if (!vertexBuffer) {
    throw Error('Failed to create the buffer object.');
  }
  gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

  const a_Position = gl.getAttribLocation(gl.program, 'a_Position');
  gl.vertexAttribPointer(a_Position, 2, gl.FLOAT, false, 0, 0);
  gl.enableVertexAttribArray(a_Position);

  gl.clearColor(1, 1, 1, 1.0);
  gl.clear(gl.COLOR_BUFFER_BIT);
  gl.drawArrays(gl.LINE_LOOP, 0, 3);
}

function main() {
  const canvas = document.getElementById('can');
  
  const gl = initGL(canvas, VS_CODE, FS_CODE);

  render(gl);
}

window.onload = main;