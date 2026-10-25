import { describe, expect, it } from 'vitest'

import { getStoriesForLevel } from '@/lib/stories'
import { describeHints, findGrammarHints, splitByHints } from '@/lib/grammarHints'
import type { ArticleLookup, GermanArticle } from '@/types'

const phrases = (text: string, lookup?: ArticleLookup) => findGrammarHints(text, lookup).map((hint) => hint.phrase)

describe('findGrammarHints — the two phrases that started this feature', () => {
  const hints = findGrammarHints('Nach dem Frühstück gehe ich zur Arbeit.')

  it('marks "dem Frühstück" and "zur Arbeit", in reading order', () => {
    expect(hints.map((hint) => hint.phrase)).toEqual(['dem Frühstück', 'zur Arbeit'])
  })

  it('explains "dem" by the preposition before it', () => {
    expect(hints[0]).toMatchObject({ ruleId: 'dative-masc-neut', formula: 'nach + Dativ → dem', grammarCase: 'Dativ' })
    expect(hints[0].noteAr).toContain('[[nach]]')
  })

  it('explains "zur" as zu + der, with the Dativ reason', () => {
    expect(hints[1]).toMatchObject({ ruleId: 'contraction', formula: 'zu + der → zur', grammarCase: 'Dativ' })
    expect(hints[1].noteAr).toContain('zu + der = zur')
  })
})

describe('findGrammarHints — offsets', () => {
  it('points exactly at the phrase and never overlaps', () => {
    const text = 'Am Abend komme ich nach Hause und trinke einen Kaffee im Garten.'
    const hints = findGrammarHints(text)
    expect(hints.length).toBeGreaterThan(3)
    hints.forEach((hint, position) => {
      expect(text.slice(hint.start, hint.end)).toBe(hint.phrase)
      if (position > 0) expect(hint.start).toBeGreaterThanOrEqual(hints[position - 1].end)
    })
  })

  it('splitByHints gives the original text back', () => {
    const text = 'Nach dem Frühstück gehe ich zur Arbeit.'
    const parts = splitByHints(text, findGrammarHints(text))
    expect(parts.map((part) => part.text).join('')).toBe(text)
    expect(parts.filter((part) => part.type === 'hint')).toHaveLength(2)
  })

  it('describes the hints in plain text for a screen reader, without the inline markup', () => {
    const description = describeHints(findGrammarHints('Ich gehe zur Arbeit.'))
    expect(description).toContain('zur Arbeit:')
    expect(description).not.toContain('[[')
  })
})

describe('findGrammarHints — contractions', () => {
  it.each([
    ['Ich gehe zum Arzt.', 'zum Arzt', 'zu + dem → zum'],
    ['Ich arbeite im Büro.', 'im Büro', 'in + dem → im'],
    ['Wir treffen uns am Montag.', 'am Montag', 'an + dem → am'],
    ['Er ist beim Bäcker.', 'beim Bäcker', 'bei + dem → beim'],
    ['Das Buch ist vom Lehrer.', 'vom Lehrer', 'von + dem → vom'],
    ['Ich gehe ins Kino.', 'ins Kino', 'in + das → ins'],
    ['Das ist fürs Frühstück.', 'fürs Frühstück', 'für + das → fürs'],
  ])('%s', (sentence, phrase, formula) => {
    const [hint] = findGrammarHints(sentence)
    expect(hint.phrase).toBe(phrase)
    expect(hint.formula).toBe(formula)
  })

  it('includes an adjective between the contraction and its noun', () => {
    expect(phrases('Wir wohnen im neuen Haus.')).toEqual(['im neuen Haus'])
    expect(phrases('Ich gehe ins neue Kino.')).toEqual(['ins neue Kino'])
  })

  it('works at the start of a sentence', () => {
    expect(phrases('Zur Arbeit fahre ich mit dem Bus.')).toEqual(['Zur Arbeit', 'dem Bus'])
  })

  it('does not treat the superlative "am besten" as a contraction', () => {
    expect(phrases('Ich lerne am besten am Morgen.')).toEqual(['am Morgen'])
    expect(phrases('Ich esse am liebsten Pizza.')).toEqual([])
    expect(phrases('Er läuft am schnellsten.')).toEqual([])
  })
})

