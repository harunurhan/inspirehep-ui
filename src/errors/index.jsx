import React, { Component } from 'react';
import { Row } from 'antd';
import { Route, Redirect, Switch } from 'react-router-dom';
import Error404 from './components/Error404';
import Error401 from './components/Error401';

class Errors extends Component {
  render() {
    return (
      <Row
        className="__Errors__ w-100 h-100"
        type="flex"
        justify="center"
        align="middle"
      >
        <Switch>
          <Route exact path="/errors/404" component={Error404} />
          <Route exact path="/errors/401" component={Error401} />
          <Redirect to="/errors/404" />
        </Switch>
      </Row>
    );
  }
}

export default Errors;
