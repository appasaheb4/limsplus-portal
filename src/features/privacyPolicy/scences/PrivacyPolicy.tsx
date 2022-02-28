import React, { useEffect, useState } from "react"
import { observer } from "mobx-react"
import { Toast } from "@/library/components"
import _ from "lodash"
import { useStores } from "@/stores"
import Parser from 'html-react-parser';

const PrivacyPolicy = observer(() => {
  const [content, setContent] = useState<any>()
  const { libraryStore } = useStores()
  useEffect(() => {
    libraryStore.libraryService
      .librarysByCode({ input: { code: "privacy-policy" } })
      .then((res) => {
        if (!res.librarysByCode.success)
          Toast.error({
            message: `😔 ${res.librarysByCode.message}`,
          })
          console.log({content: _.first(res.librarysByCode.data).details});
          
        setContent(_.first(res.librarysByCode.data).details)
      })
  })
  return <div>{ content && Parser(content) }</div>
})

export default PrivacyPolicy
