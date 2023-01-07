export interface Point {
  x: number
  y: number
}

export interface Vector {
  x: number
  y: number
}

export interface Circle {
  c: Point
  r: number
}

export interface Segment {
  start: Point
  end: Point
}

export interface Line {
  point: Point
  direction: Vector
}

export type Angle = number
