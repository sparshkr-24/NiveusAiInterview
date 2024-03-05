import { createSelector } from 'reselect';

const baseSelector = state => (state.session);

export const sessionLoaderSelector = createSelector(
  baseSelector,
  (state) => {
    return {
      isQuestionLoading: state.questions.isLoading,
      isAnswerLoading: state.answers.isLoading,
      isHintLoading: state.hints.isLoading,
      isSessionLoading: state.questions.isLoading || state.answers.isLoading || state.hints.isLoading
    }
  }
);

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

export const questionsCountSelector = createSelector(
  baseSelector,
  (state) => (state.questions.data || []).length
);