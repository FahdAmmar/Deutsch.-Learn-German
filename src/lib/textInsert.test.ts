import { describe, expect, it } from 'vitest'

import { insertAtSelection } from './textInsert'

describe('insertAtSelection', () => {
  it('inserts at the caret and moves the caret after the new character', () => {
    expect(insertAtSelection('Mchen', 1, 1, 'ä')).toEqual({ value: 'Mächen', caret: 2 })
  })

  it('replaces the selected text', () => {
    expect(insertAtSelection('Strasse', 4, 6, 'ß')).toEqual({ value: 'Straße', caret: 5 })
  })

  it('works at the very start and at the very end', () => {
    expect(insertAtSelection('bel', 0, 0, 'Ü')).toEqual({ value: 'Übel', caret: 1 })
    expect(insertAtSelection('Schl', 4, 4, 'ü')).toEqual({ value: 'Schlü', caret: 5 })
  })

  it('reads a reversed selection the right way round', () => {
    expect(insertAtSelection('Strasse', 6, 4, 'ß')).toEqual({ value: 'Straße', caret: 5 })
  })

  it('pulls positions outside the text back inside it', () => {
    expect(insertAtSelection('ab', 10, 20, 'ö')).toEqual({ value: 'abö', caret: 3 })
    expect(insertAtSelection('ab', -5, -1, 'ö')).toEqual({ value: 'öab', caret: 1 })
  })

  it('inserts into an empty text', () => {
    expect(insertAtSelection('', 0, 0, 'ä')).toEqual({ value: 'ä', caret: 1 })
  })
})
