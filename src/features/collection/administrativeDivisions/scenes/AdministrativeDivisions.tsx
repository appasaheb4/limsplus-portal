/* eslint-disable */
import React, { useEffect, useState } from "react"
import { observer } from "mobx-react"
import _ from "lodash"
import * as LibraryComponents from "@lp/library/components"
import { AdminstrativeDivList } from "../components/molecules"
import * as LibraryUtils from "@lp/library/utils"
import { useForm, Controller } from "react-hook-form"

import { useStores, stores } from "@lp/stores"

import { RouterFlow } from "@lp/flows"

export const AdministrativeDivisions = observer(() => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm()
  const { loginStore, administrativeDivisions } = useStores()
  const [modalConfirm, setModalConfirm] = useState<any>()
  const [hideAddSection, setHideAddSection] = useState<boolean>(true)

  useEffect(() => {
    if (stores.loginStore.login && stores.loginStore.login.role !== "SYSADMIN") {
      administrativeDivisions.updateAdministrativeDiv({
        ...administrativeDivisions.administrativeDiv,
        environment: stores.loginStore.login.environment,
      })
      setValue("environment", stores.loginStore.login.environment)
    }
  }, [stores.loginStore.login])

  const onSubmitAdministrativeDivision = () => {
    if (administrativeDivisions.administrativeDiv) {
      administrativeDivisions.administrativeDivisionsService
        .addAdministrativeDivisions({
          input: { ...administrativeDivisions.administrativeDiv },
        })
        .then((res) => {
          if (res.createAdministrativeDivision.success) {
            LibraryComponents.Atoms.Toast.success({
              message: `😊 ${res.createAdministrativeDivision.message}`,
            })
          }
        })
      // setTimeout(() => {
      //   window.location.reload()
      // }, 2000)
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
                    placeholder={
                      errors.country ? "Please Enter Country " : "Country"
                    }
                    hasError={errors.country}
                    value={administrativeDivisions.administrativeDiv?.country}
                    onChange={(country) => {
                      onChange(country)
                      administrativeDivisions.updateAdministrativeDiv({
                        ...administrativeDivisions.administrativeDiv,
                        country,
                      })
                    }}
                  />
                )}
                name="country"
                rules={{ required: true }}
                defaultValue=""
              />

              <LibraryComponents.Atoms.Form.InputWrapper label="State" hasError={errors.state}>
                <Controller
                  control={control}
                  render={({ field: { onChange } }) => (
                    <LibraryComponents.Atoms.Form.Input
                      placeholder={errors.state ? "Please Enter state" : "State"}
                      hasError={errors.state}
                      value={administrativeDivisions.administrativeDiv?.state || ""}
                      onChange={(state) => {
                        onChange(state)
                        administrativeDivisions.updateAdministrativeDiv({
                          ...administrativeDivisions.administrativeDiv,
                          state,
                        })
                      }}
                    />
                  )}
                  name="state"
                  rules={{ required: true }}
                  defaultValue=""
                />
              </LibraryComponents.Atoms.Form.InputWrapper>

              <LibraryComponents.Atoms.Form.InputWrapper label="District" hasError={errors.district}>
                <Controller
                  control={control}
                  render={({ field: { onChange } }) => (
                    <LibraryComponents.Atoms.Form.Input
                      placeholder={
                        errors.district ? "Please Enter District" : "District"
                      }
                      hasError={errors.district}
                      value={administrativeDivisions.administrativeDiv?.district || ""}
                      onChange={(district) => {
                        onChange(district)
                        administrativeDivisions.updateAdministrativeDiv({
                          ...administrativeDivisions.administrativeDiv,
                          district,
                        })
                      }}
                    />
                  )}
                  name="district"
                  rules={{ required: true }}
                  defaultValue=""
                />
              </LibraryComponents.Atoms.Form.InputWrapper>

              <LibraryComponents.Atoms.Form.InputWrapper label="City">
                <Controller
                  control={control}
                  render={({ field: { onChange } }) => (
                    <LibraryComponents.Atoms.Form.Input
                      hasError={errors.city}
                      placeholder={errors.city ? "Please Enter City" : "City"}
                      value={administrativeDivisions.administrativeDiv?.city || ""}
                      onChange={(city) => {
                        onChange(city)
                        administrativeDivisions.updateAdministrativeDiv({
                          ...administrativeDivisions.administrativeDiv,
                          city,
                        })
                      }}
                    />
                  )}
                  name="city"
                  rules={{ required: false }}
                  defaultValue=""
                />
              </LibraryComponents.Atoms.Form.InputWrapper>

              <LibraryComponents.Atoms.Form.InputWrapper label="Area">
                <Controller
                  control={control}
                  render={({ field: { onChange } }) => (
                    <LibraryComponents.Atoms.Form.Input
                      placeholder={errors.area ? "Please Enter Area" : "Area"}
                      hasError={errors.area}
                      value={administrativeDivisions.administrativeDiv?.area || ""}
                      onChange={(area) => {
                        onChange(area)
                        administrativeDivisions.updateAdministrativeDiv({
                          ...administrativeDivisions.administrativeDiv,
                          area,
                        })
                      }}
                    />
                  )}
                  name="area"
                  rules={{ required: false }}
                  defaultValue=""
                />
              </LibraryComponents.Atoms.Form.InputWrapper>
            </LibraryComponents.Atoms.List>
            <LibraryComponents.Atoms.List
              direction="col"
              space={4}
              justify="stretch"
              fill
            >
              <LibraryComponents.Atoms.Form.InputWrapper label="Postal Code">
                <div className="flex flex-row">
                  <Controller
                    control={control}
                    render={({ field: { onChange } }) => (
                      <LibraryComponents.Atoms.Form.Input
                        type="number"
                        placeholder={
                          errors.postalCode
                            ? "Please Enter PostalCode"
                            : "PostalCode"
                        }
                        hasError={errors.postalCode}
                        value={administrativeDivisions.localState?.postalCode || ""}
                        onChange={(postalCode) => {
                          onChange(postalCode)
                          administrativeDivisions.updateLocalPostalCode({
                            ...administrativeDivisions.localState,
                            postalCode,
                          })
                        }}
                      />
                    )}
                    name="postalCode"
                    rules={{ required: false }}
                    defaultValue=""
                  />
                  <div className="w-4 mt-2 ml-2">
                    <LibraryComponents.Atoms.Buttons.Button
                      size="medium"
                      type="solid"
                      onClick={() => {
                        const postalCode =
                          administrativeDivisions.localState?.postalCode
                        if (postalCode === undefined)
                          return alert("Please Enter PostalCode")
                        if (postalCode !== undefined) {
                          let arrState =
                            administrativeDivisions.administrativeDiv &&
                            administrativeDivisions.administrativeDiv.postalCode
                          administrativeDivisions.updateAdministrativeDiv({
                            ...administrativeDivisions.administrativeDiv,
                            postalCode: arrState
                              ? arrState.concat(postalCode)
                              : [postalCode],
                          })
                          administrativeDivisions.updateLocalPostalCode({
                            ...administrativeDivisions.localState,
                            postalCode: "",
                          })
                        }
                      }}
                    >
                      <LibraryComponents.Atoms.Icon.EvaIcon icon="plus-circle-outline" />
                      {`Add`}
                    </LibraryComponents.Atoms.Buttons.Button>
                  </div>  
                </div>
                <br/>
                <LibraryComponents.Atoms.List
                  space={2}
                  direction="row"
                  justify="center"
                >
                  <div>
                    {administrativeDivisions.administrativeDiv?.postalCode?.map(
                      (item, index) => (
                        <div className="mb-2" key={index}>
                          <LibraryComponents.Atoms.Buttons.Button
                            size="medium"
                            type="solid"
                            icon={LibraryComponents.Atoms.Icon.Remove}
                            onClick={() => {
                              const firstArr =
                                administrativeDivisions.administrativeDiv?.postalCode?.slice(
                                  0,
                                  index
                                ) || []
                              const secondArr =
                                administrativeDivisions.administrativeDiv?.postalCode?.slice(
                                  index + 1
                                ) || []
                              const finalArray = [...firstArr, ...secondArr]
                              administrativeDivisions.updateAdministrativeDiv({
                                ...administrativeDivisions.administrativeDiv,
                                postalCode: finalArray,
                              })
                            }}
                          >
                            {item}
                          </LibraryComponents.Atoms.Buttons.Button>
                        </div>
                      )
                    )}
                  </div>
                </LibraryComponents.Atoms.List>
              </LibraryComponents.Atoms.Form.InputWrapper>

              <Controller
                control={control}
                render={({ field: { onChange } }) => (
                  <LibraryComponents.Atoms.Form.InputWrapper
                    label="SBU"
                    hasError={errors.sbu}
                  >
                    <select
                      className={`leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border-2 ${
                        errors.sbu ? "border-red-500  " : "border-gray-300"
                      } rounded-md`}
                      onChange={(e) => {
                        const sbu = e.target.value
                        onChange(sbu)
                        administrativeDivisions.updateAdministrativeDiv({
                          ...administrativeDivisions.administrativeDiv,
                          sbu,
                        })
                      }}
                    >
                      <option selected>Select</option>
                      {LibraryUtils.lookupItems(
                        stores.routerStore.lookupItems,
                        "SBU"
                      ).map((item: any, index: number) => (
                        <option key={index} value={item.code}>
                          {`${item.value} - ${item.code}`}
                        </option>
                      ))}
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
                  <LibraryComponents.Atoms.Form.InputWrapper
                    label="ZONE"
                    hasError={errors.zone}
                  >
                    <select
                      className={`leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border-2 ${
                        errors.zone ? "border-red-500  " : "border-gray-300"
                      } rounded-md`}
                      onChange={(e) => {
                        const zone = e.target.value
                        onChange(zone)
                        administrativeDivisions.updateAdministrativeDiv({
                          ...administrativeDivisions.administrativeDiv,
                          zone,
                        })
                      }}
                    >
                      <option selected>Select</option>
                      {LibraryUtils.lookupItems(
                        stores.routerStore.lookupItems,
                        "ZONE"
                      ).map((item: any, index: number) => (
                        <option key={index} value={item.code}>
                          {`${item.value} - ${item.code}`}
                        </option>
                      ))}
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
                  <LibraryComponents.Atoms.Form.InputWrapper label="Environment" hasError={errors.environment}>
                    <select
                      value={administrativeDivisions.administrativeDiv?.environment}
                      disabled={
                        stores.loginStore.login &&
                        stores.loginStore.login.role !== "SYSADMIN"
                          ? true
                          : false
                      }
                      className={`leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border-2 ${
                        errors.environment ? "border-red-500  " : "border-gray-300"
                      } rounded-md`}
                      onChange={(e) => {
                        const environment = e.target.value
                        onChange(environment)
                        administrativeDivisions.updateAdministrativeDiv({
                          ...administrativeDivisions.administrativeDiv,
                          environment,
                        })
                      }}
                    >
                      <option selected>
                        {stores.loginStore.login &&
                        stores.loginStore.login.role !== "SYSADMIN"
                          ? `Select`
                          : administrativeDivisions.administrativeDiv?.environment ||
                            `Select`}
                      </option>
                      {LibraryUtils.lookupItems(
                        stores.routerStore.lookupItems,
                        "ENVIRONMENT"
                      ).map((item: any, index: number) => (
                        <option key={index} value={item.code}>
                          {`${item.value} - ${item.code}`}
                        </option>
                      ))}
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
              onClick={handleSubmit(onSubmitAdministrativeDivision)}
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
        <div className="p-2 rounded-lg shadow-xl overflow-auto">
          <AdminstrativeDivList
            data={administrativeDivisions.listAdministrativeDiv || []}
            totalSize={administrativeDivisions.listAdministrativeDivCount}
            extraData={{
              lookupItems: stores.routerStore.lookupItems,
              updateAdministrativeDiv:
                administrativeDivisions.updateAdministrativeDiv,
              administrativeDiv: administrativeDivisions.administrativeDiv,
              updateLocalState: administrativeDivisions.updateLocalState,
              localState: administrativeDivisions.localState,
              updateLocalDistrict: administrativeDivisions.updateLocalDistrict,
              updateLocalCity: administrativeDivisions.updateLocalCity,
              updateLocalArea: administrativeDivisions.updateLocalArea,
              updateLocalPostalCode: administrativeDivisions.updateLocalPostalCode,
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
            onPageSizeChange={(page, limit) => {
              administrativeDivisions.fetchAdministrativeDiv(page, limit)
            }}
          />
        </div>
        <LibraryComponents.Molecules.ModalConfirm
          {...modalConfirm}
          click={(type?: string) => {
            if (type === "Delete") {
              administrativeDivisions.administrativeDivisionsService
                .deleteAdministrativeDivisions({ input: { id: modalConfirm.id } })
                .then((res: any) => {
                  if (res.removeAdministrativeDivision.success) {
                    LibraryComponents.Atoms.Toast.success({
                      message: `😊 ${res.removeAdministrativeDivision.message}`,
                    })
                    setModalConfirm({ show: false })
                    administrativeDivisions.fetchAdministrativeDiv()
                  }
                })
            } else if (type === "Update") {
              administrativeDivisions.administrativeDivisionsService
                .updateSingleFiled({
                  input: {
                    _id: modalConfirm.data.id,
                    [modalConfirm.data.dataField]: modalConfirm.data.value,
                  },
                })
                .then((res: any) => {
                  if (res.updateAdministrativeDivision.success) {
                    LibraryComponents.Atoms.Toast.success({
                      message: `😊 ${res.updateAdministrativeDivision.message}`,
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
