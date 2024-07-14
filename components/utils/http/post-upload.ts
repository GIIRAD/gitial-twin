import { HTTPMethod } from '../../../shared/types/method';
import FetchError from './fetch-error';

async function fetchPostUpload<T>(
  url: string,
  dataToPost: FormData,
): Promise<T | null> {
  const fetchData = {
    method: HTTPMethod.POST,
    //headers: { 'Content-Type': 'multipart/form-data' },
    body: dataToPost,
  };

  const res = await fetch(url, fetchData);

  if (!res.ok) {
    const error = new FetchError(res.status, 'An error occurred while posting the data.');
    throw error;
  }

  const text = await res.text();
  if (!text) {
    return null;
  }

  return JSON.parse(text) as T;
}

export default fetchPostUpload;
