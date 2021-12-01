import { removeLocationHash } from '@utils'

const {
  VITE_BASE_URL,
  VITE_SSO_AUTHORITY,
  VITE_SS0_CLIENT_ID,
  VITE_SSO_CLIENT_SECRET,
  VITE_SSO_SCOPE,
  VITE_SSO_RESPONSE_TYPE
} = import.meta.env

export const oidcConfig = {
  onSignIn: removeLocationHash,
  authority: VITE_SSO_AUTHORITY,
  clientId: VITE_SS0_CLIENT_ID,
  clientSecret: VITE_SSO_CLIENT_SECRET,
  responseType: VITE_SSO_RESPONSE_TYPE,
  scope: VITE_SSO_SCOPE,
  redirectUri: VITE_BASE_URL
}
