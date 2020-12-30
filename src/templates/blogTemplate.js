import React from 'react';
import PropTypes from 'prop-types';
import {graphql} from 'gatsby';
import Layout from '../components/layout';
import SEO from '../components/seo';

const BlogTemplate = ({data}) => {
  const {markdownRemark} = data; // data.markdownRemark holds your post data
  const {frontmatter, html} = markdownRemark;
  return (
    <Layout>
      <SEO title={frontmatter.title} />
      <h1>{frontmatter.title}</h1>
      <h2>{frontmatter.date}</h2>
      <div className="blog-post-container">
        <div className="blog-post">
          <div
            className="blog-post-content"
            dangerouslySetInnerHTML={{__html: html}}
          />
        </div>
      </div>
    </Layout>
  );
};

BlogTemplate.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.shape({
      frontmatter: PropTypes.shape({
        title: PropTypes.string,
        date: PropTypes.string,
      }),
      html: PropTypes.string,
    }),
  }).isRequired,
};

export default BlogTemplate;

export const pageQuery = graphql`
  query($slug: String!) {
    markdownRemark(frontmatter: { slug: { eq: $slug } }) {
      html
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        slug
        title
      }
    }
  }
`;
