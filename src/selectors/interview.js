import { createSelector } from 'reselect';

const baseSelector = state => (state.interview);

export const interviewDataSelector = createSelector(
  baseSelector,
  (data) => data
);