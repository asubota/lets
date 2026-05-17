import { BloomEffect, EffectComposer, EffectPass, RenderPass, SMAAEffect, SMAAPreset } from 'postprocessing'
import { useEffect, useRef } from 'react'
import * as THREE from 'three'

import './Hyperspeed.css'

interface Distortion {
  uniforms: Record<string, { value: unknown }>
  getDistortion: string
  getJS?: (progress: number, time: number) => THREE.Vector3
}

interface HyperspeedOptions {
  onSpeedUp?: (ev: MouseEvent | TouchEvent) => void
  onSlowDown?: (ev: MouseEvent | TouchEvent) => void
  distortion?: string | Distortion
  length: number
  roadWidth: number
  islandWidth: number
  lanesPerRoad: number
  fov: number
  fovSpeedUp: number
  speedUp: number
  carLightsFade: number
  totalSideLightSticks: number
  lightPairsPerRoadWay: number
  shoulderLinesWidthPercentage: number
  brokenLinesWidthPercentage: number
  brokenLinesLengthPercentage: number
  lightStickWidth: [number, number]
  lightStickHeight: [number, number]
  movingAwaySpeed: [number, number]
  movingCloserSpeed: [number, number]
  carLightsLength: [number, number]
  carLightsRadius: [number, number]
  carWidthPercentage: [number, number]
  carShiftX: [number, number]
  carFloorSeparation: [number, number]
  colors: {
    roadColor: number
    islandColor: number
    background: number
    shoulderLines: number
    brokenLines: number
    leftCars: number[]
    rightCars: number[]
    sticks: number
  }
}

// ─── brand preset ────────────────────────────────────────────────────────────
const OPTIONS: HyperspeedOptions = {
  distortion: 'turbulentDistortion',
  length: 400,
  roadWidth: 10,
  islandWidth: 2,
  lanesPerRoad: 4,
  fov: 90,
  fovSpeedUp: 150,
  speedUp: 2,
  carLightsFade: 0.4,
  totalSideLightSticks: 50,
  lightPairsPerRoadWay: 70,
  shoulderLinesWidthPercentage: 0.05,
  brokenLinesWidthPercentage: 0.1,
  brokenLinesLengthPercentage: 0.5,
  lightStickWidth: [0.12, 0.5],
  lightStickHeight: [1.3, 1.7],
  movingAwaySpeed: [60, 80],
  movingCloserSpeed: [-120, -160],
  carLightsLength: [400 * 0.03, 400 * 0.2],
  carLightsRadius: [0.05, 0.14],
  carWidthPercentage: [0.3, 0.5],
  carShiftX: [-0.8, 0.8],
  carFloorSeparation: [0, 5],
  colors: {
    roadColor: 0x080202,
    islandColor: 0x040101,
    background: 0x050101,
    shoulderLines: 0x220808,
    brokenLines: 0x150404,
    leftCars:  [0xea2b06, 0xdd1000, 0xff2200],   // bright brand red
    rightCars: [0x3a0000, 0x220000, 0x550000],   // deep dark brand red (black-red)
    sticks: 0xea2b06,
  },
}

// ─── distortions ─────────────────────────────────────────────────────────────
function nsin(v: number) { return Math.sin(v) * 0.5 + 0.5 }

const turbulentUniforms = {
  uFreq: { value: new THREE.Vector4(4, 8, 8, 1) },
  uAmp:  { value: new THREE.Vector4(25, 5, 10, 10) },
}

const DISTORTIONS: Record<string, Distortion> = {
  turbulentDistortion: {
    uniforms: turbulentUniforms,
    getDistortion: `
      uniform vec4 uFreq; uniform vec4 uAmp;
      float nsin(float v){ return sin(v)*0.5+0.5; }
      #define PI 3.14159265358979
      float dX(float p){ return cos(PI*p*uFreq.r+uTime)*uAmp.r + pow(cos(PI*p*uFreq.g+uTime*(uFreq.g/uFreq.r)),2.)*uAmp.g; }
      float dY(float p){ return -nsin(PI*p*uFreq.b+uTime)*uAmp.b + -pow(nsin(PI*p*uFreq.a+uTime/(uFreq.b/uFreq.a)),5.)*uAmp.a; }
      vec3 getDistortion(float p){ return vec3(dX(p)-dX(0.0125), dY(p)-dY(0.0125), 0.); }
    `,
    getJS: (p, t) => {
      const { x: fx, y: fy, z: fz, w: fw } = turbulentUniforms.uFreq.value
      const { x: ax, y: ay, z: az, w: aw } = turbulentUniforms.uAmp.value
      const gX = (q: number) => Math.cos(Math.PI*q*fx+t)*ax + Math.pow(Math.cos(Math.PI*q*fy+t*(fy/fx)),2)*ay
      const gY = (q: number) => -nsin(Math.PI*q*fz+t)*az - Math.pow(nsin(Math.PI*q*fw+t/(fz/fw)),5)*aw
      return new THREE.Vector3(gX(p)-gX(p+0.007), gY(p)-gY(p+0.007), 0)
        .multiply(new THREE.Vector3(-2,-5,0)).add(new THREE.Vector3(0,0,-10))
    },
  },
}

