/* eslint-disable */
import React, { useState, useContext, useEffect } from "react"
import { observer } from "mobx-react"
import * as LibraryComponents from "@lp/library/components"
import { Container } from "reactstrap"
import { Accordion, AccordionItem } from "react-sanfona"
import "./accordion.css"
import { Stores } from "../stores"
import { Stores as RootStore } from "@lp/library/stores"

import * as Models from "../models"
import * as Services from "../services"

import * as Config from "@lp/config"
import * as FeatureComponents from "../components"
import { HostCommunicationFlows, HexToAsciiFlow } from "../flows"

import { RouterFlow } from "@lp/flows"
import { toJS } from "mobx"
import { io } from "socket.io-client"
let socket
const HostCommunication = observer(() => {
  const [errors, setErrors] = useState<Models.IHostCommunication>()
  const [deleteItem, setDeleteItem] = useState<any>({})
  const [modalImportFile, setModalImportFile] = useState({})
  const [hideAddHostCommunication, setHideAddHostCommunication] = useState<boolean>(
    true
  )

  socket = io(Config.Api.LIMSPLUS_API_HOST.split("/api")[0], {
    transports: ["websocket"],
  })

  useEffect(() => {
    socket.on("hostCommunicationSendDataToInstrument", (data) => {
      Stores.hostCommunicationStore.updateHostCommuication({
        ...Stores.hostCommunicationStore.hostCommuication,
        txtSendDatafromInstrument: data,
      })
    })

    socket.on("hostCommunicationSourceFile", (data) => {
      Stores.hostCommunicationStore.updateHostCommuication({
        ...Stores.hostCommunicationStore.hostCommuication,
        txtDataReceivefromInstrument: data,
      })
    })
  }, [])

  return (
    <>
      <Container>
        <LibraryComponents.Atoms.Header>
          <LibraryComponents.Atoms.PageHeading
            title={RootStore.routerStore.selectedComponents?.title || ""}
          />
        </LibraryComponents.Atoms.Header>
        {RouterFlow.checkPermission(
          toJS(RootStore.routerStore.userPermission),
          "Add"
        ) && (
          <LibraryComponents.Atoms.Buttons.ButtonCircleAddRemove
            show={hideAddHostCommunication}
            onClick={(status) =>
              setHideAddHostCommunication(!hideAddHostCommunication)
            }
          />
        )}

        <div className="mx-auto">
          <div className="p-2 rounded-lg shadow-xl">
            <LibraryComponents.Atoms.Grid cols={3}>
              <LibraryComponents.Atoms.List
                direction="col"
                space={4}
                justify="stretch"
                fill
              >
                <LibraryComponents.Atoms.Grid cols={2}>
                  <LibraryComponents.Atoms.Form.Toggle
                    label={
                      Stores.hostCommunicationStore.hostCommuication
                        ?.manualAutomaticMode
                        ? "Automatic"
                        : "Manual"
                    }
                    id="manualMode"
                    value={
                      Stores.hostCommunicationStore.hostCommuication
                        ?.manualAutomaticMode
                    }
                    onChange={(manualAutomaticMode) => {
                      Stores.hostCommunicationStore.updateHostCommuication({
                        ...Stores.hostCommunicationStore.hostCommuication,
                        manualAutomaticMode,
                      })
                    }}
                  />
                  <div>
                    <label>
                      Connection Estabilished :{" "}
                      {`${
                        Stores.hostCommunicationStore.hostCommuication
                          ?.manualAutomaticMode
                          ? `On`
                          : `Off`
                      }`}
                    </label>
                    <label
                      style={{
                        color: Stores.hostCommunicationStore.hostCommuication
                          ?.manualAutomaticMode
                          ? "green"
                          : "red",
                      }}
                    >
                      Connection estabilished success.
                    </label>
                  </div>
                </LibraryComponents.Atoms.Grid>

                <LibraryComponents.Atoms.Form.InputWrapper
                  label="Instrument Type"
                  id="instrumentType"
                >
                  <select
                    name="instrumentType"
                    value={
                      Stores.hostCommunicationStore.hostCommuication?.instrumentType
                    }
                    className="leading-4 p-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-base border border-gray-300 rounded-md"
                    onChange={(e) => {
                      const instrumentType = e.target.value
                      Stores.hostCommunicationStore.updateHostCommuication({
                        ...Stores.hostCommunicationStore.hostCommuication,
                        instrumentType,
                      })
                      const selectedInterfaceManager = Stores.interfaceManagerStore.listEncodeCharacter?.find(
                        (item) => item.instrumentType === instrumentType
                      )
                      Stores.hostCommunicationStore.updateSelectedInterfaceManager(
                        selectedInterfaceManager as Models.EncodeCharacter
                      )
                      Stores.hostCommunicationStore.updateHostCommuication({
                        ...Stores.hostCommunicationStore.hostCommuication,
                        instrumentName: selectedInterfaceManager?.instrumentName,
                      })
                    }}
                  >
                    <option selected>Select</option>
                    {Stores.interfaceManagerStore.listEncodeCharacter?.map(
                      (item: any) => (
                        <option
                          key={item.instrumentType}
                          value={item.instrumentType}
                        >
                          {`${item.instrumentType} - ${item.dataFlowFrom
                            .replaceAll(/&amp;/g, "&")
                            .replaceAll(/&gt;/g, ">")
                            .replaceAll(/&lt;/g, "<")
                            .replaceAll(/&quot;/g, '"')
                            .replaceAll(/â/g, "’")
                            .replaceAll(/â¦/g, "…")
                            .toString()}`}
                        </option>
                      )
                    )}
                  </select>
                </LibraryComponents.Atoms.Form.InputWrapper>

                {/* {errors?.fullName && (
                  <span className="text-red-600 font-medium relative">
                    {errors.fullName}
                  </span>
                )} */}
                <LibraryComponents.Atoms.Form.Input
                  label="Instrument Name"
                  id="instrumentName"
                  placeholder="Instrument Name"
                  value={
                    Stores.hostCommunicationStore.hostCommuication?.instrumentName
                  }
                  onChange={(instrumentName) => {
                    Stores.hostCommunicationStore.updateHostCommuication({
                      ...Stores.hostCommunicationStore.hostCommuication,
                      instrumentName,
                    })
                  }}
                />
                {/* {errors?.fullName && (
                  <span className="text-red-600 font-medium relative">
                    {errors.fullName}
                  </span>
                )} */}
                <LibraryComponents.Atoms.Form.InputWrapper
                  label="Mode of Communication"
                  id="modeOfCommunication"
                >
                  <select
                    name="defualtLab"
                    value={
                      Stores.hostCommunicationStore.hostCommuication
                        ?.modeOfCommunication
                    }
                    className="leading-4 p-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-base border border-gray-300 rounded-md"
                    onChange={(e) => {
                      const modeOfCommunication = e.target.value
                      Stores.hostCommunicationStore.updateHostCommuication({
                        ...Stores.hostCommunicationStore.hostCommuication,
                        modeOfCommunication,
                      })
                    }}
                  >
                    <option selected>Select</option>
                    {[
                      { title: "Broadcasting" },
                      { title: "Host Query" },
                      { title: "File based" },
                    ].map((item: any, index: number) => (
                      <option key={item.title} value={item.title}>
                        {item.title}
                      </option>
                    ))}
                  </select>
                </LibraryComponents.Atoms.Form.InputWrapper>
                <LibraryComponents.Atoms.Form.InputWrapper
                  label="Type of Query"
                  id="typeOfQuery"
                >
                  <select
                    name="defualtLab"
                    value={
                      Stores.hostCommunicationStore.hostCommuication?.typeOfQuery
                    }
                    className="leading-4 p-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-base border border-gray-300 rounded-md"
                    onChange={(e) => {
                      const typeOfQuery = e.target.value
                      Stores.hostCommunicationStore.updateHostCommuication({
                        ...Stores.hostCommunicationStore.hostCommuication,
                        typeOfQuery,
                      })
                    }}
                  >
                    <option selected>Select</option>
                    {[
                      { title: "Unidirectional" },
                      { title: "Bidirectional" },
                      { title: "Host Query " },
                    ].map((item: any, index: number) => (
                      <option key={item.title} value={item.title}>
                        {item.title}
                      </option>
                    ))}
                  </select>
                </LibraryComponents.Atoms.Form.InputWrapper>
              </LibraryComponents.Atoms.List>

              <LibraryComponents.Atoms.List
                direction="col"
                space={4}
                justify="stretch"
                fill
              >
                <LibraryComponents.Atoms.Form.InputWrapper
                  label="Mode of Connection "
                  id="modeOfConnection"
                >
                  <select
                    name="defualtLab"
                    value={
                      Stores.hostCommunicationStore.hostCommuication
                        ?.modeOfConnection
                    }
                    className="leading-4 p-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-base border border-gray-300 rounded-md"
                    onChange={(e) => {
                      const modeOfConnection = e.target.value
                      Stores.hostCommunicationStore.updateHostCommuication({
                        ...Stores.hostCommunicationStore.hostCommuication,
                        modeOfConnection,
                      })
                    }}
                  >
                    <option selected>Select</option>
                    {[
                      { title: "Serial Port Communication" },
                      { title: "TCP/IP Communication" },
                    ].map((item: any, index: number) => (
                      <option key={item.title} value={item.title}>
                        {item.title}
                      </option>
                    ))}
                  </select>
                </LibraryComponents.Atoms.Form.InputWrapper>
                {Stores.hostCommunicationStore.hostCommuication?.modeOfConnection ===
                  "Serial Port Communication" && (
                  <FeatureComponents.Atoms.SettingForRS232Table />
                )}
                {Stores.hostCommunicationStore.hostCommuication?.modeOfConnection ===
                  "TCP/IP Communication" && (
                  <FeatureComponents.Atoms.SettingForTCP_IPTable />
                )}
              </LibraryComponents.Atoms.List>

              <LibraryComponents.Atoms.List
                direction="col"
                space={10}
                align="between"
                justify="center"
              >
                <label>Status : Pending</label>
                <div className="flex">
                  <LibraryComponents.Atoms.Buttons.Button
                    size="medium"
                    type="solid"
                    onClick={() => {}}
                  >
                    Save Setting
                  </LibraryComponents.Atoms.Buttons.Button>
                </div>

                <div className="flex mb-2">
                  <LibraryComponents.Atoms.Buttons.Button
                    size="medium"
                    type="solid"
                    onClick={() => {}}
                  >
                    Generate Driver
                  </LibraryComponents.Atoms.Buttons.Button>
                </div>
              </LibraryComponents.Atoms.List>

              <div className="clearfix"></div>
            </LibraryComponents.Atoms.Grid>

            <LibraryComponents.Atoms.Grid cols={2}>
              <LibraryComponents.Atoms.Form.InputWrapper
                label="Apply Filtr on"
                id="applyFiltrOn"
              >
                <select
                  name="defualtLab"
                  value={
                    Stores.hostCommunicationStore.hostCommuication?.applyFiltrOn
                  }
                  className="leading-4 p-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-base border border-gray-300 rounded-md"
                  onChange={(e) => {
                    const applyFiltrOn = e.target.value
                    Stores.hostCommunicationStore.updateHostCommuication({
                      ...Stores.hostCommunicationStore.hostCommuication,
                      applyFiltrOn,
                    })
                  }}
                >
                  <option selected>Select</option>
                  {[
                    { title: "Patient Data / QC Data" },
                    { title: "Output Filter" },
                    { title: "Import" },
                  ].map((item: any, index: number) => (
                    <option key={item.title} value={item.title}>
                      {item.title}
                    </option>
                  ))}
                </select>
              </LibraryComponents.Atoms.Form.InputWrapper>
              <LibraryComponents.Atoms.Form.Input
                label="Log File"
                id="logFileDataReceivefromInstrument"
                placeholder="Log File"
                //value={rootStore.userStore.user.fullName}
                onChange={(logFileDataReceivefromInstrument) => {
                  Stores.hostCommunicationStore.updateHostCommuication({
                    ...Stores.hostCommunicationStore.hostCommuication,
                    logFileDataReceivefromInstrument,
                  })
                }}
              />
              <div className="clerfix" />
            </LibraryComponents.Atoms.Grid>

            <Accordion allowMultiple>
              {[
                { title: "Hex to ASCII" },
                { title: "Source File" },
                { title: "Send data to Intrument" },
                { title: "Convert to" },
                { title: "Output in" },
              ].map((item) => {
                return (
                  <AccordionItem title={`${item.title}`}>
                    {item.title === "Hex to ASCII" && (
                      <>
                        <LibraryComponents.Atoms.List
                          direction="col"
                          space={4}
                          justify="stretch"
                          fill
                        >
                          <div className={`grid grid-cols-3 gap-4`}>
                            <div className="col-span-2">
                              <LibraryComponents.Atoms.Form.MultilineInput
                                label=""
                                id="txtHexToAscii"
                                disabled={
                                  Stores.conversationMappingStore
                                    .listConversationMapping != undefined &&
                                  Stores.hostCommunicationStore.hostCommuication
                                    ?.instrumentType !== undefined
                                    ? Stores.conversationMappingStore
                                        .listConversationMapping?.length > 0
                                      ? false
                                      : true
                                    : true
                                }
                                placeholder="Hex"
                                value={
                                  Stores.hostCommunicationStore.hostCommuication?.hex
                                }
                                onChange={(hex) => {
                                  HexToAsciiFlow.hextoascii(hex)
                                  Stores.hostCommunicationStore.updateHostCommuication(
                                    {
                                      ...Stores.hostCommunicationStore
                                        .hostCommuication,
                                      hex,
                                    }
                                  )
                                }}
                              />
                            </div>
                          </div>
                          <div className="clearfix" />
                        </LibraryComponents.Atoms.List>
                      </>
                    )}
                    {item.title === "Source File" && (
                      <>
                        <LibraryComponents.Atoms.Grid cols={2}>
                          <LibraryComponents.Atoms.Form.InputWrapper
                            label="Source File"
                            id="sourceFileDataReceivefromInstrument"
                          >
                            <select
                              name="defualtLab"
                              value={
                                Stores.hostCommunicationStore.hostCommuication
                                  ?.sourceFileDataReceivefromInstrument
                              }
                              className="leading-4 p-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-base border border-gray-300 rounded-md"
                              onChange={(e) => {
                                const sourceFileDataReceivefromInstrument =
                                  e.target.value
                                Stores.hostCommunicationStore.updateHostCommuication(
                                  {
                                    ...Stores.hostCommunicationStore
                                      .hostCommuication,
                                    sourceFileDataReceivefromInstrument,
                                  }
                                )
                              }}
                            >
                              <option selected>Select</option>
                              {[
                                { title: "Hex decimal" },
                                { title: "HL7" },
                                { title: "ASTM" },
                              ].map((item: any, index: number) => (
                                <option key={item.title} value={item.title}>
                                  {item.title}
                                </option>
                              ))}
                            </select>
                          </LibraryComponents.Atoms.Form.InputWrapper>

                          <LibraryComponents.Atoms.Form.InputWrapper
                            label="Source Repository"
                            id="SourceRepositoryDataReceivefromInstrument"
                          >
                            <select
                              name="defualtLab"
                              disabled={
                                Stores.segmentMappingStore.listSegmentMapping !=
                                  undefined &&
                                Stores.hostCommunicationStore.hostCommuication
                                  ?.instrumentType !== undefined
                                  ? Stores.segmentMappingStore.listSegmentMapping
                                      ?.length > 0
                                    ? false
                                    : true
                                  : true
                              }
                              value={
                                Stores.hostCommunicationStore.hostCommuication
                                  ?.SourceRepositoryDataReceivefromInstrument
                              }
                              className="leading-4 p-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-base border border-gray-300 rounded-md"
                              onChange={(e) => {
                                const SourceRepositoryDataReceivefromInstrument =
                                  e.target.value
                                Stores.hostCommunicationStore.updateHostCommuication(
                                  {
                                    ...Stores.hostCommunicationStore
                                      .hostCommuication,
                                    SourceRepositoryDataReceivefromInstrument,
                                  }
                                )
                                if (
                                  SourceRepositoryDataReceivefromInstrument ===
                                  "Phiysical file Location"
                                ) {
                                  Stores.hostCommunicationStore.hostCommuication
                                  if (
                                    !Stores.hostCommunicationStore.hostCommuication
                                      ?.instrumentType
                                  )
                                    return alert("Please entery instrument type")
                                  setModalImportFile({
                                    show: true,
                                    title: "Import file!",
                                  })
                                }
                              }}
                            >
                              <option selected>Select</option>
                              {[
                                { title: "Phiysical file Location" },
                                { title: "Collection of a database" },
                              ].map((item: any, index: number) => (
                                <option key={item.title} value={item.title}>
                                  {item.title}
                                </option>
                              ))}
                            </select>
                          </LibraryComponents.Atoms.Form.InputWrapper>
                          <div className="clearfix"></div>
                        </LibraryComponents.Atoms.Grid>
                        <LibraryComponents.Atoms.List
                          direction="col"
                          space={4}
                          justify="stretch"
                          fill
                        >
                          <div className={`grid grid-cols-3 gap-4`}>
                            <div className="col-span-2">
                              <LibraryComponents.Atoms.Form.MultilineInput
                                label=""
                                id="txtDataReceivefromInstrument"
                                placeholder="Source file (Data Received Data from Instrument)"
                                disabled={
                                  Stores.segmentMappingStore.listSegmentMapping !=
                                    undefined &&
                                  Stores.hostCommunicationStore.hostCommuication
                                    ?.instrumentType !== undefined
                                    ? Stores.segmentMappingStore.listSegmentMapping
                                        ?.length > 0
                                      ? false
                                      : true
                                    : true
                                }
                                value={
                                  Stores.hostCommunicationStore.hostCommuication
                                    ?.txtDataReceivefromInstrument
                                }
                                onChange={(txtDataReceivefromInstrument) => {
                                  // Stores.hostCommunicationStore.updateHostCommuication({
                                  //   ...Stores.hostCommunicationStore.hostCommuication,
                                  //   txtDataReceivefromInstrument,
                                  // })
                                  HostCommunicationFlows.newMessage(
                                    txtDataReceivefromInstrument
                                  )
                                }}
                              />
                            </div>
                            <div className="flex flex-col items-center justify-center">
                              <div>
                                <LibraryComponents.Atoms.Buttons.Button
                                  size="medium"
                                  type="solid"
                                  onClick={() => {
                                    socket.emit(
                                      "hostCommunicationSourceFile",
                                      Stores.hostCommunicationStore.hostCommuication
                                        ?.txtDataReceivefromInstrument
                                    )
                                  }}
                                >
                                  Send
                                </LibraryComponents.Atoms.Buttons.Button>
                              </div>
                            </div>
                          </div>

                          <div className="clearfix" />
                        </LibraryComponents.Atoms.List>
                      </>
                    )}
                    {item.title === "Send data to Intrument" && (
                      <>
                        <div className={`grid grid-cols-3 gap-4`}>
                          <div className="col-span-2">
                            <LibraryComponents.Atoms.Form.MultilineInput
                              label=""
                              id="txtSendDatafromInstrument"
                              placeholder="Send data to Instrument"
                              value={
                                Stores.hostCommunicationStore.hostCommuication
                                  ?.txtSendDatafromInstrument
                              }
                              onChange={(txtSendDatafromInstrument) => {
                                Stores.hostCommunicationStore.updateHostCommuication(
                                  {
                                    ...Stores.hostCommunicationStore
                                      .hostCommuication,
                                    txtSendDatafromInstrument,
                                  }
                                )
                              }}
                            />
                          </div>
                          <div className="flex flex-col items-center justify-center">
                            <div>
                              <LibraryComponents.Atoms.Buttons.Button
                                size="medium"
                                type="solid"
                                onClick={() => {
                                  socket.emit(
                                    "hostCommunicationSendDataToInstrument",
                                    Stores.hostCommunicationStore.hostCommuication
                                      ?.txtSendDatafromInstrument
                                  )
                                }}
                              >
                                Send
                              </LibraryComponents.Atoms.Buttons.Button>
                            </div>
                          </div>
                        </div>
                      </>
                    )}
                    {item.title === "Convert to" && (
                      <>
                        <LibraryComponents.Atoms.Grid cols={2}>
                          <LibraryComponents.Atoms.Form.InputWrapper
                            label="Convert to"
                            id="convertTo"
                          >
                            <select
                              name="defualtLab"
                              value={
                                Stores.hostCommunicationStore.hostCommuication
                                  ?.convertTo
                              }
                              className="leading-4 p-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-base border border-gray-300 rounded-md"
                              onChange={async (e) => {
                                const convertTo = e.target.value
                                Stores.hostCommunicationStore.updateHostCommuication(
                                  {
                                    ...Stores.hostCommunicationStore
                                      .hostCommuication,
                                    convertTo,
                                    SourceRepositoryDataReceivefromInstrument: "",
                                  }
                                )
                                await HostCommunicationFlows.convetTo(
                                  convertTo,
                                  Stores.hostCommunicationStore
                                    .selectedInterfaceManager,
                                  Stores.hostCommunicationStore.hostCommuication
                                    ?.txtDataReceivefromInstrument || ""
                                )
                              }}
                            >
                              <option selected>Select</option>
                              {[
                                { title: "Hex decimal" },
                                { title: "HL7" },
                                { title: "ASTM" },
                              ].map((item: any, index: number) => (
                                <option key={item.title} value={item.title}>
                                  {item.title}
                                </option>
                              ))}
                            </select>
                          </LibraryComponents.Atoms.Form.InputWrapper>

                          <LibraryComponents.Atoms.Form.InputWrapper
                            label="Output Repository"
                            id="outputRepository"
                          >
                            <select
                              name="defualtLab"
                              value={
                                Stores.hostCommunicationStore.hostCommuication
                                  ?.outputRepository
                              }
                              className="leading-4 p-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-base border border-gray-300 rounded-md"
                              onChange={(e) => {
                                const outputRepository = e.target.value
                                Stores.hostCommunicationStore.updateHostCommuication(
                                  {
                                    ...Stores.hostCommunicationStore
                                      .hostCommuication,
                                    outputRepository,
                                  }
                                )
                              }}
                            >
                              <option selected>Select</option>
                              {[
                                { title: "Phiysical file Location" },
                                { title: "Collection of a database" },
                              ].map((item: any, index: number) => (
                                <option key={item.title} value={item.title}>
                                  {item.title}
                                </option>
                              ))}
                            </select>
                          </LibraryComponents.Atoms.Form.InputWrapper>
                          <div className="clearfix"></div>
                        </LibraryComponents.Atoms.Grid>
                        <LibraryComponents.Atoms.List
                          direction="col"
                          space={4}
                          justify="stretch"
                          fill
                        >
                          <div className={`grid grid-cols-3 gap-4`}>
                            <div className="col-span-2">
                              {Stores.hostCommunicationStore.convertTo?.hl7 !==
                                undefined && (
                                <FeatureComponents.Organisms.HL7Table
                                  data={toJS(
                                    Stores.hostCommunicationStore.convertTo.hl7
                                  )}
                                />
                              )}
                            </div>
                            <div className="flex flex-col items-center justify-center">
                              <div>
                                <LibraryComponents.Atoms.Buttons.Button
                                  size="medium"
                                  type="solid"
                                  onClick={() => {}}
                                >
                                  Convert
                                </LibraryComponents.Atoms.Buttons.Button>
                              </div>
                            </div>
                          </div>

                          <div className="clearfix" />
                        </LibraryComponents.Atoms.List>
                      </>
                    )}
                    {item.title === "Output in" && (
                      <>
                        <LibraryComponents.Atoms.List
                          direction="col"
                          space={4}
                          justify="start"
                        >
                          <LibraryComponents.Atoms.Form.InputWrapper
                            label="Output in"
                            id="outPutIn"
                          >
                            <select
                              name="defualtLab"
                              value={
                                Stores.hostCommunicationStore.hostCommuication
                                  ?.outPutIn
                              }
                              className="leading-4 p-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-base border border-gray-300 rounded-md"
                              onChange={(e) => {
                                const outPutIn = e.target.value
                                Stores.hostCommunicationStore.updateHostCommuication(
                                  {
                                    ...Stores.hostCommunicationStore
                                      .hostCommuication,
                                    outPutIn,
                                  }
                                )
                              }}
                            >
                              <option selected>Select</option>
                              {[
                                { title: "PDF" },
                                { title: "CSV" },
                                { title: "TXT" },
                                { title: "Table/Collection" },
                                { title: "API" },
                                { title: "Graph" },
                              ].map((item: any, index: number) => (
                                <option key={item.title} value={item.title}>
                                  {item.title}
                                </option>
                              ))}
                            </select>
                          </LibraryComponents.Atoms.Form.InputWrapper>
                          <div className="clearfix"></div>
                        </LibraryComponents.Atoms.List>
                        <LibraryComponents.Atoms.List
                          direction="col"
                          space={4}
                          justify="stretch"
                          fill
                        >
                          <div className={`grid grid-cols-3 gap-4`}>
                            <div className="col-span-2">
                              <LibraryComponents.Atoms.Form.MultilineInput
                                id="txtOutputin"
                                placeholder="Output in"
                                value={
                                  Stores.hostCommunicationStore.hostCommuication
                                    ?.txtOutputin
                                }
                                onChange={(txtOutputin) => {
                                  Stores.hostCommunicationStore.updateHostCommuication(
                                    {
                                      ...Stores.hostCommunicationStore
                                        .hostCommuication,
                                      txtOutputin,
                                    }
                                  )
                                }}
                              />
                            </div>
                            <div className="flex flex-col items-center justify-center">
                              <div>
                                <LibraryComponents.Atoms.Buttons.Button
                                  size="medium"
                                  type="solid"
                                  onClick={() => {}}
                                >
                                  Output
                                </LibraryComponents.Atoms.Buttons.Button>
                              </div>
                            </div>
                          </div>
                          <div className="clearfix" />
                        </LibraryComponents.Atoms.List>

                        <LibraryComponents.Atoms.Grid cols={2}>
                          <LibraryComponents.Atoms.Form.InputWrapper
                            label="Output for Third party Software"
                            id="outputforThirdpartySoftware"
                          >
                            <select
                              name="defualtLab"
                              value={
                                Stores.hostCommunicationStore.hostCommuication
                                  ?.outputforThirdpartySoftware
                              }
                              className="leading-4 p-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-base border border-gray-300 rounded-md"
                              onChange={(e) => {
                                const outputforThirdpartySoftware = e.target.value
                                Stores.hostCommunicationStore.updateHostCommuication(
                                  {
                                    ...Stores.hostCommunicationStore
                                      .hostCommuication,
                                    outputforThirdpartySoftware,
                                  }
                                )
                              }}
                            >
                              <option selected>Select</option>
                              {[
                                { title: "Serial to Serial" },
                                { title: "HL7" },
                                { title: "ASTM" },
                              ].map((item: any, index: number) => (
                                <option key={item.title} value={item.title}>
                                  {item.title}
                                </option>
                              ))}
                            </select>
                          </LibraryComponents.Atoms.Form.InputWrapper>
                          {/* <LibraryComponents.Atoms.Form.Input
                label="Log File"
                id="logFileThiredPartySoftare"
                placeholder="Log File"
                value={
                  Stores.hostCommunicationStore.hostCommuication
                    ?.logFileThiredPartySoftare
                }
                onChange={(logFileThiredPartySoftare) => {
                  Stores.hostCommunicationStore.updateHostCommuication({
                    ...Stores.hostCommunicationStore.hostCommuication,
                    logFileThiredPartySoftare,
                  })
                }}
              /> */}
                          <LibraryComponents.Atoms.Form.InputWrapper
                            label="Output Repository"
                            id="SourceRepositoryThiredPartySoftare"
                          >
                            <select
                              name="defualtLab"
                              value={
                                Stores.hostCommunicationStore.hostCommuication
                                  ?.SourceRepositoryThiredPartySoftare
                              }
                              className="leading-4 p-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-base border border-gray-300 rounded-md"
                              onChange={(e) => {
                                const SourceRepositoryThiredPartySoftare =
                                  e.target.value
                                Stores.hostCommunicationStore.updateHostCommuication(
                                  {
                                    ...Stores.hostCommunicationStore
                                      .hostCommuication,
                                    SourceRepositoryThiredPartySoftare,
                                  }
                                )
                              }}
                            >
                              <option selected>Select</option>
                              {[
                                { title: "Phiysical file Location" },
                                { title: "Collection of a database" },
                              ].map((item: any, index: number) => (
                                <option key={item.title} value={item.title}>
                                  {item.title}
                                </option>
                              ))}
                            </select>
                          </LibraryComponents.Atoms.Form.InputWrapper>
                          <div className="clearfix"></div>
                        </LibraryComponents.Atoms.Grid>
                      </>
                    )}
                  </AccordionItem>
                )
              })}
            </Accordion>

            <br />
            <LibraryComponents.Atoms.List direction="row" space={3} align="center">
              <LibraryComponents.Atoms.Buttons.Button
                size="medium"
                type="solid"
                icon={LibraryComponents.Atoms.Icons.Save}
                onClick={() => {}}
              >
                Save
              </LibraryComponents.Atoms.Buttons.Button>
              <LibraryComponents.Atoms.Buttons.Button
                size="medium"
                type="outline"
                icon={LibraryComponents.Atoms.Icons.Remove}
                onClick={() => {
                  //rootStore.departmentStore.clear();
                  window.location.reload()
                }}
              >
                Clear
              </LibraryComponents.Atoms.Buttons.Button>
            </LibraryComponents.Atoms.List>
          </div>
          <br />
          <LibraryComponents.Molecules.ModalConfirm
            {...deleteItem}
            click={() => {
              RootStore.rootStore.setProcessLoading(true)
              Services.deletedepartment(deleteItem.id).then((res: any) => {
                RootStore.rootStore.setProcessLoading(false)
                if (res.status === 200) {
                  LibraryComponents.Atoms.ToastsStore.success(`Department deleted.`)
                  setDeleteItem({ show: false })
                  // rootStore.departmentStore.fetchListDepartment()
                }
              })
            }}
          />
        </div>
      </Container>
      <LibraryComponents.Atoms.ModalImportFile
        accept=".csv,.xlsx,.xls,.txt,.hl7"
        {...modalImportFile}
        click={(file: any) => {
          setModalImportFile({ show: false })

          let reader = new FileReader()
          reader.onload = (e: any) => {
            const file = e.target.result
            const lines = file.split(/\r/)
            console.log({ lines })
            let message = lines.join("\n")
            HostCommunicationFlows.newMessage(message)
          }
          reader.onerror = (e: any) => alert(e.target.error.name)
          reader.readAsText(file)
        }}
        close={() => {
          setModalImportFile({ show: false })
        }}
      />
    </>
  )
})

export default HostCommunication
