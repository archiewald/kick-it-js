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
