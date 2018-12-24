import { API_BASE_URL, ACCESS_TOKEN } from 'constants/constants';

export const request = (options) => {
  const headers = new Headers({
    'Content-Type': 'application/json',
  })

  if (localStorage.getItem(ACCESS_TOKEN)) {
    headers.append('Authorization', 'Bearer ' + localStorage.getItem(ACCESS_TOKEN));
  }

  const defaults = { headers: headers };
  options = Object.assign({}, defaults, options);

  return fetch(options.url, options)
    .then(response =>
      response.json().then(json => {
        if (!response.ok) {
          return Promise.reject(json);
        }
        return json;
      })
    );
}
// if (localStorage.getItem(ACCESS_TOKEN)) {
//   fetch('http://localhost:8080/user/me', {
//     method: 'GET',
//     headers: {
//       "Content-Type": "application/json",
//       "Authorization": "Bearer " + localStorage.getItem(ACCESS_TOKEN)
//     },
//   }).then(response => {
//     if (response.ok) {
//       return response.json();
//     } else {
//       throw new Error('Coś poszło nie tak podczas pobierania zalogowanego użytkownika...');
//     }
//   });
// } else {
//   throw new Error("Nie można pobrać informacji na temat zalogowanego użytkownika");
// }


export function login(loginRequest) {
  return request({
    url: API_BASE_URL + "/auth/signin",
    method: 'POST',
    body: JSON.stringify(loginRequest)
  });
}

export function signup(signupRequest) {
  return request({
    url: API_BASE_URL + "/auth/signup",
    method: 'POST',
    body: JSON.stringify(signupRequest)
  });
}

export function checkEmailAvailability(email) {
  return request({
    url: API_BASE_URL + "/user/checkEmailAvailability?email=" + email,
    method: 'GET'
  });
}

export function getCurrentUser() {
  if (localStorage.getItem(ACCESS_TOKEN)) {

    let currentUser;

    fetch('http://localhost:8080/user/me', {
      method: 'GET',
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + localStorage.getItem(ACCESS_TOKEN)
      },
    }).then(response => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error('Coś poszło nie tak podczas pobierania zalogowanego użytkownika...');
      }
    }).then(response => {
      currentUser = response;
    });
    return currentUser;
  } else {
    console.log("Nie można pobrać informacji na temat zalogowanego użytkownika");
    return null;
  }
}

export function trimDate(date) {
  var part1 = date.split("T")[0];
  var part2 = date.split("T")[1].split("Z")[0];

  return part1 + ' ' + part2;
}