import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Map } from 'immutable';

import { submitAuthor } from '../../actions/submissions';
import { authorSubmitErrorPath } from '../../reducers/submissions';
import AuthorSubmission from '../components/AuthorSubmission';

class AuthorSubmissionPage extends Component {
  constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
  }

  async onSubmit(formData) {
    await this.props.dispatch(submitAuthor(formData));
  }

  render() {
    const { error } = this.props;
    return <AuthorSubmission error={error} onSubmit={this.onSubmit} />;
  }
}

AuthorSubmissionPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
  error: PropTypes.instanceOf(Map), // eslint-disable-line react/require-default-props
};

const stateToProps = state => ({
  error: state.submissions.getIn(authorSubmitErrorPath),
});

const dispatchToProps = dispatch => ({ dispatch });

export default connect(stateToProps, dispatchToProps)(AuthorSubmissionPage);
