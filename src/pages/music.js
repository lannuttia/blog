import React from "react"

import TableOfContents from "../components/tableofcontents"

const TITLE = "Music"
const DESCRIPTION = "My Thoughts and Opinions on Music"
const LINKS = []

const SoftwarePage = () => (
  <TableOfContents
    title={TITLE}
    description={DESCRIPTION}
    links={LINKS}
  />
)
export default SoftwarePage

