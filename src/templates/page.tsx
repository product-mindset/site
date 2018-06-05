import * as React from 'react'
import { MarkdownRemark, ImageSharp } from '../graphql-types'
import * as PageComponent from '../components/PageComponent'

export interface PageTemplateLayoutProps {
  headerTitle: string
  pathContext: {
    pagePath: string
  }
  slug: string
  data?: {
    imageSharp?: ImageSharp
    markdownRemark?: MarkdownRemark
  },
  children?: any
}

const PageTemplateLayout: React.StatelessComponent<PageTemplateLayoutProps> = (props) => {
  return (
      <PageComponent.default {...props}/>
  )
}

export default PageTemplateLayout

export const PageQueryFragment = graphql`
  fragment PageQueryFragment on RootQueryType {
    imageSharp (fields: {slug: {eq: $heroImageSlug }} ) {
      sizes(maxWidth: 1240 ) {
        ...GatsbyImageSharpSizes_withWebp
      }
    }
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      frontmatter {
        heroIsVideo
        path
        title
        heroTitle
        heroSubtitle
        templateKey
        includeLearnMore
        subColumns
      }
    }
  }
`

export const PageTemplateQuery = graphql`
  query PageTemplateQuery($slug: String!, $heroImageSlug: String) {
    ...PageQueryFragment
  }
`
