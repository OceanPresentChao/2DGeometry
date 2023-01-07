import type { Point, Vector } from './type'
import { standardize } from './vector'

export function movePoint(point: Point, vector: Vector, length: number): Point {
  const direct = standardize(vector)
  return {
    x: point.x + direct.x * length,
    y: point.y + direct.y * length,
  }
}

export function andrew(points: Point[]): Point[] {
  const sortedPoints = points.sort((a, b) => a.x - b.x || a.y - b.y)
  const upperHull = sortedPoints.reduce((acc, point) => {
    while (acc.length >= 2) {
      const last = acc[acc.length - 1]
      const secondLast = acc[acc.length - 2]
      const vector1 = { x: last.x - secondLast.x, y: last.y - secondLast.y }
      const vector2 = { x: point.x - last.x, y: point.y - last.y }
      if (vector1.x * vector2.y - vector1.y * vector2.x > 0)
        break

      acc.pop()
    }
    acc.push(point)
    return acc
  }, [] as Point[])
  const lowerHull = sortedPoints.reduceRight((acc, point) => {
    while (acc.length >= 2) {
      const last = acc[acc.length - 1]
      const secondLast = acc[acc.length - 2]
      const vector1 = { x: last.x - secondLast.x, y: last.y - secondLast.y }
      const vector2 = { x: point.x - last.x, y: point.y - last.y }
      if (vector1.x * vector2.y - vector1.y * vector2.x > 0)
        break

      acc.pop()
    }
    acc.push(point)
    return acc
  }, [] as Point[])
  return [...upperHull, ...lowerHull.slice(1, -1)]
}
