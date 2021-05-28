/**
 * @fileoverview Use this file invoke LimsPlus API
 * implementation related to LimsPlus standards
 * @package Feed Service
 * @author limsplus
 */
//import * as Models from "../models"
import BaseService from "@lp/library/modules/base-service"
   
class ShortcutMenuService extends BaseService {
  updateShortcutMenu = (shortcutMenu: any) =>
    new Promise<any>((resolve, reject) => {
      //console.log({shortcutMenu});
      this.client
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
