import React from 'react';
import {Link} from 'gatsby';

const LinkList = (props) => {
  if (0 === props.links.length) {
    return <p>...And that&apos;s all I have to say about that</p>;
  } else {
    return (
      <div>
        {props
            .links
            .map((link, idx) => (
              <div key={idx}>
                <Link to={link.url}>{link.description}</Link> <br />
              </div>
            ))}
      </div>
    );
  }
};
export default LinkList;
