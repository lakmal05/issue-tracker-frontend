const URL_REMOTE = process.env.REACT_APP_API_URL;
// const URL_REMOTE = "https://adress-api.webmotech.com"; //server
// const URL_REMOTE = `http://167.172.77.18:4008`; // lakmal ip
//  const URL_REMOTE = `http://127.0.0.1:4008`;  // lakmal ip
// const URL_REMOTE = "http://45.55.37.84:4002"; //server

const adminPrefix = "ADMIN";
const conf = {
  serverUrl: URL_REMOTE,
  basePath: `public`,
  redirect: `${URL_REMOTE}`,
  adminPrefix: adminPrefix,
};

export default conf;
