// Both renderers report the position the visitor can currently see.
export const AUTO_ORBIT_SPEED = .18;

export function describeView(yaw) {
  const degrees = Math.round(Math.atan2(Math.sin(yaw), Math.cos(yaw)) * 180 / Math.PI);
  const angle = degrees === -180 ? 180 : degrees || 0;
  const absolute = Math.abs(angle);
  const label = absolute < 22 ? 'Vista frontal' : absolute > 150 ? 'Vista posterior'
    : angle > 0 ? 'Lateral izquierdo' : 'Lateral derecho';
  return {angle, label};
}
