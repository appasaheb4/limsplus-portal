/* eslint-disable */
import React, { useEffect } from "react"
import { observer } from "mobx-react"
import {Grid,List,Form,Svg,Buttons} from "@lp/library/components"
import {lookupItems} from "@lp/library/utils"
import { useForm, Controller } from "react-hook-form"
import {SpecialResultList} from "../../components"
import { Stores as MasterAnalyteStore } from "@lp/features/master/masterAnalyte/stores"
import { Stores as LoginStore } from "@lp/features/login/stores"
import "@lp/library/assets/css/accordion.css"
import { stores } from "@lp/stores"
import { toJS } from "mobx"
import { Stores } from "../../stores"
import { RouterFlow } from "@lp/flows"
interface SpecialResultProps {
    onModalConfirm?: (item: any) => void
}
export const SpecialResult = observer((props:SpecialResultProps)=>{
    const {
        control,
        handleSubmit,
        formState: { errors },
        setValue
      } = useForm()
    
      const onSubmitSpecialResult = () =>{
        // Add Patient
      }
      useEffect(() => {
        if (stores.loginStore.login && stores.loginStore.login.role !== "SYSADMIN") {
          Stores.patientRegistationStore.updateSpecialResult({
            ...Stores.patientRegistationStore.specialResult,
            environment: stores.loginStore.login.environment,
          })
          setValue("environment", stores.loginStore.login.environment)
        }
      }, [stores.loginStore.login])
    return(
        <>
            <div className='p-2 rounded-lg shadow-xl'>
                <Grid cols={2}>
                    <List direction='col' justify='stretch' fill space={4}>
                    <Controller
                  control={control}
                  render={({ field: { onChange } }) => (
            <Form.InputWrapper
              label="Visit Id"
              id="optionVisitId"
              hasError={errors.visitId}
            >
              <select
                name="txtVisitId"
                className={`leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border-2 ${
                  errors.visitId
                    ? "border-red-500  "
                    : "border-gray-300"
                } rounded-md`}
                onChange={(e) => {
                  const visitId = e.target.value as string
                  onChange(visitId)
                  Stores.patientRegistationStore.updateSpecialResult({
                    ...Stores.patientRegistationStore.specialResult,
                    visitId,
                  })
                }}
              >
                <option selected>Select</option>
                {/* {["Collection 1"].map((item: any, index: number) => (
                  <option key={index} value={item}>
                    {item}
                  </option>
                ))} */}
              </select>
            </Form.InputWrapper>
            )}
            name="visitId"
            rules={{ required: false }}
            defaultValue=""
          />
          <Controller
                  control={control}
                  render={({ field: { onChange } }) => (
            <Form.InputWrapper
              label="PatientResult"
              id="optionPatientResult"
              hasError={errors.patientResult}
            >
              <select
                name="optionPatientResult"
                className={`leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border-2 ${
                  errors.patientResult
                    ? "border-red-500  "
                    : "border-gray-300"
                } rounded-md`}
                onChange={(e) => {
                  const patientResult = e.target.value as string
                  onChange(patientResult)
                  Stores.patientRegistationStore.updateSpecialResult({
                    ...Stores.patientRegistationStore.specialResult,
                    patientResult,
                  })
                }}
              >
                <option selected>Select</option>
                {/* {["Collection 1"].map((item: any, index: number) => (
                  <option key={index} value={item}>
                    {item}
                  </option>
                ))} */}
              </select>
            </Form.InputWrapper>
            )}
            name="patientResult"
            rules={{ required: false }}
            defaultValue=""
          />
          <Controller
                control={control}
                render={({ field: { onChange } }) => (
                  <Form.InputWrapper
                    label="Analyte Code"
                    hasError={errors.analyteCode}
                  >
                    <select
                    //   value={Stores.patientRegistationStore.patientResult?.testCode}
                      className={`leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border-2 ${
                        errors.analyteCode
                          ? "border-red-500  "
                          : "border-gray-300"
                      } rounded-md`}
                      onChange={(e) => {
                        const analyte = JSON.parse(e.target.value) as any
                        onChange(analyte)
                        // setValue("analyteName", analyte.analyteName)
                        Stores.patientRegistationStore.updateSpecialResult({
                          ...Stores.patientRegistationStore.specialResult,
                          analyteCode: analyte.analyteCode,
                        //   analyteName: analyte.analyteName
                        })
                      }}
                    >
                      <option selected>Select</option>
                      {MasterAnalyteStore.masterAnalyteStore.listMasterAnalyte&&
                        MasterAnalyteStore.masterAnalyteStore.listMasterAnalyte.map(
                          (item: any, index: number) => (
                            <option key={index} value={JSON.stringify(item)}>
                              {`${item.analyteCode} - ${item.analyteName}`}
                            </option>
                          )
                        )}
                    </select>
                  </Form.InputWrapper>
                )}
                name="analyteCode"
                rules={{ required: true }}
                defaultValue=""
              />
              <Controller
                  control={control}
                  render={({ field: { onChange } }) => (
                    <Form.InputWrapper label="Result Type">
                      <select
                        value={Stores.patientRegistationStore.specialResult?.resultType}
                        className={`leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border-2 ${
                          errors.resultType
                            ? "border-red-500  "
                            : "border-gray-300"
                        } rounded-md`}
                        onChange={(e) => {
                          const resultType = e.target.value
                          onChange(resultType)
                          Stores.patientRegistationStore.updateSpecialResult({
                            ...Stores.patientRegistationStore.specialResult,
                            resultType,
                          })
                        }}
                      >
                        <option selected>Select</option>
                        {lookupItems(
                          stores.routerStore.lookupItems,
                          "SPECIAL RESULT - RESULT_TYPE"
                        ).map((item: any, index: number) => (
                          <option key={index} value={item.code}>
                            {`${item.value} - ${item.code}`}
                          </option>
                        ))}
                      </select>
                    </Form.InputWrapper>
                  )}
                  name="resultType"
                  rules={{ required: false }}
                  defaultValue=""
                />
                <Controller
                  control={control}
                  render={({ field: { onChange } }) => (
            <Form.InputWrapper
              label="Line No"
              id="optionLineNo"
              hasError={errors.lineNo}
            >
              <select
                name="optionPatientResult"
                className={`leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border-2 ${
                  errors.lineNo
                    ? "border-red-500  "
                    : "border-gray-300"
                } rounded-md`}
                onChange={(e) => {
                  const lineNo = e.target.value as string
                  onChange(lineNo)
                  Stores.patientRegistationStore.updateSpecialResult({
                    ...Stores.patientRegistationStore.specialResult,
                    lineNo,
                  })
                }}
              >
                <option selected>Select</option>
                {["1","2","3","4"].map((item: any, index: number) => (
                  <option key={index} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </Form.InputWrapper>
            )}
            name="lineNo"
            rules={{ required: false }}
            defaultValue=""
          />
          <Controller
                  control={control}
                  render={({ field: { onChange } }) => (
            <Form.InputWrapper
              label="Result Test"
              id="optionResultTest"
              hasError={errors.resultTest}
            >
              <select
                name="optionPatientResult"
                className={`leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border-2 ${
                  errors.resultTest
                    ? "border-red-500  "
                    : "border-gray-300"
                } rounded-md`}
                onChange={(e) => {
                  const resultTest = e.target.value as string
                  onChange(resultTest)
                  Stores.patientRegistationStore.updateSpecialResult({
                    ...Stores.patientRegistationStore.specialResult,
                    resultTest,
                  })
                }}
              >
                <option selected>Select</option>
                {["Corona +ve","Covid -ve"].map((item: any, index: number) => (
                  <option key={index} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </Form.InputWrapper>
            )}
            name="resultTest"
            rules={{ required: false }}
            defaultValue=""
          />
            <Controller
                  control={control}
                  render={({ field: { onChange } }) => (
                    <Form.Toggle
                      label="AbNormal"
                      id="txtAbNormal"
                      hasError={errors.history}
                      value={Stores.patientRegistationStore.specialResult?.abNormal}
                      onChange={(abNormal) => {
                        onChange(abNormal)
                        Stores.patientRegistationStore.updateSpecialResult({
                          ...Stores.patientRegistationStore.specialResult,
                          abNormal,
                        })
                      }}
                    />
                  )}
                  name="abNormal"
                  rules={{ required: false }}
                  defaultValue=""
                />
                    </List>
                    <List 
                    direction='col' fill space={4} justify='stretch'
                    >
                        <Controller
                  control={control}
                  render={({ field: { onChange } }) => (
            <Form.Input
              label="Ruler"
              name="txtRuler"
              placeholder={errors.ruler?"Please Enter Ruler":"Ruler"}
              hasError={errors.ruler}
              value={Stores.patientRegistationStore.specialResult?.ruler}
              onChange={(ruler) => {
                onChange(ruler)
                Stores.patientRegistationStore.updateSpecialResult({
                  ...Stores.patientRegistationStore.specialResult,
                  ruler,
                })
              }}
            />
            )}
              name="ruler"
              rules={{ required: true }}
              defaultValue=""
            />
            <Controller
                control={control}
                render={({ field: { onChange } }) => (
                  <Form.Input
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
              <Form.InputWrapper label="Environment">
                <select
                  value={Stores.patientRegistationStore.specialResult?.environment}
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
                    Stores.patientRegistationStore.updateSpecialResult({
                      ...Stores.patientRegistationStore.specialResult,
                      environment,
                    })
                  }}
                >
                  <option selected>
                        {stores.loginStore.login &&
                        stores.loginStore.login.role !== "SYSADMIN"
                          ? `Select`
                          : Stores.patientRegistationStore.specialResult?.environment || `Select`}
                      </option>
                  {lookupItems(stores.routerStore.lookupItems, "SPECIAL RESULT - ENVIRONMENT").map(
                    (item: any, index: number) => (
                      <option key={index} value={item.code}>
                        {`${item.value} - ${item.code}`}
                      </option>
                    )
                  )}
                </select>
              </Form.InputWrapper>
            )}
            name="environment"
            rules={{ required: true }}
            defaultValue=""
          />

                    </List>
                </Grid>
            </div>
            <br />
            <List direction="row" space={3} align="center">
                <Buttons.Button
                size="medium"
                type="solid"
                icon={Svg.Save}
                onClick={handleSubmit(onSubmitSpecialResult)}
                >
                Save
                </Buttons.Button>
                <Buttons.Button
                size="medium"
                type="outline"
                icon={Svg.Remove}
                onClick={() => {
                    window.location.reload()
                }}
                >
                Clear
                </Buttons.Button>
            </List>
            <div
        className="p-2 rounded-lg shadow-xl overflow-scroll"
        style={{ overflowX: "scroll" }}
      >
        <SpecialResultList
          data={Stores.patientRegistationStore.listSpecialResult}
          totalSize={Stores.patientRegistationStore.listSpecialResultCount}
          extraData={{
            lookupItems: stores.routerStore.lookupItems,
            
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
