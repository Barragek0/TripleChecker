import ClientOauth2 from 'client-oauth2';

import * as apiCodes from './codes';

const oauthClient = new ClientOauth2({
  clientId: apiCodes.CLIENT_ID,
  clientSecret: apiCodes.CLIENT_SECRET,
  accessTokenUri: 'https://us.battle.net/oauth/token'
})

export default oauthClient;