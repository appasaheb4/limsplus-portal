/* eslint-disable */
import React, { useEffect } from "react"
import { observer } from "mobx-react"
import * as LibraryComponents from "@lp/library/components"
import * as LibraryUtils from "@lp/library/utils"
import { useForm, Controller } from "react-hook-form"
import * as FeatureComponents from "../../components"
import { Stores as LoginStore } from "@lp/features/login/stores"
import { Stores as AdministrativeDivisionStore } from "@lp/features/collection/administrativeDivisions/stores"
import "@lp/library/assets/css/accordion.css"
import { stores } from "@lp/stores"
import { toJS } from "mobx"
import { Stores } from "../../stores"
import { RouterFlow } from "@lp/flows"
import { AdministrativeDivisions } from "@lp/features/collection/administrativeDivisions/scenes"

interface InformationGroupProps {
  onModalConfirm?: (item: any) => void
}
const InformationGroup  = observer((props:InformationGroupProps)=>{
    const {control,handleSubmit,formState:{errors},setValue}  = useForm()
    const onSubmitInformationGroup = () =>{
        //api calling
    }
    useEffect(()=>{
        if (stores.loginStore.login && stores.loginStore.login.role !== "SYSADMIN") {
            Stores.patientRegistationStore.updateInformationGroup({
              ...Stores.patientRegistationStore.informationGroup,
              environment: stores.loginStore.login.environment,
            })
            setValue("environment", stores.loginStore.login.environment)
        }
    },[stores.loginStore.login])
     return(
        <>
            <div className='p-2 rounded-lg shadow-xl'>
                <LibraryComponents.Atoms.Grid cols={2}>
                    <LibraryComponents.Atoms.List
                        direction='col'
                        space={4}
                        justify='stretch'
                        fill
                    >
                        <Controller
                            control={control}
                            render={({ field: { onChange } }) => (
                                <LibraryComponents.Atoms.Form.InputDate
                            label="Information Date"
                            name="txtInformationDate"
                            placeholder={errors.infoDate?"Please Enter Information Date":"Information Date"}
                            hasError={errors.infoDate}
                            value={LibraryUtils.moment(
                                Stores.patientRegistationStore.informationGroup?.infoDate
                            ).format("YYYY-MM-DD")}
                            onChange={(e) => {
                                let infoDate = new Date(e.target.value)
                                onChange(infoDate)
                                const formatDate = LibraryUtils.moment(infoDate).format(
                                "YYYY-MM-DD HH:mm"
                                )
                                
                                Stores.patientRegistationStore.updateInformationGroup({
                                ...Stores.patientRegistationStore.informationGroup,
                                infoDate: new Date(formatDate),
                                })
                            }}
                            />
                        )}
                        name="infoDate"
                        rules={{ required: true }}
                        defaultValue=""
                        />
            <Controller
                  control={control}
                  render={({ field: { onChange } }) => (
            <LibraryComponents.Atoms.Form.InputWrapper label="Information Related To" hasError={errors.infoRelatedTo}>
              <select
                className={`leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border-2 ${
                  errors.infoRelatedTo
                    ? "border-red-500  "
                    : "border-gray-300"
                } rounded-md`}
                onChange={(e) => {
                  const infoRelatedTo = e.target.value
                  onChange(infoRelatedTo)
                  Stores.patientRegistationStore.updateInformationGroup({
                    ...Stores.patientRegistationStore.informationGroup,
                    infoRelatedTo,
                  })
                }}
              >
                <option selected>Select</option>
                {LibraryUtils.lookupItems(
                  stores.routerStore.lookupItems,
                  "INFORMATION GROUP - INFO_RELATED_TO"
                ).map((item: any, index: number) => (
                      <option key={index} value={item.code}>
                        {LibraryUtils.lookupValue(item)}
                      </option>  
                    ))}
              </select>
            </LibraryComponents.Atoms.Form.InputWrapper>
            )}
            name="infoRelatedTo"
            rules={{ required: true }}
            defaultValue=""
          />
          <Controller
                  control={control}
                  render={({ field: { onChange } }) => (
            <LibraryComponents.Atoms.Form.Input
              label="Key Field"
              name="txtKeyField"
              placeholder={errors.keyField?"Please Enter Key Field ":"KeyField"}
              hasError={errors.keyField}
              value={Stores.patientRegistationStore.patientManger?.mobileNo}
              onChange={(keyField) => {
                onChange(keyField)
                Stores.patientRegistationStore.updateInformationGroup({
                  ...Stores.patientRegistationStore.informationGroup,
                  keyField,
                })
              }}
            />
            )}
              name="keyField"
              rules={{ required: true }}
              defaultValue=""
            />
            <Controller
                  control={control}
                  render={({ field: { onChange } }) => (
            <LibraryComponents.Atoms.Form.InputWrapper label="Information Type" hasError={errors.infoType}>
              <select
                className={`leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border-2 ${
                  errors.infoType
                    ? "border-red-500  "
                    : "border-gray-300"
                } rounded-md`}
                onChange={(e) => {
                  const infoType = e.target.value
                  onChange(infoType)
                  Stores.patientRegistationStore.updateInformationGroup({
                    ...Stores.patientRegistationStore.informationGroup,
                    infoType,
                  })
                }}
              >
                <option selected>Select</option>
                {LibraryUtils.lookupItems(
                  stores.routerStore.lookupItems,
                  "INFORMATION GROUP - INFO_TYPE"
                ).map((item: any, index: number) => (
                      <option key={index} value={item.code}>
                        {LibraryUtils.lookupValue(item)}
                      </option>  
                    ))}
              </select>
            </LibraryComponents.Atoms.Form.InputWrapper>
            )}
            name="infoType"
            rules={{ required: true }}
            defaultValue=""
          />
          <Controller
                  control={control}
                  render={({ field: { onChange } }) => (
            <LibraryComponents.Atoms.Form.InputWrapper label="Lookup Value" hasError={errors.lookupValue}>
              <select
                className={`leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border-2 ${
                  errors.lookupValue
                    ? "border-red-500  "
                    : "border-gray-300"
                } rounded-md`}
                onChange={(e) => {
                  const lookupValue = e.target.value
                  onChange(lookupValue)
                  Stores.patientRegistationStore.updateInformationGroup({
                    ...Stores.patientRegistationStore.informationGroup,
                    lookupValue,
                  })
                }}
              >
                <option selected>Select</option>
                {LibraryUtils.lookupItems(
                  stores.routerStore.lookupItems,
                  "INFORMATION GROUP - LOOKUP_VALUE"
                ).map((item: any, index: number) => (
                      <option key={index} value={item.code}>
                        {LibraryUtils.lookupValue(item)}
                      </option>  
                    ))}
              </select>
            </LibraryComponents.Atoms.Form.InputWrapper>
            )}
            name="lookupValue"
            rules={{ required: true }}
            defaultValue=""
          />
          <Controller
                  control={control}
                  render={({ field: { onChange } }) => (
            <LibraryComponents.Atoms.Form.Input
              label="Information"
              name="txtInformation"
              placeholder={errors.information?"Please Enter Information ":"Information"}
              hasError={errors.information}
              value={Stores.patientRegistationStore.informationGroup?.information}
              onChange={(information) => {
                onChange(information)
                Stores.patientRegistationStore.updateInformationGroup({
                  ...Stores.patientRegistationStore.informationGroup,
                  information,
                })
              }}
            />
            )}
              name="information"
              rules={{ required: true }}
              defaultValue=""
            />
            <Controller
                  control={control}
                  render={({ field: { onChange } }) => (
                    <LibraryComponents.Atoms.Form.Toggle
                      label="Information Lookup"
                      id="txtInformationLookup"
                      hasError={errors.infoLookup}
                      value={Stores.patientRegistationStore.informationGroup?.infoLookup}
                      onChange={(infoLookup) => {
                        onChange(infoLookup)
                        Stores.patientRegistationStore.updateInformationGroup({
                          ...Stores.patientRegistationStore.informationGroup,
                          infoLookup,
                        })
                      }}
                    />
                  )}
                  name="infoLookup"
                  rules={{ required: false }}
                  defaultValue=""
                />
                    </LibraryComponents.Atoms.List>
                    <LibraryComponents.Atoms.List
                        direction='col'
                        fill
                        justify='stretch'
                        space={4}
                    >
                        <Controller
                  control={control}
                  render={({ field: { onChange } }) => (
                    <LibraryComponents.Atoms.Form.InputFile
                      label="Attachment"
                      placeholder="File"
                      onChange={(e) => {
                        const attachment = e.target.files[0]
                        onChange(attachment)
                        Stores.patientRegistationStore.updateInformationGroup({
                          ...Stores.patientRegistationStore.informationGroup,
                          attachment,
                        })
                      }}
                    />
                  )}
                  name="attachment"
                  rules={{ required: false }}
                  defaultValue=""
                />
                <Controller
            control={control}
            render={({ field: { onChange } }) => (
              <LibraryComponents.Atoms.Form.InputWrapper label="Environment">
                <select
                  value={Stores.patientRegistationStore.informationGroup?.environment}
                  disabled={
                    stores.loginStore.login &&
                    stores.loginStore.login.role !== "SYSADMIN"
                      ? true
                      : false
                  }
                  className={`leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border-2 ${
                    errors.environment
                      ? "border-red-500  "
                      : "border-gray-300"
                  } rounded-md`}
                  onChange={(e) => {
                    const environment = e.target.value
                    onChange(environment)
                    Stores.patientRegistationStore.updateInformationGroup({
                      ...Stores.patientRegistationStore.informationGroup,
                      environment,
                    })
                  }}
                >
                  <option selected>
                        {stores.loginStore.login &&
                        stores.loginStore.login.role !== "SYSADMIN"
                          ? `Select`
                          : Stores.patientRegistationStore.informationGroup?.environment || `Select`}
                      </option>
                  {LibraryUtils.lookupItems
                  (stores.routerStore.lookupItems, "INFORMATION GROUP - ENVIRONMENT").map(
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
          <Controller
                control={control}
                render={({ field: { onChange } }) => (
                  <LibraryComponents.Atoms.Form.Input
                    label="Entered By"
                    placeholder={
                      errors.enteredBy ? "Please Enter Entered By" : "Entered By"
                    }
                    hasError={errors.enteredBy}
                    value={LoginStore.loginStore.login?.userId}
                    disabled={true}
                  />
                )}
                name="enteredBy"
                rules={{ required: false }}
                defaultValue=""
              />
              <Controller
                  control={control}
                  render={({ field: { onChange } }) => (
                    <LibraryComponents.Atoms.Form.InputWrapper label="Status">
                      <select
                        value={Stores.patientRegistationStore.informationGroup?.status}
                        className={`leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border-2 ${
                          errors.status
                            ? "border-red-500  "
                            : "border-gray-300"
                        } rounded-md`}
                        onChange={(e) => {
                          const status = e.target.value
                          onChange(status)
                          Stores.patientRegistationStore.updateInformationGroup({
                            ...Stores.patientRegistationStore.informationGroup,
                            status,
                          })
                        }}
                      >
                        <option selected>Select</option>
                        {LibraryUtils.lookupItems(
                          stores.routerStore.lookupItems,
                          "INFORMATION GROUP - STATUS"
                        ).map((item: any, index: number) => (
                          <option key={index} value={item.code}>
                            {`${item.value} - ${item.code}`}
                          </option>
                        ))}
                      </select>
                    </LibraryComponents.Atoms.Form.InputWrapper>
                  )}
                  name="status"
                  rules={{ required: false }}
                  defaultValue=""
                />

                    </LibraryComponents.Atoms.List>
                </LibraryComponents.Atoms.Grid> 
            </div>
            <br/>
            <LibraryComponents.Atoms.List direction="row" space={3} align="center">
        <LibraryComponents.Atoms.Buttons.Button
          size="medium"
          type="solid"
          icon={LibraryComponents.Atoms.Icon.Save}
          onClick={handleSubmit(onSubmitInformationGroup)}
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
      <div
        className="p-2 rounded-lg shadow-xl overflow-scroll"
        style={{ overflowX: "scroll" }}
      >
        <FeatureComponents.Molecules.InformationGroupList
          data={Stores.patientRegistationStore.listInformationGroup}
          totalSize={Stores.patientRegistationStore.listInformationGroupCount}
          extraData={{
            lookupItems: stores.routerStore.lookupItems,
            listAdministrativeDiv: AdministrativeDivisionStore.administrativeDivStore.listAdministrativeDiv
          }}
          isDelete={RouterFlow.checkPermission(
            toJS(stores.routerStore.userPermission),
            "Delete"
          )}
          isEditModify={RouterFlow.checkPermission(
            toJS(stores.routerStore.userPermission),
            "Edit/Modify"
          )}
          onDelete={(selectedUser) =>
            props.onModalConfirm && props.onModalConfirm(selectedUser)
          }
          onSelectedRow={(rows) => {
            props.onModalConfirm &&
              props.onModalConfirm({
                show: true,
                type: "Delete",
                id: rows,
                title: "Are you sure?",
                body: `Delete selected items!`,
              })
          }}
          onUpdateItem={(value: any, dataField: string, id: string) => {
            props.onModalConfirm &&
              props.onModalConfirm({
                show: true,
                type: "Update",
                data: { value, dataField, id },
                title: "Are you sure?",
                body: `Update recoard!`,
              })
          }}
          // onPageSizeChange={(page, limit) => {
          //   // Stores.enviromentSettingsStore.fetchSessionManagementList(page, limit)
          // }}
        />
      </div>
        </>
    )

})
export default InformationGroup