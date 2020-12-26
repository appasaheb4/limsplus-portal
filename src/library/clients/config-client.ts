import Axios from "axios";

import * as Config from "@lp/config";

export default function createLimsPlusClient() {
  return Axios.create({
    baseURL: Config.Api.LIMSPLUS_API_HOST,
  });
}
