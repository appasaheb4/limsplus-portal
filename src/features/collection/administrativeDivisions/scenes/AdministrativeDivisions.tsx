/* eslint-disable */
import React, { useEffect, useState } from "react"
import { observer } from "mobx-react"
import _ from "lodash"
import * as LibraryComponents from "@lp/library/components"
import { AdminstrativeDivList } from "../components/molecules"
import * as LibraryUtils from "@lp/library/utils"
import { useForm, Controller } from "react-hook-form"  

import {useStores} from '@lp/library/stores'
import { Stores } from "../stores"
import { stores } from "@lp/library/stores"

import { RouterFlow } from "@lp/flows"

export const AdministrativeDivisions = observer(() => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue
  } = useForm()
  const {
		loginStore,
	} = useStores();
  const [modalConfirm, setModalConfirm] = useState<any>()
  const [hideAddSection, setHideAddSection] = useState<boolean>(true)
  
  useEffect(() => {
    if (stores.loginStore.login && stores.loginStore.login.role !== "SYSADMIN") {
      Stores.administrativeDivStore.updateAdministrativeDiv({
        ...Stores.administrativeDivStore.administrativeDiv,
        environment: stores.loginStore.login.environment,
      })
      setValue("environment", stores.loginStore.login.environment)
    }
  }, [stores.loginStore.login])

  const onSubmitAdministrativeDivision = () =>{ 
    if (Stores.administrativeDivStore.administrativeDiv) {
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

  }

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

          <Controller
            control={control}
               render={({ field: { onChange } }) => (
              <LibraryComponents.Atoms.Form.Input
                label="City"
                hasError={errors.city}
                placeholder={errors.city ? "Please Enter City" : "City"}
                value={Stores.administrativeDivStore.administrativeDiv?.city}
                onChange={(city) => {
                  onChange(city)
                  Stores.administrativeDivStore.updateAdministrativeDiv({
                    ...Stores.administrativeDivStore.administrativeDiv,
                    city:[city],
                  })
                }}
              />
              )}
              name="city"
              rules={{ required: false }}
              defaultValue=""
             />


           <Controller
               control={control}
                 render={({ field: { onChange } }) => (
              <LibraryComponents.Atoms.Form.Input
                label="Area"
                placeholder={errors.area ? "Please Enter Area" : "Area"}
                hasError={errors.area}
                value={Stores.administrativeDivStore.administrativeDiv?.area}
                onChange={(area) => {
                  onChange(area)
                  Stores.administrativeDivStore.updateAdministrativeDiv({
                    ...Stores.administrativeDivStore.administrativeDiv,
                    area:[area],
                  })
                }}
              />
              )}
              name="area"
               rules={{ required: false }}
               defaultValue=""
           />
            </LibraryComponents.Atoms.List>
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
                type="number"
                label="Postcode"
                placeholder={errors.postalCode ? "Please Enter PostalCode" : "PostalCode"}
                hasError={errors.postalCode}
                value={Stores.administrativeDivStore.administrativeDiv?.postalCode}
                onChange={(postalCode) => {
                  onChange(postalCode)
                  Stores.administrativeDivStore.updateAdministrativeDiv({
                    ...Stores.administrativeDivStore.administrativeDiv,
                    postalCode:[postalCode],
                  })
                }}
              />
              )}
             name="postalCode"
             rules={{ required: false }}
             defaultValue=""
             />

            <Controller
              control={control}
              render={({ field: { onChange } }) => (
              <LibraryComponents.Atoms.Form.InputWrapper label="SBU" hasError={errors.sbu}>
                <select
                  className={`leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border-2 ${
                    errors.sbu
                      ? "border-red-500  focus:border-red-500"
                      : "border-gray-300"
                  } rounded-md`}
                  onChange={(e) => {
                    const sbu = e.target.value
                    onChange(sbu)
                    Stores.administrativeDivStore.updateAdministrativeDiv({
                      ...Stores.administrativeDivStore.administrativeDiv,
                      sbu,
                    })
                  }}
                >
                  <option selected>Select</option>
                  {LibraryUtils.lookupItems(stores.routerStore.lookupItems, "SBU").map(
                    (item: any, index: number) => (
                      <option key={index} value={item.code}>
                        {`${item.value} - ${item.code}`}
                      </option>
                    )
                  )}
                </select>
              </LibraryComponents.Atoms.Form.InputWrapper>
              )}
              name="sbu"
              rules={{ required: false }}
              defaultValue=""
             />

            <Controller
               control={control}
                 render={({ field: { onChange } }) => (
              <LibraryComponents.Atoms.Form.InputWrapper label="ZONE" hasError={errors.zone}>
                <select
                  className={`leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border-2 ${
                    errors.zone
                      ? "border-red-500  focus:border-red-500"
                      : "border-gray-300"
                  } rounded-md`}
                  onChange={(e) => {
                    const zone = e.target.value
                    onChange(zone)
                    Stores.administrativeDivStore.updateAdministrativeDiv({
                      ...Stores.administrativeDivStore.administrativeDiv,
                      zone,
                    })
                  }}
                >
                  <option selected>Select</option>
                  {LibraryUtils.lookupItems(stores.routerStore.lookupItems, "ZONE").map(
                    (item: any, index: number) => (
                      <option key={index} value={item.code}>
                        {`${item.value} - ${item.code}`}
                      </option>
                    )
                  )}
                </select>
              </LibraryComponents.Atoms.Form.InputWrapper>
              )}
              name="zone"
              rules={{ required: false }}
              defaultValue=""
             />
              <Controller
            control={control}
            render={({ field: { onChange } }) => (
              <LibraryComponents.Atoms.Form.InputWrapper label="Environment">
                <select
                  value={Stores.administrativeDivStore.administrativeDiv?.environment}
                  disabled={
                    stores.loginStore.login &&
                    stores.loginStore.login.role !== "SYSADMIN"
                      ? true
                      : false
                  }
                  className={`leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border-2 ${
                    errors.environment
                      ? "border-red-500  focus:border-red-500"
                      : "border-gray-300"
                  } rounded-md`}
                  onChange={(e) => {
                    const environment = e.target.value
                    onChange(environment)
                    Stores.administrativeDivStore.updateAdministrativeDiv({
                      ...Stores.administrativeDivStore.administrativeDiv,
                      environment,
                    })
                  }}
                >
                  <option selected>
                        {stores.loginStore.login &&
                        stores.loginStore.login.role !== "SYSADMIN"
                          ? `Select`
                          : Stores.administrativeDivStore.administrativeDiv?.environment || `Select`}
                      </option>
                  {LibraryUtils.lookupItems(stores.routerStore.lookupItems, "ENVIRONMENT").map(
                    (item: any, index: number) => (
                      <option key={index} value={item.code}>
                        {`${item.value} - ${item.code}`}
                      </option>
                    )
                  )}
                </select>
              </LibraryComponents.Atoms.Form.InputWrapper>
            )}
            name="environment"
            rules={{ required: true }}
            defaultValue=""
          />
            </LibraryComponents.Atoms.List>
          </LibraryComponents.Atoms.Grid>
          <br />
          <LibraryComponents.Atoms.List direction="row" space={3} align="center">
            <LibraryComponents.Atoms.Buttons.Button
              size="medium"
              type="solid"
              icon={LibraryComponents.Atoms.Icon.Save}
              onClick={ handleSubmit(onSubmitAdministrativeDivision)}
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
          
        </div>
        <br />
        <div className="p-2 rounded-lg shadow-xl">
          <AdminstrativeDivList
            data={Stores.administrativeDivStore.listAdministrativeDiv || []}
            totalSize={Stores.administrativeDivStore.listAdministrativeDivCount}
            extraData={{
              lookupItems: stores.routerStore.lookupItems
            }}
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
            onPageSizeChange={(page,limit)=>{
              Stores.administrativeDivStore.fetchAdministrativeDiv(page,limit)
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
