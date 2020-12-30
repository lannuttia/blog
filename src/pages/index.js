import React from 'react';
import {Link} from 'gatsby';

import Layout from '../components/layout';
import SEO from '../components/seo';

const IndexPage = () => (
  <Layout>
    <SEO title="Blog" />
    <h1>Anthony Lannutti&apos;s Blog</h1>
    <p>A place where I come to document my thoughts on various topics.</p>
    <Link to="/software/">Software</Link> <br />
    <Link to="/music/">Music</Link>
  </Layout>
);

export default IndexPage;
