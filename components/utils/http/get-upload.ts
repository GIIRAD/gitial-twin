import { HTTPMethod } from '../../../shared/types/method';
import FetchError from './fetch-error';

async function fetchGetUpload<T>(
  url: string,
): Promise<T> {
  const fetchData = {
    method: HTTPMethod.GET,
    //headers: { 'Content-Type': 'multipart/form-data' },
  };

  const res = await fetch(url, fetchData);

  if (!res.ok) {
    const error = new FetchError(res.status, 'An error occurred while posting the data.');
    throw error;
  }

  const text = await res.text();

  return JSON.parse(text) as T;
}

export default fetchGetUpload;
