import Axios from "axios";

import * as Config from "@lp/config";

export default function createLimsPlusClient(token?: string) {
  return Axios.create({
    baseURL: Config.Api.LIMSPLUS_API_HOST,
    headers: {
      "x-limsplus-Key":
        token ||
        "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzM4NCJ9.eyJsYWIiOiJEUiBMQUwgUEFUSExBQlMgLSBERUxISSIsInVzZXJJZCI6IjEyMzQ1NiJ9.OqExKrvy2AdzunV942z7U23shX7A0AJZrrIhi2qmq3rUFk9bXCrTRGdoa2k1k2iT",
    },
  });
}
