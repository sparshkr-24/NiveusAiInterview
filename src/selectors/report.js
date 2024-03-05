import { createSelector } from 'reselect';

const baseSelector = state => (state.report);

export const reportDataSelector = createSelector(
  baseSelector,
  (state) => state
);
