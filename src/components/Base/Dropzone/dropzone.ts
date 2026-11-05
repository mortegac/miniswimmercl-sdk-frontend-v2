import Dropzone from "dropzone";
import { DropzoneElement, DropzoneProps } from "./index";

const init = (el: DropzoneElement, props: DropzoneProps) => {
  // autoDiscover existe en los typings v5 pero no en los de dropzone 6 — cast para compilar con ambos
  (Dropzone as any).autoDiscover = false;
  if (!el.dropzone) {
    el.dropzone = new Dropzone(el, props.options);
  }
};

export { init };
