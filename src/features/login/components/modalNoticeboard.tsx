import React, { useEffect } from "react"
import { Container } from "reactstrap"
import * as Assets from "@lp/library/assets"
import { Frown as Sad } from "react-feather"
import * as Config from "@lp/config"

interface ModalProps {
  show?: boolean
  title?: string
  body?: string
  click: () => void
}

export default function ModalNoticeBoard(props: ModalProps) {
  const [showModal, setShowModal] = React.useState(props.show)
  useEffect(() => {
    setShowModal(props.show)
  }, [props])

  return (
    <Container>
      {showModal && (
        <>
          <div
            className="justify-center items-center  overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
            onClick={() => setShowModal(false)}
          >
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div>
                  <button
                    className="p-1  border-0 text-black opacity-1 ml-6 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setShowModal(false)}
                  >
                    <span className=" text-black h-6 w-6 text-2xl block outline-none focus:outline-none">
                      ×
                    </span>
                  </button>
                </div>
                <div className="flex  flex-col  items-center justify-between p-2 border-b border-solid border-gray-300 rounded-t">
                  <div className="items-center justify-center flex mb-2">
                    <img
                      src={Assets.logo}
                      className=" img-thumbnail img-fluid"
                      style={{ width: 70, height: 55, marginRight: 10 }}
                    />
                    <h4 className="font-semibold">{`Lims Plus`}</h4>
                  </div>
                  <div>
                    <div className="items-center justify-center flex">
                      <Sad
                        size={60}
                        color={Config.Styles.COLORS.BLACK}
                        style={{ marginRight: 10 }}
                      />
                      <h1 className="text-4xl">{`System is under maintance`}</h1>
                    </div>
                  </div>
                </div>

                {/*body*/}
                <div className="relative p-6 flex-auto">
                  <p className="my-4 text-gray-600 text-lg leading-relaxed">
                    {`System is under Mentinance Mode, can not available from 11:00 PM to 12...`}
                  </p>
                </div>
                {/*footer*/}
                <div className="flex items-center justify-center p-2 border-t border-solid border-gray-300 rounded-b">
                  <button
                    className="bg-black text-white active:bg-green-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1"
                    type="button"
                    style={{ transition: "all .15s ease" }}
                    onClick={() => {
                      setShowModal(false)
                      props.click()
                    }}
                  >
                    Logout
                  </button>
                </div>
                <div className="justify-center items-center flex">
                  <p>Powered by Lims Plus Solutions Pvt Ltd.</p>
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
