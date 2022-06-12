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
    apiKey: 'AIzaSyCENBIymxi_O0N_KjPUDOZlzStUEHRQbFQ',
    authDomain: 'finess-circle.firebaseapp.com',
    projectId: 'finess-circle',
    storageBucket: 'finess-circle.appspot.com',
    messagingSenderId: '919545462331',
    appId: '1:919545462331:web:94623c3e13198a5550661e',
    measurementId: 'G-0YT7PX8PS0'

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
