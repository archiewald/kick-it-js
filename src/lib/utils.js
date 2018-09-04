import Vector from "../app/Vector";

export function checkIfCirclesIntersect({
  position1,
  radius1,
  position2,
  radius2
}) {
  const distance = Math.sqrt(
    Math.pow(position1.x - position2.x, 2) +
      Math.pow(position1.y - position2.y, 2)
  );
  return distance < radius1 + radius2;
}

// stolen from http://www.sciencecalculators.org/mechanics/collisions/
// TODO: refactor
export function setNewVelocities(obj1, obj2) {
  const r1 = obj1.radius;
  const r2 = obj2.radius;

  const x1 = obj1.getPosition().x;
  const y1 = obj1.getPosition().y;
  const x2 = obj2.getPosition().x;
  const y2 = obj2.getPosition().y;
  const vx1 = obj1.getVelocityVector().x;
  const vy1 = obj1.getVelocityVector().y;
  const vx2 = obj2.getVelocityVector().x;
  const vy2 = obj2.getVelocityVector().y;

  const v1xnew =
    vx1 -
    ((((2 * r2) / (r1 + r2)) *
      ((vx1 - vx2) * (x1 - x2) + (vy1 - vy2) * (y1 - y2))) /
      ((x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2))) *
      (x1 - x2);

  const v1ynew =
    vy1 -
    ((((2 * r2) / (r1 + r2)) *
      ((vx1 - vx2) * (x1 - x2) + (vy1 - vy2) * (y1 - y2))) /
      ((x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2))) *
      (y1 - y2);

  const v2xnew =
    vx2 -
    ((((2 * r1) / (r1 + r2)) *
      ((vx2 - vx1) * (x2 - x1) + (vy2 - vy1) * (y2 - y1))) /
      ((x2 - x1) * (x2 - x1) + (y2 - y1) * (y2 - y1))) *
      (x2 - x1);

  const v2ynew =
    vy2 -
    ((((2 * r1) / (r1 + r2)) *
      ((vx2 - vx1) * (x2 - x1) + (vy2 - vy1) * (y2 - y1))) /
      ((x2 - x1) * (x2 - x1) + (y2 - y1) * (y2 - y1))) *
      (y2 - y1);

  return {
    v1: new Vector(v1xnew, v1ynew),
    v2: new Vector(v2xnew, v2ynew)
  };
}
