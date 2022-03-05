import React, { useState, useEffect } from "react"
import { Container } from "reactstrap"

export interface ModalResultOrderProps {
  isVisible?: boolean
  title?: string
  data?: string
  onClick?: (item: any) => void
  onClose?: () => void
}

export const ModalResultOrder = ({
  isVisible,
  title,
  onClick,
  onClose,
}: ModalResultOrderProps) => {
  const [showModal, setShowModal] = useState(isVisible)

  useEffect(() => {
    setShowModal(isVisible)
  }, [isVisible])

  return (
    <Container>
      {showModal && (
        <>
          <div
            className="justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
            onClick={() => {
              onClose && onClose()
              setShowModal(false)
            }}
          >
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-2 border-b border-solid border-gray-300 rounded-t">
                  <h3 className="text-3xl font-semibold">{title}</h3>
                  <button
                    className="p-1  border-0 text-black opacity-1 ml-6 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => {
                      onClose && onClose()
                      setShowModal(false)
                    }}
                  >
                    <span className=" text-black h-6 w-6 text-2xl block outline-none focus:outline-none">
                      ×
                    </span>
                  </button>
                </div>
                {/*body*/}

                <div className="relative p-2 flex-auto">
                  <p className="my-4 text-gray-600 text-lg leading-relaxed">
                    <h1>body</h1>
                  </p>
                </div>

                {/*footer*/}
                <div className="flex items-center justify-end p-2 border-t border-solid border-gray-300 rounded-b">
                  <button
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1"
                    type="button"
                    style={{ transition: "all .15s ease" }}
                    onClick={() => {
                      onClose && onClose()
                      setShowModal(false)
                    }}
                  >
                    Close
                  </button>
                  <button
                    className="bg-green-500 text-white active:bg-green-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1"
                    type="button"
                    style={{ transition: "all .15s ease" }}
                    onClick={() => {
                      setShowModal(false)
                      onClick && onClick({})
                    }}
                  >   
                    Update
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
