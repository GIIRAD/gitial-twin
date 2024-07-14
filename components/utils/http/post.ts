import { HTTPMethod } from '../../../shared/types/method';
import FetchError from './fetch-error';

async function fetchPost<J, T>(url: string, dataToPost: J): Promise<T> {
  const fetchData = {
    method: HTTPMethod.POST,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(dataToPost),
  };

  const res = await fetch(url, fetchData);

  if (!res.ok) {
    const error = new FetchError(res.status, 'An error occurred while posting the data.');
    throw error;
  }
  const obj: T = await res.json();
  return obj;
}

export default fetchPost;