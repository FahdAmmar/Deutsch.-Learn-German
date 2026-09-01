export interface DiagramHotspot {
  id: string
  labelDe: string
  labelAr: string
  /** Position as a percentage (0–100) within the diagram's bounding box. */
  x: number
  y: number
  /** Full example sentence revealed when this hotspot is activated. */
  sentenceDe: string
  sentenceAr: string
}

export type DiagramBackground = 'room' | 'body'

export interface DiagramScene {
  id: string
  promptAr: string
  background: DiagramBackground
  hotspots: DiagramHotspot[]
}
