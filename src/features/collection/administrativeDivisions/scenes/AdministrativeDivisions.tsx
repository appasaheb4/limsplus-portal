/* eslint-disable */
import React, { useEffect, useState } from "react"
import { observer } from "mobx-react"
import _ from "lodash"
import * as LibraryComponents from "@lp/library/components"
import { AdminstrativeDivList } from "../components/molecules"
import * as LibraryUtils from "@lp/library/utils"
import { useForm, Controller } from "react-hook-form"

import { useStores } from "@lp/stores"
import { Stores } from "../stores"
import { stores } from "@lp/stores"

import { RouterFlow } from "@lp/flows"

export const AdministrativeDivisions = observer(() => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm()
  const { loginStore } = useStores()
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

  const onSubmitAdministrativeDivision = () => {
    if (Stores.administrativeDivStore.administrativeDiv) {
      Stores.administrativeDivStore.administrativeDivisionsService
        .addAdministrativeDivisions({
          input: { ...Stores.administrativeDivStore.administrativeDiv },
        })
        .then((res) => {
          if (res.createAdministrativeDivision.success) {
            LibraryComponents.Atoms.Toast.success({
              message: `😊 ${res.createAdministrativeDivision.message}`,
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
                    placeholder={
                      errors.country ? "Please Enter Country " : "Country"
                    }
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

              <LibraryComponents.Atoms.Form.InputWrapper label="State">
                <LibraryComponents.Atoms.Grid cols={2}>
                  <Controller
                    control={control}
                    render={({ field: { onChange } }) => (
                      <LibraryComponents.Atoms.Form.Input
                        // label="State"
                        placeholder={errors.state ? "Please Enter state" : "State"}
                        hasError={errors.state}
                        value={Stores.administrativeDivStore.localState?.state || ""}
                        onChange={(state) => {
                          onChange(state)
                          Stores.administrativeDivStore.updateLocalState({
                            ...Stores.administrativeDivStore.localState,
                            state,
                          })
                        }}
                      />
                    )}
                    name="state"
                    rules={{ required: true }}
                    defaultValue=""
                  />
                  <div className="mt-2">
                    <LibraryComponents.Atoms.Buttons.Button
                      size="medium"
                      type="solid"
                      onClick={() => {
                        const state = Stores.administrativeDivStore.localState?.state
                        if (state === undefined) return alert("Please Enter State")
                        if (state !== undefined) {
                          let arrState = Stores.administrativeDivStore.administrativeDiv
                           && Stores.administrativeDivStore.administrativeDiv.state;
                           Stores.administrativeDivStore.updateAdministrativeDiv({
                             ...Stores.administrativeDivStore.administrativeDiv,
                             state: arrState? arrState.concat(state): [state] 
                           })
                           Stores.administrativeDivStore.updateLocalState({
                            ...Stores.administrativeDivStore.localState,
                            state:''
                          })
                        }
                      }}
                    >
                      <LibraryComponents.Atoms.Icon.EvaIcon icon="plus-circle-outline" />
                      {`Add`}
                    </LibraryComponents.Atoms.Buttons.Button>
                  </div>
                </LibraryComponents.Atoms.Grid>
                <br/>
                <LibraryComponents.Atoms.List
                    space={2}
                    direction="row"
                    justify="center"
                  >
                    <div>
                      {Stores.administrativeDivStore.administrativeDiv?.state?.map(
                        (item, index) => (
                          <div className="mb-2" key={index}>
                            <LibraryComponents.Atoms.Buttons.Button
                              size="medium"
                              type="solid"
                              icon={LibraryComponents.Atoms.Icon.Remove}
                              onClick={() => {
                                const firstArr =
                                  Stores.administrativeDivStore.administrativeDiv?.state?.slice(
                                    0,
                                    index
                                  ) || []
                                const secondArr =
                                  Stores.administrativeDivStore.administrativeDiv?.state?.slice(
                                    index + 1
                                  ) || []
                                const finalArray = [
                                  ...firstArr,
                                  ...secondArr,
                                ]
                                Stores.administrativeDivStore.updateAdministrativeDiv({
                                  ...Stores.administrativeDivStore.administrativeDiv,
                                  state: finalArray,
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

              <LibraryComponents.Atoms.Form.InputWrapper label='District'>
                  <LibraryComponents.Atoms.Grid cols={2}>
                  <Controller
                      control={control}
                      render={({ field: { onChange } }) => (
                        <LibraryComponents.Atoms.Form.Input
                          placeholder={
                            errors.district ? "Please Enter District" : "District"
                          }
                          hasError={errors.district}
                          value={Stores.administrativeDivStore.localState?.district || ""}
                          onChange={(district) => {
                            onChange(district)
                            Stores.administrativeDivStore.updateLocalDistrict({
                              ...Stores.administrativeDivStore.localState,
                              district,
                            })
                          }}
                        />
                      )}
                      name="district"
                      rules={{ required: true }}
                      defaultValue=""
                    /> 
                    <div className="mt-2">
                      <LibraryComponents.Atoms.Buttons.Button
                        size="medium"
                        type="solid"
                        onClick={() => {
                          const district = Stores.administrativeDivStore.localState?.district
                          if (district === undefined) return alert("Please Enter District")
                          if (district !== undefined) {
                            let arrState = Stores.administrativeDivStore.administrativeDiv 
                            && Stores.administrativeDivStore.administrativeDiv.district;
                            Stores.administrativeDivStore.updateAdministrativeDiv({
                              ...Stores.administrativeDivStore.administrativeDiv,
                              district: arrState? arrState.concat(district): [district] 
                            })
                            Stores.administrativeDivStore.updateLocalDistrict({
                              ...Stores.administrativeDivStore.localState,
                              district:''
                            })
                          }
                        }}
                      >
                        <LibraryComponents.Atoms.Icon.EvaIcon icon="plus-circle-outline" />
                        {`Add`}
                      </LibraryComponents.Atoms.Buttons.Button>
                    </div>
                  </LibraryComponents.Atoms.Grid>
                  <br />
                  <LibraryComponents.Atoms.List
                    space={2}
                    direction="row"
                    justify="center"
                  >
                    <div>
                      {Stores.administrativeDivStore.administrativeDiv?.district?.map(
                        (item, index) => (
                          <div className="mb-2" key={index}>
                            <LibraryComponents.Atoms.Buttons.Button
                              size="medium"
                              type="solid"
                              icon={LibraryComponents.Atoms.Icon.Remove}
                              onClick={() => {
                                const firstArr =
                                  Stores.administrativeDivStore.administrativeDiv?.district?.slice(
                                    0,
                                    index
                                  ) || []
                                const secondArr =
                                  Stores.administrativeDivStore.administrativeDiv?.district?.slice(
                                    index + 1
                                  ) || []
                                const finalArray = [
                                  ...firstArr,
                                  ...secondArr,
                                ]
                                Stores.administrativeDivStore.updateAdministrativeDiv({
                                  ...Stores.administrativeDivStore.administrativeDiv,
                                  district: finalArray,
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

              <LibraryComponents.Atoms.Form.InputWrapper label='City'>
                <LibraryComponents.Atoms.Grid cols={2}>
                <Controller
                  control={control}
                  render={({ field: { onChange } }) => (
                    <LibraryComponents.Atoms.Form.Input
                      hasError={errors.city}
                      placeholder={errors.city ? "Please Enter City" : "City"}
                      value={Stores.administrativeDivStore.localState?.city || ""}
                      onChange={(city) => {
                        onChange(city)
                        Stores.administrativeDivStore.updateLocalCity({
                          ...Stores.administrativeDivStore.localState,
                          city,
                        })
                      }}
                    />
                  )}
                  name="city"
                  rules={{ required: false }}
                  defaultValue=""
                />
                <div className="mt-2">
                    <LibraryComponents.Atoms.Buttons.Button
                      size="medium"
                      type="solid"
                      onClick={() => {
                        const city = Stores.administrativeDivStore.localState?.city
                        if (city === undefined) return alert("Please Enter city")
                        if (city !== undefined) {
                          let arrState = Stores.administrativeDivStore.administrativeDiv 
                          && Stores.administrativeDivStore.administrativeDiv.city;
                           Stores.administrativeDivStore.updateAdministrativeDiv({
                             ...Stores.administrativeDivStore.administrativeDiv,
                             city: arrState? arrState.concat(city): [city] 
                           })
                           Stores.administrativeDivStore.updateLocalCity({
                            ...Stores.administrativeDivStore.localState,
                            city:''
                          })
                        }
                      }}
                    >
                      <LibraryComponents.Atoms.Icon.EvaIcon icon="plus-circle-outline" />
                      {`Add`}
                    </LibraryComponents.Atoms.Buttons.Button>
                  </div>
                </LibraryComponents.Atoms.Grid>
                <br />
                  <LibraryComponents.Atoms.List
                    space={2}
                    direction="row"
                    justify="center"
                  >
                    <div>
                      {Stores.administrativeDivStore.administrativeDiv?.city?.map(
                        (item, index) => (
                          <div className="mb-2" key={index}>
                            <LibraryComponents.Atoms.Buttons.Button
                              size="medium"
                              type="solid"
                              icon={LibraryComponents.Atoms.Icon.Remove}
                              onClick={() => {
                                const firstArr =
                                  Stores.administrativeDivStore.administrativeDiv?.city?.slice(
                                    0,
                                    index
                                  ) || []
                                const secondArr =
                                  Stores.administrativeDivStore.administrativeDiv?.city?.slice(
                                    index + 1
                                  ) || []
                                const finalArray = [
                                  ...firstArr,
                                  ...secondArr,
                                ]
                                Stores.administrativeDivStore.updateAdministrativeDiv({
                                  ...Stores.administrativeDivStore.administrativeDiv,
                                  city: finalArray,
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

              <LibraryComponents.Atoms.Form.InputWrapper label="Area">
                <LibraryComponents.Atoms.Grid cols={2}>
                <Controller
                  control={control}
                  render={({ field: { onChange } }) => (
                    <LibraryComponents.Atoms.Form.Input
                      placeholder={errors.area ? "Please Enter Area" : "Area"}
                      hasError={errors.area}
                      value={Stores.administrativeDivStore.localState?.area || ""}
                      onChange={(area) => {
                        onChange(area)
                        Stores.administrativeDivStore.updateLocalArea({
                          ...Stores.administrativeDivStore.localState,
                          area,
                        })
                      }}
                    />
                  )}
                  name="area"
                  rules={{ required: false }}
                  defaultValue=""
                />            
                <div className="mt-2">
                    <LibraryComponents.Atoms.Buttons.Button
                      size="medium"
                      type="solid"
                      onClick={() => {
                        const area = Stores.administrativeDivStore.localState?.area
                        if (area === undefined) return alert("Please Enter area")
                        if (area !== undefined) {
                          let arrState = Stores.administrativeDivStore.administrativeDiv 
                          && Stores.administrativeDivStore.administrativeDiv.area;
                           Stores.administrativeDivStore.updateAdministrativeDiv({
                             ...Stores.administrativeDivStore.administrativeDiv,
                             area: arrState? arrState.concat(area): [area] 
                           })
                           Stores.administrativeDivStore.updateLocalArea({
                            ...Stores.administrativeDivStore.localState,
                            area:''
                          })
                        }
                      }}
                    >
                      <LibraryComponents.Atoms.Icon.EvaIcon icon="plus-circle-outline" />
                      {`Add`}
                    </LibraryComponents.Atoms.Buttons.Button>
                  </div>
                </LibraryComponents.Atoms.Grid>
                <br />
                  <LibraryComponents.Atoms.List
                    space={2}
                    direction="row"
                    justify="center"
                  >
                    <div>
                      {Stores.administrativeDivStore.administrativeDiv?.area?.map(
                        (item, index) => (
                          <div className="mb-2" key={index}>
                            <LibraryComponents.Atoms.Buttons.Button
                              size="medium"
                              type="solid"
                              icon={LibraryComponents.Atoms.Icon.Remove}
                              onClick={() => {
                                const firstArr =
                                  Stores.administrativeDivStore.administrativeDiv?.area?.slice(
                                    0,
                                    index
                                  ) || []
                                const secondArr =
                                  Stores.administrativeDivStore.administrativeDiv?.area?.slice(
                                    index + 1
                                  ) || []
                                const finalArray = [
                                  ...firstArr,
                                  ...secondArr,
                                ]
                                Stores.administrativeDivStore.updateAdministrativeDiv({
                                  ...Stores.administrativeDivStore.administrativeDiv,
                                  area: finalArray,
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
            </LibraryComponents.Atoms.List>
            <LibraryComponents.Atoms.List
              direction="col"
              space={4}
              justify="stretch"
              fill
            >
              <LibraryComponents.Atoms.Form.InputWrapper label='Postal Code'>
                <LibraryComponents.Atoms.Grid cols={2}>
                      <Controller
                      control={control}
                      render={({ field: { onChange } }) => (
                        <LibraryComponents.Atoms.Form.Input
                          type="number"
                          placeholder={
                            errors.postalCode ? "Please Enter PostalCode" : "PostalCode"
                          }
                          hasError={errors.postalCode}
                          value={
                            Stores.administrativeDivStore.localState?.postalCode || ""
                          }
                          onChange={(postalCode) => {
                            onChange(postalCode)
                            Stores.administrativeDivStore.updateLocalPostalCode({
                              ...Stores.administrativeDivStore.localState,
                              postalCode,
                            })
                          }}
                        />
                      )}
                      name="postalCode"
                      rules={{ required: false }}
                      defaultValue=""
                    /> 
                    <div className="mt-2">
                    <LibraryComponents.Atoms.Buttons.Button
                      size="medium"
                      type="solid"
                      onClick={() => {
                        const postalCode = Stores.administrativeDivStore.localState?.postalCode
                        if (postalCode === undefined) return alert("Please Enter PostalCode")
                        if (postalCode !== undefined) {
                          let arrState = Stores.administrativeDivStore.administrativeDiv 
                          && Stores.administrativeDivStore.administrativeDiv.postalCode;
                           Stores.administrativeDivStore.updateAdministrativeDiv({
                             ...Stores.administrativeDivStore.administrativeDiv,
                             postalCode: arrState? arrState.concat(postalCode): [postalCode] 
                           })
                           Stores.administrativeDivStore.updateLocalPostalCode({
                            ...Stores.administrativeDivStore.localState,
                            postalCode:""
                          })
                        }
                      }}
                    >
                      <LibraryComponents.Atoms.Icon.EvaIcon icon="plus-circle-outline" />
                      {`Add`}
                    </LibraryComponents.Atoms.Buttons.Button>
                  </div>
                </LibraryComponents.Atoms.Grid>
                <br />
                  <LibraryComponents.Atoms.List
                    space={2}
                    direction="row"
                    justify="center"
                  >
                    <div>
                      {Stores.administrativeDivStore.administrativeDiv?.postalCode?.map(
                        (item, index) => (
                          <div className="mb-2" key={index}>
                            <LibraryComponents.Atoms.Buttons.Button
                              size="medium"
                              type="solid"
                              icon={LibraryComponents.Atoms.Icon.Remove}
                              onClick={() => {
                                const firstArr =
                                  Stores.administrativeDivStore.administrativeDiv?.postalCode?.slice(
                                    0,
                                    index
                                  ) || []
                                const secondArr =
                                  Stores.administrativeDivStore.administrativeDiv?.postalCode?.slice(
                                    index + 1
                                  ) || []
                                const finalArray = [
                                  ...firstArr,
                                  ...secondArr,
                                ]
                                Stores.administrativeDivStore.updateAdministrativeDiv({
                                  ...Stores.administrativeDivStore.administrativeDiv,
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
                        Stores.administrativeDivStore.updateAdministrativeDiv({
                          ...Stores.administrativeDivStore.administrativeDiv,
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
                        Stores.administrativeDivStore.updateAdministrativeDiv({
                          ...Stores.administrativeDivStore.administrativeDiv,
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
                  <LibraryComponents.Atoms.Form.InputWrapper label="Environment">
                    <select
                      value={
                        Stores.administrativeDivStore.administrativeDiv?.environment
                      }
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
                          : Stores.administrativeDivStore.administrativeDiv
                              ?.environment || `Select`}
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
        <div className="p-2 rounded-lg shadow-xl">
          <AdminstrativeDivList
            data={Stores.administrativeDivStore.listAdministrativeDiv || []}
            totalSize={Stores.administrativeDivStore.listAdministrativeDivCount}
            extraData={{
              lookupItems: stores.routerStore.lookupItems,
              updateAdministrativeDiv: Stores.administrativeDivStore.updateAdministrativeDiv,
              administrativeDiv: Stores.administrativeDivStore.administrativeDiv,
              updateLocalState: Stores.administrativeDivStore.updateLocalState,
              localState: Stores.administrativeDivStore.localState,
              updateLocalDistrict: Stores.administrativeDivStore.updateLocalDistrict,
              updateLocalCity: Stores.administrativeDivStore.updateLocalCity,
              updateLocalArea: Stores.administrativeDivStore.updateLocalArea,
              updateLocalPostalCode: Stores.administrativeDivStore.updateLocalPostalCode
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
              Stores.administrativeDivStore.fetchAdministrativeDiv(page, limit)
            }}
          />
        </div>
        <LibraryComponents.Molecules.ModalConfirm
          {...modalConfirm}
          click={(type?: string) => {
            if (type === "Delete") {
              Stores.administrativeDivStore.administrativeDivisionsService
                .deleteAdministrativeDivisions({ input: { id: modalConfirm.id } })
                .then((res: any) => {
                  if (res.removeAdministrativeDivision.success) {
                    LibraryComponents.Atoms.Toast.success({
                      message: `😊 ${res.removeAdministrativeDivision.message}`,
                    })
                    setModalConfirm({ show: false })
                    Stores.administrativeDivStore.fetchAdministrativeDiv()
                  }
                })
            } else if (type === "Update") {
              Stores.administrativeDivStore.administrativeDivisionsService
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
