import fetchPost from "../utils/http/post";

const postAASRoute = 'http://localhost:8081/submodels';

const postAAS = async (data: any): Promise<any> => {
  const res = await fetchPost(postAASRoute, data);
  return res;
}

export {
  postAAS,
}