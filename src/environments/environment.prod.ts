/* eslint-disable @typescript-eslint/naming-convention */
export const environment = {
  production: true,
  apiUlr: 'https://circlefitness.app/api/v1',
  apiAuth: 'https://circlefitness.app/oauth/token',
  socialShareOption: [
    {
      title: 'Whatsapp',
      logo: 'https://cdn2.iconfinder.com/data/icons/social-media-2285/512/1_Whatsapp2_colored_svg-128.png',
      shareType: 'shareViaWhatsApp'
    },
    {
      title: 'Facebook',
      logo: 'https://cdn1.iconfinder.com/data/icons/social-media-2285/512/Colored_Facebook3_svg-128.png',
      shareType: 'shareViaFacebook'
    },
    {
      title: 'Twitter',
      logo: 'https://cdn2.iconfinder.com/data/icons/social-media-2285/512/1_Twitter_colored_svg-128.png',
      shareType: 'shareViaTwitter'
    },
    {
      title: 'Instagram',
      logo: 'https://cdn2.iconfinder.com/data/icons/social-media-2285/512/1_Instagram_colored_svg_1-128.png',
      shareType: 'shareViaInstagram'
    },

  ],
  firebaseConfig: {
    apiKey: 'AIzaSyBaTmBtUKp-qDbXWaHOSWme5D6AYnFHrIY',
    authDomain: 'circlefitnessapp.firebaseapp.com',
    databaseURL: 'https://circlefitnessapp-default-rtdb.firebaseio.com',
    projectId: 'circlefitnessapp',
    storageBucket: 'circlefitnessapp.appspot.com',
    messagingSenderId: '160794305828',
    appId: '1:160794305828:web:5a61eae103432595ea7fb1',
    measurementId: 'G-433W1967BP'

  }

};


export const client = {
  client_secret: 'epjQP0V8JECmIcpsZQrcf78SgR5rzhSYHdoqGofw',
  client_id: 2,
  grant_type: 'password'
};

export const facebookLoginClientCredentials = {
  client_secret: '...',
  client_id: 2,
  provider: 'facebook',
  // tslint:disable-next-line: max-line-length
  grant_type: 'social'
};

export const googleLoginClientCredentials = {
  client_secret: '...',
  client_id: 2,
  provider: 'google',
  // tslint:disable-next-line: max-line-length
  grant_type: 'social'
};

export const appleLoginClientCredentials = {
  client_secret: 'epjQP0V8JECmIcpsZQrcf78SgR5rzhSYHdoqGofw',
  client_id: '2',
  provider: 'apple',
  grant_type: 'social',
  // access_token: "abcdefg"
};