// ─── helpers ──────────────────────────────────────────────────────────────────
function rnd(base: number | [number, number]) {
  return Array.isArray(base) ? Math.random()*(base[1]-base[0])+base[0] : Math.random()*base
}
function pick<T>(a: T|T[]): T { return Array.isArray(a) ? a[Math.floor(Math.random()*a.length)] : a }
function lerp(cur: number, tgt: number, spd=0.1, lim=0.001) {
  const d = (tgt-cur)*spd; return Math.abs(d)<lim ? tgt-cur : d
}

// ─── shaders ─────────────────────────────────────────────────────────────────
const carLightsFrag = `
#define USE_FOG
${THREE.ShaderChunk['fog_pars_fragment']}
varying vec3 vColor;
varying vec2 vUv;
uniform vec2 uFade;
void main() {
  float a = smoothstep(uFade.x, uFade.y, vUv.x);
  gl_FragColor = vec4(vColor, a);
  if (gl_FragColor.a < 0.0001) discard;
  ${THREE.ShaderChunk['fog_fragment']}
}`

const carLightsVert = `
#define USE_FOG
${THREE.ShaderChunk['fog_pars_vertex']}
attribute vec3 aOffset;
attribute vec3 aMetrics;
attribute vec3 aColor;
uniform float uTravelLength;
uniform float uTime;
varying vec2 vUv;
varying vec3 vColor;
#include <getDistortion_vertex>
void main() {
  vec3 transformed = position.xyz;
  transformed.xy *= aMetrics.r;
  transformed.z *= aMetrics.g;
  transformed.z += aMetrics.g - mod(uTime * aMetrics.b + aOffset.z, uTravelLength);
  transformed.xy += aOffset.xy;
  transformed.xyz += getDistortion(abs(transformed.z / uTravelLength));
  vec4 mvPosition = modelViewMatrix * vec4(transformed, 1.0);
  gl_Position = projectionMatrix * mvPosition;
  vUv = uv;
  vColor = aColor;
  ${THREE.ShaderChunk['fog_vertex']}
}`

const sideFrag = `
#define USE_FOG
${THREE.ShaderChunk['fog_pars_fragment']}
varying vec3 vColor;
void main() {
  gl_FragColor = vec4(vColor, 1.0);
  ${THREE.ShaderChunk['fog_fragment']}
}`

const sideVert = `
#define USE_FOG
${THREE.ShaderChunk['fog_pars_vertex']}
attribute float aOffset;
attribute vec3 aColor;
attribute vec2 aMetrics;
uniform float uTravelLength;
uniform float uTime;
varying vec3 vColor;
mat4 rotY(float a) {
  return mat4(cos(a),0,sin(a),0, 0,1,0,0, -sin(a),0,cos(a),0, 0,0,0,1);
}
#include <getDistortion_vertex>
void main() {
  vec3 transformed = position.xyz;
  transformed.xy *= vec2(aMetrics.x, aMetrics.y);
  float progress = mod(uTime * 120.0 + aOffset, uTravelLength);
  transformed = (rotY(3.14159265 / 2.0) * vec4(transformed, 1.0)).xyz;
  transformed.z += -uTravelLength + progress;
  transformed.xyz += getDistortion(abs(transformed.z / uTravelLength));
  transformed.y += aMetrics.y / 2.0;
  transformed.x += -aMetrics.x / 2.0;
  vec4 mvPosition = modelViewMatrix * vec4(transformed, 1.0);
  gl_Position = projectionMatrix * mvPosition;
  vColor = aColor;
  ${THREE.ShaderChunk['fog_vertex']}
}`

const roadMarkVars = `
uniform float uLanes;
uniform vec3 uBrokenLinesColor;
uniform vec3 uShoulderLinesColor;
uniform float uShoulderLinesWidthPercentage;
uniform float uBrokenLinesWidthPercentage;
uniform float uBrokenLinesLengthPercentage;`

