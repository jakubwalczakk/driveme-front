export const API_BASE_URL = 'http://localhost:8080';
export const ACCESS_TOKEN = 'accessToken';

export const NAME_MIN_LENGTH = 3;
export const NAME_MAX_LENGTH = 30;
export const SURNAME_MIN_LENGTH = 2;
export const SURNAME_MAX_LENGTH = 50;
export const PESEL_LENGTH = 11;

export const USERNAME_MIN_LENGTH = 3;
export const USERNAME_MAX_LENGTH = 25;

export const EMAIL_MAX_LENGTH = 40;

export const PASSWORD_MIN_LENGTH = 8;
export const PASSWORD_MAX_LENGTH = 32;

export const MINUTE_IN_MICROS = 1000 * 60;

// export const CURRENT_USER_ROLE = 'Kursant';
// export const CURRENT_USER_ROLE = 'Administrator';
export const CURRENT_USER_ROLE = 'Instruktor';

export const User_role = getUserRole();


//FIXME
function getUserRole(){
  var token = localStorage.getItem(ACCESS_TOKEN);
  if (token) {
    var decodedToken = JSON.parse(atob(localStorage.getItem(ACCESS_TOKEN).split('.')[1]));
    console.log(decodedToken)
    return decodedToken.scopes;
  }else{
    return null;
  }
}

function parseJwt(token) {
  // var base64Url = token.split('.')[1];
  // // var base64 = base64Url.replace('-', '+').replace('_', '/');
  // var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  // return JSON.parse(window.atob(base64));

  return JSON.parse(atob(token.split('.')[1]));
};