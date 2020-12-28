import React from "react";
import Button from "./button";
import * as Icons from "./icon";

interface LabelProps {
  htmlFor: string;
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
);

interface InputWrapperProps {
  id: string;
  label: string;
}

export const InputWrapper: React.FunctionComponent<InputWrapperProps> = (
  props
) => (
  <div>
    <Label htmlFor={props.id}>{props.label}</Label>
    {props.children}
  </div>
);

interface InputProps extends InputWrapperProps {
  value?: any;
  placeholder?: string;
  type?: string;
  required?: boolean;
  onChange?: (text: string) => void;
}

export const Input = (props: InputProps) => (
  <InputWrapper label={props.label} id={props.id}>
    <input
      type={props.type || "text"}
      id={props.id}
      placeholder={props.placeholder}
      required={props.required || false}
      autoComplete="given-name"
      value={props.value}
      onChange={(e) => props.onChange && props.onChange(e.target.value)}
      className="leading-4 p-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-base border border-gray-300 rounded-md"
    />
  </InputWrapper>
);

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
);

interface TagInputProps extends InputWrapperProps {
  value?: string[];
  onChange: (tags: string[]) => void;
}

export const TagInput = (props: TagInputProps) => {
  const [search, setSearch] = React.useState<string>("");
  return (
    <InputWrapper label={props.label} id={props.id}>
      <div className="p-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-base border border-gray-300 rounded-md flex flex-wrap">
        {props.value?.map((tag, index) => (
          <div className="my-0.5 mr-1">
            <Button
              pill={true}
              size="small"
              type="solid"
              icon={Icons.Remove}
              onClick={() => {
                let newArray = [...(props.value || [])];
                newArray.splice(index, 1);
                props.onChange(newArray);
              }}
            >
              {tag}
            </Button>
          </div>
        ))}
        <div className="self-stretch flex items-center">
          <input
            type="search"
            value={search}
            onChange={({ target: { value: search } }) => setSearch(search)}
            className={`text-sm min-w-0 outline-none ring-0 ${
              props.value?.length ? "w-16" : "w-full"
            } my-0.5`}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                props.onChange(
                  Array.from(new Set([...(props.value || []), search]))
                );
                setSearch("");
              }
            }}
          />
        </div>
      </div>
    </InputWrapper>
  );
};