const roadMarkFrag = `
  uv.y = mod(uv.y + uTime * 0.05, 1.0);
  float laneWidth = 1.0 / uLanes;
  float brokenLineWidth = laneWidth * uBrokenLinesWidthPercentage;
  float laneEmptySpace = 1.0 - uBrokenLinesLengthPercentage;
  float brokenLines = step(1.0 - brokenLineWidth, fract(uv.x * 2.0)) * step(laneEmptySpace, fract(uv.y * 10.0));
  float sideLines = step(1.0 - brokenLineWidth, fract((uv.x - laneWidth * (uLanes - 1.0)) * 2.0)) + step(brokenLineWidth, uv.x);
  brokenLines = mix(brokenLines, sideLines, uv.x);`

const roadBaseFrag = `
#define USE_FOG
${THREE.ShaderChunk['fog_pars_fragment']}
#include <roadMarkings_vars>
varying vec2 vUv;
uniform vec3 uColor;
uniform float uTime;
void main() {
  vec2 uv = vUv;
  vec3 color = vec3(uColor);
  #include <roadMarkings_fragment>
  gl_FragColor = vec4(color, 1.0);
  ${THREE.ShaderChunk['fog_fragment']}
}`

const islandFrag = roadBaseFrag
  .replace('#include <roadMarkings_fragment>', '')
  .replace('#include <roadMarkings_vars>', '')

const roadFrag = roadBaseFrag
  .replace('#include <roadMarkings_fragment>', roadMarkFrag)
  .replace('#include <roadMarkings_vars>', roadMarkVars)

const roadVert = `
#define USE_FOG
uniform float uTime;
${THREE.ShaderChunk['fog_pars_vertex']}
uniform float uTravelLength;
varying vec2 vUv;
#include <getDistortion_vertex>
void main() {
  vec3 transformed = position.xyz;
  vec3 distortion = getDistortion((transformed.y + uTravelLength / 2.0) / uTravelLength);
  transformed.x += distortion.x;
  transformed.z += distortion.y;
  transformed.y += -1.0 * distortion.z;
  vec4 mvPosition = modelViewMatrix * vec4(transformed, 1.0);
  gl_Position = projectionMatrix * mvPosition;
  vUv = uv;
  ${THREE.ShaderChunk['fog_vertex']}
}`

// ─── scene classes ────────────────────────────────────────────────────────────
class HyperspeedApp {
  container: HTMLElement
  opts: HyperspeedOptions
  dist: Distortion
  renderer: THREE.WebGLRenderer
  composer: EffectComposer
  camera: THREE.PerspectiveCamera
  scene: THREE.Scene
  clock: THREE.Clock
  fogU: Record<string, { value: unknown }>
  disposed = false
  fovTarget: number
  speedUpTarget = 0
  speedUp = 0
  timeOffset = 0

  constructor(el: HTMLElement, opts: HyperspeedOptions) {
    this.container = el
    this.opts = opts
    this.dist = typeof opts.distortion === 'string'
      ? DISTORTIONS[opts.distortion]
      : (opts.distortion as Distortion)

    const w = Math.max(1, el.offsetWidth)
    const h = Math.max(1, el.offsetHeight)

    this.renderer = new THREE.WebGLRenderer({ antialias: false, alpha: true })
    this.renderer.setSize(w, h, false)
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    el.appendChild(this.renderer.domElement)

    this.composer = new EffectComposer(this.renderer)
    this.camera = new THREE.PerspectiveCamera(opts.fov, w/h, 0.1, 10000)
    this.camera.position.set(0, 8, -5)
    this.scene = new THREE.Scene()
    this.scene.background = null

    const fog = new THREE.Fog(opts.colors.background, opts.length*0.2, opts.length*500)
    this.scene.fog = fog
    this.fogU = { fogColor: { value: fog.color }, fogNear: { value: fog.near }, fogFar: { value: fog.far } }

    this.clock = new THREE.Clock()
    this.fovTarget = opts.fov

    this.tick = this.tick.bind(this)
    this.onResize = this.onResize.bind(this)
    window.addEventListener('resize', this.onResize)
  }

  onResize() {
    const w = this.container.offsetWidth, h = this.container.offsetHeight
    if (!w || !h) return
    this.renderer.setSize(w, h, false)
    this.camera.aspect = w/h
    this.camera.updateProjectionMatrix()
    this.composer.setSize(w, h)
  }

