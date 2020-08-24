import https from "../common/https";
// 登录
export function loginByUsername(data) {
  return https.fetchPost("http://111.62.51.42:8005/api/v1/user/login/", data)
}

