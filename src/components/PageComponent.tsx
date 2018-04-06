import * as React from 'react'
import Link from 'gatsby-link'
import Img from 'gatsby-image'
import { MarkdownRemark, ImageSharp } from '../graphql-types'
import * as Page from '../templates/page'
import NavigationLinkComponent from './NavigationLinkComponent'
import { LearnMoreVideo } from './LearnMoreVideo'

const logo = require('../../content/images/included/logo.png')
const landingVideo = require('../../content/media/landing_video.mp4')

const heroHeight = '480px'

const heroHeightStyle = {
  height: heroHeight,
}

const heroVideoStyle = {
  height: heroHeight,
  objectFit: 'cover',
  objectPosition: 'center top',
}

const navIndex = {
  zIndex: 1,
}

const navigationMenuLinks = [
  {
    title: `LIVE WORKSHOPS`,
    to: `/workshops`,
  },
  {
    title: `ONLINE RESOURCES`,
    to: `/resources`,
  },
  {
    title: `SUPPORT`,
    to: `/faq`,
  },
  {
    title: `CONTACT`,
    to: `/contact`,
  },
]

const PageComponent: React.StatelessComponent<Page.PageTemplateLayoutProps> = (props) => {
  return (
    <div>
      <div className="hero is-primary is-medium" style={heroHeightStyle}>
        <div className="hero-video is-transparent" style={heroHeightStyle}>
          {props.data!.markdownRemark!.frontmatter!.heroIsVideo && (
            <video className="is-transparent" playsInline autoPlay muted loop style={heroVideoStyle}>
              <source src={landingVideo} type="video/mp4" />
            </video>
          )}
          {props.data!.imageSharp && (
            <Img style={heroVideoStyle} className="heroVideoStyle"
              title="Header image"
              alt="Header image"
              sizes={props.data!.imageSharp!.sizes!}
            />
          )}
        </div>
        <nav className="navbar is-overlay is-transparent" style={navIndex}>
          <div className="container">
            <div className="navbar-brand">
              <Link className="navbar-item"
                to="/"
              >
                <img src={logo} alt="Logo" />
              </Link>
              <span id="nav-toggle" className="navbar-burger burger" data-target="nav-menu"
                onClick={() => {
                  const toggle = document.querySelector('#nav-toggle')
                  const menu = document.querySelector('#nav-menu')
                  toggle!.classList.toggle('is-active')
                  menu!.classList.toggle('is-active')
                }}
              >
                <span></span>
                <span></span>
                <span></span>
              </span>
            </div>
            <div id="nav-menu" className="navbar-menu">
              <div className="navbar-end">
                {navigationMenuLinks.map((navigationLink, key) => (
                  <NavigationLinkComponent
                    key={key}
                    title={navigationLink.title}
                    to={navigationLink.to}
                    isActive={props.pathContext.pagePath === navigationLink.to}
                  />
                ))}
              </div>
            </div>
          </div>
        </nav>
        <div className="has-text-centered container hero-body" style={{ paddingBottom: 0 }}>
          <p className="title">
            {props.data!.markdownRemark!.frontmatter!.heroTitle!}
          </p>
          <p className="subtitle">
            {props.data!.markdownRemark!.frontmatter!.heroSubtitle!}
          </p>
          {props.data!.markdownRemark!.frontmatter!.includeLearnMore && (
            <LearnMoreVideo />
          )}
        </div>
      </div>
      <div className="container section content"
        dangerouslySetInnerHTML={{ __html: props.data!.markdownRemark!.html! }} />
      {props.children}
    </div >
  )
}

export default PageComponent