  makeMaterial(vert: string, frag: string, uniforms: Record<string, { value: unknown }>, extra?: Record<string, { value: unknown }>, transparent = false) {
    const mat = new THREE.ShaderMaterial({
      vertexShader: vert, fragmentShader: frag, transparent,
      uniforms: Object.assign({}, uniforms, this.fogU, extra ?? {}),
    })
    mat.onBeforeCompile = (s: { vertexShader: string }) => {
      s.vertexShader = s.vertexShader.replace('#include <getDistortion_vertex>', this.dist.getDistortion)
    }
    return mat
  }

  addRoadPlane(side: number, isRoad: boolean) {
    const o = this.opts
    const geo = new THREE.PlaneGeometry(isRoad ? o.roadWidth : o.islandWidth, o.length, 20, 100)
    const baseU: Record<string, { value: unknown }> = {
      uTravelLength: { value: o.length },
      uColor: { value: new THREE.Color(isRoad ? o.colors.roadColor : o.colors.islandColor) },
      uTime: { value: 0 },
    }
    const extraU: Record<string, { value: unknown }> = isRoad ? {
      uLanes: { value: o.lanesPerRoad },
      uBrokenLinesColor: { value: new THREE.Color(o.colors.brokenLines) },
      uShoulderLinesColor: { value: new THREE.Color(o.colors.shoulderLines) },
      uShoulderLinesWidthPercentage: { value: o.shoulderLinesWidthPercentage },
      uBrokenLinesLengthPercentage: { value: o.brokenLinesLengthPercentage },
      uBrokenLinesWidthPercentage: { value: o.brokenLinesWidthPercentage },
    } : {}
    const mat = this.makeMaterial(roadVert, isRoad ? roadFrag : islandFrag, baseU, extraU)
    ;(mat as unknown as { _uTime: { value: number } })._uTime = baseU.uTime as { value: number }
    const mesh = new THREE.Mesh(geo, mat)
    mesh.rotation.x = -Math.PI/2
    mesh.position.z = -o.length/2
    mesh.position.x = (o.islandWidth/2 + o.roadWidth/2) * side
    this.scene.add(mesh)
    return mesh
  }

  addCarLights(colors: number[], speed: [number,number], fade: THREE.Vector2) {
    const o = this.opts
    const curve = new THREE.LineCurve3(new THREE.Vector3(0,0,0), new THREE.Vector3(0,0,-1))
    const geo = new THREE.InstancedBufferGeometry().copy(new THREE.TubeGeometry(curve,40,1,8,false) as unknown as THREE.InstancedBufferGeometry)
    geo.instanceCount = o.lightPairsPerRoadWay * 2
    const lw = o.roadWidth / o.lanesPerRoad
    const aOff: number[] = [], aMet: number[] = [], aCol: number[] = []
    const cols = colors.map(c => new THREE.Color(c))
    for (let i = 0; i < o.lightPairsPerRoadWay; i++) {
      const r = rnd(o.carLightsRadius), len = rnd(o.carLightsLength), spd = rnd(speed)
      let lx = (i % o.lanesPerRoad) * lw - o.roadWidth/2 + lw/2 + rnd(o.carShiftX)*lw
      const cw = rnd(o.carWidthPercentage)*lw
      const oy = rnd(o.carFloorSeparation)+r*1.3, oz = -rnd(o.length)
      aOff.push(lx-cw/2,oy,oz, lx+cw/2,oy,oz)
      aMet.push(r,len,spd, r,len,spd)
      const c = pick(cols); aCol.push(c.r,c.g,c.b, c.r,c.g,c.b)
    }
    geo.setAttribute('aOffset', new THREE.InstancedBufferAttribute(new Float32Array(aOff),3))
    geo.setAttribute('aMetrics', new THREE.InstancedBufferAttribute(new Float32Array(aMet),3))
    geo.setAttribute('aColor',  new THREE.InstancedBufferAttribute(new Float32Array(aCol),3))
    const mat = this.makeMaterial(carLightsVert, carLightsFrag,
      { uTime:{value:0}, uTravelLength:{value:o.length}, uFade:{value:fade} },
      this.dist.uniforms as Record<string, { value: unknown }>, true)
    const mesh = new THREE.Mesh(geo, mat)
    mesh.frustumCulled = false
    this.scene.add(mesh)
    return mesh
  }

