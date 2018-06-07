import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Row, Col } from 'antd';

import './index.scss';
import SearchBoxContainer from '../common/containers/SearchBoxContainer';
import InlineList from '../common/components/InlineList';

const LITERATURE_QUERY_EXAMPLES = [
  'find a richter, b and t quark and date > 1984',
  'find j phys.rev.,D50,1140',
];

class Home extends Component {
  render() {
    return (
      <Row className="__Home__" type="flex" justify="center" align="middle">
        <Col span={10}>
          <Row>
            <Col>
              <h3>Discover High-Energy Physics content</h3>
            </Col>
          </Row>
          <Row>
            <Col>
              <SearchBoxContainer />
            </Col>
          </Row>
          <Row className="examples-container">
            <Col>
              <InlineList
                label="Try"
                items={LITERATURE_QUERY_EXAMPLES}
                renderItem={query => (
                  <Link to={`/literature?q=${query}`}>{query}</Link>
                )}
              />
            </Col>
          </Row>
          <Row className="description-container">
            <Col>
              <h3>
                INSPIRE Labs provides a sneak preview of new features and
                designs currently under development.
              </h3>
            </Col>
          </Row>
        </Col>
      </Row>
    );
  }
}

export default Home;
