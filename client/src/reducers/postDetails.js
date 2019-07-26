import {
  FETCH_POST_SUCCESS,
  FETCH_POST_FAILURE,
  FETCH_POST_STARTED,
  CHECK_ACCOUNT,
  EDIT_DATE,
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
    default:
      return state;
  }
};

export default postDetails;
