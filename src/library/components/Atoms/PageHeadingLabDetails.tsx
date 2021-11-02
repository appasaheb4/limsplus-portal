import React from "react"


interface PageHeadingLabDetailsProps {
  store: any
}

const PageHeadingLabDetails = (props: PageHeadingLabDetailsProps) => {
  const loginStore = props.store
  return (
    <div className="flex flex-row items-center">
      <img
        src={loginStore.login && loginStore.login.labLogo}
        alt="banner"
        className="object-fill h-10 w-12 rounded-md mr-2"
      />  
      <h2 className="text-base  leading-4 text-gray-900 mt-0">
        {(loginStore.login && loginStore.login.labList && 
          loginStore.login.labList.find(
            (item) => item.code === loginStore.login.lab
          ).name) ||  
          ""}
      </h2>
    </div>
  )
}
export { PageHeadingLabDetails }
