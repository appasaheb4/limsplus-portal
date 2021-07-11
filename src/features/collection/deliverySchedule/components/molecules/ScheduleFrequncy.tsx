import React, { useState, useEffect } from "react"
import _ from "lodash"
import classnames from "classnames"
import { TabContent, TabPane, Nav, NavItem, NavLink } from "reactstrap"

import Storage from "@lp/library/modules/storage"
import * as LibraryUtils from "@lp/library/utils"
import * as LibraryComponents from "@lp/library/components"
import * as LibraryModels from "@lp/library/models"

import { Stores as LabStores } from "@lp/features/collection/labs/stores"
import { Stores as MasterPanelStore } from "@lp/features/collection/masterPanel/stores"
import { Stores as LookupStore } from "@lp/features/collection/lookup/stores"

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
                <br />
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
    </>
  )
}
