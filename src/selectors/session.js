import { createSelector } from 'reselect';

const baseSelector = state => (state.session);

export const sessionDataSelector = createSelector(
  baseSelector,
  (data) => data
);