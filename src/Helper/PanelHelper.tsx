export function closePanel(): void {
    const elm = document.querySelector<HTMLElement>(".wrapper .left-panel");
    if (elm) {
      elm.style.left = "-100%";
    }
    const openPanelElm = document.querySelector<HTMLElement>(".wrapper .open-panel");
    if (openPanelElm) {
      openPanelElm.style.display = "flex";
    }
  }
  
  export function openPanel(): void {
    const elm = document.querySelector<HTMLElement>(".wrapper .left-panel");
    if (elm) {
      elm.style.left = "1rem";
    }
  }
  