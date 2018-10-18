import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';

import RouteOrRedirect from '../common/components/RouteOrRedirect';
import LoginPage from './containers/LoginPage';
import ProfilePage from './containers/ProfilePage';
import PrivateRoute from '../common/PrivateRoute';
import LocalLoginPage from './containers/LocalLoginPage';
import {
  USER_LOGIN,
  USER_LOCAL_LOGIN,
  USER_PROFILE,
  USER,
} from '../common/routes';
import SafeSwitch from '../common/components/SafeSwitch';

class User extends Component {
  render() {
    const { loggedIn, previousUrl } = this.props;
    return (
      <div className="w-100">
        <SafeSwitch>
          <Redirect exact from={USER} to={USER_PROFILE} />
          <RouteOrRedirect
            exact
            path={USER_LOGIN}
            condition={!loggedIn}
            component={LoginPage}
            redirectTo={previousUrl}
          />
          {(process.env.NODE_ENV === 'development' ||
            process.env.REACT_APP_ENABLE_LOCAL_LOGIN === 'YES') && (
            <RouteOrRedirect
              exact
              path={USER_LOCAL_LOGIN}
              condition={!loggedIn}
              component={LocalLoginPage}
              redirectTo={previousUrl}
            />
          )}
          <PrivateRoute exact path={USER_PROFILE} component={ProfilePage} />
        </SafeSwitch>
      </div>
    );
  }
}

User.propTypes = {
  loggedIn: PropTypes.bool.isRequired,
  previousUrl: PropTypes.string.isRequired,
};

const stateToProps = state => ({
  loggedIn: state.user.get('loggedIn'),
  previousUrl: state.router.location.previousUrl,
});

export default connect(stateToProps)(User);
