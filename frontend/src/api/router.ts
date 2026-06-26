import userEndpoints from "./user";
import taxServiceEndpoints from "./taxService";
import officerEndpoints from "./officer";
import taxSubmissions from "./tax-submission";


const apiRouter = {
  users: userEndpoints,
  taxServices: taxServiceEndpoints,
  officers: officerEndpoints,
  taxSubmissions,
};

export default apiRouter;