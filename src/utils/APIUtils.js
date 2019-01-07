import { API_BASE_URL, ACCESS_TOKEN } from 'constants/constants';

export const request = (method, path, body) => {
  const headers = new Headers({
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  })

  if (localStorage.getItem(ACCESS_TOKEN)) {
    headers.append('Authorization', 'Bearer ' + localStorage.getItem(ACCESS_TOKEN));
  }

  const url = path;
  const options = { method, headers: headers };

  if (body) {
    options.body = JSON.stringify(body);
  }

  return fetch(new Request(url, options))
    .then(response =>
      response.json())
    .catch(error => console.log(error));

  // return fetch(options.url, options)
  //   .then(response =>
  //     response.json()
  //   ).then(json =>
  //     json
  //   ).catch(error =>
  //     console.log(error)
  //   )
}


export function login(loginRequest) {
  return request(
    'POST',
    API_BASE_URL + "/auth/signin",
    loginRequest
  );
}

export function signup(signupRequest) {
  return request(
    'POST',
    API_BASE_URL + "/auth/signup",
    signupRequest
  );
}

export function trimDate(date) {
  var part1 = date.split("T")[0];
  var part2 = date.split("T")[1].split("Z")[0];

  return part1 + ' ' + part2;
}