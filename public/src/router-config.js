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
          route: ['','home'], name: 'home',
          moduleId: tmpl('home'), nav: true, title:'Moodler', auth: true
        }, {
          route: 'signup', name: 'signup',
          moduleId: tmpl('signup'), nav: false, title:'Signup', authRoute: true
        }, {
          route: 'login', name: 'login',
          moduleId: tmpl('login'), nav: false, title:'Login', authRoute: true
        }, {
          route: 'logout', name: 'logout',
          moduleId: tmpl('logout'), nav: false, title:'Logout', authRoute: true
        }, {
          route: 'account', name: 'account',
          moduleId: tmpl('account'), nav: false, title:'Account', auth: true
        }
      ])
    }

    this.router.configure(appRouterConfig)
  }
}
