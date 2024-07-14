import { HTTPMethod } from '../../../shared/types/method';
import FetchError from './fetch-error';

async function fetchDelete(url: string): Promise<void> {
  const fetchData = {
    method: HTTPMethod.DELETE,
    headers: { 'Content-Type': 'application/json' },
  };

  const res = await fetch(url, fetchData);
  if (!res.ok) {
    const error = new FetchError(res.status, 'An error occurred while deleting the data.');

    throw error;
  }
}

export default fetchDelete;
