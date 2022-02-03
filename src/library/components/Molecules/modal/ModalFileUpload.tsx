import React, { useEffect } from "react"
import { Container } from "reactstrap"
import {Form} from "@lp/library/components"

interface ModalProps {
  show?: boolean
  title?: string
  onClick: (image: any) => void
  onClose: () => void
}  
   
export const ModalFileUpload = (props: ModalProps) => {
  const [showModal, setShowModal] = React.useState(props.show)
  const [image, setImage] = React.useState<any>()

  useEffect(() => {
    setShowModal(props.show)
  }, [props.show])

  return (
    <Container>
      {showModal && (
        <>
          <div className="justify-center items-center  overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-2 border-b border-solid border-gray-300 rounded-t">
                  <h3 className="text-3xl font-semibold">{props.title}</h3>
                  <button
                    className="p-1  border-0 text-black opacity-1 ml-6 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => {
                      setShowModal(false)
                      props.onClose && props.onClose()
                    }}
                  >
                    <span className=" text-black h-6 w-6 text-2xl block outline-none focus:outline-none">
                      ×
                    </span>
                  </button>
                </div>
                {/*body*/}
                <div className="relative p-2 flex-auto">
                  <Form.InputFile
                    label="File"
                    id="file"
                    placeholder="File"
                    onChange={(e) => {
                      const image = e.target.files[0]
                      setImage(image)
                    }}
                  />
                </div>
                {/*footer*/}
                <div className="flex items-center justify-end p-2 border-t border-solid border-gray-300 rounded-b">
                  <button
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1"
                    type="button"
                    style={{ transition: "all .15s ease" }}
                    onClick={() => {
                      setShowModal(false)
                      props.onClose && props.onClose()
                    }}
                  >
                    Close
                  </button>
                  <button
                    className="bg-green-500 text-white active:bg-green-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1"
                    type="button"
                    style={{ transition: "all .15s ease" }}
                    onClick={() => {
                      if (image !== undefined) {
                        props.onClick && props.onClick(image)
                      } else {
                        alert("Please select image")
                      }
                    }}
                  >
                    Upload
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      )}
    </Container>
  )
}
