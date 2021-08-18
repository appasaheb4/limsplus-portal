/* eslint-disable */
import React, { useEffect, useState } from "react"
import { observer } from "mobx-react"
import { useForm, Controller } from "react-hook-form"

import { useStores } from "@lp/library/stores"

interface GeneralFieldProps {
  onModalConfirm?: (item: any) => void
}

export const GeneralField = observer((props: GeneralFieldProps) => {
  const { loginStore } = useStores()
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm()

  return <></>
})
