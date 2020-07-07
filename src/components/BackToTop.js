import React from 'react'
import styled from 'styled-components'

import { FaAngleUp } from 'react-icons/fa'

const BackToTopButton = styled.div`
  background: #c5112e;
  box-shadow: 4px 4px 10px 2px #dedede;
  width: 60px;
  height: 60px;
  position: fixed;
  bottom: 20px;
  right: 20px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0.1;
  transition: opacity 300ms ease-in-out;
  cursor: pointer;

  &:hover {
    opacity: 1;
  }
`

export default function BackToTop() {
  return (
    <BackToTopButton
      onClick={() =>
        window.scrollTo({
          top: 0,
          left: 0,
          behavior: 'smooth',
        })
      }
    >
      <FaAngleUp size="58px" color="#fff" />
    </BackToTopButton>
  )
}
