/* eslint-disable */
import React, { useEffect, useState } from "react"
import { observer } from "mobx-react"
import _ from "lodash"
import * as LibraryComponents from "@lp/library/components"
import * as LibraryUtils from "@lp/library/utils"
// import * as FeatureComponents from "../components"

import {useStores} from '@lp/library/stores'
import { Stores } from "../stores"
import { useForm, Controller } from "react-hook-form"
import { Stores as LabStores } from "@lp/features/collection/labs/stores"
import { stores } from "@lp/library/stores"
// import { Stores as CoporateClients} from "@lp/features/collection/corporateClients/stores"
import { Stores as LoginStore } from "@lp/features/login/stores"
import { RouterFlow } from "@lp/flows"
import { toJS } from "mobx"
const ReferenceRanges = observer(() => {
    const {
        control,
        handleSubmit,
        formState: { errors },
        setValue,
        // clearErrors,
      } = useForm()
      const {
            loginStore,
        } = useStores();
      const [modalConfirm, setModalConfirm] = useState<any>()
      const [hideAddLab, setHideAddLab] = useState<boolean>(true)
      useEffect(() => {
        if (stores.loginStore.login && stores.loginStore.login.role !== "SYSADMIN") {
          Stores.referenceRangesStore.updateReferenceRanges({
            ...Stores.referenceRangesStore.referenceRanges,
            lab: stores.loginStore.login.lab,
            environment: stores.loginStore.login.environment,
          })
          setValue("lab", stores.loginStore.login.lab)
          setValue("environment", stores.loginStore.login.environment)
        }
      }, [stores.loginStore.login])
      const onSubmitReferenceRanges = () =>{
        //api Callling
      }
      return(
        <>
        <LibraryComponents.Atoms.Header>
            <LibraryComponents.Atoms.PageHeading
                 title={stores.routerStore.selectedComponents?.title || ""}
            />
            <LibraryComponents.Atoms.PageHeadingLabDetails store={loginStore} />
      </LibraryComponents.Atoms.Header>

        </>
      )
})
export default ReferenceRanges 