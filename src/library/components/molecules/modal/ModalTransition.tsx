import React from "react"
import { Transition } from "@headlessui/react"

interface ModalProps {
  show: boolean
  onClose: () => void
  children: React.ReactNode
}
  
export const ModalTransition: React.FunctionComponent<any> = (props: ModalProps) => (
  <div
    className={`fixed inset-0 overflow-hidden z-50 ${
      !props.show && "pointer-events-none"
    }`}
  >
    <div className="absolute inset-0 overflow-hidden">
      <Transition
        show={props.show}
        enterFrom={"opacity-0"}
        enterTo={"opacity-100"}
        enter={"ease-in-out duration-500"}
        leave={"ease-in-out duration-500"}
        leaveFrom={"opacity-100"}
        leaveTo={"opacity-0"}
      >
        <div
          className="absolute inset-0 bg-gray-600 bg-opacity-75 transition-opacity"
          aria-hidden="true"
          onClick={() => {
            props.onClose && props.onClose()
          }}
        ></div>
      </Transition>
      <section
        className="absolute inset-y-0 right-0 pl-10 max-w-full flex"
        aria-labelledby="slide-over-heading"
      >
        <Transition
          show={props.show}
          enter="transform transition ease-in-out duration-500 sm:duration-700"
          enterFrom="translate-x-full"
          enterTo="translate-x-0"
          leave="transform transition ease-in-out duration-500 sm:duration-700"
          leaveFrom="translate-x-0"
          leaveTo="translate-x-full"
        >
          <div className="relative w-screen max-w-xs h-full">
            <div className="absolute top-0 left-0 -ml-8 pt-4 pr-2 flex sm:-ml-10 sm:pr-4">
              <button
                onClick={() => {
                  props.onClose && props.onClose()
                }}
                className="rounded-md text-gray-300 hover:text-white focus:outline-none focus:ring-2 focus:ring-white"
              >
                <span className="sr-only">Close panel</span>
                <svg
                  className="h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            <div className="h-full flex flex-col bg-white shadow-xl overflow-y-scroll">
              {props.children}
            </div>
          </div>
        </Transition>
      </section>
    </div>
  </div>
)