describe('findGrammarHints — Dativ', () => {
  it('uses the preposition in the explanation for dem / einem / meinem', () => {
    expect(findGrammarHints('Ich fahre mit dem Zug.')[0].formula).toBe('mit + Dativ → dem')
    expect(findGrammarHints('Sie wohnt bei einem Freund.')[0].formula).toBe('bei + Dativ → einem')
    expect(findGrammarHints('Er spricht von meinem Bruder.')[0].formula).toBe('von + Dativ → meinem')
  })

  it('explains a two-way preposition + dem as Dativ', () => {
    const [hint] = findGrammarHints('Das Buch liegt auf dem Tisch.')
    expect(hint).toMatchObject({ phrase: 'dem Tisch', formula: 'auf + Dativ → dem' })
    expect(hint.noteAr).toContain('حرف جر متغيّر')
  })

  it('gives "dem" without a preposition a general Dativ note', () => {
    const [hint] = findGrammarHints('Ich helfe dem Kind.')
    expect(hint).toMatchObject({ phrase: 'dem Kind', formula: 'dem = Dativ' })
  })

  it('marks feminine "der" only right after a preposition', () => {
    expect(phrases('Ich komme aus der Schule.')).toEqual(['der Schule'])
    expect(phrases('Wir wohnen in meiner Stadt.')).toEqual(['meiner Stadt'])
    // "der" as the subject article is not a Dativ.
    expect(phrases('Der Mann kommt aus Berlin.')).toEqual([])
  })

  it('marks the plural after a Dativ preposition', () => {
    const [hint] = findGrammarHints('Ich spiele mit meinen Freunden.')
    expect(hint).toMatchObject({ ruleId: 'dative-plural', phrase: 'meinen Freunden', formula: 'mit + Dativ Plural → meinen' })
  })

  it('explains the -n of a plural noun after a number', () => {
    const [hint] = findGrammarHints('Ich wohne seit zwei Jahren hier.')
    expect(hint).toMatchObject({ ruleId: 'dative-number', phrase: 'zwei Jahren' })
    expect(phrases('Ich habe zwei Autos.')).toEqual([])
    expect(phrases('Wir haben zwei Hunde.')).toEqual([])
  })

  it('gives the governing preposition to the second phrase after "und"', () => {
    const hints = findGrammarHints('Das Schlafzimmer ist zwischen dem Bad und dem Arbeitszimmer.')
    expect(hints.map((hint) => hint.formula)).toEqual(['zwischen + Dativ → dem', 'zwischen + Dativ → dem'])
  })

  it('stays silent when "dem" cannot be explained', () => {
    // Relative pronoun, not an article before a noun.
    expect(phrases('Der Mann, mit dem ich spreche, ist nett.')).toEqual([])
    // "Sie" is the formal pronoun, not a noun.
    expect(phrases('Ist das der Ort, bei dem Sie arbeiten?')).toEqual([])
    // An Akkusativ preposition cannot take "dem".
    expect(phrases('Das ist für dem Kind.')).toEqual([])
  })
})

describe('findGrammarHints — Akkusativ', () => {
  it('marks "einen" as masculine Akkusativ', () => {
    const [hint] = findGrammarHints('Danach trinke ich einen Kaffee.')
    expect(hint).toMatchObject({ ruleId: 'accusative-masculine', phrase: 'einen Kaffee', grammarCase: 'Akkusativ' })
  })

  it('says that "es gibt" always takes the Akkusativ', () => {
    const [hint] = findGrammarHints('Es gibt einen Park in der Nähe.')
    expect(hint.noteAr).toContain('es gibt')
  })

  it('marks "den" after an Akkusativ preposition, and only there', () => {
    expect(findGrammarHints('Das ist für den Kurs.')[0].formula).toBe('für + Akkusativ → den')
    // Without a preposition "den" could be a Dativ plural ("Ich helfe den Kindern"), so no hint.
    expect(phrases('Ich sehe den Mann.')).toEqual([])
    expect(phrases('Ich helfe den Kindern.')).toEqual([])
  })

  it('explains die/das after a two-way preposition only with a verb of movement', () => {
    expect(findGrammarHints('Ich gehe in die Stadt.')[0]).toMatchObject({ ruleId: 'accusative-direction', phrase: 'die Stadt' })
    expect(phrases('Er stellt das Buch auf das Regal.')).toEqual(['das Regal'])
    expect(phrases('Das Buch ist in die Stadt.')).toEqual([])
  })

  it('finds the movement even when the verb closes the sentence (Perfekt)', () => {
    expect(phrases('Zur Mittagspause sind wir zusammen in die Kantine gegangen.')).toEqual(['Zur Mittagspause', 'die Kantine'])
  })

  it('does not call a verb-bound preposition a direction', () => {
    expect(phrases('Ich denke an die Arbeit.')).toEqual([])
    expect(phrases('Ich gehe nach Hause und freue mich auf das Wochenende.')).toEqual(['nach Hause'])
  })

  it('marks "den" after a two-way preposition only when the noun is known to be masculine', () => {
    const sentence = 'Wir fahren in den Park.'
    expect(phrases(sentence)).toEqual([])
    expect(phrases(sentence, (noun) => (noun === 'Park' ? 'der' : undefined))).toEqual(['den Park'])
    // "in den Ferien" is a Dativ plural: it must never be called a direction.
    expect(phrases('Wir fahren in den Ferien nach Berlin.', () => 'die')).toEqual([])
  })
})

