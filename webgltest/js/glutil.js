/**
 * シェーダーコードをコンパイルしてシェーダーオブジェクトを作成します。
 * 作成に失敗した場合は null を返します。
 *
 * @param gl  WebGL コンテキスト
 * @param type  gl.VERTEX_SHADER あるいは gl.FRAGMENT_SHADER
 * @param source  シェーダーのソースコード
 */
function createShader(gl, type, source) {
  const shader = gl.createShader(type);
  if (shader == null) {
    console.error('Failed to create a shader');
    return null;
  }

  gl.shaderSource(shader, source);
  gl.compileShader(shader);

  // コンパイル結果を検査する
  const compiled = gl.getShaderParameter(shader, gl.COMPILE_STATUS);
  if (!compiled) {
    var log = gl.getShaderInfoLog(shader);
    console.error('Failed to compile a shader\n' + log);
    gl.deleteShader(shader);
    return null;
  }

  return shader;
}
/**
 * シェーダーオブジェクトをリンクしてプログラムオブジェクトを作成します。
 * 作成に失敗した場合は null を返します。
 *
 * @param gl  WebGL コンテキスト
 * @param vshader  頂点シェーダーオブジェクト
 * @param fshader  フラグメントシェーダーオブジェクト
 */
function createProgram(gl, vshader, fshader) {
  var program = gl.createProgram();
  if (!program) {
    return null;
  }

  gl.attachShader(program, vshader);
  gl.deleteShader(vshader);
  gl.attachShader(program, fshader);
  gl.deleteShader(fshader);
  gl.linkProgram(program);

  // リンクエラーの確認
  var linked = gl.getProgramParameter(program, gl.LINK_STATUS);
  if (!linked) {
    var log = gl.getProgramInfoLog(program);
    console.error('Failed to link a program\n' + log);
    gl.deleteProgram(program);
    return null;
  }
  return program;
}
/**
 * 頂点シェーダーとフラグメントシェーダーのソースコードから
 * プログラムオブジェクトを作成します。
 * 作成に失敗した場合は null を返します。
 *
 * @param gl  WebGL コンテキスト
 * @param vshaderCode  頂点シェーダーのソースコード
 * @param fshaderCode  フラグメントシェーダーのソースコード
 */
function createProgramFromCode(gl, vshaderCode, fshaderCode) {
  const vshader = createShader(gl, gl.VERTEX_SHADER, vshaderCode);
  if (!vshader) {
    return null;
  }

  const fshader = createShader(gl, gl.FRAGMENT_SHADER, fshaderCode);
  if (!fshader) {
    gl.deleteShader(vshader);
    return null;
  }

  return createProgram(gl, vshader, fshader);
}

function initGL (can, vshaderCode, fshaderCode) {
  const gl = can.getContext("webgl2");
  if (!gl) {
    console.error('Failed to obtain WebGL 2.0 context');
    return;
  }
  
  // プログラムオブジェクトの設定
  const program = createProgramFromCode(gl, vshaderCode, fshaderCode);
  gl.useProgram(program);
  gl.program = program;

  return gl;
}

/* 
export {initGL};
*/