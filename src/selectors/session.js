import { createSelector } from 'reselect';

const baseSelector = state => (state.session);

export const sessionQuestionsSelector = createSelector(
  baseSelector,
  (state) => state.questions || null
);

export const sessionAnswersSelector = createSelector(
  baseSelector,
  (state) => state.answers || null
);

export const sessionHintsSelector = createSelector(
  baseSelector,
  (state) => state.hints || null
);