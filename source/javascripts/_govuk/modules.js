(function ($, root) {
  'use strict'
  root.GOVUK = root.GOVUK || {}
  GOVUK.Modules = GOVUK.Modules || {}

  GOVUK.modules = {
    find: function (container) {
      let modules
      const moduleSelector = '[data-module]'
      const component = container || $('body')

      modules = component.find(moduleSelector)

      // Container could be a module too
      if (component.is(moduleSelector)) {
        modules = modules.add(component)
      }

      return modules
    },

    start: function (container) {
      const modules = this.find(container)

      for (let i = 0, l = modules.length; i < l; i++) {
        var module
        const element = $(modules[i])
        const type = camelCaseAndCapitalise(element.data('module'))
        const started = element.data('module-started')

        if (typeof GOVUK.Modules[type] === 'function' && !started) {
          module = new GOVUK.Modules[type]()
          module.start(element)
          element.data('module-started', true)
        }
      }

      // eg selectable-table to SelectableTable
      function camelCaseAndCapitalise (string) {
        return capitaliseFirstLetter(camelCase(string))
      }

      // http://stackoverflow.com/questions/6660977/convert-hyphens-to-camel-case-camelcase
      function camelCase (string) {
        return string.replace(/-([a-z])/g, function (g) {
          return g[1].toUpperCase()
        })
      }

      // http://stackoverflow.com/questions/1026069/capitalize-the-first-letter-of-string-in-javascript
      function capitaliseFirstLetter (string) {
        return string.charAt(0).toUpperCase() + string.slice(1)
      }
    }
  }
})(jQuery, window)
