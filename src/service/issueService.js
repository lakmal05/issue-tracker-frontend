import ApiService from "./apiService";

export async function getAll() {
  const apiObject = {};
  apiObject.method = "GET";
  apiObject.authentication = true;
  apiObject.endpoint = "api/issue/find-all";
  return await ApiService.callApi(apiObject);
}

export async function create(data) {
  console.log(data, "L::::::::::::::::::");
  const apiObject = {};
  apiObject.method = "POST";
  apiObject.authentication = false;
  apiObject.urlencoded = false;
  apiObject.isWithoutPrefix = false;
  apiObject.endpoint = "api/issue/create";
  apiObject.body = data;
  return await ApiService.callApi(apiObject);
}

export async function update(data, id) {
  const apiObject = {};
  apiObject.method = "PUT";
  apiObject.authentication = false;
  apiObject.urlencoded = false;
  apiObject.isWithoutPrefix = false;
  apiObject.endpoint = `api/issue/update/${id}`;
  apiObject.body = data;
  return await ApiService.callApi(apiObject);
}

export async function remove(id) {
  const apiObject = {};
  apiObject.method = "PATCH";
  apiObject.authentication = false;
  apiObject.urlencoded = false;
  apiObject.isWithoutPrefix = false;
  apiObject.endpoint = `api/issue/delete/${id}`;
  apiObject.body = null;
  return await ApiService.callApi(apiObject);
}
