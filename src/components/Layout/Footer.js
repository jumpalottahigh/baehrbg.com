import React from 'react'
import styled from 'styled-components'
import FaTwitterSquare from 'react-icons/lib/fa/twitter-square'
import FaFacebookSquare from 'react-icons/lib/fa/facebook-square'
import FaInstagram from 'react-icons/lib/fa/instagram'

const StyledFooter = styled.footer`
  display: flex;
  flex-flow: column wrap;
  text-align: center;
  color: #777;
  padding: 3rem 0;
  font-size: 0.8rem;
`

const SocialMediaLink = styled.a`
  font-size: 2rem;
  color: #c5112e;
  margin-left: 5px;
`

const Footer = () => (
  <StyledFooter>
    <div>
      <SocialMediaLink target="blank" href="#">
        <FaTwitterSquare />
      </SocialMediaLink>
      <SocialMediaLink target="blank" href="#">
        <FaFacebookSquare />
      </SocialMediaLink>
      <SocialMediaLink target="blank" href="#">
        <FaInstagram />
      </SocialMediaLink>
    </div>
    <p>Copyright © 2018 BAEHRBG</p>
    <p>
      Created by <a href="https://www.georgi-yanev.com">Georgi Yanev</a>
    </p>
  </StyledFooter>
)

export default Footer
