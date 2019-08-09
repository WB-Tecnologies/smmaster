import shortid from 'shortid';

import {
  FETCH_POST_SUCCESS,
  FETCH_POST_FAILURE,
  FETCH_POST_STARTED,
  CHECK_ACCOUNT,
  EDIT_DATE,
  SELECT_RUBRIC,
  LOAD_IMAGE,
  REMOVE_IMAGE,
  EDIT_POST_TEXT,
} from '@/constants/actionTypes';

export const initialState = {
  item: {},
  error: null,
  isLoading: true,
};

const postDetails = (state = initialState, {
  type,
  payload,
  id,
  date,
  img,
  text,
}) => {
  switch (type) {
    case FETCH_POST_STARTED: {
      return {
        ...state,
        isLoading: true,
      };
    }
    case FETCH_POST_SUCCESS: {
      return {
        item: payload.post,
        error: null,
        isLoading: false,
      };
    }
    case FETCH_POST_FAILURE: {
      return {
        error: payload.error,
        isLoading: false,
        item: {},
      };
    }
    case CHECK_ACCOUNT: {
      return {
        error: null,
        isLoading: false,
        item: {
          ...state.item,
          accounts: state.item.accounts.map(account => {
            if (account.id === id) {
              account.isChecked = !account.isChecked;
            }
            return account;
          }),
        },
      };
    }
    case EDIT_DATE: {
      return {
        error: null,
        isLoading: false,
        item: {
          ...state.item,
          date: String(date),
        },
      };
    }
    case SELECT_RUBRIC: {
      return {
        error: null,
        isLoading: false,
        item: {
          ...state.item,
          rubrics: state.item.rubrics.map(rubric => {
            rubric.isSelected = rubric.id === id;
            return rubric;
          }),
        },
      };
    }
    case LOAD_IMAGE: {
      return {
        error: null,
        isLoading: false,
        item: {
          ...state.item,
          attachments: [...state.item.attachments, {
            id: shortid.generate(),
            path: img,
            alt: 'newImg',
          }],
        },
      };
    }
    case REMOVE_IMAGE: {
      return {
        error: null,
        isLoading: false,
        item: {
          ...state.item,
          attachments: state.item.attachments.filter(item => item.id !== id),
        },
      };
    }
    case EDIT_POST_TEXT: {
      return {
        error: null,
        isLoading: false,
        item: {
          ...state.item,
          text,
        },
      };
    }
    default:
      return state;
  }
};

export default postDetails;
