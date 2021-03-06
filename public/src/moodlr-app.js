import config from './auth-config'

export function configure(aurelia) {
  aurelia.use
    .standardConfiguration()
    .developmentLogging()
    .plugin('aurelia-auth', baseConfig => {
      baseConfig.configure(config)
    })

  aurelia.start().then(a => a.setRoot())
}
