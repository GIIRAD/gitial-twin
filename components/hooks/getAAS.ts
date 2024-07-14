import fetchGet from "../utils/http/get";
import fetchPut from "../utils/http/put";

const getAASRoute = 'http://localhost:8081/shells/';

const getAAS = async (id: string): Promise<any> => {
  const url = `${getAASRoute}${id}`;
  const res = await fetchGet<any>(url);
  console.log(res)
  return res;
}

const putAAS = async(id: string, newAAS: any): Promise<any> => {
  const url = `${getAASRoute}${id}`;
  const res = await fetchPut(url, newAAS);
  console.log(res)
  return res;
}

export {
  getAAS,
  putAAS,
}