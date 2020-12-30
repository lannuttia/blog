import React from "react"

import TableOfContents from "../components/tableofcontents"

const TITLE = "Software"
const DESCRIPTION = "My Thoughts and Opinions on Software"
const LINKS = []

const SoftwarePage = () => (
  <TableOfContents
    title={TITLE}
    description={DESCRIPTION}
    links={LINKS}
  />
)
export default SoftwarePage
