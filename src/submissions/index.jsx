import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
import Loadable from 'react-loadable';

import {
  SUBMISSIONS_AUTHOR,
  SUBMISSION_SUCCESS,
  SUBMISSIONS,
  SUBMISSIONS_LITERATURE,
} from '../common/routes';
import { SUPERUSER } from '../common/authorization';

import Loading from '../common/components/Loading';
import SafeSwitch from '../common/components/SafeSwitch';
import PrivateRoute from '../common/PrivateRoute';

const AuthorSubmissionPage$ = Loadable({
  loader: () => import('./authors/containers/AuthorSubmissionPage'),
  loading: Loading,
});

const AuthorUpdateSubmissionPage$ = Loadable({
  loader: () => import('./authors/containers/AuthorUpdateSubmissionPage'),
  loading: Loading,
});

const LiteratureSubmissionPage$ = Loadable({
  loader: () => import('./literature/containers/LiteratureSubmissionPage'),
  loading: Loading,
});

const SubmissionSuccessPage$ = Loadable({
  loader: () => import('./common/components/SubmissionSuccessPage'),
  loading: Loading,
});

class Submissions extends Component {
  render() {
    return (
      <div className="w-100">
        <SafeSwitch>
          <Redirect exact from={SUBMISSIONS} to={SUBMISSIONS_AUTHOR} />
          <Route
            exact
            path={SUBMISSIONS_AUTHOR}
            component={AuthorSubmissionPage$}
          />
          <Route
            exact
            path={`${SUBMISSIONS_AUTHOR}/:id`}
            component={AuthorUpdateSubmissionPage$}
          />
          <PrivateRoute
            exact
            path={SUBMISSIONS_LITERATURE}
            component={LiteratureSubmissionPage$}
            authorizedRoles={SUPERUSER}
          />
          <Route
            exact
            path={SUBMISSION_SUCCESS}
            component={SubmissionSuccessPage$}
          />
        </SafeSwitch>
      </div>
    );
  }
}

export default Submissions;
