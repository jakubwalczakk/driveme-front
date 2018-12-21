import { API_BASE_URL, POLL_LIST_SIZE, ACCESS_TOKEN } from 'constants/constants';

export const request = (options) => {
  const headers = new Headers({
    'Content-Type': 'application/json',
  })

  if (localStorage.getItem(ACCESS_TOKEN)) {
    headers.append('Authorization', 'Bearer ' + "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJqYWt1Yi53YWxjemFrQGRyaXZlbWUucGwiLCJzY29wZXMiOiJLdXJzYW50IiwiaWF0IjoxNTQ1NDA3NzUwLCJleHAiOjE1NDU0MTc3NTB9.DBln7yHnIfhzCj6GPYJEsQJ0quV3JiP78WEbiNF6mA_1ZIZqwlGG-ClNkPcXGwQNq5qeUhOzrNm3HACyAuB0qg");//localStorage.getItem(ACCESS_TOKEN))
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
};

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
  if (!localStorage.getItem(ACCESS_TOKEN)) {
    return Promise.reject("No access token set.");
  }

  return request({
    url: API_BASE_URL + "/user/me",
    method: 'GET'
  })
}

export function trimDate(date){
  var part1 = date.split("T")[0];
  var part2 = date.split("T")[1].split("Z")[0];

  return part1 + ' ' + part2;
}