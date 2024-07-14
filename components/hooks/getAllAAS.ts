import fetchGet from "../utils/http/get";

const getAllAASRoute = 'http://localhost:8081/shells?encodedCursor=string&decodedCursor=string';

const getAllAAS = async (): Promise<any[]> => {
  const res = await fetchGet<any[]>(getAllAASRoute);
  return res;
}

export {
  getAllAAS,
}