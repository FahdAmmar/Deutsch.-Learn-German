# Lesson quality checklist

Run through this before considering a lesson (new or edited) complete.

## Content

- [ ] Objectives (`objectivesAr`) are concrete and the lesson actually
      teaches them
- [ ] Only uses grammar/vocabulary the learner has met by this point in
      the curriculum
- [ ] German examples are authentic, natural sentences
- [ ] Arabic explanations explain the concept, not just translate it
- [ ] Nouns carry their article (and plural, where relevant)
- [ ] No grammar rule stated with more confidence than is warranted

## Structure

- [ ] Grammar topics follow concept → rule → examples → exceptions →
      mistakes
- [ ] A visual (diagram/table/comparison) is used where the concept is
      spatial or comparative, instead of a wall of prose
- [ ] Exercises cover more than one type, and each has clear, useful
      feedback (`explanationAr`)

## Technical

- [ ] Every id is unique across the whole curriculum, not just this file
- [ ] MCQ options are distinct; `correctIndex` is in range
- [ ] `vocab-recall` distractors are distinct from each other and from
      the correct answer
- [ ] `matching` pairs have no repeated German or Arabic term
- [ ] `ordering.correctOrder` is a valid permutation of `words`
- [ ] Module is registered in its level's `index.ts` and in
      `src/data/curriculum.ts`
- [ ] `npm run typecheck`, `npm run test -- contentIntegrity`, and
      `npm run lint` all pass