  addSticks() {
    const o = this.opts
    const geo = new THREE.InstancedBufferGeometry().copy(new THREE.PlaneGeometry(1,1) as unknown as THREE.InstancedBufferGeometry)
    geo.instanceCount = o.totalSideLightSticks
    const gap = o.length / (o.totalSideLightSticks-1)
    const aOff: number[] = [], aCol: number[] = [], aMet: number[] = []
    const cols = [new THREE.Color(o.colors.sticks)]
    for (let i = 0; i < o.totalSideLightSticks; i++) {
      aOff.push((i-1)*gap*2 + gap*Math.random())
      const c = pick(cols); aCol.push(c.r,c.g,c.b)
      aMet.push(rnd(o.lightStickWidth), rnd(o.lightStickHeight))
    }
    geo.setAttribute('aOffset', new THREE.InstancedBufferAttribute(new Float32Array(aOff),1))
    geo.setAttribute('aColor',  new THREE.InstancedBufferAttribute(new Float32Array(aCol),3))
    geo.setAttribute('aMetrics',new THREE.InstancedBufferAttribute(new Float32Array(aMet),2))
    const mat = this.makeMaterial(sideVert, sideFrag,
      { uTravelLength:{value:o.length}, uTime:{value:0} },
      this.dist.uniforms as Record<string, { value: unknown }>)
    mat.side = THREE.DoubleSide
    const mesh = new THREE.Mesh(geo, mat)
    mesh.frustumCulled = false
    this.scene.add(mesh)
    return mesh
  }

  roads: THREE.Mesh[] = []
  lights: THREE.Mesh[] = []
  sticksMesh!: THREE.Mesh

  init() {
    // passes
    const rp = new RenderPass(this.scene, this.camera)
    const bp = new EffectPass(this.camera, new BloomEffect({ luminanceThreshold:0.1, luminanceSmoothing:0.05, resolutionScale:1, intensity: 2.5 }))
    const sp = new EffectPass(this.camera, new SMAAEffect({ preset: SMAAPreset.MEDIUM }))
    rp.renderToScreen = false; bp.renderToScreen = false; sp.renderToScreen = true
    this.composer.addPass(rp); this.composer.addPass(bp); this.composer.addPass(sp)

    const o = this.opts
    this.roads = []

    const lL = this.addCarLights(o.colors.leftCars,  o.movingAwaySpeed,   new THREE.Vector2(0,1-o.carLightsFade))
    const lR = this.addCarLights(o.colors.rightCars, o.movingCloserSpeed, new THREE.Vector2(1,0+o.carLightsFade))
    lL.position.setX(-o.roadWidth/2 - o.islandWidth/2)
    lR.position.setX( o.roadWidth/2 + o.islandWidth/2)
    this.lights = [lL, lR]

    this.sticksMesh = this.addSticks()
    this.sticksMesh.position.setX(-(o.roadWidth + o.islandWidth/2))

    this.tick()
  }

  tick() {
    if (this.disposed) return
    requestAnimationFrame(this.tick)
    const delta = this.clock.getDelta()
    const lp = Math.exp(-(-60*Math.log2(1-0.1))*delta)
    this.speedUp += lerp(this.speedUp, this.speedUpTarget, lp, 0.00001)
    this.timeOffset += this.speedUp * delta
    const t = this.clock.elapsedTime + this.timeOffset

    // update uniforms
    const setTime = (m: THREE.Mesh) => { const u = (m.material as THREE.ShaderMaterial).uniforms; if (u.uTime) u.uTime.value = t }
    this.roads.forEach(setTime); this.lights.forEach(setTime); setTime(this.sticksMesh)

    // camera fov
    const fc = lerp(this.camera.fov, this.fovTarget, lp)
    if (fc !== 0) { this.camera.fov += fc*delta*6; this.camera.updateProjectionMatrix() }

    if (this.dist.getJS) {
      const d = this.dist.getJS(0.025, t)
      this.camera.lookAt(this.camera.position.clone().add(d))
      this.camera.updateProjectionMatrix()
    }

    this.composer.render(delta)
  }

  dispose() {
    this.disposed = true
    window.removeEventListener('resize', this.onResize)
    this.scene.traverse(o => {
      const m = o as unknown as THREE.Mesh
      if (!m.isMesh) return
      m.geometry?.dispose()
      const mat = m.material
      if (Array.isArray(mat)) mat.forEach((x: THREE.Material) => x.dispose())
      else (mat as THREE.Material)?.dispose()
    })
    this.scene.clear()
    this.renderer.dispose()
    this.renderer.forceContextLoss()
    this.renderer.domElement?.parentNode?.removeChild(this.renderer.domElement)
    this.composer.dispose()
  }
}

// ─── React component ──────────────────────────────────────────────────────────
const Hyperspeed = () => {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const app = new HyperspeedApp(el, OPTIONS)
    app.init()
    return () => app.dispose()
  }, [])

  return <div id="hyperspeed-lights" ref={ref} />
}

export default Hyperspeed
