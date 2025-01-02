import { GameObject } from "./GameObject";

const calculateOverlap = (gameObj1: GameObject, gameObj2: GameObject) => ({
  left: gameObj1.x + gameObj1.size.width - gameObj2.x,
  right: gameObj2.x + gameObj2.size.width - gameObj1.x,
  top: gameObj1.y + gameObj1.size.height - gameObj2.y,
  bottom: gameObj2.y + gameObj2.size.height - gameObj1.y,
});
export type direction = "left" | "right" | "bottom" | "top";
const getCollisionDirection = (overlaps: {
  left: number;
  right: number;
  top: number;
  bottom: number;
}): direction => {
  const { left, right, top, bottom } = overlaps;
  const minOverlap = Math.min(left, right, top, bottom);

  if (minOverlap === left) return "left";
  if (minOverlap === right) return "right";
  if (minOverlap === top) return "top";
  return "bottom";
};

const isCollision = (gameObj1: GameObject, gameObj2: GameObject): boolean =>
  gameObj1.x < gameObj2.x + gameObj2.size.width &&
  gameObj1.x + gameObj1.size.width > gameObj2.x &&
  gameObj1.y < gameObj2.y + gameObj2.size.height &&
  gameObj1.y + gameObj1.size.height > gameObj2.y;

/**
 * Detects collision between two game objects and determines the direction of the collision.
 *
 * @param {GameObject} gameObj1 - The first game object involved in the collision.
 * @param {GameObject} gameObj2 - The second game object involved in the collision.
 * @returns {("left" | "right" | "bottom" | "top") | null} - The direction of the collision if detected
 * ("left", "right", "top", or "bottom"), or `null` if there is no collision.
 *
 */

const collisionDetection = (
  gameObj1: GameObject,
  gameObj2: GameObject
): direction | null => {
  if (!isCollision(gameObj1, gameObj2)) {
    return null;
  }

  const overlaps = calculateOverlap(gameObj1, gameObj2);
  const direction = getCollisionDirection(overlaps);
  return direction;
};

export { collisionDetection };
