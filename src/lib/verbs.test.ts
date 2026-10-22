import { describe, expect, it } from 'vitest'

import type { VocabularyItem } from '@/types'

import {
  conjugationTable,
  hasIrregularPresent,
  parseInfinitive,
  perfektForm,
  praeteritumForm,
  regularPresent,
} from './verbs'

const verb = (word: string, forms: VocabularyItem['verb'] = undefined): Pick<VocabularyItem, 'word' | 'verb'> => ({
  word,
  verb: forms,
})

describe('regularPresent', () => {
  it.each([
    ['lernen', ['lerne', 'lernst', 'lernt', 'lernen', 'lernt', 'lernen']],
    ['wohnen', ['wohne', 'wohnst', 'wohnt', 'wohnen', 'wohnt', 'wohnen']],
    ['arbeiten', ['arbeite', 'arbeitest', 'arbeitet', 'arbeiten', 'arbeitet', 'arbeiten']],
    ['warten', ['warte', 'wartest', 'wartet', 'warten', 'wartet', 'warten']],
    ['kosten', ['koste', 'kostest', 'kostet', 'kosten', 'kostet', 'kosten']],
    ['entscheiden', ['entscheide', 'entscheidest', 'entscheidet', 'entscheiden', 'entscheidet', 'entscheiden']],
    ['öffnen', ['öffne', 'öffnest', 'öffnet', 'öffnen', 'öffnet', 'öffnen']],
    ['heißen', ['heiße', 'heißt', 'heißt', 'heißen', 'heißt', 'heißen']],
    ['tanzen', ['tanze', 'tanzt', 'tanzt', 'tanzen', 'tanzt', 'tanzen']],
    ['schließen', ['schließe', 'schließt', 'schließt', 'schließen', 'schließt', 'schließen']],
    ['wandern', ['wandere', 'wanderst', 'wandert', 'wandern', 'wandert', 'wandern']],
    ['sammeln', ['sammle', 'sammelst', 'sammelt', 'sammeln', 'sammelt', 'sammeln']],
    ['kommen', ['komme', 'kommst', 'kommt', 'kommen', 'kommt', 'kommen']],
    ['schwimmen', ['schwimme', 'schwimmst', 'schwimmt', 'schwimmen', 'schwimmt', 'schwimmen']],
    ['studieren', ['studiere', 'studierst', 'studiert', 'studieren', 'studiert', 'studieren']],
  ])('%s', (infinitive, expected) => {
    expect(regularPresent(infinitive)).toEqual(expected)
  })
})

describe('parseInfinitive', () => {
  it('splits off the reflexive pronoun and the preposition', () => {
    expect(parseInfinitive(verb('sich interessieren für'))).toEqual({
      reflexive: true,
      verb: 'interessieren',
      tail: 'für',
      prefix: '',
    })
  })

  it('finds the verb behind a separable prefix', () => {
    expect(parseInfinitive(verb('aufstehen', { separablePrefix: 'auf' }))).toMatchObject({
      verb: 'stehen',
      prefix: 'auf',
    })
  })
})

describe('conjugationTable', () => {
  it('puts the prefix of a separable verb at the end', () => {
    const rows = conjugationTable(verb('anrufen', { separablePrefix: 'an' }))
    expect(rows[0]).toEqual({ pronoun: 'ich', form: 'rufe an' })
    expect(rows[2]).toEqual({ pronoun: 'er/sie/es', form: 'ruft an' })
  })

  it('adds the reflexive pronoun and the preposition', () => {
    const rows = conjugationTable(verb('sich interessieren für'))
    expect(rows.map((row) => row.form)).toEqual([
      'interessiere mich für',
      'interessierst dich für',
      'interessiert sich für',
      'interessieren uns für',
      'interessiert euch für',
      'interessieren sich für',
    ])
  })

  it('uses the stored forms of an irregular verb as they are', () => {
    const fahren = verb('fahren', {
      present: ['fahre', 'fährst', 'fährt', 'fahren', 'fahrt', 'fahren'],
    })
    expect(conjugationTable(fahren)[1].form).toBe('fährst')
    expect(hasIrregularPresent(fahren)).toBe(true)
    expect(hasIrregularPresent(verb('lernen'))).toBe(false)
  })

  it('keeps the separable prefix of an irregular verb too', () => {
    const rows = conjugationTable(
      verb('fernsehen', {
        separablePrefix: 'fern',
        present: ['sehe', 'siehst', 'sieht', 'sehen', 'seht', 'sehen'],
      }),
    )
    expect(rows[1].form).toBe('siehst fern')
  })
})

describe('Perfekt and Präteritum', () => {
  it('names the auxiliary', () => {
    expect(perfektForm(verb('kommen', { auxiliary: 'sein', partizip: 'gekommen' }))).toBe('ist gekommen')
    expect(perfektForm(verb('lernen', { auxiliary: 'haben', partizip: 'gelernt' }))).toBe('hat gelernt')
  })

  it('places the reflexive pronoun and the prefix', () => {
    expect(perfektForm(verb('sich freuen', { auxiliary: 'haben', partizip: 'gefreut' }))).toBe('hat sich gefreut')
    expect(praeteritumForm(verb('aufstehen', { separablePrefix: 'auf', praeteritum: 'stand' }))).toBe('stand auf')
  })

  it('has nothing to show for a verb without these forms', () => {
    expect(perfektForm(verb('möchten'))).toBeUndefined()
    expect(praeteritumForm(verb('möchten'))).toBeUndefined()
  })
})
