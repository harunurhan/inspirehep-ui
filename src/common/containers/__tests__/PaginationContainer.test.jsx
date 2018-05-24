import React from 'react';
import { shallow } from 'enzyme';
import { fromJS } from 'immutable';

import { getStoreWithState, getStore } from '../../../fixtures/store';
import { SEARCHING } from '../../../actions/actionTypes';
import PaginationContainer, { dispatchToProps } from '../PaginationContainer';

describe('SearchBoxContainer', () => {
  it('renders initially with all state', () => {
    const store = getStoreWithState({
      router: {
        location: {
          query: {
            size: '25',
            page: '2',
          },
        },
      },
      search: fromJS({
        total: 100,
      }),
    });
    const wrapper = shallow((
      <PaginationContainer store={store} />
    )).dive();
    expect(wrapper).toMatchSnapshot();
  });

  it('dispatches search onPageChange', () => {
    const store = getStore();
    const props = dispatchToProps(store.dispatch);
    props.onPageChange();
    const actions = store.getActions();
    expect(actions.some(action => action.type === SEARCHING)).toBe(true);
  });
});
