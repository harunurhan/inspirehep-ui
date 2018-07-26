import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Layout, Row, Col } from 'antd';
import PropTypes from 'prop-types';

import SearchBoxContainer from './../../containers/SearchBoxContainer';
import DropdownMenu from '../../components/DropdownMenu';
import './Header.scss';
import logo from './logo.svg';
import LoginOrUserDropdownContainer from '../../containers/LoginOrUserDropdownContainer';

const TOOL_LINKS = [
  {
    to: '/holdingpen/dashboard',
    display: 'Holdingpen',
  },
  {
    href: '//inspirehep.net/textmining',
    display: 'Reference extractor',
  },
  {
    href: '/tools/authorlist',
    display: 'Author list',
  },
  {
    href: '//inspirehep.net/info/hep/tools/bibliography_generate',
    display: 'Bibliography generator',
  },
];

const Header = props => (
  <Layout.Header className="__Header__">
    <Row type="flex" align="middle" gutter={16}>
      <Col span={5}>
        <Link to="/">
          <img src={logo} alt="INSPIRE Labs" />
        </Link>
      </Col>
      <Col span={14}>
        {props.shouldDisplaySearchBox && <SearchBoxContainer />}
      </Col>
      <Col span={5}>
        <Row type="flex" justify="end">
          <Col className="nav-item-container">
            <DropdownMenu
              title="Tools"
              titleClassName="nav-item"
              items={TOOL_LINKS}
            />
          </Col>
          <Col className="nav-item-container">
            <a className="nav-item" href="/literature/new">
              Submit
            </a>
          </Col>
          <Col className="nav-item-container">
            <LoginOrUserDropdownContainer />
          </Col>
        </Row>
      </Col>
    </Row>
  </Layout.Header>
);

Header.propTypes = {
  shouldDisplaySearchBox: PropTypes.bool.isRequired,
};

const stateToProps = state => ({
  shouldDisplaySearchBox: state.router.location.pathname !== '/',
});

export default connect(stateToProps)(Header);
