import React, { Component } from 'react'
import styled from 'styled-components'
import { Link } from 'gatsby'

import brand from '../../../static/BAEHR_Logo_Skala-800px.jpg'

const Nav = styled.nav`
  padding: 20px 10px;
  background-color: #fafafa;
  box-shadow: 0 0 2px 2px #cecece;
  z-index: 999;
  width: calc(100% - 20px);
  position: fixed;
`

const Brand = styled.span`
  position: absolute;
  top: 15px;
  left: 10px;
  img {
    width: 80px;
  }
`

const TopNav = styled.div`
  display: none;

  ul {
    padding: 0;
    list-style-type: none;
    display: flex;
    justify-items: flex-start;
  }

  li {
    margin-right: 1.5rem;
    text-transform: uppercase;
  }

  @media (min-width: 1000px) {
    position: absolute;
    top: 0;
    left: 120px;
    display: block;
    width: 550px;
  }
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
      background-color: #c5112e;
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
    pointer-events: auto;
    overflow-y: auto;
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

const SubItem = Item.extend`
  padding-left: 15px;
`

class HamburgerMenu extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isOpen: false,
      routes: [
        { name: `Начало`, path: `/`, exact: true },
        { name: `Продукти`, path: `/categories` },
        { name: `Обучения`, path: `/trainings` },
        { name: `Специалисти`, path: `/specialists` },
        { name: `За нас`, path: `/about` },
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
          <Brand>
            <Link to="/">
              <img src={brand} alt="BAEHR logo" />
            </Link>
          </Brand>
          <TopNav>
            <ul>
              <li>
                <Link
                  exact={this.state.routes[0].exact}
                  activeClassName="active"
                  to={this.state.routes[0].path}
                >
                  {this.state.routes[0].name}
                </Link>
              </li>
              <li>
                <Link activeClassName="active" to={this.state.routes[1].path}>
                  {this.state.routes[1].name}
                </Link>
              </li>
              <li>
                <Link activeClassName="active" to={this.state.routes[2].path}>
                  {this.state.routes[2].name}
                </Link>
              </li>
              <li>
                <Link activeClassName="active" to={this.state.routes[3].path}>
                  {this.state.routes[3].name}
                </Link>
              </li>
              <li>
                <Link activeClassName="active" to={this.state.routes[4].path}>
                  {this.state.routes[4].name}
                </Link>
              </li>
            </ul>
          </TopNav>
          <Menu className={this.state.isOpen ? `open` : ``}>
            {this.state.routes.map(route => {
              let renderValue = (
                <React.Fragment key={route.name}>
                  <Item>
                    <Link
                      exact={route.exact}
                      activeClassName="active"
                      to={route.path}
                    >
                      {route.name}
                    </Link>
                  </Item>
                </React.Fragment>
              )

              // As we render menu, render subproducts when we hit the products menu entry
              if (route.path == '/categories') {
                let allProductSubItems = this.props.allProductPages.map(
                  ({ node: route }) => (
                    <SubItem key={route.id}>
                      <Link
                        exact={true}
                        activeClassName="active"
                        to={`/categories/${route.slug}`}
                      >
                        {route.title}
                      </Link>
                    </SubItem>
                  )
                )

                // Update the render value with all subitems for the product entries
                renderValue = (
                  <React.Fragment key={route.name}>
                    <Item>
                      <Link
                        exact={route.exact}
                        activeClassName="active"
                        to={route.path}
                      >
                        {route.name}
                      </Link>
                    </Item>
                    <React.Fragment>{allProductSubItems}</React.Fragment>
                  </React.Fragment>
                )
              }

              return renderValue
            })}
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

export default HamburgerMenu
