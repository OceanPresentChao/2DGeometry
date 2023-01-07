import type { Circle, Point } from './type'
import { createVector, rotate, standardize } from './vector'

export function isOnCircle(point: Point, circle: Circle): boolean {
  const dist = Math.sqrt((point.x - circle.c.x) ** 2 + (point.y - circle.c.y) ** 2)
  return dist === circle.r
}

export function tengents(circle: Circle, point: Point): Point[] {
  const distC = Math.hypot(circle.c.x - point.x, circle.c.y - point.y)
  if (distC < circle.r)
    return []
  if (distC === circle.r)
    return [point]

  const distT = Math.sqrt(distC ** 2 - circle.r ** 2)

  // 点到圆心的单位向量
  const u = standardize(createVector(point, circle.c))

  const angle = Math.asin(circle.r / distC)

  const pq1 = rotate(u, angle)
  const pq2 = rotate(u, -angle)

  const Q1: Point = {
    x: circle.c.x + distT * pq1.x,
    y: circle.c.y + distT * pq1.y,
  }

  const Q2: Point = {
    x: circle.c.x + distT * pq2.x,
    y: circle.c.y + distT * pq2.y,
  }

  return [Q1, Q2]
}
