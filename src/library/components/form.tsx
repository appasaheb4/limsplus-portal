import React from "react"
import * as LibraryComponents from "@lp/library/components"

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
  label: string
}

export const InputWrapper: React.FunctionComponent<InputWrapperProps> = (props) => (
  <div>
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
        <LibraryComponents.List space={3} direction="row">
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
        </LibraryComponents.List>
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
  onChange?: (e: any) => void
}

export const InputFile = (props: InputFileProps) => (
  <InputWrapper label={props.label} id={props.id}>
    <input
      type="file"
      id={props.id}
      name={props.name}
      disabled={props.disabled || false}
      value={props.value}
      onChange={(e) => props.onChange && props.onChange(e)}
      className="leading-4 p-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-base border border-gray-300 rounded-md"
    />
  </InputWrapper>
)

export const MultilineInput = (props: InputProps) => (
  <InputWrapper label={props.label} id={props.id}>
    <textarea
      id={props.id}
      autoComplete="given-name"
      value={props.value}
      rows={5}
      onChange={(e) => props.onChange && props.onChange(e.target.value)}
      className="leading-4 p-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-base border border-gray-300 rounded-md"
    />
  </InputWrapper>
)

interface TagInputProps extends InputWrapperProps {
  value?: string[]
  onChange: (tags: string[]) => void
}

// export const TagInput = (props: TagInputProps) => {
//   const [search, setSearch] = React.useState<string>("");
//   return (
//     <InputWrapper label={props.label} id={props.id}>
//       <div className="p-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-base border border-gray-300 rounded-md flex flex-wrap">
//         {props.value?.map((tag, index) => (
//           <div className="my-0.5 mr-1">
//             <Button
//               pill={true}
//               size="small"
//               type="solid"
//               icon={Icons.Remove}
//               onClick={() => {
//                 let newArray = [...(props.value || [])];
//                 newArray.splice(index, 1);
//                 props.onChange(newArray);
//               }}
//             >
//               {tag}
//             </Button>
//           </div>
//         ))}
//         <div className="self-stretch flex items-center">
//           <input
//             type="search"
//             value={search}
//             onChange={({ target: { value: search } }) => setSearch(search)}
//             className={`text-sm min-w-0 outline-none ring-0 ${
//               props.value?.length ? "w-16" : "w-full"
//             } my-0.5`}
//             onKeyDown={(e) => {
//               if (e.key === "Enter") {
//                 props.onChange(
//                   Array.from(new Set([...(props.value || []), search]))
//                 );
//                 setSearch("");
//               }
//             }}
//           />
//         </div>
//       </div>
//     </InputWrapper>
//   );
// };
