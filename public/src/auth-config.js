var config = {
  baseUrl: 'http://localhost:3000',
  signupUrl: '/api/v1/users',
  loginUrl: '/api/v1/users/authenticate',
  profileUrl: '/api/v1/users/me',
  tokenName: 'auth_token',
  loginOnSignup: true,
  loginRedirect: '/',
  authToken: ''
}

export default config
