export const Direction = Object.freeze({ "up": 1, "down": 2, "left": 3, "right": 4 })

export const directionByKeyCode = {
  '37': Direction.left,
  '38': Direction.up,
  '39': Direction.right,
  '40': Direction.down,
}