import React from "react"
import {useStores} from '@lp/library/stores'
interface PageHeadingLabDetailsProps{
    store: any;
}


const PageHeadingLabDetails = (props: PageHeadingLabDetailsProps) => {
  const login = props.store;
  console.log({login});
  
  return (
    <div>
      <h2 className="text-lg font-bold leading-4 text-gray-900 mt-0">
        {(login.login && login.login.lab) || ""}
      </h2>
    </div>
  )
} 
export { PageHeadingLabDetails }
