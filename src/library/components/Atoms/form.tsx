import React, { useState, useEffect } from "react"
import * as LibraryComponents from "@lp/library/components"
import "./css/toggle.css"
import classNames from "classnames"

interface LabelProps {  
  htmlFor: string
}

export const Label: React.FunctionComponent<LabelProps> = (props) => (
  <>
    <label
      htmlFor={props.htmlFor}
      className="block text-xs font-medium text-gray-700 mb-1"
    >
      {props.children}
    </label>
  </>
)

interface InputWrapperProps {
  id?: string
  label?: string
  className?: string
}

export const InputWrapper: React.FunctionComponent<InputWrapperProps> = (props) => (
  <div className={props.className}>
    <Label htmlFor={props.id || ""}>{props.label}</Label>
    {props.children}
  </div>
)

interface InputProps extends InputWrapperProps {
  value?: any
  name?: string
  placeholder?: string
  type?: string
  required?: boolean
  disabled?: boolean
  className?: string
  onChange?: (e: any) => void
  onBlur?: (e: any) => void
}

export const Input = (props: InputProps) => (
  <InputWrapper label={props.label} id={props.id}>
    <input
      type={props.type || "text"}
      id={props.id}
      name={props.name}
      placeholder={props.placeholder}
      required={props.required || false}
      disabled={props.disabled || false}
      autoComplete="given-name"
      value={props.value}
      onChange={(e) => props.onChange && props.onChange(e.target.value)}
      className="leading-4 p-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-base border border-gray-300 rounded-md"
      onBlur={(e) => props.onBlur && props.onBlur(e.target.value)}
    />
  </InputWrapper>
)

interface InputRadioProps extends InputWrapperProps {
  values?: string[]
  value?: string
  name?: string
  required?: boolean
  disabled?: boolean
  onChange?: (e: any) => void
}

export const InputRadio = (props: InputRadioProps) => (
  <InputWrapper label={props.label} id={props.id}>
    {props.values?.map((item, key) => (
      <div className="ml-4" key={key}>
        <LibraryComponents.Atoms.List space={3} direction="row">
          <input
            key={key}
            type="radio"
            id={props.id}
            name={props.name}
            value={props.value}
            checked={item === props.value ? true : false}
            onChange={() => props.onChange && props.onChange(item)}
            className="leading-4 p-2 focus:ring-indigo-500 focus:border-indigo-500 block  shadow-sm sm:text-base border border-gray-300 rounded-md"
          />
          <Label htmlFor={props.id || ""}>{item}</Label>
        </LibraryComponents.Atoms.List>
      </div>
    ))}
  </InputWrapper>
)

interface InputDateProps extends InputWrapperProps {
  value?: any
  name?: string
  placeholder?: string
  disabled?: boolean
  onChange?: (e: any) => void
}

export const InputDate = (props: InputDateProps) => (
  <InputWrapper label={props.label} id={props.id}>
    <input
      type="date"
      id={props.id}
      name={props.name}
      disabled={props.disabled || false}
      value={props.value}
      onChange={(e) => props.onChange && props.onChange(e)}
      className="leading-4 p-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-base border border-gray-300 rounded-md"
    />
  </InputWrapper>
)

export const CheckBox = (props) => {
  return (
    <li>
      <input
        key={props.id}
        onClick={props.handleCheckChieldElement}
        type="checkbox"
        checked={props.isChecked}
        value={props.value}
      />{" "}
      {props.value}
    </li>
  )
}

interface SelectOptionProps extends InputWrapperProps {
  value?: any
  values?: any[]
  name?: string
  key: string
  disabled?: boolean
  onChange?: (e: any) => void
}

export const SelectOption = (props: SelectOptionProps) => (
  <InputWrapper label={props.label} id={props.id}>
    <select
      name={props.name}
      className="leading-4 p-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-base border border-gray-300 rounded-md"
      onChange={(e) => props.onChange && props.onChange(e.target.value)}
    >
      <option selected>Select</option>
      {props.values?.map((item: any) => (
        <option key={item[props.key]} value={item[props.key]}>
          {item[props.key]}
        </option>
      ))}
    </select>
  </InputWrapper>
)

