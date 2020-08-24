import https from "../common/https";
export function getMenus(data) {
  return https.fetchGet("http://111.62.51.42:8005/api/v1/user/menus/", data)
}

