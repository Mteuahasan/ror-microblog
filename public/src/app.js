import {inject} from 'aurelia-framework'
import {Router} from 'aurelia-router'
import {HttpClient} from 'aurelia-fetch-client'
import {FetchConfig} from 'aurelia-auth'
import HttpClientConfig from 'aurelia-auth/app.httpClient.config'


import AppRouterConfig from 'router-config'

@inject(Router, FetchConfig, HttpClientConfig, AppRouterConfig)

export class App {
  constructor(router, fetchConfig, httpClientConfig, appRouterConfig) {
    this.router = router
    this.fetchConfig = fetchConfig
    this.httpClientConfig = httpClientConfig
    this.appRouterConfig = appRouterConfig
  }

  activate() {
    this.fetchConfig.configure()
    this.httpClientConfig.configure()
    this.appRouterConfig.configure()
  }
}
