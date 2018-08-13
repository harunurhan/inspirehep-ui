import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Row, Col } from 'antd';
import { Formik } from 'formik';

import AuthorForm from '../components/AuthorForm';
import authorSchema from '../schemas/author';
import { submitAuthor } from '../../actions/submissions';

const initialValues = authorSchema.cast();

class AuthorSubmissionPage extends Component {
  componentDidMount() {
    this.mounted = true;
  }

  componentWillUnmount() {
    this.mounted = false;
  }

  render() {
    const { dispatch } = this.props;
    return (
      <Row type="flex" justify="center">
        <Col className="mt3 mb3" span={14}>
          <div className="mb3 pa3 bg-white">
            This form allows you to add new author information. All
            modifications are transferred to{' '}
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="//inspirehep.net/hepnames"
            >
              inspirehep.net/hepnames
            </a>{' '}
            upon approval.
          </div>
          <Formik
            initialValues={initialValues}
            validationSchema={authorSchema}
            onSubmit={async (values, actions) => {
              // TODO: clear & trim
              await dispatch(submitAuthor(values));
              if (this.mounted) {
                actions.setSubmitting(false);
              }
            }}
            component={AuthorForm}
          />
        </Col>
      </Row>
    );
  }
}

AuthorSubmissionPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const stateToProps = state => ({
  submitted: state.submissions.get('submitted'),
});

const dispatchToProps = dispatch => ({ dispatch });

export default connect(stateToProps, dispatchToProps)(AuthorSubmissionPage);
