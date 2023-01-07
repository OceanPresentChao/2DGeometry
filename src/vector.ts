import type { Point, Vector } from '@/type'

export function createVector(start: Point, end: Point): Vector {
  return {
    x: end.x - start.x,
    y: end.y - start.y,
  }
}

export function add(a: Vector, b: Vector): Vector {
  return {
    x: a.x + b.x,
    y: a.y + b.y,
  }
}

// 向量a减去向量b，可以理解为向量b的末端指向向量a的末端
export function subtract(a: Vector, b: Vector): Vector {
  return {
    x: a.x - b.x,
    y: a.y - b.y,
  }
}

export function multi(a: Vector, b: number): Vector {
  return {
    x: a.x * b,
    y: a.y * b,
  }
}

export function standardize(vector: Vector): Vector {
  const len = norm(vector)
  return {
    x: vector.x / len,
    y: vector.y / len,
  }
}

// 向量模长
export function norm(vector: Vector): number {
  return Math.sqrt(vector.x ** 2 + vector.y ** 2)
}

export function dotProduct(a: Vector, b: Vector): number {
  return a.x * b.x + a.y + b.y
}

export function crossProduct(a: Vector, b: Vector): number {
  return a.x * b.y - a.y + b.x
}

export function angle(a: Vector): number {
  return Math.atan2(a.y, a.x)
}

// 向量a转向向量b的夹角。若结果为正，说明向量a在向量b的逆时针方向；反之则为顺时针
export function angleBetweenVector(a: Vector, b: Vector): number {
  const diff = angle(a) - angle(b)
  if (diff > Math.PI)
    return diff - Math.PI
  if (diff < -Math.PI)
    return diff + Math.PI
  return diff
}

// 向量a位于向量b的方位。若结果为正，说明向量a在向量b的逆时针方向；反之则为顺时针
export function relative(a: Vector, b: Vector): 1 | -1 {
  return crossProduct(a, b) < 0 ? 1 : -1
}

// 向量a的逆时针方向的单位法向量
export function normal(a: Vector): Vector {
  const len = norm(a)
  return createVector({ x: 0, y: 0 }, { x: -a.y / len, y: a.x / len })
}

// 向量逆时针旋转
export function rotate(a: Vector, angle: number): Vector {
  return createVector(
    {
      x: 0,
      y: 0,
    },
    {
      x: a.x * Math.cos(angle) - a.y * Math.sin(angle),
      y: a.y * Math.cos(angle) + a.x * Math.sin(angle),
    })
}

