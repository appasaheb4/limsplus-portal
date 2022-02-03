import React, { useEffect } from "react"
import { Container } from "reactstrap"
import TimeKeeper from "react-timekeeper"

interface ModalProps {
  time?: any
  show?: boolean
  title?: string
  type?: string
  body?: string
  onClick: (time?: any) => void
  onClose: () => void
}
   
export const ModalClock = (props: ModalProps) => {
  const [showModal, setShowModal] = React.useState(props.show)
  useEffect(() => {
    setShowModal(props.show)
  }, [props])

  return (
    <Container>
      {showModal && (
        <>
          <div className="justify-center items-center  overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-0 my-6 mx-auto">
              {/*content*/}
              <div className="border-0 justify-center items-center rounded-lg shadow-lg relative flex flex-col  bg-white outline-none focus:outline-none">
                <>
                  <div className="relative p-2 flex-auto">
                    <TimeKeeper
                      time={props.time}
                      onChange={(newTime) => {
                        props.onClick(newTime.formatted12)
                      }}
                      onDoneClick={() => props.onClose()}
                      switchToMinuteOnHourSelect
                    />
                  </div>
                </>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      )}
    </Container>
  )
}
