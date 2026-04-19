declare module 'vanta/dist/vanta.waves.min' {
  import * as THREE from 'three';
  interface VantaOptions {
    el: HTMLElement;
    THREE: typeof THREE;
    [key: string]: unknown;
  }
  function WAVES(options: VantaOptions): { destroy: () => void };
  export default WAVES;
}
