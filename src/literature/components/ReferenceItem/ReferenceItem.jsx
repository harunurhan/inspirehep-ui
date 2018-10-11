import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Map } from 'immutable';
import { List, Row, Col } from 'antd';
import { Link } from 'react-router-dom';

import AuthorsAndCollaborations from '../../../common/components/AuthorsAndCollaborations';
import ArxivEprintList from '../ArxivEprintList';
import Latex from '../../../common/components/Latex';
import PublicationInfoList from '../../../common/components/PublicationInfoList';
import DOIList from '../DOIList';
import URLList from '../URLList';
import './ReferenceItem.scss';
import { LITERATURE } from '../../../common/routes';

class ReferenceItem extends Component {
  static renderLabel(reference) {
    const label = reference.get('label');
    const labelDisplay = label ? `[${label}] ` : null;
    return labelDisplay;
  }

  static renderTitle(reference) {
    const recordId = reference.get('control_number');
    const title = reference.getIn(['titles', 0, 'title']);
    if (recordId && title) {
      return (
        <Link className="f5" to={`${LITERATURE}/${recordId}`}>
          <Latex>{title}</Latex>
        </Link>
      );
    } else if (title) {
      return <div className="f5">{title}</div>;
    }
    return null;
  }

  static renderMisc(reference) {
    const misc = reference.get('misc');
    return misc && <div>{misc}</div>;
  }

  render() {
    const { reference } = this.props;
    const publicationInfo = reference.get('publication_info');
    const arxivEprint = reference.get('arxiv_eprint');
    const dois = reference.get('dois');
    const urls = reference.get('urls');

    const recordId = reference.get('control_number');
    const authors = reference.get('authors');
    const collaborations = reference.get('collaborations');
    const collaborationsWithSuffix = reference.get(
      'collaborations_with_suffix'
    );

    // HACK: `Row` and only single `Col` for the label are used in order to make label and title responsive
    return (
      <List.Item>
        <Row gutter={24} type="flex" justify="start" align="middle">
          <Col>{ReferenceItem.renderLabel(reference)}</Col>
          <List.Item.Meta
            title={ReferenceItem.renderTitle(reference)}
            description={
              <Fragment>
                {ReferenceItem.renderMisc(reference)}
                <AuthorsAndCollaborations
                  recordId={recordId}
                  authors={authors}
                  collaborations={collaborations}
                  collaborationsWithSuffix={collaborationsWithSuffix}
                />
                <ul className="bulleted-inline-list secondary-container">
                  {publicationInfo && (
                    <li className="dib mr1">
                      <PublicationInfoList
                        publicationInfo={publicationInfo}
                        labeled={false}
                        wrapperClassName="di"
                      />
                    </li>
                  )}
                  {arxivEprint && (
                    <li className="dib mr1">
                      <ArxivEprintList
                        eprints={arxivEprint}
                        wrapperClassName="di"
                      />
                    </li>
                  )}
                  {dois && (
                    <li className="dib mr1">
                      <DOIList dois={dois} wrapperClassName="di" />
                    </li>
                  )}
                  {urls && (
                    <li className="dib mr1">
                      <URLList urls={urls} wrapperClassName="di" />
                    </li>
                  )}
                </ul>
              </Fragment>
            }
          />
        </Row>
      </List.Item>
    );
  }
}

ReferenceItem.propTypes = {
  reference: PropTypes.instanceOf(Map).isRequired,
};

export default ReferenceItem;
