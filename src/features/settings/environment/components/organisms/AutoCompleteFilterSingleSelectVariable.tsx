/* eslint-disable  */
import React, { useState, useEffect, useRef } from "react"
import { Spinner } from "react-bootstrap"
import { observer } from "mobx-react"
import * as LibraryComponents from "@lp/library/components"
import { useStores } from "@lp/stores"

interface AutoCompleteProps {
  selected: any
  onUpdate: (item: any) => void
}

export const AutoCompleteFilterSingleSelectVariable = observer(
  ({selected,  onUpdate }: AutoCompleteProps) => {
    const { loading, environmentStore } = useStores()
    const [defaultData, setDefaultData] = useState(selected)
    const [data, setData] = useState<any>(selected)
    useEffect(() => {
      environmentStore.updateEnvironmentSettings({
        ...environmentStore.environmentSettings,
        variable: data?.environmentVariable,
      })
    }, [data,selected])
    return (
      <>
        <div className="flex flex-row gap-2 w-full">
         <LibraryComponents.Molecules.AutoCompleteFilterSingleSelect
           loader={loading}
           placeholder="Search by variable"
           data={{
             list: environmentStore.environmentVariableList.filter(
               (item) => item.documentType === "environmentVariable"
             ),
             displayKey: "environmentVariable",
           }}
           onFilter={(value: string) => {
             environmentStore.EnvironmentService.filter(
               {
                 input: {
                   type: "filter",
                   filter: {
                     environmentVariable: value,
                     documentType: "environmentVariable",
                   },
                   page: 0,
                   limit: 10,
                 },
               },
               "environmentVariable"
             )
           }}
           onSelect={(item) => {
             console.log({item})
            environmentStore.updatePermision({
              ...environmentStore.permission,
              allLabs: item.allLabs || false,
              allUsers: item.allUsers || false,
              allDepartment: item.allDepartment || false,
            })
             setData({
               ...data,
               item
             })
             onUpdate({variable:item}) 
             environmentStore.updateEnvVariableList(
               environmentStore.environmentVariableListCopy
             ) 
           }}           
          />
                  
        </div>
      </>
    )
  }
)
