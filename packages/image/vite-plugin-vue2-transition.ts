import type { Plugin } from 'vite'

function rmTransitionPlugin(): Plugin {
  return {
    name: 'vite-plugin-rm-transition',
    async transform(code, id) {
      if (!id.endsWith('.tsx')) return
      code.match(/import\s+{.*(Transition\s*,).*\sfrom\s/s)
      code = code.replace(RegExp.$1, '')
      code.match(/components\s*:\s*{.*(Transition\s*,?)/s)
      code = code.replace(RegExp.$1, '')
      return code
    },
  }
}

export default rmTransitionPlugin
