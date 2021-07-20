/**
 * @fileoverview Use this file invoke LimsPlus API
 * implementation related to LimsPlus standards
 * @package Feed Service
 * @author limsplus
 */
//import * as Models from "../models"
import { http } from "@lp/library/modules/http"
   
class ShortcutMenuService  {
  updateShortcutMenu = (shortcutMenu: any) =>
    new Promise<any>((resolve, reject) => {
      //console.log({shortcutMenu});
      http
        .post(`/auth/updateShortcutMenu`, shortcutMenu)
        .then((res) => {
          resolve(res)
        })
        .catch((error) => {
          reject({ error })
        })
    })
}

export default ShortcutMenuService
