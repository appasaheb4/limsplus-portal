/* eslint-disable */
import React, { useEffect } from "react"
import { observer } from "mobx-react"
import { useStores } from "@/stores"

export const NoticeBoardHoc = (Component: React.FC<any>) => {
  return observer(
    (props: any): JSX.Element => {
      const { loginStore, noticeBoardStore } = useStores()
      useEffect(() => {
        if (loginStore.login && loginStore.login.role !== "SYSADMIN") {
          noticeBoardStore.updateNoticeBoard({
            ...noticeBoardStore.noticeBoard,
            lab: loginStore.login.lab,
          })
        }
        noticeBoardStore.fetchNoticeBoards()
      }, [loginStore.login])


      return <Component {...props} />
    }
  )
}
