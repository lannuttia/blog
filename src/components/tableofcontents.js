import React from 'react';
import PropTypes from 'prop-types';

import LinkList from '../components/linklist';
import Layout from '../components/layout';
import SEO from '../components/seo';

const TableOfContents = (props) => (
  <Layout>
    <SEO title={props.title} />
    <h1>{props.description}</h1>
    <LinkList links={props.links} />
  </Layout>
);

TableOfContents.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  links: PropTypes.arrayOf(PropTypes.string),
};

export default TableOfContents;

