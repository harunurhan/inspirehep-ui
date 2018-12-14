import { Map, fromJS } from 'immutable';
import { LOCATION_CHANGE } from 'react-router-redux';

import reducer, { initialState } from '../authors';
import {
  AUTHOR_ERROR,
  AUTHOR_REQUEST,
  AUTHOR_SUCCESS,
} from '../../actions/actionTypes';

describe('authors reducer', () => {
  it('default', () => {
    const state = reducer(undefined, {});
    const expected = fromJS({
      loading: false,
      data: {},
      error: null,
    });
    expect(state).toEqual(expected);
  });

  it('LOCATION_CHANGE', () => {
    const currentState = fromJS({
      data: {
        control_number: 123456,
      },
    });
    const state = reducer(currentState, { type: LOCATION_CHANGE });
    expect(state).toEqual(initialState);
  });

  it('AUTHOR_REQUEST', () => {
    const state = reducer(Map(), { type: AUTHOR_REQUEST });
    const expected = Map({ loading: true });
    expect(state).toEqual(expected);
  });

  it('AUTHOR_SUCCESS', () => {
    const payload = {
      metadata: {
        name: [
          {
            value: 'Jessica Jones',
          },
        ],
      },
    };
    const state = reducer(Map(), { type: AUTHOR_SUCCESS, payload });
    const expected = fromJS({
      loading: false,
      data: payload,
      error: initialState.get('error'),
    });
    expect(state).toEqual(expected);
  });

  it('AUTHOR_ERROR', () => {
    const state = reducer(Map(), {
      type: AUTHOR_ERROR,
      payload: { message: 'error' },
    });
    const expected = fromJS({
      loading: false,
      error: { message: 'error' },
      data: initialState.get('data'),
    });
    expect(state).toEqual(expected);
  });
});
