/* eslint-disable */
import React, { useState } from "react"
import _ from "lodash"
import classnames from "classnames"
import { TabContent, TabPane, Nav, NavItem, NavLink } from "reactstrap"

import * as LibraryUtils from "@lp/library/utils"
import * as LibraryComponents from "@lp/library/components"



interface ScheduleFrequencyProps {
  type: string
  onChnage?: (value: any) => void
}

export const ScheduleFrequency = ({ type, onChnage }: ScheduleFrequencyProps) => {
  const [activeTab, setActiveTab] = useState("1")

  const toggle = (tab) => {
    if (activeTab !== tab) setActiveTab(tab)
  }
  const [weekly, setWeekly] = useState<any[]>([
    { day: "Sun", value: "", selected: false },
    { day: "Mon", value: "", selected: false },
    { day: "Tue", value: "", selected: false },
    { day: "Wed", value: "", selected: false },
    { day: "Thu", value: "", selected: false },
    { day: "Fry", value: "", selected: false },
    { day: "Sat", value: "", selected: false },
  ])
  const [monthly, setMonthly] = useState<any[]>([
    {
      weekly: "1st Weekly",
      days: [
        { day: "Sun", value: "", selected: false },
        { day: "Mon", value: "", selected: false },
        { day: "Tue", value: "", selected: false },
        { day: "Wed", value: "", selected: false },
        { day: "Thu", value: "", selected: false },
        { day: "Fry", value: "", selected: false },
        { day: "Sat", value: "", selected: false },
      ],
    },
    {
      weekly: "2nd Weekly",
      days: [
        { day: "Sun", value: "", selected: false },
        { day: "Mon", value: "", selected: false },
        { day: "Tue", value: "", selected: false },
        { day: "Wed", value: "", selected: false },
        { day: "Thu", value: "", selected: false },
        { day: "Fry", value: "", selected: false },
        { day: "Sat", value: "", selected: false },
      ],
    },
    {
      weekly: "3rd Weekly",
      days: [
        { day: "Sun", value: "", selected: false },
        { day: "Mon", value: "", selected: false },
        { day: "Tue", value: "", selected: false },
        { day: "Wed", value: "", selected: false },
        { day: "Thu", value: "", selected: false },
        { day: "Fry", value: "", selected: false },
        { day: "Sat", value: "", selected: false },
      ],
    },
    {
      weekly: "4th Weekly",
      days: [
        { day: "Sun", value: "", selected: false },
        { day: "Mon", value: "", selected: false },
        { day: "Tue", value: "", selected: false },
        { day: "Wed", value: "", selected: false },
        { day: "Thu", value: "", selected: false },
        { day: "Fry", value: "", selected: false },
        { day: "Sat", value: "", selected: false },
      ],
    },
  ])
  const [monthlyDateValue, setMonthlyDateValue] = useState<number>()

  const [result, setResult] = useState<any[]>([
    { title: "First Intrim", value: "", selected: false },
    { title: "Second Intrim", value: "", selected: false },
    { title: "Third Intrim", value: "", selected: false },
    { title: "Final", value: "", selected: false },
    { title: "Negative", value: "", selected: false },
    { title: "Positive", value: "", selected: false },
  ])
  const [batch1StartTime, setBatch1StartTime] = useState<string>()
  const [batch1EndTime,setBatch1EndTime] = useState<string>()
  const [batch2StartTime, setBatch2StartTime] = useState<string>()
  const [batch2Units, setBatch2Units] = useState<string>()
  const [batch2Value,setBatch2Value] = useState<number>()

  const onChangeWeeklyItem = (item, index) => {
    if (item.value === "") return alert("Please enter value")
    weekly[index].selected = !weekly[index].selected
    setWeekly(JSON.parse(JSON.stringify(weekly)))
    onChnage &&
      onChnage(
        weekly.filter((item) => {
          return item.selected === true
        })
      )
  }

  const onChangeMonthlyItems = (item, index, days, i) => {
    if (item.days[i].value === "") return alert("Please enter value")
    monthly[index].days[i].selected = !monthly[index].days[i].selected
    setMonthly(JSON.parse(JSON.stringify(monthly)))
    let monthlyItems: any[] = []
    monthly.filter((item, index) => {
      const daysItems: any[] = []
      item.days.filter((days) => {
        if (days.selected === true) {
          daysItems.push(days)
          item = { ...item, days: daysItems }
          monthlyItems.push(item)
        }
      })
    })
    monthlyItems = _.uniqBy(monthlyItems, function (e) {
      return e.weekly
    })
    onChnage && onChnage(monthlyItems)
  }

  const onChangeResultItem = (item, index) => {
    if (item.value === "") return alert("Please enter value")
    result[index].selected = !result[index].selected
    setWeekly(JSON.parse(JSON.stringify(result)))
    onChnage &&
      onChnage(
        result.filter((item) => {
          return item.selected === true
        })
      )
  }

  return (
    <>
      {(type === "MINUTES" || type === "HOURS" || type === "DAY") && (
        <LibraryComponents.Atoms.Form.Input
          label="Schdule Frequnecy"
          placeholder="Schdule Frequnecy"
          onChange={(schduleFrequncy) => {
            onChnage && onChnage(schduleFrequncy)
          }}
        />
      )}
      {type === "WEEKLY" && (
        <LibraryComponents.Atoms.Form.InputWrapper label="Schdule Frequnecy">
          <ul className="rounded-lg shadow-xl p-2">
            {weekly?.map((item: any, index: number) => (
              <li
                key={index}
                value={item}
                className="inline-flex items-center ml-1 mb-2"
              >
                <input
                  type="checkbox"
                  name={item.day}
                  value={item.day}
                  checked={item.selected}
                  onChange={() => onChangeWeeklyItem(item, index)}
                />
                <h6 className="ml-2 mr-2 items-center"> {`  ${item.day}  `}</h6>
                <input
                  type="number"
                  onChange={(e) => {
                    const value = e.target.value
                    weekly[index].value = value
                    setWeekly(weekly)
                  }}
                  className="leading-4 p-2 focus:ring-indigo-500 focus:border-indigo-500 block  shadow-sm sm:text-base border border-gray-300 rounded-md mr-1"
                />
              </li>
            ))}
          </ul>
        </LibraryComponents.Atoms.Form.InputWrapper>
      )}
      {type === "MONTHLY" && (
        <LibraryComponents.Atoms.Form.InputWrapper label="Schdule Frequnecy">
          <Nav tabs>
            <NavItem>
              <NavLink
                className={classnames({ active: activeTab === "1" })}
                onClick={() => {
                  toggle("1")
                }}
              >
                Weekly
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                className={classnames({ active: activeTab === "2" })}
                onClick={() => {
                  toggle("2")
                }}
              >
                Date Picker
              </NavLink>
            </NavItem>
          </Nav>

          <TabContent activeTab={activeTab}>
            <TabPane tabId="1">
              <ul className="inline-flex">
                {monthly.map((item, index) => (
                  <li key={index} className="ml-2">
                    <h5 className="text-center font-bold mb-2">{item.weekly}</h5>
                    <ul>
                      {item.days.map((days, i) => (
                        <li key={i} className="inline-flex items-center ml-1 mb-2">
                          <input
                            type="checkbox"
                            name={days.day}
                            value={days.day}
                            checked={days.selected}
                            onChange={() =>
                              onChangeMonthlyItems(item, index, days, i)
                            }
                          />
                          <h6 className="ml-2 mr-2 items-center">
                            {" "}
                            {`  ${days.day}  `}
                          </h6>
                          <input
                            type="number"
                            onChange={(e) => {
                              const value = e.target.value
                              monthly[index].days[i].value = value
                              setMonthly(monthly)
                            }}
                            className="leading-4 p-1  focus:ring-indigo-500 focus:border-indigo-500 block  shadow-sm sm:text-base border border-gray-300 rounded-md w-14"
                          />
                        </li>
                      ))}
                    </ul>
                  </li>
                ))}
              </ul>
            </TabPane>
            <TabPane tabId="2">
              <>
                <LibraryComponents.Atoms.Form.Input
                  placeholder="Value"
                  value={monthlyDateValue}
                  onChange={(value) => {
                    setMonthlyDateValue(value)
                  }}
                />
                <div className="mb-2" />
                {monthlyDateValue && (
                  <LibraryComponents.Atoms.Form.InputDate
                    label="Date"
                    placeholder="Date"
                    onChange={(e) => {
                      const schedule = new Date(e.target.value)
                      if (!monthlyDateValue) return alert("Please enter value")
                      onChnage &&
                        onChnage({
                          value: monthlyDateValue,
                          date: LibraryUtils.moment(schedule).unix(),
                        })
                    }}
                  />
                )}
              </>
            </TabPane>
          </TabContent>
        </LibraryComponents.Atoms.Form.InputWrapper>
      )}
      {type === "RESULT" && (
        <LibraryComponents.Atoms.Form.InputWrapper label="Schdule Frequnecy">
          <ul className="rounded-lg shadow-xl p-2">
            {result?.map((item: any, index: number) => (
              <li
                key={index}
                value={item}
                className="inline-flex flex-col items-center ml-1 mb-2"
              >
                <input
                  type="checkbox"
                  name={item.title}
                  value={item.title}
                  checked={item.selected}
                  onChange={() => onChangeResultItem(item, index)}
                />
                <h6 className="ml-2 mr-2 items-center"> {`  ${item.title}  `}</h6>
                <input
                  type="number"
                  onChange={(e) => {
                    const value = e.target.value
                    result[index].value = value
                    setResult(result)
                  }}
                  className="leading-4 p-2 focus:ring-indigo-500 focus:border-indigo-500 block  shadow-sm sm:text-base border border-gray-300 rounded-md mr-1"
                />
              </li>
            ))}
          </ul>
        </LibraryComponents.Atoms.Form.InputWrapper>
      )}
      {type === "BATCH1" && (
        <LibraryComponents.Atoms.Form.InputWrapper label="Schdule Frequnecy">
          <LibraryComponents.Atoms.Form.Clock
            label="Start Time"
            onChange={(startTime) => {
              setBatch1StartTime(startTime)
              onChnage &&
                  onChnage({
                    startTime: startTime,
                    endtime: batch1EndTime,
                  })
            }}
          />
          <div className="mb-2" />
          {batch1StartTime && (
            <LibraryComponents.Atoms.Form.Clock
              label="End Time"
              onChange={(endTime) => {
                setBatch1EndTime(endTime)
                onChnage &&
                  onChnage({
                    startTime: batch1StartTime,
                    endtime: endTime,
                  })
              }}
            />
          )}
        </LibraryComponents.Atoms.Form.InputWrapper>
      )}
      {type === "BATCH2" && (
        <LibraryComponents.Atoms.Form.InputWrapper label="Schdule Frequnecy">
          <LibraryComponents.Atoms.Form.Clock
            label="Start Time"
            onChange={(startTime) => {
              setBatch2StartTime(startTime)
              onChnage &&
              onChnage({
                startTime: startTime,
                units: batch2Units,
                value:batch2Value,
              })
            }}
          />
          <div className="mb-2" />
          {batch2StartTime && (
            <>
              <LibraryComponents.Atoms.Form.InputWrapper label="Units">
                <select
                  className="leading-4 p-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-base border border-gray-300 rounded-md"
                  onChange={(e) => {
                    const units = e.target.value as string
                    setBatch2Units(units)
                    onChnage &&
                    onChnage({
                      startTime: batch2StartTime,
                      units: units,
                      value:batch2Value,
                    })
                  }}
                >
                  <option selected>Select</option>
                  {["MINUTES", "HOURS", "DAY"].map((item: any, index: number) => (
                    <option key={index} value={item}>
                      {item}
                    </option>
                  ))}
                </select>
              </LibraryComponents.Atoms.Form.InputWrapper>
              {batch2Units && (
                <LibraryComponents.Atoms.Form.Input
                type="number"
                  placeholder="Value"
                  onChange={(value) => {
                    setBatch2Value(value)
                    onChnage &&
                      onChnage({
                        startTime: batch2StartTime,
                        units: batch2Units,
                        value,
                      })
                  }}
                />
              )}
            </>
          )}
        </LibraryComponents.Atoms.Form.InputWrapper>
      )}
    </>
  )
}
