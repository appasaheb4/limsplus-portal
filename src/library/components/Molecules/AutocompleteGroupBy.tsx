import React, { useState, useEffect } from "react"

interface AutocompleteGroupByProps {
  data?: any[]
  onChange?: () => void
  onClose?: () => void
}

const AutocompleteGroupBy = (props: AutocompleteGroupByProps) => {
  const [data, setData] = useState<any[]>()
  const [options, setOptions] = useState<any[]>()
  useEffect(() => {
    setData(props.data)
    setOptions(props.data)
  }, [props])

  const onChange = (e) => {
    const search = e.target.value
    if (search) {
      const filteredOptions = options?.filter(
        (option) => option.title.toLowerCase().indexOf(search.toLowerCase()) > -1
      )
      //   const filterArray: any[] = []
      //   const filteredOptions = options?.filter((item) => {
      //     item.children.filter((children) => {
      //       const childrenItem =
      //         children.title.toLowerCase().indexOf(search.toLowerCase()) > -1
      //       if (childrenItem) {
      //         const isSameArray = filterArray.filter((filterItem, index) => {
      //           if (filterItem.name === item.name) {
      //             const newChildren = filterArray[index].children.concat(children)
      //             filterArray[index] = { ...filterArray[index], children: newChildren }
      //             // return filterArray
      //           }
      //         })
      //         if (isSameArray && isSameArray.length > 1) {
      //           console.log("same")
      //         } else {
      //           console.log({ isSameArray })
      //           filterArray.push({ ...item, children: [children] })
      //         }
      //       }
      //     })
      //   })
      //   console.log({ filterArray })
      setOptions(filteredOptions)
    } else {
      setOptions(data)
    }

    // this.setState({
    //   activeOption: 0,
    //   filteredOptions,
    //   showOptions: true,
    //   userInput,
    // })
  }

  //   const onKeyDown = (e) => {
  //       if (e.keyCode === 13) {
  //         this.setState({
  //           activeOption: 0,
  //           showSuggestions: false,
  //           userInput: filteredOptions[activeOption],
  //         })
  //       } else if (e.keyCode === 38) {
  //         if (activeOption === 0) {
  //           return
  //         }
  //         this.setState({ activeOption: activeOption - 1 })
  //       } else if (e.keyCode === 40) {
  //         if (activeOption - 1 === filteredOptions.length) {
  //           return
  //         }
  //         this.setState({ activeOption: activeOption + 1 })
  //       }
  //   }

  return (
    <>
      <div className="p-2">
        <input
          placeholder="Search Menu Item"
          //   value={props.value}
          className="leading-4 p-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-base border border-gray-300 rounded-md"
          //   onKeyDown={onKeyDown}
          onChange={onChange}
        />
        <div className="mt-1">
          <ul className="bg-white p-2 rounded-sm">
            {options?.map((item, index) => (
              <>
                <li key={index} className="text-gray-400">
                  {item.title}
                </li>
                <ul className="ml-4">
                  {item.children.map((children, childrenIndex) => (
                    <li key={childrenIndex}>{children.title}</li>
                  ))}
                </ul>
              </>
            ))}
          </ul>
        </div>
      </div>
    </>
  )
}
export default AutocompleteGroupBy
