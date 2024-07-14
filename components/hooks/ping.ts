import fetchGet from "../utils/http/get";


const postPingRoute = 'http://localhost:8081/shells?encodedCursor=string&decodedCursor=string';

const getPing = async (): Promise<boolean> => {
  try {
    const res = await fetchGet(postPingRoute);
    return !!res; // Wenn res vorhanden ist, wird true zurückgegeben, sonst false
  } catch (error) {
    console.error('Fehler beim Abrufen der Ping-Route:', error);
    return false; // Bei einem Fehler wird false zurückgegeben
  }
};


export {
  getPing
};
