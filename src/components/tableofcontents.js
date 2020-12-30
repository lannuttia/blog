import React from "react"

import LinkList from "../components/linklist"
import Layout from "../components/layout"
import SEO from "../components/seo"

const TableOfContents = (props) => (
  <Layout>
    <SEO title={props.title} />
    <h1>{props.description}</h1>
    <LinkList links={props.links} />
  </Layout>
)
export default TableOfContents

