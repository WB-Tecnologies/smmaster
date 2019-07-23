import {
  FETCH_POST_SUCCESS,
  FETCH_POST_FAILURE,
  FETCH_POST_STARTED,
  CHECK_ACCOUNT,
} from '@/constants/actionTypes';

export const initialState = {
  item: {},
  error: null,
  isLoading: false,
};

const postDetails = (state = initialState, { type, payload, id }) => {
  switch (type) {
    case FETCH_POST_STARTED: {
      return {
        ...state,
        isLoading: true,
      };
    }
    case FETCH_POST_SUCCESS: {
      return {
        ...state,
        item: payload.post,
        error: null,
        isLoading: false,
      };
    }
    case FETCH_POST_FAILURE: {
      return {
        ...state,
        error: payload.error,
        isLoading: false,
        item: {},
      };
    }
    case CHECK_ACCOUNT: {
      return {
        ...state,
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
    default:
      return state;
  }
};

export default postDetails;
