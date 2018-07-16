import React from 'react';
import { Provider } from 'react-redux';
import { mount } from 'enzyme';

import { getStore } from '../../../fixtures/store';
import { LITERATURE_REQUEST } from '../../../actions/actionTypes';
import DetailPage from '../DetailPage';

describe('Literature - DetailPage', () => {
  it('dispatches fetch literature record', () => {
    const store = getStore();
    const matchProps = {
      params: {
        id: 123,
      },
    };
    mount(
      <Provider store={store}>
        <DetailPage match={matchProps} />
      </Provider>
    );
    const actions = store.getActions();
    const expectedAction = actions.find(
      action => action.type === LITERATURE_REQUEST
    );
    expect(expectedAction).toBeDefined();
    expect(expectedAction.payload).toEqual({ recordId: 123 });
  });

  it('dispatches fetch literature record again when match props changed', () => {
    const initalMatchProps = {
      params: {
        id: 123,
      },
    };
    const store = getStore();
    const wrapper = mount(
      <DetailPage match={initalMatchProps} store={store} />
    );
    wrapper.setProps({ match: { params: { id: 999 } } });
    const actions = store.getActions();
    const expectedAction = actions.find(
      action =>
        action.type === LITERATURE_REQUEST && action.payload.recordId === 999
    );
    expect(expectedAction).toBeDefined();
  });

  it('does not dispatches fetch literature record again when match props changed but id param is same as previous', () => {
    const initalMatchProps = {
      params: {
        id: 123,
      },
    };
    const store = getStore();
    const wrapper = mount(
      <DetailPage match={initalMatchProps} store={store} />
    );
    wrapper.setProps({ match: { params: { id: 123 } } });
    const actions = store.getActions();
    const expectedActions = actions.filter(
      action =>
        action.type === LITERATURE_REQUEST && action.payload.recordId === 123
    );
    expect(expectedActions.length).toBe(1);
  });
});
