import { Plugin } from 'vite';

export default function shopifyReactRefresh(): Plugin {
  const virtualModuleId = 'tushy-vite-plugin-v2:react-refresh'
  const resolvedVirtualModuleId = '\0' + virtualModuleId

  return {
    name: 'tushy-vite-plugin-v2:react-refresh',
    resolveId(id) {
      if (id === virtualModuleId) {
        return resolvedVirtualModuleId
      }
    },
    load(id) {
      if (id === resolvedVirtualModuleId) {
        // fast-refresh
        // https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/src/fast-refresh.ts#L23-L29
        return `
          import RefreshRuntime from '__shopify_vite_placeholder__/@react-refresh'
          RefreshRuntime.injectIntoGlobalHook(window)
          window.$RefreshReg$ = () => {}
          window.$RefreshSig$ = () => (type) => type
          window.__vite_plugin_react_preamble_installed__ = true
        `
      }
    }
  }
}