describe('findGrammarHints — Genitiv', () => {
  it('marks "des" and names the preposition when there is one', () => {
    expect(findGrammarHints('Wir wohnen in der Nähe des Parks.').map((hint) => hint.phrase)).toEqual(['der Nähe', 'des Parks'])
    expect(findGrammarHints('Wegen des Wetters bleiben wir hier.')[0].formula).toBe('wegen + Genitiv → des')
    expect(findGrammarHints('Die Farbe des Autos ist rot.')[0].formula).toBe('der / das → des (Genitiv)')
  })
})

describe('findGrammarHints — fixed phrases', () => {
  it.each([
    ['Ich gehe nach Hause.', 'nach Hause'],
    ['Ich bleibe zu Hause.', 'zu Hause'],
    ['Zu Hause esse ich gern.', 'Zu Hause'],
    ['Ich gehe zu Fuß.', 'zu Fuß'],
    ['Ich esse um zwölf Uhr zu Mittag.', 'zu Mittag'],
    ['Guten Morgen!', 'Guten Morgen'],
    ['Guten Appetit!', 'Guten Appetit'],
  ])('%s', (sentence, phrase) => {
    expect(phrases(sentence)).toEqual([phrase])
  })

  it('tells "nach Hause" and "zu Hause" apart', () => {
    expect(findGrammarHints('Ich gehe nach Hause.')[0].noteAr).toContain('اتجاه')
    expect(findGrammarHints('Ich bin zu Hause.')[0].noteAr).toContain('Wo؟')
  })
})

describe('findGrammarHints — the noun', () => {
  const articles: Record<string, GermanArticle | undefined> = { Frühstück: 'das', Arbeit: 'die', Park: 'der' }
  const lookup: ArticleLookup = (noun) => articles[noun]

  it('names the noun and its article when the vocabulary agrees with the form', () => {
    const [dem, zur] = findGrammarHints('Nach dem Frühstück gehe ich zur Arbeit.', lookup)
    expect(dem.noun).toEqual({ word: 'Frühstück', article: 'das' })
    expect(zur.noun).toEqual({ word: 'Arbeit', article: 'die' })
  })

  it('leaves the article out when it contradicts the form (better no claim than a wrong one)', () => {
    const [zum] = findGrammarHints('Ich gehe zum Arbeit.', () => 'die')
    expect(zum.noun).toBeUndefined()
  })

  it('finds a Genitiv noun by its base form ("Parks" → "Park")', () => {
    const hints = findGrammarHints('Wir wohnen in der Nähe des Parks.', lookup)
    expect(hints[1].noun).toEqual({ word: 'Parks', article: 'der' })
  })
})

describe('findGrammarHints — the whole curriculum', () => {
  const sentences = (['A1', 'A2'] as const).flatMap((level) => getStoriesForLevel(level).flatMap((story) => story.segments.map((segment) => ({ story, text: segment.text }))))

  it('finds hints in the existing stories', () => {
    const total = sentences.reduce((count, { text }) => count + findGrammarHints(text).length, 0)
    expect(total).toBeGreaterThan(50)
  })

  it('every hint is well-formed: inside the sentence, in order, with a formula and an Arabic note', () => {
    for (const { story, text } of sentences) {
      const hints = findGrammarHints(text)
      hints.forEach((hint, position) => {
        const where = `${story.id}: ${text}`
        expect(text.slice(hint.start, hint.end), where).toBe(hint.phrase)
        expect(hint.formula.trim(), where).not.toBe('')
        expect(hint.noteAr, where).toMatch(/\p{Script=Arabic}/u)
        // Every [[…]] is closed, so the popup never shows a stray bracket.
        expect((hint.noteAr.match(/\[\[/g) ?? []).length, where).toBe((hint.noteAr.match(/\]\]/g) ?? []).length)
        if (position > 0) expect(hint.start, where).toBeGreaterThanOrEqual(hints[position - 1].end)
      })
    }
  })
})
