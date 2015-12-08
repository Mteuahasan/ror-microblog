/* */ 
System.register(['aurelia-framework', './authentication', 'aurelia-router'], function (_export) {
  'use strict';

  var inject, Authentication, Redirect, Router, AuthorizeStep;

  var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

  return {
    setters: [function (_aureliaFramework) {
      inject = _aureliaFramework.inject;
    }, function (_authentication) {
      Authentication = _authentication.Authentication;
    }, function (_aureliaRouter) {
      Redirect = _aureliaRouter.Redirect;
      Router = _aureliaRouter.Router;
    }],
    execute: function () {
      AuthorizeStep = (function () {
        function AuthorizeStep(auth) {
          _classCallCheck(this, _AuthorizeStep);

          this.auth = auth;
        }

        _createClass(AuthorizeStep, [{
          key: 'run',
          value: function run(routingContext, next) {
            var isLoggedIn = this.auth.isAuthenticated();
            var loginRoute = this.auth.getLoginRoute();

            if (routingContext.getAllInstructions().some(function (i) {
              return i.config.auth;
            })) {
              if (!isLoggedIn) {
                console.log("login route : " + loginRoute);
                return next.cancel(new Redirect(loginRoute));
              }
            } else if (isLoggedIn && routingContext.getAllInstructions().some(function (i) {
              return i.fragment;
            }) == loginRoute) {
              var loginRedirect = this.auth.getLoginRedirect();
              return next.cancel(new Redirect(loginRedirect));
            }

            return next();
          }
        }]);

        var _AuthorizeStep = AuthorizeStep;
        AuthorizeStep = inject(Authentication)(AuthorizeStep) || AuthorizeStep;
        return AuthorizeStep;
      })();

      _export('AuthorizeStep', AuthorizeStep);
    }
  };
});