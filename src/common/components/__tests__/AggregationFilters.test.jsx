import React from 'react';
import { shallow } from 'enzyme';
import { fromJS } from 'immutable';

import AggregationFilters from '../AggregationFilters';
import AggregationFilter from '../AggregationFilter';

describe('AggregationFilters', () => {
  it('renders with all props set', () => {
    const aggregations = fromJS({
      agg1: {
        buckets: [
          {
            key: 'foo',
            doc_count: 1,
          },
        ],
        meta: {
          title: 'Aggregation 1',
          order: 1,
        },
      },
      agg2: {
        buckets: [
          {
            key: 'foo',
            doc_count: 1,
          },
        ],
        meta: {
          title: 'Aggregation 2',
          order: 2,
        },
      },
    });
    const query = { agg1: 'foo' };
    const wrapper = shallow(
      <AggregationFilters
        query={query}
        aggregations={aggregations}
        numberOfResults={2}
        onAggregationChange={jest.fn()}
      />
    );
    expect(wrapper).toMatchSnapshot();
  });

  it('does not render aggregations with empty buckets', () => {
    const aggregations = fromJS({
      agg1: {
        buckets: [{}],
        meta: {
          title: 'Aggregation 1',
          order: 1,
        },
      },
      agg2: {
        buckets: [],
        meta: {
          title: 'Aggregation 2',
          order: 2,
        },
      },
    });
    const query = {};
    const wrapper = shallow(
      <AggregationFilters
        query={query}
        aggregations={aggregations}
        numberOfResults={2}
        onAggregationChange={jest.fn()}
      />
    );
    expect(wrapper).toMatchSnapshot();
  });

  it('does not render aggregations when numberOfResults is 0', () => {
    const aggregations = fromJS({
      agg: {
        buckets: [
          {
            key: 'foo',
            doc_count: 0,
          },
        ],
        meta: {
          title: 'Jessica Jones',
          order: 1,
        },
      },
      emptyAgg: {
        buckets: [],
        meta: {
          title: 'Luke Cage',
          order: 2,
        },
      },
    });
    const query = {};
    const wrapper = shallow(
      <AggregationFilters
        query={query}
        aggregations={aggregations}
        numberOfResults={0}
        onAggregationChange={jest.fn()}
      />
    );
    expect(wrapper).toMatchSnapshot();
  });

  it('renders with range aggregation (earliest_date)', () => {
    const aggregations = fromJS({
      earliest_date: {
        buckets: [
          {
            key: '2000',
            doc_count: 1,
          },
          {
            key: '2001',
            doc_count: 1,
          },
        ],
        meta: {
          title: 'Range Aggregation',
          order: 1,
        },
      },
    });
    const query = {};
    const wrapper = shallow(
      <AggregationFilters
        query={query}
        aggregations={aggregations}
        numberOfResults={2}
        onAggregationChange={jest.fn()}
      />
    );
    expect(wrapper).toMatchSnapshot();
  });

  it('calls onAggregationChange when aggregation is changed', () => {
    const aggregations = fromJS({
      agg: {
        buckets: [
          {
            key: 'foo',
            doc_count: 1,
          },
          {
            key: 'bar',
            doc_count: 2,
          },
          {
            key: 'uncool',
            doc_count: 3,
          },
        ],
        meta: {
          title: 'Aggregation',
          order: 1,
        },
      },
    });
    const query = {};
    const onAggregationChange = jest.fn();
    const wrapper = shallow(
      <AggregationFilters
        query={query}
        aggregations={aggregations}
        numberOfResults={2}
        onAggregationChange={onAggregationChange}
      />
    );
    const onAggregationFilterChange = wrapper
      .find(AggregationFilter)
      .prop('onChange');
    onAggregationFilterChange(['foo', 'bar']);
    expect(onAggregationChange).toBeCalledWith('agg', ['foo', 'bar']);
  });

  it('calls onAggregationChange when range aggregation (earliest_date) is changed', () => {
    const aggregations = fromJS({
      earliest_date: {
        buckets: [
          {
            key: '2000',
            doc_count: 1,
          },
          {
            key: '2001',
            doc_count: 1,
          },
        ],
        meta: {
          title: 'Range Aggregation',
          order: 1,
        },
      },
    });
    const query = {};
    const onAggregationChange = jest.fn();
    const wrapper = shallow(
      <AggregationFilters
        query={query}
        aggregations={aggregations}
        numberOfResults={2}
        onAggregationChange={onAggregationChange}
      />
    );
    const onAggregationFilterChange = wrapper
      .find(AggregationFilter)
      .prop('onChange');
    onAggregationFilterChange(['2000', '2001']);
    expect(onAggregationChange).toBeCalledWith('earliest_date', '2000--2001');
  });
});
