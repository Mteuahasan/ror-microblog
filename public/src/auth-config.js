var config = {
  baseUrl: window.location.origin,
  signupUrl: '/api/v1/users',
  loginUrl: '/api/v1/users/authenticate',
  profileUrl: '/api/v1/users/me',
  tokenName: 'auth_token',
  loginOnSignup: true,
  loginRedirect: '/',
  authToken: ''
}

export default config
