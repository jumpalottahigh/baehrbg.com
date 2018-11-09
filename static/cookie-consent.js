// Implementation based on the open source solution at:
// https://cookieconsent.insites.com/demos/
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
    type: `opt-out`,
    onInitialise: function(status) {
      var type = this.options.type
      var didConsent = this.hasConsented()
      if (type == `opt-out` && !didConsent) {
        // disable cookies
        self.gaOptout()
      }
    },

    onStatusChange: function(status, chosenBefore) {
      var type = this.options.type
      var didConsent = this.hasConsented()
      if (type == `opt-out` && !didConsent) {
        // disable cookies
        self.gaOptout()
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
