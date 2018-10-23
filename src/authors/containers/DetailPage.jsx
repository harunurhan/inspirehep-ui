import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Row, Col } from 'antd';
import { Map } from 'immutable';

import ContentBox from '../../common/components/ContentBox';
import EmbeddedSearch from '../../common/components/EmbeddedSearch';
import AuthorName from '../components/AuthorName';
import ExperimentList from '../components/ExperimentList';
import ArxivCategoryList from '../components/ArxivCategoryList';
import fetchAuthor from '../../actions/authors';
import LiteratureItem from '../../literature/components/LiteratureItem';

class DetailPage extends Component {
  componentDidMount() {
    this.dispatchFetchAuthor();
  }

  componentDidUpdate(prevProps) {
    const prevRecordId = prevProps.match.params.id;
    const recordId = this.props.match.params.id;
    if (recordId !== prevRecordId) {
      this.dispatchFetchAuthor();
      window.scrollTo(0, 0);
    }
  }

  dispatchFetchAuthor() {
    const recordId = this.props.match.params.id;
    this.props.dispatch(fetchAuthor(recordId));
  }

  render() {
    const { record, loading } = this.props;

    const metadata = record.get('metadata');
    if (!metadata) {
      return null;
    }

    const name = metadata.get('name');
    const institution = metadata.getIn(['positions', 0, 'institution']);
    const arxivCategories = metadata.get('arxiv_categories');
    const experiments = metadata.get('project_membership');

    const nameValue = name.get('value');
    const authorLiteratureSearchQuery = {
      author: [nameValue],
    };

    const authorLiteratureFacetsQuery = {
      facet_name: 'hep-author-publication',
      exclude_author_value: nameValue,
    };

    return (
      <Fragment>
        <Row type="flex" justify="center">
          <Col className="mv3" span={18}>
            <ContentBox loading={loading}>
              <h2>
                <AuthorName name={name} />
                {institution && <span className="pl1 f6">({institution})</span>}
              </h2>
              <div className="mt1">
                <ArxivCategoryList arxivCategories={arxivCategories} />
                <ExperimentList experiments={experiments} />
              </div>
            </ContentBox>
          </Col>
        </Row>
        <Row type="flex" justify="center">
          <Col span={18}>
            <ContentBox>
              <EmbeddedSearch
                pidType="literature"
                baseQuery={authorLiteratureSearchQuery}
                baseFacetsQuery={authorLiteratureFacetsQuery}
                renderResultItem={result => (
                  <LiteratureItem metadata={result.get('metadata')} />
                )}
              />
            </ContentBox>
          </Col>
        </Row>
      </Fragment>
    );
  }
}

DetailPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
  match: PropTypes.objectOf(PropTypes.any).isRequired,
  record: PropTypes.instanceOf(Map).isRequired,
  loading: PropTypes.bool.isRequired,
};

const mapStateToProps = state => ({
  loading: state.authors.get('loading'),
  record: state.authors.get('data'),
});
const dispatchToProps = dispatch => ({ dispatch });

export default connect(mapStateToProps, dispatchToProps)(DetailPage);
