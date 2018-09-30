interface ICanvasState {
  distanceToTarget: number;
}

interface IDebugPanelProps {
  x: number;
  y: number;
  rectWidth: number;
  rectLength: number;
  speedX: number;
  speedY: number;
  clickX: number;
  clickY: number;
  distanceToClick: number;
}