interface InputFileProps extends InputWrapperProps {
  value?: any
  name?: string
  placeholder?: string
  disabled?: boolean
  accept?: string
  multiple?: boolean
  onChange?: (e: any) => void
}

export const InputFile = (props: InputFileProps) => (
  <InputWrapper label={props.label} id={props.id}>
    <input
      type="file"
      id={props.id}
      name={props.name}
      disabled={props.disabled || false}
      accept={props.accept}
      value={props.value}
      onChange={(e) => props.onChange && props.onChange(e)}
      className="leading-4 p-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-base border border-gray-300 rounded-md"
      multiple={props.multiple}
    />
  </InputWrapper>
)

export const MultilineInput = (props: InputProps) => (
  <InputWrapper label={props.label} id={props.id} className={props.className}>
    <textarea
      id={props.id}
      autoComplete="given-name"
      value={props.value}
      disabled={props.disabled}
      rows={5}
      placeholder={props.placeholder}
      onChange={(e) => props.onChange && props.onChange(e.target.value)}
      className="leading-4 p-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-base border border-gray-300 rounded-md"
    />
  </InputWrapper>
)

interface ToggleProps extends InputWrapperProps {
  value?: boolean
  name?: string
  disabled?: boolean
  onChange?: (e: boolean) => void
}

// const useStyles = makeStyles({
//   switchBase: {
//     color: "red",
//     "&$checked": {
//       color: "green",
//     },
//     "&$checked + $track": {
//       backgroundColor: "#006400",
//     },
//   },
//   checked: {},
//   track: {},
// })

// export const Toggle = (props: ToggleProps) => {
//   const classes = useStyles();
//   return(
//     <InputWrapper label={props.label} id={props.id}>
//       <Switch
//         checked={props.value}
//         classes={{
//           switchBase: classes.switchBase,
//           track: classes.track,
//           checked: classes.checked
//         }}
//         onChange={(e) => props.onChange && props.onChange(e.target.checked)}
//         name={props.name}
//         inputProps={{ "aria-label": "secondary checkbox" }}
//       />
//     </InputWrapper>
//   )
// }

interface ToggleProps extends InputWrapperProps {
  disabled?: boolean
  defaultChecked?: boolean
  className?: string
  icons?: any
  value?: boolean
  name?: string
  onChange?: (e: boolean) => void
}

// const CheckedIcon = () => <>On</>
// const UncheckedIcon = () => <>Off</>

export const Toggle = (props: ToggleProps) => {
  const [toggle, setToggle] = useState(props.value)
  const { onChange, disabled, className } = props

  useEffect(() => {
    setToggle(props.value)
  }, [props.value])

  const triggerToggle = () => {
    if (disabled) {
      return
    }
    setToggle(!toggle)
    if (typeof onChange === "function") {
      onChange(!toggle)
    }
  }

  // const getIcon = (type) => {
  //   const { icons } = props
  //   if (!icons) {
  //     return null
  //   }
  //   return icons[type] === undefined ? Toggle.defaultProps.icons[type] : icons[type]
  // }

  const toggleClasses = classNames(
    "wrg-toggle ",
    {
      "wrg-toggle--checked": toggle,
      "wrg-toggle--disabled": disabled,
    },
    className
  )

  return (
    <InputWrapper label={props.label} id={props.id}>
      <div onClick={triggerToggle} className={toggleClasses}>
        <div
          className={
            "wrg-toggle-container " + (toggle ? "bg-green-700" : "bg-black")
          }
        >
          <div className="wrg-toggle-check">
            <span className="text-white">Yes</span>
          </div>
          <div className="wrg-toggle-uncheck">
            <span className="text-white">No</span>
          </div>
        </div>
        <div className="wrg-toggle-circle"></div>
        <input
          type="checkbox"
          aria-label="Toggle Button"
          className="wrg-toggle-input"
        />
      </div>
    </InputWrapper>
  )
}
