import Axios from "axios";

import * as Config from "@lp/config";

export default function createLimsPlusClient(token?: string) {
  return Axios.create({
    baseURL: Config.Api.LIMSPLUS_API_HOST,
    // headers: {
    //   'x-LimsPlus-Key':
    //     token ||
    //     'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJpZCI6ImFkbWluaXN0cmF0b3IiLCJlbWFpbCI6ImRldkBtZW1ldG9vbnMubWUiLCJuYW1lIjp7ImZpcnN0IjoiUHJlbSIsImxhc3QiOiJLdWNoaSJ9LCJ1c2VyVHlwZSI6ImFkbWluaXN0cmF0b3IiLCJhZG1pbiI6dHJ1ZX0.krWTTlc0ykgoKaO0WXXNket5Kz-mLbpQ96rzdnfc7Ya7nb8vZgF_RpoozYTmVNMbgUoowIHfQw5qG4yukAmuoA',
    // },
  });
}
