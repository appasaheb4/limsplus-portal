/* eslint-disable */
import React, { useEffect, useState } from "react"
import { observer } from "mobx-react"
import _ from "lodash"
import * as LibraryComponents from "@lp/library/components"
import * as FeatureComponents from "../components"
import * as LibraryUtils from "@lp/library/utils"

import * as Models from "../models"
import * as Utils from "../util"
import Storage from "@lp/library/modules/storage"

import { Stores } from "../stores"
import { stores } from "@lp/library/stores"
import { Stores as LookupStore } from "@lp/features/collection/lookup/stores"
import { Stores as LoginStore } from "@lp/features/login/stores"
import { Stores as LabStores } from "@lp/features/collection/labs/stores"

import { RouterFlow } from "@lp/flows"

const CorporateClients = observer(() => {
  const [errors, setErrors] = useState<Models.CorporateClients>()
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
        const status = items
          .find((fileds) => {
            return fileds.fieldName === "STATUS"
          })
          ?.arrValue?.find((statusItem) => statusItem.code === "A")
        if (status) {
          Stores.corporateClientsStore.updateCorporateClients({
            ...Stores.corporateClientsStore.corporateClients,
            status: status.code,
          })
        }
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
          <LibraryComponents.Atoms.Grid cols={3}>
            <LibraryComponents.Atoms.List
              direction="col"
              space={4}
              justify="stretch"
              fill
            >
              <LibraryComponents.Atoms.Form.InputDate
                label="Date Creation"
                placeholder="Date Creation"
                value={LibraryUtils.moment
                  .unix(
                    Stores.corporateClientsStore.corporateClients?.dateCreation || 0
                  )
                  .format("YYYY-MM-DD")}
                disabled={true}
              />
              <LibraryComponents.Atoms.Form.InputDate
                label="Date Active"
                placeholder="Date Active"
                value={LibraryUtils.moment
                  .unix(
                    Stores.corporateClientsStore.corporateClients?.dateActiveFrom ||
                      0
                  )
                  .format("YYYY-MM-DD")}
                disabled={true}
              />
              <LibraryComponents.Atoms.Form.InputDate
                label="Date Expire"
                placeholder="Date Expire"
                value={LibraryUtils.moment
                  .unix(
                    Stores.corporateClientsStore.corporateClients?.dateActiveTo || 0
                  )
                  .format("YYYY-MM-DD")}
                onChange={(e) => {
                  const schedule = new Date(e.target.value)
                  Stores.corporateClientsStore.updateCorporateClients({
                    ...Stores.corporateClientsStore.corporateClients,
                    dateActiveTo: LibraryUtils.moment(schedule).unix(),
                  })
                }}
              />
              <LibraryComponents.Atoms.Form.Input
                label="Version"
                placeholder="Version"
                value={Stores.corporateClientsStore.corporateClients?.version}
                disabled={true}
              />
              <LibraryComponents.Atoms.Form.Input
                label="Key Num"
                placeholder="Key Num"
                value={Stores.corporateClientsStore.corporateClients?.keyNum}
                disabled={true}
              />
              <LibraryComponents.Atoms.Form.Input
                label="Entered By"
                placeholder="Entered By"
                value={LoginStore.loginStore.login?.userId}
                disabled={true}
              />

              <LibraryComponents.Atoms.Form.Input
                label="Corporate Code"
                placeholder="Corporate Code"
                value={Stores.corporateClientsStore.corporateClients?.corporateCode}
                onChange={(corporateCode) => {
                  setErrors({
                    ...errors,
                    corporateCode: Utils.validate.single(
                      corporateCode,
                      Utils.corporateClients.corporateCode
                    ),
                  })
                  Stores.corporateClientsStore.updateCorporateClients({
                    ...Stores.corporateClientsStore.corporateClients,
                    corporateCode,
                  })
                }}
              />
              <LibraryComponents.Atoms.Form.Input
                label="Corporate Name"
                placeholder="Corporate Name"
                value={Stores.corporateClientsStore.corporateClients?.corporateName}
                onChange={(corporateName) => {
                  setErrors({
                    ...errors,
                    corporateName: Utils.validate.single(
                      corporateName,
                      Utils.corporateClients.corporateName
                    ),
                  })
                  Stores.corporateClientsStore.updateCorporateClients({
                    ...Stores.corporateClientsStore.corporateClients,
                    corporateName,
                  })
                }}
              />
              <LibraryComponents.Atoms.Form.Input
                label="Invoice AC"
                placeholder="Invoice AC"
                value={Stores.corporateClientsStore.corporateClients?.invoiceAc}
                onChange={(invoiceAc) => {
                  Stores.corporateClientsStore.updateCorporateClients({
                    ...Stores.corporateClientsStore.corporateClients,
                    invoiceAc,
                  })
                }}
              />
              <LibraryComponents.Atoms.Form.InputWrapper label="Price List">
                <select
                  className="leading-4 p-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-base border border-gray-300 rounded-md"
                  onChange={(e) => {
                    const priceList = e.target.value
                    Stores.corporateClientsStore.updateCorporateClients({
                      ...Stores.corporateClientsStore.corporateClients,
                      priceList,
                    })
                  }}
                >
                  <option selected>Select</option>
                  {[].map((item: any, index: number) => (
                    <option key={index} value={item}>
                      {`${item}`}
                    </option>
                  ))}
                </select>
              </LibraryComponents.Atoms.Form.InputWrapper>
              <LibraryComponents.Atoms.Form.Input
                label="Price Group"
                placeholder="Price Group"
                value={Stores.corporateClientsStore.corporateClients?.priceGroup}
                onChange={(priceGroup) => {
                  Stores.corporateClientsStore.updateCorporateClients({
                    ...Stores.corporateClientsStore.corporateClients,
                    priceGroup,
                  })
                }}
              />
              <LibraryComponents.Atoms.Form.Input
                label="Billing on"
                placeholder="Billing on"
                value={Stores.corporateClientsStore.corporateClients?.billingOn}
                onChange={(billingOn) => {
                  Stores.corporateClientsStore.updateCorporateClients({
                    ...Stores.corporateClientsStore.corporateClients,
                    billingOn,
                  })
                }}
              />
              <LibraryComponents.Atoms.Form.MultilineInput
                rows={3}
                label="Address"
                placeholder="Address"
                value={Stores.corporateClientsStore.corporateClients?.address}
                onChange={(address) => {
                  Stores.corporateClientsStore.updateCorporateClients({
                    ...Stores.corporateClientsStore.corporateClients,
                    address,
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
                label="City"
                placeholder="City"
                value={Stores.corporateClientsStore.corporateClients?.city}
                onChange={(city) => {
                  Stores.corporateClientsStore.updateCorporateClients({
                    ...Stores.corporateClientsStore.corporateClients,
                    city,
                  })
                }}
              />
               <LibraryComponents.Atoms.Form.Input
                label="State"
                placeholder="State"
                value={Stores.corporateClientsStore.corporateClients?.state}
                onChange={(state) => {
                  Stores.corporateClientsStore.updateCorporateClients({
                    ...Stores.corporateClientsStore.corporateClients,
                    state,
                  })
                }}
              />
              <LibraryComponents.Atoms.Form.Input
                label="Country"
                placeholder="Country"
                value={Stores.corporateClientsStore.corporateClients?.country}
                onChange={(country) => {
                  Stores.corporateClientsStore.updateCorporateClients({
                    ...Stores.corporateClientsStore.corporateClients,
                    country,
                  })
                }}
              />
              <LibraryComponents.Atoms.Form.Input
                label="Postcode"
                placeholder="Postcode"
                type="number"
                value={Stores.corporateClientsStore.corporateClients?.postcode}
                onChange={(postcode) => {
                  Stores.corporateClientsStore.updateCorporateClients({
                    ...Stores.corporateClientsStore.corporateClients,
                    postcode,
                  })
                }}
              />
              <LibraryComponents.Atoms.Form.InputWrapper label="Customer Group">
                <select
                  className="leading-4 p-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-base border border-gray-300 rounded-md"
                  onChange={(e) => {
                    const customerGroup = e.target.value
                    Stores.corporateClientsStore.updateCorporateClients({
                      ...Stores.corporateClientsStore.corporateClients,
                      customerGroup,
                    })
                  }}
                >
                  <option selected>Select</option>
                  {LibraryUtils.lookupItems(lookupItems, "CUSTOMER_GROUP").map((item: any, index: number) => (
                        <option key={index} value={item.code}>
                          {`${item.value} - ${item.code}`}
                        </option>
                      ))}
                </select>
              </LibraryComponents.Atoms.Form.InputWrapper>
              <LibraryComponents.Atoms.Form.InputWrapper label="Category">
                <select
                  className="leading-4 p-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-base border border-gray-300 rounded-md"
                  onChange={(e) => {
                    const category = e.target.value
                    Stores.corporateClientsStore.updateCorporateClients({
                      ...Stores.corporateClientsStore.corporateClients,
                      category,
                    })
                  }}
                >
                  <option selected>Select</option>
                  {LibraryUtils.lookupItems(lookupItems, "CATEGORY").map((item: any, index: number) => (
                        <option key={index} value={item.code}>
                          {`${item.value} - ${item.code}`}
                        </option>
                      ))}
                </select>
              </LibraryComponents.Atoms.Form.InputWrapper>
              <LibraryComponents.Atoms.Form.Input
                label="Telephone"
                placeholder="Telephone"
                value={Stores.corporateClientsStore.corporateClients?.telephone}
                onChange={(telephone) => {
                  Stores.corporateClientsStore.updateCorporateClients({
                    ...Stores.corporateClientsStore.corporateClients,
                    telephone,
                  })
                }}
              />
              <LibraryComponents.Atoms.Form.Input
                label="Mobile No"
                placeholder="Mobile No"
                value={Stores.corporateClientsStore.corporateClients?.mobileNo}
                onChange={(mobileNo) => {
                  Stores.corporateClientsStore.updateCorporateClients({
                    ...Stores.corporateClientsStore.corporateClients,
                    mobileNo,
                  })
                }}
              />
              <LibraryComponents.Atoms.Form.Input
                label="Email"
                placeholder="Email"
                value={Stores.corporateClientsStore.corporateClients?.email}
                onChange={(email) => {
                  Stores.corporateClientsStore.updateCorporateClients({
                    ...Stores.corporateClientsStore.corporateClients,
                    email,
                  })
                }}
              />
              <LibraryComponents.Atoms.Form.InputWrapper label="Delivery Type">
                <select
                  className="leading-4 p-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-base border border-gray-300 rounded-md"
                  onChange={(e) => {
                    const deliveryType = e.target.value
                    Stores.corporateClientsStore.updateCorporateClients({
                      ...Stores.corporateClientsStore.corporateClients,
                      deliveryType,
                    })
                  }}
                >
                  <option selected>Select</option>
                  {LibraryUtils.lookupItems(lookupItems, "DELIVERY_TYPE").map((item: any, index: number) => (
                        <option key={index} value={item.code}>
                          {`${item.value} - ${item.code}`}
                        </option>
                      ))}
                </select>
              </LibraryComponents.Atoms.Form.InputWrapper>
              <LibraryComponents.Atoms.Form.InputWrapper label="Delivery Method">
                <select
                  className="leading-4 p-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-base border border-gray-300 rounded-md"
                  onChange={(e) => {
                    const deliveryMethod = e.target.value
                    Stores.corporateClientsStore.updateCorporateClients({
                      ...Stores.corporateClientsStore.corporateClients,
                      deliveryMethod,
                    })
                  }}
                >
                  <option selected>Select</option>
                  {LibraryUtils.lookupItems(lookupItems, "DELIVERY_METHOD").map((item: any, index: number) => (
                        <option key={index} value={item.code}>
                          {`${item.value} - ${item.code}`}
                        </option>
                      ))}
                </select>
              </LibraryComponents.Atoms.Form.InputWrapper>
              <LibraryComponents.Atoms.Form.InputWrapper label="Sales TerritoRy">
                <select
                  className="leading-4 p-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-base border border-gray-300 rounded-md"
                  onChange={(e) => {
                    const salesTerritoRy = e.target.value
                    Stores.corporateClientsStore.updateCorporateClients({
                      ...Stores.corporateClientsStore.corporateClients,
                      salesTerritoRy,
                    })
                  }}
                >
                  <option selected>Select</option>
                  {LibraryUtils.lookupItems(lookupItems, "SPECIALITY").map((item: any, index: number) => (
                        <option key={index} value={item.code}>
                          {`${item.value} - ${item.code}`}
                        </option>
                      ))}
                </select>
              </LibraryComponents.Atoms.Form.InputWrapper>
              <LibraryComponents.Atoms.Grid cols={5}>
                <LibraryComponents.Atoms.Form.Toggle
                  label="Confidential"
                  value={Stores.corporateClientsStore.corporateClients?.confidential}
                  onChange={(confidential) => {
                    Stores.corporateClientsStore.updateCorporateClients({
                      ...Stores.corporateClientsStore.corporateClients,
                      confidential,
                    })
                  }}
                />
                <LibraryComponents.Atoms.Form.Toggle
                  label="Urgent"
                  value={Stores.corporateClientsStore.corporateClients?.urgent}
                  onChange={(urgent) => {
                    Stores.corporateClientsStore.updateCorporateClients({
                      ...Stores.corporateClientsStore.corporateClients,
                      urgent,
                    })
                  }}
                />
              </LibraryComponents.Atoms.Grid>
            </LibraryComponents.Atoms.List>
            <LibraryComponents.Atoms.List
              direction="col"
              space={4}
              justify="stretch"
              fill
            >
               <LibraryComponents.Atoms.Form.Input
                label="Area"
                placeholder="Area"
                value={Stores.corporateClientsStore.corporateClients?.area}
                onChange={(area) => {
                  Stores.corporateClientsStore.updateCorporateClients({
                    ...Stores.corporateClientsStore.corporateClients,
                    area,
                  })
                }}
              />
              <LibraryComponents.Atoms.Form.Input
                label="Zone"
                placeholder="Zone"
                value={Stores.corporateClientsStore.corporateClients?.zone}
                onChange={(zone) => {
                  Stores.corporateClientsStore.updateCorporateClients({
                    ...Stores.corporateClientsStore.corporateClients,
                    zone,
                  })
                }}
              />
             
             
               <LibraryComponents.Atoms.Form.Input
                label="EDI"
                placeholder="EDI"
                value={Stores.corporateClientsStore.corporateClients?.edi}
                onChange={(edi) => {
                  Stores.corporateClientsStore.updateCorporateClients({
                    ...Stores.corporateClientsStore.corporateClients,
                    edi,
                  })
                }}
              />
              <LibraryComponents.Atoms.Form.Input
                label="EDI Address"
                placeholder="EDI Address"
                value={Stores.corporateClientsStore.corporateClients?.ediAddress}
                onChange={(ediAddress) => {
                  Stores.corporateClientsStore.updateCorporateClients({
                    ...Stores.corporateClientsStore.corporateClients,
                    ediAddress,
                  })
                }}
              />

              <LibraryComponents.Atoms.Form.InputWrapper label="Schedule">
                <select
                  value={Stores.corporateClientsStore.corporateClients?.schedule}
                  className="leading-4 p-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-base border border-gray-300 rounded-md"
                  onChange={(e) => {
                    const schedule = e.target.value as string
                    Stores.corporateClientsStore.updateCorporateClients({
                      ...Stores.corporateClientsStore.corporateClients,
                      schedule,
                    })
                  }}
                >
                  <option selected>Select</option>
                  {LabStores.labStore.listLabs.map((item: any, index: number) => (
                    <option key={index} value={item.code}>
                      {item.name}
                    </option>
                  ))}
                </select>
              </LibraryComponents.Atoms.Form.InputWrapper>
              <LibraryComponents.Atoms.Form.Input
                label="Report Format"
                placeholder="Report Format"
                value={Stores.corporateClientsStore.corporateClients?.reportFormat}
                onChange={(reportFormat) => {
                  Stores.corporateClientsStore.updateCorporateClients({
                    ...Stores.corporateClientsStore.corporateClients,
                    reportFormat,
                  })
                }}
              />
              <LibraryComponents.Atoms.Form.Input
                label="Info"
                placeholder="Info"
                value={Stores.corporateClientsStore.corporateClients?.info}
                onChange={(info) => {
                  Stores.corporateClientsStore.updateCorporateClients({
                    ...Stores.corporateClientsStore.corporateClients,
                    info,
                  })
                }}
              />
              <LibraryComponents.Atoms.Form.Input
                label="FYI Line"
                placeholder="FYI Line"
                value={Stores.corporateClientsStore.corporateClients?.fyiLine}
                onChange={(fyiLine) => {
                  Stores.corporateClientsStore.updateCorporateClients({
                    ...Stores.corporateClientsStore.corporateClients,
                    fyiLine,
                  })
                }}
              />
              <LibraryComponents.Atoms.Form.Input
                label="Work Line"
                placeholder="Work Line"
                value={Stores.corporateClientsStore.corporateClients?.workLine}
                onChange={(workLine) => {
                  Stores.corporateClientsStore.updateCorporateClients({
                    ...Stores.corporateClientsStore.corporateClients,
                    workLine,
                  })
                }}
              />
              <LibraryComponents.Atoms.Form.InputWrapper label="Status">
                <select
                  className="leading-4 p-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-base border border-gray-300 rounded-md"
                  onChange={(e) => {
                    const status = e.target.value
                    Stores.corporateClientsStore.updateCorporateClients({
                      ...Stores.corporateClientsStore.corporateClients,
                      status,
                    })
                  }}
                >
                  <option selected>Select</option>
                  {LibraryUtils.lookupItems(lookupItems, "STATUS").map((item: any, index: number) => (
                        <option key={index} value={item.code}>
                          {`${item.value} - ${item.code}`}
                        </option>
                      ))}
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
                  Stores.corporateClientsStore.corporateClients,
                  Utils.corporateClients
                )
                setErrorsMsg(error)
                if (error === undefined) {
                  
                  Stores.corporateClientsStore.corporateClientsService
                    .addCorporateClients(
                      Stores.corporateClientsStore.corporateClients
                    )
                    .then((res) => {
                      
                      if (res.status === 200) {
                        LibraryComponents.Atoms.Toast.success({
                          message: `😊 Corporate Client record created.`,
                        })   
                        Stores.corporateClientsStore.fetchCorporateClients()
                      }
                    })
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
        <div className="p-2 rounded-lg shadow-xl overflow-auto">
          <FeatureComponents.Molecules.CorporateClient
            data={Stores.corporateClientsStore.listCorporateClients || []}
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
              
              Stores.corporateClientsStore.corporateClientsService
                .deleteCorporateClients(modalConfirm.id)
                .then((res: any) => {
                  
                  if (res.status === 200) {
                    LibraryComponents.Atoms.Toast.success({
                      message: `😊 Corporate Client record deleted.`,
                    })
                    setModalConfirm({ show: false })
                    Stores.corporateClientsStore.fetchCorporateClients()
                  }
                })
            } else if (type === "Update") {
              
              Stores.corporateClientsStore.corporateClientsService
                .updateSingleFiled(modalConfirm.data)
                .then((res: any) => {
                  
                  if (res.status === 200) {
                    LibraryComponents.Atoms.Toast.success({
                      message: `😊 Corporate Client record updated.`,
                    })
                    setModalConfirm({ show: false })
                    Stores.corporateClientsStore.fetchCorporateClients()
                    window.location.reload()
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

export default CorporateClients
