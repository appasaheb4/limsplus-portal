/* eslint-disable */
import React, { useEffect } from "react"
import { observer } from "mobx-react"
import * as LibraryComponents from "@lp/library/components"
import * as LibraryUtils from "@lp/library/utils"
import { useForm, Controller } from "react-hook-form"
import * as FeatureComponents from "../../components"
import { Stores as MasterAnalyteStore } from "@lp/features/collection/masterAnalyte/stores"
import { Stores as LoginStore } from "@lp/features/login/stores"
import { Stores as TestMasterStore } from "@lp/features/collection/testMaster/stores"
import { Stores as DepartmentStore } from "@lp/features/collection/department/stores"
import { Stores as SectionStore } from "@lp/features/collection/section/stores"
import { Stores as LabStores } from "@lp/features/collection/labs/stores"
import "@lp/library/assets/css/accordion.css"
import {
    Accordion,
    AccordionItem,
    AccordionItemHeading,
    AccordionItemButton,
    AccordionItemPanel,
  } from 'react-accessible-accordion';
  import 'react-accessible-accordion/dist/fancy-example.css';
import { stores } from "@lp/stores"
import { toJS } from "mobx"
import { Stores } from "../../stores"
import { RouterFlow } from "@lp/flows"

interface PatientResultProps {
    onModalConfirm?: (item: any) => void
}
const PatientResult = observer((props: PatientResultProps)=>{
    const {
        control,
        handleSubmit,
        formState: { errors },
        setValue
      } = useForm()
      const onSubmitPatientResult = () =>{
          // api calling
      }
      useEffect(() => {
        if (stores.loginStore.login && stores.loginStore.login.role !== "SYSADMIN") {
          Stores.patientRegistationStore.updatePatientResult({
            ...Stores.patientRegistationStore.patientResult,
            environment: stores.loginStore.login.environment,
          })
          setValue("environment", stores.loginStore.login.environment)
        }
      }, [stores.loginStore.login])
    return( 
        <>
            <div className='p-2 rounded-lg shadow-xl'>
                <LibraryComponents.Atoms.Grid cols={3}>
                    <LibraryComponents.Atoms.List direction="col" space={4} fill justify='stretch'>
                    <Controller
                      control={control}
                      render={({ field: { onChange } }) => (
                    <LibraryComponents.Atoms.Form.InputWrapper
                      label="Visit Id"
                      hasError={errors.visitId}
                    >
                      <select
                        name="optionCollectionCenters"
                        className={`leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border-2 ${
                          errors.visitId
                            ? "border-red-500  "
                            : "border-gray-300"
                        } rounded-md`}
                        onChange={(e) => {
                          const visitId = e.target.value as string
                          onChange(visitId)
                          Stores.patientRegistationStore.updatePatientResult({
                            ...Stores.patientRegistationStore.patientResult,
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
                    </LibraryComponents.Atoms.Form.InputWrapper>
                    )}
                    name="visitId"
                    rules={{ required: false }}
                    defaultValue=""
                  />
                      <Controller
                            control={control}
                            render={({ field: { onChange } }) => (
                              <LibraryComponents.Atoms.Form.InputWrapper
                                label="PLab"
                                hasError={errors.pLab}
                              >
                                <select
                                  value={Stores.patientRegistationStore.patientSample?.pLab}
                                  disabled={
                                    stores.loginStore.login &&
                                    stores.loginStore.login.role !== "SYSADMIN"
                                      ? true
                                      : false
                                  }
                                  className={`leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border-2 ${
                                    errors.pLab ? "border-red-500" : "border-gray-300"
                                  } rounded-md`}
                                  onChange={(e) => {
                                    const pLab = e.target.value as string
                                    onChange(pLab)
                                    Stores.patientRegistationStore.updatePatientResult({
                                      ...Stores.patientRegistationStore.patientResult,
                                      pLab,
                                    })
                                  }}
                                >
                                  <option selected>Select</option>
                                  {LabStores.labStore.listLabs.map(
                                    (item: any, index: number) => (
                                      <option key={index} value={item.code}>
                                        {item.name}
                                      </option>
                                    )
                                  )}
                                </select>
                              </LibraryComponents.Atoms.Form.InputWrapper>
                            )}
                            name="pLab"
                            rules={{ required: true }}
                            defaultValue=""
                          />
                          <Controller
                            control={control}
                            render={({ field: { onChange } }) => (
                              <LibraryComponents.Atoms.Form.InputWrapper
                                label="Test Code"
                                hasError={errors.testCode}
                              >
                                <select
                                //   value={Stores.patientRegistationStore.patientResult?.testCode}
                                  className={`leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border-2 ${
                                    errors.testCode
                                      ? "border-red-500  "
                                      : "border-gray-300"
                                  } rounded-md`}
                                  onChange={(e) => {
                                    const test = JSON.parse(e.target.value) as any
                                    onChange(test)
                                    setValue("testName", test.testName)
                                    Stores.patientRegistationStore.updatePatientResult({
                                      ...Stores.patientRegistationStore.patientResult,
                                      testCode: test.testCode,
                                      testName: test.testName
                                    })
                                  }}
                                >
                                  <option selected>Select</option>
                                  {TestMasterStore.testMasterStore.listTestMaster &&
                                    TestMasterStore.testMasterStore.listTestMaster.map(
                                      (item: any, index: number) => (
                                        <option key={index} value={JSON.stringify(item)}>
                                          {`${item.testCode} - ${item.testName}`}
                                        </option>
                                      )
                                    )}
                                </select>
                              </LibraryComponents.Atoms.Form.InputWrapper>
                            )}
                            name="testCode"
                            rules={{ required: true }}
                            defaultValue=""
                          />
                          <Controller
                            control={control}
                            render={({ field: { onChange } }) => (
                              <LibraryComponents.Atoms.Form.Input
                                label="Test Name"
                                name="txtTestName"
                                disabled={true}
                                value={Stores.patientRegistationStore.patientResult?.testName}
                                placeholder={
                                  errors.testName ? "Please Enter Package TestName" : "Test Name"
                                }
                                hasError={errors.testName}
                              />
                            )}
                            name="testName"
                            rules={{ required: false }}
                            defaultValue=""
                          />
                          <Controller
                              control={control}
                              render={({ field: { onChange } }) => (
                        <LibraryComponents.Atoms.Form.Input
                          label="Sorter"
                          name="txtSorter"
                          placeholder={errors.sorter?"Please Enter Sorter":"Sorter"}
                          hasError={errors.sorter}
                          value={Stores.patientRegistationStore.patientVisit?.age}
                          onChange={(sorter) => {
                            onChange(sorter)
                            Stores.patientRegistationStore.updatePatientResult({
                              ...Stores.patientRegistationStore.patientResult,
                              sorter,
                            })
                          }}
                        />
                        )}
                          name="sorter"
                          rules={{ required: true }}
                          defaultValue=""
                        />
                        <Controller
                            control={control}
                            render={({ field: { onChange } }) => (
                              <LibraryComponents.Atoms.Form.InputWrapper
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
                                    setValue("analyteName", analyte.analyteName)
                                    Stores.patientRegistationStore.updatePatientResult({
                                      ...Stores.patientRegistationStore.patientResult,
                                      analyteCode: analyte.analyteCode,
                                      analyteName: analyte.analyteName
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
                              </LibraryComponents.Atoms.Form.InputWrapper>
                            )}
                            name="analyteCode"
                            rules={{ required: true }}
                            defaultValue=""
                          />
                          <Controller
                            control={control}
                            render={({ field: { onChange } }) => (
                              <LibraryComponents.Atoms.Form.Input
                                label="Analyte Name"
                                name="txtAnalyteName"
                                disabled={true}
                                value={Stores.patientRegistationStore.patientResult?.analyteName}
                                placeholder={
                                  errors.analyteName ? "Please Enter Package AnalyteName" : "AnalyteName"
                                }
                                hasError={errors.analyteName}
                              />
                            )}
                            name="analyteName"
                            rules={{ required: false }}
                            defaultValue=""
                          />
                          <Controller
                            control={control}
                            render={({ field: { onChange } }) => (
                              <LibraryComponents.Atoms.Form.InputWrapper
                                label="Department"
                                hasError={errors.department}
                              >
                                <select
                                  className={`leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border-2 ${
                                    errors.department ? "border-red-500" : "border-gray-300"
                                  } rounded-md`}
                                  onChange={(e) => {
                                    const department = e.target.value as string
                                    onChange(department)
                                    Stores.patientRegistationStore.updatePatientResult({
                                      ...Stores.patientRegistationStore.patientResult,
                                      department,
                                    })
                                  }}
                                >
                                  <option selected>Select</option>
                                  {DepartmentStore.departmentStore.listDepartment.map(
                                    (item: any, index: number) => (
                                      <option key={index} value={item.code}>
                                        {`${item.code} - ${item.name}`}
                                      </option>
                                    )
                                  )}
                                </select>
                              </LibraryComponents.Atoms.Form.InputWrapper>
                            )}
                            name="department"
                            rules={{ required: true }}
                            defaultValue=""
                          />
                          <Controller
                            control={control}
                            render={({ field: { onChange } }) => (
                              <LibraryComponents.Atoms.Form.InputWrapper
                                label="Section"
                                hasError={errors.section}
                              >
                                <select
                                  className={`leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border-2 ${
                                    errors.section ? "border-red-500" : "border-gray-300"
                                  } rounded-md`}
                                  onChange={(e) => {
                                    const section = e.target.value as string
                                    onChange(section)
                                    Stores.patientRegistationStore.updatePatientResult({
                                      ...Stores.patientRegistationStore.patientResult,
                                      section,
                                    })
                                  }}
                                >
                                  <option selected>Select</option>
                                  {SectionStore.sectionStore.listSection.map(
                                    (item: any, index: number) => (
                                      <option key={index} value={item.code}>
                                        {`${item.code} - ${item.name}`}
                                      </option>
                                    )
                                  )}
                                </select>
                              </LibraryComponents.Atoms.Form.InputWrapper>
                            )}
                            name="section"
                            rules={{ required: true }}
                            defaultValue=""
                          />
              
                    </LibraryComponents.Atoms.List>
                    <LibraryComponents.Atoms.List direction='col' fill justify='stretch' space={4}>
                      <Controller
                          control={control}
                          render={({ field: { onChange } }) => (
                            <LibraryComponents.Atoms.Form.InputWrapper label="Result Type">
                              <select
                                value={Stores.patientRegistationStore.patientResult?.resultType}
                                className={`leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border-2 ${
                                  errors.resultType
                                    ? "border-red-500  "
                                    : "border-gray-300"
                                } rounded-md`}
                                onChange={(e) => {
                                  const resultType = e.target.value
                                  onChange(resultType)
                                  Stores.patientRegistationStore.updatePatientResult({
                                    ...Stores.patientRegistationStore.patientResult,
                                    resultType,
                                  })
                                }}
                              >
                                <option selected>Select</option>
                                {LibraryUtils.lookupItems(
                                  stores.routerStore.lookupItems,
                                  "PATIENT RESULT - RESULT_TYPE"
                                ).map((item: any, index: number) => (
                                  <option key={index} value={item.code}>
                                    {`${item.value} - ${item.code}`}
                                  </option>
                                ))}
                              </select>
                            </LibraryComponents.Atoms.Form.InputWrapper>
                          )}
                          name="resultType"
                          rules={{ required: false }}
                          defaultValue=""
                        />
                        <Controller
                          control={control}
                          render={({ field: { onChange } }) => (
                            <LibraryComponents.Atoms.Form.Input
                              label="Raw Value"
                              name="txtRawValue"
                              placeholder={errors.rawValue?"Please Enter RawValue":"RawValue"}
                              hasError={errors.rawValue}
                              value={Stores.patientRegistationStore.patientResult?.rawValue}
                              onChange={(rawValue) => {
                                onChange(rawValue)
                                Stores.patientRegistationStore.updatePatientResult({
                                  ...Stores.patientRegistationStore.patientResult,
                                  rawValue,
                                })
                              }}
                            />
                            )}
                              name="rawValue"
                              rules={{ required: true }}
                              defaultValue=""
                            />
                            <Controller
                                  control={control}
                                  render={({ field: { onChange } }) => (
                            <LibraryComponents.Atoms.Form.Input
                              label="Alpha"
                              name="txtAlpha"
                              placeholder={errors.alpha?"Please Enter Alpha":"Alpha"}
                              hasError={errors.alpha}
                              value={Stores.patientRegistationStore.patientResult?.alpha}
                              onChange={(alpha) => {
                                onChange(alpha)
                                Stores.patientRegistationStore.updatePatientResult({
                                  ...Stores.patientRegistationStore.patientResult,
                                  alpha,
                                })
                              }}
                            />
                            )}
                              name="alpha"
                              rules={{ required: true }}
                              defaultValue=""
                            />
                              <Controller
                                    control={control}
                                    render={({ field: { onChange } }) => (
                              <LibraryComponents.Atoms.Form.Input
                                label="Value"
                                name="txtValue"
                                placeholder={errors.value?"Please Enter Value":"Value"}
                                hasError={errors.value}
                                value={Stores.patientRegistationStore.patientResult?.value}
                                onChange={(value) => {
                                  onChange(value)
                                  Stores.patientRegistationStore.updatePatientResult({
                                    ...Stores.patientRegistationStore.patientResult,
                                    value,
                                  })
                                }}
                              />
                              )}
                                name="value"
                                rules={{ required: true }}
                                defaultValue=""
                              />
                              <Controller
                                    control={control}
                                    render={({ field: { onChange } }) => (
                              <LibraryComponents.Atoms.Form.Input
                                label="Result"
                                name="txtResult"
                                placeholder={errors.result?"Please Enter Result":"Result"}
                                hasError={errors.result}
                                value={Stores.patientRegistationStore.patientResult?.result}
                                onChange={(result) => {
                                  onChange(result)
                                  Stores.patientRegistationStore.updatePatientResult({
                                    ...Stores.patientRegistationStore.patientResult,
                                    result,
                                  })
                                }}
                              />
                              )}
                                name="result"
                                rules={{ required: true }}
                                defaultValue=""
                              />
                                <Controller
                                      control={control}
                                      render={({ field: { onChange } }) => (
                                <LibraryComponents.Atoms.Form.Input
                                  label="Units"
                                  name="txtUnits"
                                  placeholder={errors.units?"Please Enter Units":"Units"}
                                  hasError={errors.units}
                                  value={Stores.patientRegistationStore.patientResult?.units}
                                  onChange={(units) => {
                                    onChange(units)
                                    Stores.patientRegistationStore.updatePatientResult({
                                      ...Stores.patientRegistationStore.patientResult,
                                      units,
                                    })
                                  }}
                                />
                                )}
                                  name="units"
                                  rules={{ required: true }}
                                  defaultValue=""
                                />
                    <LibraryComponents.Atoms.Grid cols={3}>
                            <Controller
                          control={control}
                          render={({ field: { onChange } }) => (
                            <LibraryComponents.Atoms.Form.Toggle
                              label="AbNormal"
                              id="txtAbNormal"
                              hasError={errors.abNormal}
                              value={Stores.patientRegistationStore.patientResult?.abNormal}
                              onChange={(abNormal) => {
                                onChange(abNormal)
                                Stores.patientRegistationStore.updatePatientResult({
                                  ...Stores.patientRegistationStore.patientResult,
                                  abNormal,
                                })
                              }}
                            />
                          )}
                          name="abNormal"
                          rules={{ required: false }}
                          defaultValue=""
                        />
                        <Controller
                          control={control}
                          render={({ field: { onChange } }) => (
                            <LibraryComponents.Atoms.Form.Toggle
                              label="Critical"
                              id="txtCritical"
                              hasError={errors.critical}
                              value={Stores.patientRegistationStore.patientResult?.critical}
                              onChange={(critical) => {
                                onChange(critical)
                                Stores.patientRegistationStore.updatePatientResult({
                                  ...Stores.patientRegistationStore.patientResult,
                                  critical,
                                })
                              }}
                            />
                          )}
                          name="critical"
                          rules={{ required: false }}
                          defaultValue=""
                        />
                        <Controller
                          control={control}
                          render={({ field: { onChange } }) => (
                            <LibraryComponents.Atoms.Form.Toggle
                              label="Hold"
                              id="txtHold"
                              hasError={errors.history}
                              value={Stores.patientRegistationStore.patientResult?.hold}
                              onChange={(hold) => {
                                onChange(hold)
                                Stores.patientRegistationStore.updatePatientResult({
                                  ...Stores.patientRegistationStore.patientResult,
                                  hold,
                                })
                              }}
                            />
                          )}
                          name="hold"
                          rules={{ required: false }}
                          defaultValue=""
                        />
                    </LibraryComponents.Atoms.Grid>
                    </LibraryComponents.Atoms.List>
                    
                    <LibraryComponents.Atoms.List direction='col' fill justify='stretch' space={4}>
                            <Controller
                    control={control}
                    render={({ field: { onChange } }) => (
                    <LibraryComponents.Atoms.Form.InputDate
                      label="Result Date"
                      name="txtResultDate"
                      placeholder={errors.resultDate?"Please Enter ResultDate":"Result Date"}
                      hasError={errors.resultDate}
                      value={LibraryUtils.moment(
                        Stores.patientRegistationStore.patientResult?.resultDate
                      ).format("YYYY-MM-DD")}
                      onChange={(e) => {
                        let resultDate = new Date(e.target.value)
                        onChange(resultDate)
                        const formatDate = LibraryUtils.moment(resultDate).format(
                          "YYYY-MM-DD HH:mm"
                        )
                        
                        Stores.patientRegistationStore.updatePatientResult({
                          ...Stores.patientRegistationStore.patientResult,
                          resultDate: new Date(formatDate),
                        })
                      }}
                    />
                    )}
                      name="resultDate"
                      rules={{ required: true }}
                      defaultValue=""
                    />
                    <Controller
                    control={control}
                    render={({ field: { onChange } }) => (
                    <LibraryComponents.Atoms.Form.InputDate
                      label="Release Date"
                      name="txtReleaseDate"
                      placeholder={errors.releaseDate?"Please Enter ReleaseDate":"Release Date"}
                      hasError={errors.releaseDate}
                      value={LibraryUtils.moment(
                        Stores.patientRegistationStore.patientResult?.releaseDate
                      ).format("YYYY-MM-DD")}
                      onChange={(e) => {
                        let releaseDate = new Date(e.target.value)
                        onChange(releaseDate)
                        const formatDate = LibraryUtils.moment(releaseDate).format(
                          "YYYY-MM-DD HH:mm"
                        )
                        
                        Stores.patientRegistationStore.updatePatientResult({
                          ...Stores.patientRegistationStore.patientResult,
                          releaseDate: new Date(formatDate),
                        })
                      }}
                    />
                    )}
                      name="releaseDate"
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
                                value={Stores.patientRegistationStore.patientResult?.status}
                                className={`leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border-2 ${
                                  errors.status
                                    ? "border-red-500  "
                                    : "border-gray-300"
                                } rounded-md`}
                                onChange={(e) => {
                                  const status = e.target.value
                                  onChange(status)
                                  Stores.patientRegistationStore.updatePatientResult({
                                    ...Stores.patientRegistationStore.patientResult,
                                    status,
                                  })
                                }}
                              >
                                <option selected>Select</option>
                                {LibraryUtils.lookupItems(
                                  stores.routerStore.lookupItems,
                                  "PATIENT RESULT - STATUS"
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
            <br />
            <div className='extra' style={{border:'1px solid yellow'}}>
        <Accordion allowZeroExpanded>
            <AccordionItem>
                <AccordionItemHeading>
                    <AccordionItemButton>
                        EXTRA DATA
                    </AccordionItemButton>
                </AccordionItemHeading>
                <AccordionItemPanel>
                    <>
                          <LibraryComponents.Atoms.Grid cols={3}>
                            <LibraryComponents.Atoms.List direction='col' justify='stretch' fill space={4}>
                            <Controller
                control={control}
                render={({ field: { onChange } }) => (
                  <LibraryComponents.Atoms.Form.InputWrapper
                    label="Analyte Type"
                    hasError={errors.analyteType}
                  >
                    <select
                      className={`leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border-2 ${
                        errors.analyteType
                          ? "border-red-500  "
                          : "border-gray-300"
                      } rounded-md`}
                      onChange={(e) => {
                        const analyte = JSON.parse(e.target.value) as any
                        onChange(analyte)
                        Stores.patientRegistationStore.updatePatientResult({
                          ...Stores.patientRegistationStore.patientResult,
                          analyteType: analyte.analyteType,
                        })
                      }}
                    >
                      <option selected>Select</option>
                      {MasterAnalyteStore.masterAnalyteStore.listMasterAnalyte&&
                        MasterAnalyteStore.masterAnalyteStore.listMasterAnalyte.map(
                          (item: any, index: number) => (
                            <option key={index} value={JSON.stringify(item)}>
                              {`${item.analyteType}`}
                            </option>
                          )
                        )}
                    </select>
                  </LibraryComponents.Atoms.Form.InputWrapper>
                )}
                name="analyteType"
                rules={{ required: true }}
                defaultValue=""
              />
              <Controller
                  control={control}
                  render={({ field: { onChange } }) => (
                    <LibraryComponents.Atoms.Form.InputFile
                      label="Picture"
                      placeholder="File"
                      onChange={(e) => {
                        const picture = e.target.files[0]
                        onChange(picture)
                        Stores.patientRegistationStore.updatePatientResult({
                          ...Stores.patientRegistationStore.patientResult,
                          picture,
                        })
                      }}
                    />
                  )}
                  name="picture"
                  rules={{ required: false }}
                  defaultValue=""
                />
                <Controller
                control={control}
                render={({ field: { onChange } }) => (
                  <LibraryComponents.Atoms.Form.InputWrapper
                    label="Test Version"
                    hasError={errors.testCode}
                  >
                    <select
                    //   value={Stores.patientRegistationStore.patientResult?.testCode}
                      className={`leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border-2 ${
                        errors.testCode
                          ? "border-red-500  "
                          : "border-gray-300"
                      } rounded-md`}
                      onChange={(e) => {
                        const test = JSON.parse(e.target.value) as any
                        onChange(test)
                        Stores.patientRegistationStore.updatePatientResult({
                          ...Stores.patientRegistationStore.patientResult,
                          testVersion: test.version,
                        })
                      }}
                    >
                      <option selected>Select</option>
                      {TestMasterStore.testMasterStore.listTestMaster &&
                        TestMasterStore.testMasterStore.listTestMaster.map(
                          (item: any, index: number) => (
                            <option key={index} value={JSON.stringify(item)}>
                              {`${item.version}`}
                            </option>
                          )
                        )}
                    </select>
                  </LibraryComponents.Atoms.Form.InputWrapper>
                )}
                name="testVersion"
                rules={{ required: true }}
                defaultValue=""
              />
               <Controller
                control={control}
                render={({ field: { onChange } }) => (
                  <LibraryComponents.Atoms.Form.InputWrapper
                    label="Analyte Version"
                    hasError={errors.analyteVersion}
                  >
                    <select
                      className={`leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border-2 ${
                        errors.analyteVersion
                          ? "border-red-500  "
                          : "border-gray-300"
                      } rounded-md`}
                      onChange={(e) => {
                        const analyte = JSON.parse(e.target.value) as any
                        onChange(analyte)
                        Stores.patientRegistationStore.updatePatientResult({
                          ...Stores.patientRegistationStore.patientResult,
                          analyteVersion: analyte.version,
                        })
                      }}
                    >
                      <option selected>Select</option>
                      {MasterAnalyteStore.masterAnalyteStore.listMasterAnalyte&&
                        MasterAnalyteStore.masterAnalyteStore.listMasterAnalyte.map(
                          (item: any, index: number) => (
                            <option key={index} value={JSON.stringify(item)}>
                              {`${item.version}`}
                            </option>
                          )
                        )}
                    </select>
                  </LibraryComponents.Atoms.Form.InputWrapper>
                )}
                name="analyteVersion"
                rules={{ required: true }}
                defaultValue=""
              />
               <Controller
                  control={control}
                  render={({ field: { onChange } }) => (
            <LibraryComponents.Atoms.Form.Input
              label="Calci Name"
              name="txtCalciName"
              placeholder={errors.calciName?"Please Enter CalciName":"CalciName"}
              hasError={errors.calciName}
              value={Stores.patientRegistationStore.patientResult?.calciName}
              onChange={(calciName) => {
                onChange(calciName)
                Stores.patientRegistationStore.updatePatientResult({
                  ...Stores.patientRegistationStore.patientResult,
                  calciName,
                })
              }}
            />
            )}
              name="calciName"
              rules={{ required: true }}
              defaultValue=""
            />
            <Controller
                  control={control}
                  render={({ field: { onChange } }) => (
            <LibraryComponents.Atoms.Form.Input
              label="Calculation"
              name="txtCalculation"
              placeholder={errors.calculation?"Please Enter Calculation":"Calculation"}
              hasError={errors.calculation}
              value={Stores.patientRegistationStore.patientResult?.calculation}
              onChange={(calculation) => {
                onChange(calculation)
                Stores.patientRegistationStore.updatePatientResult({
                  ...Stores.patientRegistationStore.patientResult,
                  calculation,
                })
              }}
            />
            )}
              name="calculation"
              rules={{ required: true }}
              defaultValue=""
            />
            <Controller
                  control={control}
                  render={({ field: { onChange } }) => (
            <LibraryComponents.Atoms.Form.Input
              label="Formula"
              name="txtFormula"
              placeholder={errors.formula?"Please Enter Formula":"Formula"}
              hasError={errors.formula}
              value={Stores.patientRegistationStore.patientResult?.formula}
              onChange={(formula) => {
                onChange(formula)
                Stores.patientRegistationStore.updatePatientResult({
                  ...Stores.patientRegistationStore.patientResult,
                  formula,
                })
              }}
            />
            )}
              name="formula"
              rules={{ required: true }}
              defaultValue=""
            />
            <Controller
                  control={control}
                  render={({ field: { onChange } }) => (
            <LibraryComponents.Atoms.Form.Input
              label="DilutionValue"
              name="txtFormula"
              placeholder={errors.dilutionValue?"Please Enter DilutionValue":"DilutionValue"}
              hasError={errors.dilutionValue}
              value={Stores.patientRegistationStore.patientResult?.dilutionValue}
              onChange={(dilutionValue) => {
                onChange(dilutionValue)
                Stores.patientRegistationStore.updatePatientResult({
                  ...Stores.patientRegistationStore.patientResult,
                  dilutionValue,
                })
              }}
            />
            )}
              name="dilutionValue"
              rules={{ required: true }}
              defaultValue=""
            />
            <Controller
                  control={control}
                  render={({ field: { onChange } }) => (
            <LibraryComponents.Atoms.Form.InputWrapper
              label="Repitation"
              id="optionRepitation"
              hasError={errors.repitation}
            >
              <select
                name="optionRepitation"
                className={`leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border-2 ${
                  errors.repitation
                    ? "border-red-500  "
                    : "border-gray-300"
                } rounded-md`}
                onChange={(e) => {
                  const repitation = e.target.value as string
                  onChange(repitation)
                  Stores.patientRegistationStore.updatePatientResult({
                    ...Stores.patientRegistationStore.patientResult,
                    repitation,
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
            </LibraryComponents.Atoms.Form.InputWrapper>
            )}
            name="repitation"
            rules={{ required: false }}
            defaultValue=""
          />
          <Controller
                  control={control}
                  render={({ field: { onChange } }) => (
            <LibraryComponents.Atoms.Form.Input
              label="Instrument Type"
              name="txtInstrumentType"
              placeholder={errors.instrumentType?"Please Enter Instrument Type":"Instrument Type"}
              hasError={errors.instrumentType}
              value={Stores.patientRegistationStore.patientResult?.instrumentType}
              onChange={(instrumentType) => {
                onChange(instrumentType)
                Stores.patientRegistationStore.updatePatientResult({
                  ...Stores.patientRegistationStore.patientResult,
                  instrumentType,
                })
              }}
            />
            )}
              name="instrumentType"
              rules={{ required: true }}
              defaultValue=""
            />

            <LibraryComponents.Atoms.Grid cols={3}> 
            <Controller
                  control={control}
                  render={({ field: { onChange } }) => (
                    <LibraryComponents.Atoms.Form.Toggle
                      label="CalcFlag"
                      id="txtCalcFlag"
                      hasError={errors.calcFlag}
                      value={Stores.patientRegistationStore.patientResult?.calcFlag}
                      onChange={(calcFlag) => {
                        onChange(calcFlag)
                        Stores.patientRegistationStore.updatePatientResult({
                          ...Stores.patientRegistationStore.patientResult,
                          calcFlag,
                        })
                      }}
                    />
                  )}
                  name="calcFlag"
                  rules={{ required: false }}
                  defaultValue=""
                />
                <Controller
                  control={control}
                  render={({ field: { onChange } }) => (
                    <LibraryComponents.Atoms.Form.Toggle
                      label="ReTest"
                      id="txtReTest"
                      hasError={errors.reTest}
                      value={Stores.patientRegistationStore.patientResult?.reTest}
                      onChange={(reTest) => {
                        onChange(reTest)
                        Stores.patientRegistationStore.updatePatientResult({
                          ...Stores.patientRegistationStore.patientResult,
                          reTest,
                        })
                      }}
                    />
                  )}
                  name="reTest"
                  rules={{ required: false }}
                  defaultValue=""
                />
                <Controller
                  control={control}
                  render={({ field: { onChange } }) => (
                    <LibraryComponents.Atoms.Form.Toggle
                      label="ReRun"
                      id="txtReRun"
                      hasError={errors.reRun}
                      value={Stores.patientRegistationStore.patientResult?.reRun}
                      onChange={(reRun) => {
                        onChange(reRun)
                        Stores.patientRegistationStore.updatePatientResult({
                          ...Stores.patientRegistationStore.patientResult,
                          reRun,
                        })
                      }}
                    />
                  )}
                  name="reRun"
                  rules={{ required: false }}
                  defaultValue=""
                />
            </LibraryComponents.Atoms.Grid>
                            </LibraryComponents.Atoms.List>

                            <LibraryComponents.Atoms.List
                              direction='col'
                              space={4}
                              fill
                              justify='stretch'
                            >
                              <Controller
                                    control={control}
                                    render={({ field: { onChange } }) => (
                              <LibraryComponents.Atoms.Form.Input
                                label="Instrument Id"
                                name="txtInstrumentId"
                                placeholder={errors.instrumentId?"Please Enter Instrument Id":"Instrument Id"}
                                hasError={errors.instrumentId}
                                value={Stores.patientRegistationStore.patientResult?.instrumentId}
                                onChange={(instrumentId) => {
                                  onChange(instrumentId)
                                  Stores.patientRegistationStore.updatePatientResult({
                                    ...Stores.patientRegistationStore.patientResult,
                                    instrumentId,
                                  })
                                }}
                              />
                              )}
                                name="instrumentId"
                                rules={{ required: true }}
                                defaultValue=""
                              />
                              <Controller
                                  control={control}
                                  render={({ field: { onChange } }) => (
                            <LibraryComponents.Atoms.Form.Input
                              label="Instrument Result"
                              name="txtInstrumentResult"
                              placeholder={errors.instrumentResult?"Please Enter Instrument Result":"Instrument Result"}
                              hasError={errors.instrumentResult}
                              value={Stores.patientRegistationStore.patientResult?.instrumentResult}
                              onChange={(instrumentResult) => {
                                onChange(instrumentResult)
                                Stores.patientRegistationStore.updatePatientResult({
                                  ...Stores.patientRegistationStore.patientResult,
                                  instrumentResult,
                                })
                              }}
                            />
                            )}
                              name="instrumentResult"
                              rules={{ required: true }}
                              defaultValue=""
                            />
                            <Controller
                              control={control}
                              render={({ field: { onChange } }) => (
                              <LibraryComponents.Atoms.Form.InputDate
                                label="Analyzed Date"
                                name="txtAnalyzedDate"
                                placeholder={errors.analyzedDate?"Please Enter BirthDate":"BirthDate"}
                                hasError={errors.analyzedDate}
                                value={LibraryUtils.moment(
                                  Stores.patientRegistationStore.patientResult?.analyzedDate
                                ).format("YYYY-MM-DD")}
                                onChange={(e) => {
                                  let analyzedDate = new Date(e.target.value)
                                  onChange(analyzedDate)
                                  const formatDate = LibraryUtils.moment(analyzedDate).format(
                                    "YYYY-MM-DD HH:mm"
                                  )
                                  
                                  Stores.patientRegistationStore.updatePatientResult({
                                    ...Stores.patientRegistationStore.patientResult,
                                    analyzedDate: new Date(formatDate),
                                  })
                                }}
                              />
                              )}
                                name="analyzedDate"
                                rules={{ required: true }}
                                defaultValue=""
                              />
                              <Controller
                                  control={control}
                                  render={({ field: { onChange } }) => (
                            <LibraryComponents.Atoms.Form.Input
                              label="Instrument Unit"
                              name="txtInstrumentUnit"
                              placeholder={errors.instrumentUnit?"Please Enter Instrument Unit":"Instrument Unit"}
                              hasError={errors.instrumentUnit}
                              value={Stores.patientRegistationStore.patientResult?.instrumentUnit}
                              onChange={(instrumentUnit) => {
                                onChange(instrumentUnit)
                                Stores.patientRegistationStore.updatePatientResult({
                                  ...Stores.patientRegistationStore.patientResult,
                                  instrumentUnit,
                                })
                              }}
                            />
                            )}
                              name="instrumentUnit"
                              rules={{ required: true }}
                              defaultValue=""
                            />
                            <Controller
                                  control={control}
                                  render={({ field: { onChange } }) => (
                            <LibraryComponents.Atoms.Form.Input
                              label="Lonic Code"
                              name="txtLoniCode"
                              placeholder={errors.lonicCode?"Please Enter Lonic Code":"Lonic Code"}
                              hasError={errors.lonicCode}
                              value={Stores.patientRegistationStore.patientResult?.lonicCode}
                              onChange={(lonicCode) => {
                                onChange(lonicCode)
                                Stores.patientRegistationStore.updatePatientResult({
                                  ...Stores.patientRegistationStore.patientResult,
                                  lonicCode,
                                })
                              }}
                            />
                            )}
                              name="lonicCode"
                              rules={{ required: true }}
                              defaultValue=""
                            />
                            <Controller
                                  control={control}
                                  render={({ field: { onChange } }) => (
                            <LibraryComponents.Atoms.Form.Input
                              label="Price"
                              name="txtPrice"
                              placeholder={errors.price?"Please Enter Price":"Price"}
                              hasError={errors.price}
                              value={Stores.patientRegistationStore.patientResult?.price}
                              type='number'
                              onChange={(price) => {
                                onChange(price)
                                Stores.patientRegistationStore.updatePatientResult({
                                  ...Stores.patientRegistationStore.patientResult,
                                  price,
                                })
                              }}
                            />
                            )}
                              name="price"
                              rules={{ required: true }}
                              defaultValue=""
                            />
                            <Controller
                                  control={control}
                                  render={({ field: { onChange } }) => (
                            <LibraryComponents.Atoms.Form.Input
                              label="PLaterUnno"
                              name="txtPLaterUnno"
                              placeholder={errors.pLaterUnno?"Please Enter PLaterUnno":"PLaterUnno"}
                              hasError={errors.pLaterUnno}
                              value={Stores.patientRegistationStore.patientResult?.pLaterUnno}
                              onChange={(pLaterUnno) => {
                                onChange(pLaterUnno)
                                Stores.patientRegistationStore.updatePatientResult({
                                  ...Stores.patientRegistationStore.patientResult,
                                  pLaterUnno,
                                })
                              }}
                            />
                            )}
                              name="pLaterUnno"
                              rules={{ required: true }}
                              defaultValue=""
                            />
                            <Controller
                                  control={control}
                                  render={({ field: { onChange } }) => (
                            <LibraryComponents.Atoms.Form.Input
                              label="Runno"
                              name="txtRunno"
                              placeholder={errors.runno?"Please Enter Runno":"Runno"}
                              hasError={errors.runno}
                              value={Stores.patientRegistationStore.patientResult?.runno}
                              onChange={(runno) => {
                                onChange(runno)
                                Stores.patientRegistationStore.updatePatientResult({
                                  ...Stores.patientRegistationStore.patientResult,
                                  runno,
                                })
                              }}
                            />
                            )}
                              name="runno"
                              rules={{ required: true }}
                              defaultValue=""
                            />
                            <Controller
                                  control={control}
                                  render={({ field: { onChange } }) => (
                            <LibraryComponents.Atoms.Form.Input
                              label="Cupno"
                              name="txtRunno"
                              placeholder={errors.cupno?"Please Enter Cupno":"Cupno"}
                              hasError={errors.cupno}
                              value={Stores.patientRegistationStore.patientResult?.cupno}
                              onChange={(cupno) => {
                                onChange(cupno)
                                Stores.patientRegistationStore.updatePatientResult({
                                  ...Stores.patientRegistationStore.patientResult,
                                  cupno,
                                })
                              }}
                            />
                            )}
                              name="cupno"
                              rules={{ required: true }}
                              defaultValue=""
                            />
                            <LibraryComponents.Atoms.Grid cols={5}> 
                        <Controller
                              control={control}
                              render={({ field: { onChange } }) => (
                                <LibraryComponents.Atoms.Form.Toggle
                                  label="Confidental"
                                  id="txtConfidental"
                                  hasError={errors.confidental}
                                  value={Stores.patientRegistationStore.patientResult?.confidental}
                                  onChange={(confidental) => {
                                    onChange(confidental)
                                    Stores.patientRegistationStore.updatePatientResult({
                                      ...Stores.patientRegistationStore.patientResult,
                                      confidental,
                                    })
                                  }}
                                />
                              )}
                              name="confidental"
                              rules={{ required: false }}
                              defaultValue=""
                            />
                            <Controller
                              control={control}
                              render={({ field: { onChange } }) => (
                                <LibraryComponents.Atoms.Form.Toggle
                                  label="WorkFlow"
                                  id="txtWorkFlow"
                                  hasError={errors.workFlow}
                                  value={Stores.patientRegistationStore.patientResult?.workFlow}
                                  onChange={(workFlow) => {
                                    onChange(workFlow)
                                    Stores.patientRegistationStore.updatePatientResult({
                                      ...Stores.patientRegistationStore.patientResult,
                                      workFlow,
                                    })
                                  }}
                                />
                              )}
                              name="workFlow"
                              rules={{ required: false }}
                              defaultValue=""
                            />
                            <Controller
                              control={control}
                              render={({ field: { onChange } }) => (
                                <LibraryComponents.Atoms.Form.Toggle
                                  label="Attachment"
                                  id="txtAttachment"
                                  hasError={errors.attachment}
                                  value={Stores.patientRegistationStore.patientResult?.attachment}
                                  onChange={(attachment) => {
                                    onChange(attachment)
                                    Stores.patientRegistationStore.updatePatientResult({
                                      ...Stores.patientRegistationStore.patientResult,
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
                                <LibraryComponents.Atoms.Form.Toggle
                                  label="Result Reportable"
                                  id="txtResultReportable"
                                  hasError={errors.resultReportable}
                                  value={Stores.patientRegistationStore.patientResult?.resultReportable}
                                  onChange={(resultReportable) => {
                                    onChange(resultReportable)
                                    Stores.patientRegistationStore.updatePatientResult({
                                      ...Stores.patientRegistationStore.patientResult,
                                      resultReportable,
                                    })
                                  }}
                                />
                              )}
                              name="resultReportable"
                              rules={{ required: false }}
                              defaultValue=""
                            />
                            <Controller
                              control={control}
                              render={({ field: { onChange } }) => (
                                <LibraryComponents.Atoms.Form.Toggle
                                  label="Range Reportable"
                                  id="txtRangeReportable"
                                  hasError={errors.attachment}
                                  value={Stores.patientRegistationStore.patientResult?.rangeReportable}
                                  onChange={(rangeReportable) => {
                                    onChange(rangeReportable)
                                    Stores.patientRegistationStore.updatePatientResult({
                                      ...Stores.patientRegistationStore.patientResult,
                                      rangeReportable,
                                    })
                                  }}
                                />
                              )}
                              name="rangeReportable"
                              rules={{ required: false }}
                              defaultValue=""
                            />
                        </LibraryComponents.Atoms.Grid>
                            </LibraryComponents.Atoms.List>
                            <LibraryComponents.Atoms.List direction='col' justify='stretch' fill space={4}>
                            
                            <Controller
                                  control={control}
                                  render={({ field: { onChange } }) => (
                            <LibraryComponents.Atoms.Form.Input
                              label="Species"
                              name="txtSpecies"
                              placeholder={errors.species?"Please Enter Species":"Species"}
                              hasError={errors.species}
                              value={Stores.patientRegistationStore.patientResult?.species}
                              onChange={(species) => {
                                onChange(species)
                                Stores.patientRegistationStore.updatePatientResult({
                                  ...Stores.patientRegistationStore.patientResult,
                                  species,
                                })
                              }}
                            />
                            )}
                              name="species"
                              rules={{ required: true }}
                              defaultValue=""
                            />
                            <Controller
                                  control={control}
                                  render={({ field: { onChange } }) => (
                            <LibraryComponents.Atoms.Form.Input
                              label="Delta Flag"
                              name="txtDeltaFlag"
                              placeholder={errors.deltaFlag?"Please Enter Delta Flag":"Delta Flag"}
                              hasError={errors.deltaFlag}
                              value={Stores.patientRegistationStore.patientResult?.deltaFlag}
                              onChange={(deltaFlag) => {
                                onChange(deltaFlag)
                                Stores.patientRegistationStore.updatePatientResult({
                                  ...Stores.patientRegistationStore.patientResult,
                                  deltaFlag,
                                })
                              }}
                            />
                            )}
                              name="deltaFlag"
                              rules={{ required: true }}
                              defaultValue=""
                            />
                            <Controller
                                  control={control}
                                  render={({ field: { onChange } }) => (
                            <LibraryComponents.Atoms.Form.Input
                              label="Delta Value"
                              name="txtDeltaValue"
                              placeholder={errors.deltaValue?"Please Enter DeltaValue":"DeltaValue"}
                              hasError={errors.deltaValue}
                              value={Stores.patientRegistationStore.patientResult?.deltaValue}
                              onChange={(deltaValue) => {
                                onChange(deltaValue)
                                Stores.patientRegistationStore.updatePatientResult({
                                  ...Stores.patientRegistationStore.patientResult,
                                  deltaValue,
                                })
                              }}
                            />
                            )}
                              name="deltaValue"
                              rules={{ required: true }}
                              defaultValue=""
                            />
                            <Controller
                                  control={control}
                                  render={({ field: { onChange } }) => (
                            <LibraryComponents.Atoms.Form.Input
                              label="QcFlag"
                              name="txtQcFlag"
                              placeholder={errors.qcFlag?"Please Enter QcFlag":"QcFlag"}
                              hasError={errors.qcFlag}
                              value={Stores.patientRegistationStore.patientResult?.qcFlag}
                              onChange={(qcFlag) => {
                                onChange(qcFlag)
                                Stores.patientRegistationStore.updatePatientResult({
                                  ...Stores.patientRegistationStore.patientResult,
                                  qcFlag,
                                })
                              }}
                            />
                            )}
                              name="qcFlag"
                              rules={{ required: true }}
                              defaultValue=""
                            />
                            <Controller
                                  control={control}
                                  render={({ field: { onChange } }) => (
                            <LibraryComponents.Atoms.Form.Input
                              label="QcStatus"
                              name="txtQcStatus"
                              placeholder={errors.qcStatus?"Please Enter QcStatus":"QcStatus"}
                              hasError={errors.qcStatus}
                              value={Stores.patientRegistationStore.patientResult?.qcStatus}
                              onChange={(qcStatus) => {
                                onChange(qcStatus)
                                Stores.patientRegistationStore.updatePatientResult({
                                  ...Stores.patientRegistationStore.patientResult,
                                  qcStatus,
                                })
                              }}
                            />
                            )}
                              name="qcStatus"
                              rules={{ required: true }}
                              defaultValue=""
                            />
                            <Controller
                                  control={control}
                                  render={({ field: { onChange } }) => (
                            <LibraryComponents.Atoms.Form.Input
                              label="ByPassEln"
                              name="txtByPassEln"
                              placeholder={errors.byPassEln?"Please Enter ByPassEln":"ByPassEln"}
                              hasError={errors.byPassEln}
                              value={Stores.patientRegistationStore.patientResult?.byPassEln}
                              onChange={(byPassEln) => {
                                onChange(byPassEln)
                                Stores.patientRegistationStore.updatePatientResult({
                                  ...Stores.patientRegistationStore.patientResult,
                                  byPassEln,
                                })
                              }}
                            />
                            )}
                              name="byPassEln"
                              rules={{ required: true }}
                              defaultValue=""
                            />
                            <Controller
                                  control={control}
                                  render={({ field: { onChange } }) => (
                            <LibraryComponents.Atoms.Form.Input
                              label="Color"
                              name="txtColor"
                              placeholder={errors.color?"Please Enter Color":"Color"}
                              hasError={errors.color}
                              value={Stores.patientRegistationStore.patientResult?.color}
                              onChange={(color) => {
                                onChange(color)
                                Stores.patientRegistationStore.updatePatientResult({
                                  ...Stores.patientRegistationStore.patientResult,
                                  color,
                                })
                              }}
                            />
                            )}
                              name="color"
                              rules={{ required: true }}
                              defaultValue=""
                            />
                            <Controller
            control={control}
            render={({ field: { onChange } }) => (
              <LibraryComponents.Atoms.Form.InputWrapper label="Environment">
                <select
                  value={Stores.patientRegistationStore.patientResult?.environment}
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
                    Stores.patientRegistationStore.updatePatientResult({
                      ...Stores.patientRegistationStore.patientResult,
                      environment,
                    })
                  }}
                >
                  <option selected>
                        {stores.loginStore.login &&
                        stores.loginStore.login.role !== "SYSADMIN"
                          ? `Select`
                          : Stores.patientRegistationStore.patientResult?.environment || `Select`}
                      </option>
                  {LibraryUtils.lookupItems(stores.routerStore.lookupItems, "PATIENT RESULT - ENVIRONMENT").map(
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
                    </>
                </AccordionItemPanel>
            </AccordionItem>
        </Accordion>
      </div>
      <br />
      <LibraryComponents.Atoms.List direction="row" space={3} align="center">
        <LibraryComponents.Atoms.Buttons.Button
          size="medium"
          type="solid"
          icon={LibraryComponents.Atoms.Icon.Save}
          onClick={handleSubmit(onSubmitPatientResult)}
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
        <FeatureComponents.Molecules.PatientResultList
          data={Stores.patientRegistationStore.listPatientResult}
          totalSize={Stores.patientRegistationStore.listPatientResultCount}
          extraData={{
            lookupItems: stores.routerStore.lookupItems,
            // listAdministrativeDiv: AdministrativeDivisionStore.administrativeDivStore.listAdministrativeDiv
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
      <br />
      <hr />
      <div className='extra' style={{border:'1px solid yellow'}}>
      <Accordion allowZeroExpanded>
            <AccordionItem>
                <AccordionItemHeading>
                    <AccordionItemButton>
                        EXTRA DATA TABLE
                    </AccordionItemButton>
                </AccordionItemHeading>
                <AccordionItemPanel>
                    <>
                    <div
        className="p-2 rounded-lg shadow-xl overflow-scroll"
        style={{ overflowX: "scroll" }}
      >
        <FeatureComponents.Molecules.ExtraDataPatientResultList
          data={Stores.patientRegistationStore.extraDataListPatientResult}
          totalSize={Stores.patientRegistationStore.extraDataListPatientResultCount}
          extraData={{
            lookupItems: stores.routerStore.lookupItems,
            // listAdministrativeDiv: AdministrativeDivisionStore.administrativeDivStore.listAdministrativeDiv
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
                </AccordionItemPanel>
            </AccordionItem>
        </Accordion>
        </div>
        <br />
        </>
    )
})
export default PatientResult