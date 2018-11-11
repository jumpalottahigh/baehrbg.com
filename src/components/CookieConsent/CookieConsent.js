import React, { Component } from 'react'

export default class CookieConsent extends Component {
  checkCookieStatus = () => {
    if (
      document.cookie.includes('cookieconsent_status=dismiss') ||
      document.cookie.includes('cookieconsent_status=allow') ||
      document.cookie.includes('cookieconsent_status=deny')
    ) {
      return true
    } else {
      return false
    }
  }

  componentDidMount() {
    const cookieIsSet = this.checkCookieStatus()
    if (cookieIsSet) return

    const { message, dismiss, deny, moreText, moreLink } = this.props.data

    window.addEventListener(`load`, function() {
      window.cookieconsent.initialise({
        palette: {
          popup: {
            background: `#474747`,
          },
          button: {
            background: `#c5102e`,
          },
        },
        content: {
          message: message.message,
          dismiss,
          deny,
          link: moreText,
          href: moreLink,
          target: '_blank',
        },
        type: `opt-out`,
        onInitialise: function(status) {
          var type = this.options.type
          var didConsent = this.hasConsented()
          if (type == `opt-out` && !didConsent) {
            // disable cookies
            // TODO: uncomment once we add google analytics
            // self.gaOptout()
          }
        },

        onStatusChange: function(status, chosenBefore) {
          var type = this.options.type
          var didConsent = this.hasConsented()
          if (type == `opt-out` && !didConsent) {
            // disable cookies
            // self.gaOptout()
          }
        },

        onRevokeChoice: function() {
          var type = this.options.type
          if (type == `opt-out`) {
            // enable cookies
            document.cookie = `ga-disable-` + self.gaProperty + `=false`
          }
        },
      })
    })
  }

  render() {
    return null
  }
}
