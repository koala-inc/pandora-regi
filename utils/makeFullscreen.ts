export default function makeFullscreen(el: any) {
  if (!document.fullscreenElement) {
    el.requestFullscreen();
    return;
  }
  document.exitFullscreen();
}
