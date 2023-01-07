import { angleBetweenVector, createVector, crossProduct, dotProduct, multi, norm, standardize } from './vector'
import { movePoint } from './point'
import type { Line, Point, Segment, Vector } from '@/type'

export function createLine(point: Point, direction: Vector): Line {
  return {
    point,
    direction,
  }
}

export function distanceToLine(p: Point, l: Line): number {
  const ap = createVector(l.point, p)
  const ab = l.direction
  return Math.abs(crossProduct(ap, ab)) / norm(ab)
}

export function isOnSegment(p: Point, s: Segment): boolean {
  const minX = Math.min(s.start.x, s.end.x)
  const maxX = Math.max(s.start.x, s.end.x)
  const minY = Math.min(s.start.y, s.end.y)
  const maxY = Math.max(s.start.y, s.end.y)
  const pa = createVector(p, s.start)
  const pb = createVector(p, s.end)
  if (p.x >= minX && p.x <= maxX && p.y >= minY && p.x <= maxY && crossProduct(pa, pb) === 0)
    return true
  return false
}

export function isOnline(p: Point, s: Line): boolean {
  const pa = createVector(p, s.point)
  const pb = createVector(p, movePoint(s.point, s.direction, 1))
  if (crossProduct(pa, pb) === 0)
    return true
  return false
}

// 两条直线的交点：0 - PI/2
export function angleBetweenLine(l1: Line, l2: Line): number {
  const v1 = l1.direction
  const v2 = l2.direction
  return Math.acos(dotProduct(v1, v2) / (norm(v1) * norm(v2)))
}

// 返回点斜式的斜率和截距
export function slope(line: Line): { k: number; b: number } {
  const v = line.direction
  const k = v.y / v.x
  const b = line.point.y - k * line.point.x
  return {
    k, b,
  }
}

export function correlation(l1: Line, l2: Line) {
  const { k: k1, b: b1 } = slope(l1)
  const { k: k2, b: b2 } = slope(l2)
  return k1 === k2 ? b1 === b2 ? 'coincident' : 'parallel' : 'intersect'
}

export function isParallel(l1: Line, l2: Line) {
  return correlation(l1, l2) === 'parallel'
}

export function isIntersect(l1: Line, l2: Line) {
  return correlation(l1, l2) === 'intersect'
}

export function intersection(l1: Line, l2: Line): Point {
  const db = createVector(movePoint(l2.point, l2.direction, 10), movePoint(l1.point, l1.direction, 10))
  const ab = l1.direction
  const cd = l2.direction
  const beta = Math.abs(angleBetweenVector(ab, cd))
  const theta = Math.abs(angleBetweenVector(db, cd))
  const l = Math.abs(norm(db) * Math.sin(theta) / Math.sin(beta))
  const B = movePoint(l1.point, l1.direction, 1)
  const offset = multi(standardize(ab), l)
  return {
    x: B.x - offset.x,
    y: B.y - offset.y,
  }
}
