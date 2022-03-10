export interface Transition {
  shader: string
  uniforms?: Record<string, {
    value: any
  }>
}
const transition: Record<string, Transition> = {
  default: {
    shader: `
      vec4 transition (vec2 uv) {
      return mix(
        getFromColor(uv),
        getToColor(uv),
        progress
      );
    }
    `,
  },
  windowslice: {
    shader: `
      uniform float count; // = 10.0
      uniform float smoothness; // = 0.5

      vec4 transition (vec2 p) {
        float pr = smoothstep(-smoothness, 0.0, p.x - progress * (1.0 + smoothness));
        float s = step(pr, fract(count * p.x));
        return mix(getFromColor(p), getToColor(p), s);
      }
    `,
    uniforms: {
      count: {
        value: 10,
      },
      smoothness: {
        value: 0.5,
      },
    },
  },
  directionalwrap: {
    shader: `
      uniform vec2 direction; // = vec2(-1.0, 1.0)

      const float smoothness = 0.5;
      const vec2 center = vec2(0.5, 0.5);
      
      vec4 transition (vec2 uv) {
        vec2 v = normalize(direction);
        v /= abs(v.x) + abs(v.y);
        float d = v.x * center.x + v.y * center.y;
        float m = 1.0 - smoothstep(-smoothness, 0.0, v.x * uv.x + v.y * uv.y - (d - 0.5 + progress * (1.0 + smoothness)));
        return mix(getFromColor((uv - 0.5) * (1.0 - m) + 0.5), getToColor((uv - 0.5) * m + 0.5), m);
      }
    
    `,
    uniforms: {
      direction: {
        value: {
          x: -1,
          y: 1,
        },
      },
    },
  },
}

export default transition
