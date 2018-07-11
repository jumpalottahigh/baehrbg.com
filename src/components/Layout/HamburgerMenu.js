import React, { Component } from 'react'
import styled from 'styled-components'
import { Link } from 'gatsby'

class HamburgerMenu extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isOpen: false,
      routes: [
        { name: `Home`, path: `/`, exact: true },
        { name: `Products`, path: `/products` },
      ],
    }
  }
  toggleIsOpen = () => {
    this.setState({
      isOpen: !this.state.isOpen,
    })
  }
  render() {
    return (
      <React.Fragment>
        <Nav>
          <Menu className={this.state.isOpen ? `open` : ``}>
            {this.state.routes.map(route => (
              <Item key={route.name}>
                <Link
                  exact={route.exact}
                  activeClassName="active"
                  to={route.path}
                >
                  {route.name}
                </Link>
              </Item>
            ))}
          </Menu>
          <Backdrop
            onClick={this.toggleIsOpen}
            className={this.state.isOpen ? `open` : ``}
          />
          <Hamburger
            onClick={this.toggleIsOpen}
            className={this.state.isOpen ? `open` : ``}
          >
            <div>
              <span />
              <span />
              <span />
              <span />
            </div>
          </Hamburger>
        </Nav>
      </React.Fragment>
    )
  }
}

const Nav = styled.nav`
  padding: 20px 10px;
`

const Hamburger = styled.button`
  display: flex;
  padding: 0 15px;
  border: 0;
  background: none;
  outline: 0;
  cursor: pointer;
  font-size: 1.2rem;
  margin: 0 0 0 auto;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);

  div {
    width: 25px;
    overflow: auto;
    position: relative;
    height: 20px;
    span {
      display: block;
      position: absolute;
      height: 3px;
      width: 100%;
      background-color: #2d2d2d;
      border-radius: 3px;
      left: 0;
      -webkit-transform: rotate(0deg);
      -moz-transform: rotate(0deg);
      -o-transform: rotate(0deg);
      transform: rotate(0deg);
      -webkit-transition: 0.25s ease-in-out;
      -moz-transition: 0.25s ease-in-out;
      -o-transition: 0.25s ease-in-out;
      transition: 0.25s ease-in-out;
      &:nth-child(1) {
        top: 0px;
      }
      &:nth-child(2) {
        top: 8px;
      }
      &:nth-child(3) {
        top: 8px;
      }
      &:nth-child(4) {
        top: 16px;
      }
    }
  }

  &.open > div > span {
    &:nth-child(1) {
      top: 8px;
      width: 0%;
      left: 50%;
    }
    &:nth-child(2) {
      -webkit-transform: rotate(45deg);
      -moz-transform: rotate(45deg);
      -o-transform: rotate(45deg);
      transform: rotate(45deg);
    }
    &:nth-child(3) {
      -webkit-transform: rotate(-45deg);
      -moz-transform: rotate(-45deg);
      -o-transform: rotate(-45deg);
      transform: rotate(-45deg);
    }
    &:nth-child(4) {
      top: 8px;
      width: 0%;
      left: 50%;
    }
  }
`

const Menu = styled.ul`
  top: 60px;
  right: -300px;
  padding: 0;
  height: calc(100% - 46px);
  width: 300px;
  position: fixed;
  background-color: #fff;
  border-left: 1px solid #f5f3f7;
  transition: 0.3s ease-in-out;
  margin: 0;
  list-style: none;
  z-index: 99;
  &.open {
    right: 0;
  }
  @media screen and (max-width: 900px) {
    display: block;
  }
  @media screen and (max-width: 400px) {
    width: 100%;
    right: -100%;
  }
`

const Backdrop = styled.div`
  position: fixed;
  width: 100%;
  height: calc(100% - 60px);
  top: 60px;
  left: 0;
  z-index: 98;
  background-color: rgba(0, 0, 0, 0.3);
  display: none;
  cursor: pointer;
  transition: 0.5s ease-in-out;
  &.open {
    display: block;
  }
`

const Item = styled.li`
  margin: 0;
  display: block;
  border-bottom: 1px solid #f5f3f7;
  a {
    padding: 15px 20px;
    margin: 0;
    width: 100%;
    display: block;
    position: relative;
    text-decoration: none;
    &.active {
      &::before {
        content: '';
        position: absolute;
        left: -1px;
        top: 0;
        height: 100%;
        width: 5px;
      }
    }
  }
`

export default HamburgerMenu
