/* eslint-disable */
import React, { useEffect, useState } from "react"
import { observer } from "mobx-react"
import _ from "lodash"
import * as LibraryComponents from "@lp/library/components"
import { AdminstrativeDivList } from "../components/molecules"
import * as LibraryUtils from "@lp/library/utils"
import { useForm, Controller } from "react-hook-form"  
import * as Models from "../models"
import * as Utils from "../util"
import Storage from "@lp/library/modules/storage"
import {useStores} from '@lp/library/stores'
import { Stores } from "../stores"
import { stores } from "@lp/library/stores"
import { Stores as LookupStore } from "@lp/features/collection/lookup/stores"

import { RouterFlow } from "@lp/flows"

export const AdministrativeDivisions = observer(() => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm()
  const {
		loginStore,
	} = useStores();
  // const [errors, setErrors] = useState<Models.AdministrativeDivisions>()
  const [errorsMsg, setErrorsMsg] = useState<any>()
  const [modalConfirm, setModalConfirm] = useState<any>()
  const [hideAddSection, setHideAddSection] = useState<boolean>(true)
  const [lookupItems, setLookupItems] = useState<any[]>([])

  const getLookupValues = async () => {
    const listLookup = LookupStore.lookupStore.listLookup
    if (listLookup.length > 0) {
      const selectedCategory: any = await Storage.getItem(
        `__persist_mobx_stores_routerStore_SelectedCategory__`
      )
      const items = listLookup.filter((item: any) => {
        if (
          item.documentName.name === selectedCategory.category &&
          item.documentName.children.name === selectedCategory.item
        )
          return item
      })
      if (items) {
        setLookupItems(items)
      }
    }
  }

  useEffect(() => {
    getLookupValues()
  }, [LookupStore.lookupStore.listLookup])

  return (
    <>
      <LibraryComponents.Atoms.Header>
        <LibraryComponents.Atoms.PageHeading
          title={stores.routerStore.selectedComponents?.title || ""}
        />
        <LibraryComponents.Atoms.PageHeadingLabDetails store={loginStore} />
      </LibraryComponents.Atoms.Header>
      {RouterFlow.checkPermission(stores.routerStore.userPermission, "Add") && (
        <LibraryComponents.Atoms.Buttons.ButtonCircleAddRemove
          show={hideAddSection}
          onClick={() => setHideAddSection(!hideAddSection)}
        />
      )}
      <div className=" mx-auto flex-wrap">
        <div
          className={
            "p-2 rounded-lg shadow-xl " + (hideAddSection ? "shown" : "shown")
          }
        >
          <LibraryComponents.Atoms.Grid cols={2}>
            <LibraryComponents.Atoms.List
              direction="col"
              space={4}
              justify="stretch"
              fill
            >
              <Controller
                  control={control}
                  render={({ field: { onChange } }) => (
              <LibraryComponents.Atoms.Form.Input
                label="Country"
                placeholder={errors.country ? "Please Enter Country " : "Country"}
                hasError={errors.country}
                value={Stores.administrativeDivStore.administrativeDiv?.country}
                onChange={(country) => {
                  onChange(country)
                  Stores.administrativeDivStore.updateAdministrativeDiv({
                    ...Stores.administrativeDivStore.administrativeDiv,
                    country,
                  })
                }}
              />
              )}
              name="country"
              rules={{ required: true }}
              defaultValue=""
            />


                <Controller
                  control={control}
                  render={({ field: { onChange } }) => (
              <LibraryComponents.Atoms.Form.Input
                label="State"
                placeholder={errors.state ? "Please Enter state" : "State"}
                hasError={errors.state}
                value={Stores.administrativeDivStore.administrativeDiv?.state}
                onChange={(state) => {
                  onChange(state)
                  Stores.administrativeDivStore.updateAdministrativeDiv({
                    ...Stores.administrativeDivStore.administrativeDiv,
                    state:[state],
                  })
                }}
              />
              )}
              name="state"
              rules={{ required: true }}
              defaultValue=""
            />


                <Controller
                  control={control}
                  render={({ field: { onChange } }) => (
              <LibraryComponents.Atoms.Form.Input
                label="District"
                placeholder={errors.district ? "Please Enter District" : "District"}
                hasError={errors.district}
                value={Stores.administrativeDivStore.administrativeDiv?.district}
                onChange={(district) => {
                  onChange(district)
                  Stores.administrativeDivStore.updateAdministrativeDiv({
                    ...Stores.administrativeDivStore.administrativeDiv,
                    district:[district],
                  })
                }}
              />
              )}
              name="district"
              rules={{ required: true }}
              defaultValue=""
            />
              <LibraryComponents.Atoms.Form.Input
                label="City"
                placeholder="City"
                value={Stores.administrativeDivStore.administrativeDiv?.city}
                onChange={(city) => {
                  Stores.administrativeDivStore.updateAdministrativeDiv({
                    ...Stores.administrativeDivStore.administrativeDiv,
                    city:[city],
                  })
                }}
              />
              <LibraryComponents.Atoms.Form.Input
                label="Area"
                placeholder="Area"
                value={Stores.administrativeDivStore.administrativeDiv?.area}
                onChange={(area) => {
                  Stores.administrativeDivStore.updateAdministrativeDiv({
                    ...Stores.administrativeDivStore.administrativeDiv,
                    area:[area],
                  })
                }}
              />
            </LibraryComponents.Atoms.List>
            <LibraryComponents.Atoms.List
              direction="col"
              space={4}
              justify="stretch"
              fill
            >
              <LibraryComponents.Atoms.Form.Input
                type="number"
                label="Postcode"
                placeholder="Postcode"
                value={Stores.administrativeDivStore.administrativeDiv?.postalCode}
                onChange={(postalCode) => {
                  Stores.administrativeDivStore.updateAdministrativeDiv({
                    ...Stores.administrativeDivStore.administrativeDiv,
                    postalCode:[postalCode],
                  })
                }}
              />
              <LibraryComponents.Atoms.Form.InputWrapper label="SBU">
                <select
                  className="leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border border-gray-300 rounded-md"
                  onChange={(e) => {
                    const sbu = e.target.value
                    Stores.administrativeDivStore.updateAdministrativeDiv({
                      ...Stores.administrativeDivStore.administrativeDiv,
                      sbu,
                    })
                  }}
                >
                  <option selected>Select</option>
                  {LibraryUtils.lookupItems(lookupItems, "SBU").map(
                    (item: any, index: number) => (
                      <option key={index} value={item.code}>
                        {`${item.value} - ${item.code}`}
                      </option>
                    )
                  )}
                </select>
              </LibraryComponents.Atoms.Form.InputWrapper>
              <LibraryComponents.Atoms.Form.InputWrapper label="ZONE">
                <select
                  className="leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border border-gray-300 rounded-md"
                  onChange={(e) => {
                    const zone = e.target.value
                    Stores.administrativeDivStore.updateAdministrativeDiv({
                      ...Stores.administrativeDivStore.administrativeDiv,
                      zone,
                    })
                  }}
                >
                  <option selected>Select</option>
                  {LibraryUtils.lookupItems(lookupItems, "ZONE").map(
                    (item: any, index: number) => (
                      <option key={index} value={item.code}>
                        {`${item.value} - ${item.code}`}
                      </option>
                    )
                  )}
                </select>
              </LibraryComponents.Atoms.Form.InputWrapper>
            </LibraryComponents.Atoms.List>
          </LibraryComponents.Atoms.Grid>
          <br />
          <LibraryComponents.Atoms.List direction="row" space={3} align="center">
            <LibraryComponents.Atoms.Buttons.Button
              size="medium"
              type="solid"
              icon={LibraryComponents.Atoms.Icon.Save}
              onClick={() => {
                const error = Utils.validate(
                  Stores.administrativeDivStore.administrativeDiv,
                  Utils.administrativeDiv
                )
                setErrorsMsg(error)
                if (error === undefined) {
                  
                  Stores.administrativeDivStore.administrativeDivisionsService
                    .addAdministrativeDivisions(
                      Stores.administrativeDivStore.administrativeDiv
                    )
                    .then((res) => {
                      
                      if (res.status === 200) {
                        LibraryComponents.Atoms.Toast.success({
                          message: `😊 Administrative divisions created.`,
                        })
                      }
                    })
                  setTimeout(() => {
                    window.location.reload()
                  }, 2000)
                } else {
                  LibraryComponents.Atoms.Toast.warning({
                    message: `😔 Please enter all information!`,
                  })
                }
              }}
            >
              Save
            </LibraryComponents.Atoms.Buttons.Button>
            <LibraryComponents.Atoms.Buttons.Button
              size="medium"
              type="outline"
              icon={LibraryComponents.Atoms.Icon.Remove}
              onClick={() => {
                window.location.reload()
              }}
            >
              Clear
            </LibraryComponents.Atoms.Buttons.Button>
          </LibraryComponents.Atoms.List>
          <div>
            {errorsMsg &&
              Object.entries(errorsMsg).map((item, index) => (
                <h6 className="text-red-700" key={index}>
                  {_.upperFirst(item.join(" : "))}
                </h6>
              ))}
          </div>
        </div>
        <br />
        <div className="p-2 rounded-lg shadow-xl">
          <AdminstrativeDivList
            data={Stores.administrativeDivStore.listAdministrativeDiv || []}
            isDelete={RouterFlow.checkPermission(
              stores.routerStore.userPermission,
              "Delete"
            )}
            isEditModify={RouterFlow.checkPermission(
              stores.routerStore.userPermission,
              "Edit/Modify"
            )}
            // isEditModify={false}
            onDelete={(selectedItem) => setModalConfirm(selectedItem)}
            onSelectedRow={(rows) => {
              setModalConfirm({
                show: true,
                type: "Delete",
                id: rows,
                title: "Are you sure?",
                body: `Delete selected items!`,
              })
            }}
            onUpdateItem={(value: any, dataField: string, id: string) => {
              setModalConfirm({
                show: true,
                type: "Update",
                data: { value, dataField, id },
                title: "Are you sure?",
                body: `Update Section!`,
              })
            }}
          />
        </div>
        <LibraryComponents.Molecules.ModalConfirm
          {...modalConfirm}
          click={(type?: string) => {
            if (type === "Delete") {
              
              Stores.administrativeDivStore.administrativeDivisionsService
                .deleteAdministrativeDivisions(modalConfirm.id)
                .then((res: any) => {
                  
                  if (res.status === 200) {
                    LibraryComponents.Atoms.Toast.success({
                      message: `😊 Administrative divisions record deleted.`,
                    })
                    setModalConfirm({ show: false })
                    Stores.administrativeDivStore.fetchAdministrativeDiv()
                  }
                })
            } else if (type === "Update") {
              
              Stores.administrativeDivStore.administrativeDivisionsService
                .updateSingleFiled(modalConfirm.data)
                .then((res: any) => {
                  
                  if (res.status === 200) {
                    LibraryComponents.Atoms.Toast.success({
                      message: `😊 Administrative divisions record updated.`,
                    })
                    setModalConfirm({ show: false })
                    setTimeout(() => {
                      window.location.reload()
                    }, 2000)
                  }
                })
            }
          }}
          onClose={() => setModalConfirm({ show: false })}
        />
      </div>
    </>
  )
})
export default AdministrativeDivisions
