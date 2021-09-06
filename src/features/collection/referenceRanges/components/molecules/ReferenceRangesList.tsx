/* eslint-disable */
import React, { useEffect, useState } from "react"
import { observer } from "mobx-react"
import * as Config from "@lp/config"

import Storage from "@lp/library/modules/storage"

import { Stores as LabStores } from "@lp/features/collection/labs/stores"
import { Stores as LookupStore } from "@lp/features/collection/lookup/stores"
import * as LibraryUtils from "@lp/library/utils"
import * as LibraryComponents from "@lp/library/components"
import * as LibraryModels from "@lp/library/models"
import { stores } from "@lp/library/stores"
interface ReferenceRangesProps {
    data: any
    isDelete?: boolean
    isEditModify?: boolean
    onDelete?: (selectedItem: LibraryModels.Confirm) => void
    onSelectedRow?: (selectedItem: any) => void
    onUpdateItem?: (value: any, dataField: string, id: string) => void
    onVersionUpgrade?: (item: any) => void
    onDuplicate?: (item: any) => void
}

const ReferenceRangesList = observer((props:ReferenceRangesProps)=>{
    const editorCell = (row: any) => {
        return row.status !== "I" ? true : false
      }
      return(
        <>
            
        </>
      )
})
export default ReferenceRangesList