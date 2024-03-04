import { createSelector } from 'reselect';

const baseSelector = state => (state.chatMessage);

export const chatDataSelector = createSelector(
  baseSelector,
  (data) => data
);