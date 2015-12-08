import {AuthorizeStep} from 'aurelia-auth'
import {inject} from 'aurelia-framework'
import {Router} from 'aurelia-router'

@inject(Router)

export default class {
  constructor(router) {
    this.router = router
  }

  configure() {
    var appRouterConfig = function(config) {
      const tmpl = str => `./templates/${str}`
      config.title = 'Moodlr'
      config.addPipelineStep('authorize', AuthorizeStep)

      config.map([
        {
          route: ['','welcome'], name: 'welcome',
          moduleId: tmpl('welcome'), nav: true, title:'Welcome'
        }, {
          route: 'signup', name: 'signup',
          moduleId: tmpl('signup'), nav: false, title:'Signup', authRoute: true
        }, {
          route: 'login', name: 'login',
          moduleId: tmpl('login'), nav: false, title:'Login', authRoute: true
        }, {
          route: 'logout', name: 'logout',
          moduleId: tmpl('logout'), nav: false, title:'Logout', authRoute: true
        }
      ])
    }

    this.router.configure(appRouterConfig)
  }
}
