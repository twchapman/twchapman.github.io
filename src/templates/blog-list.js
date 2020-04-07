import React from 'react'
import { Link, graphql } from 'gatsby'

import DefaultLayout from '../components/layout'
import SEO from '../components/seo'

class BlogIndex extends React.Component {
  render() {
    const { data } = this.props
    const siteTitle = data.site.siteMetadata.title
    const posts = data.allMarkdownRemark.edges

    return (
      <DefaultLayout>
        <SEO
          title={siteTitle}
          keywords={[`blog`, `gatsby`, `javascript`, `react`]}
        />
        {posts.map(({ node }) => {
          return (
            <article className="post" key={node.fields.slug}>
              {node.frontmatter.img &&
                node.frontmatter.img.childImageSharp &&
                node.frontmatter.img.childImageSharp.fluid && (
                  <Link
                    to={node.fields.slug}
                    className="post-thumbnail"
                    style={{
                      backgroundImage: `url(${node.frontmatter.img.childImageSharp.fluid.src})`,
                    }}
                  />
                )}
              <div className="post-content">
                <h2 className="post-title">
                  <Link to={node.fields.slug}>{node.frontmatter.title}</Link>
                </h2>
                <p>{node.excerpt}</p>
                <span className="post-date">
                  {node.frontmatter.date}&nbsp;&nbsp;—&nbsp;
                </span>
                <span className="post-words">
                  {node.timeToRead} minute read
                </span>
              </div>
            </article>
          )
        })}
      </DefaultLayout>
    )
  }
}

export default BlogIndex

export const pageQuery = graphql`
  query blogPageQuery {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      edges {
        node {
          excerpt
          fields {
            slug
          }
          timeToRead
          frontmatter {
            date(formatString: "YYYY, MMM DD")
            title
            img {
              childImageSharp {
                fluid(maxWidth: 3720) {
                  aspectRatio
                  base64
                  sizes
                  src
                  srcSet
                }
              }
            }
          }
        }
      }
    }
  }
`
