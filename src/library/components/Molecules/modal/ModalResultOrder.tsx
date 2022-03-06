/* eslint-disable */
import React, { useMemo } from "react"
import { Container } from "reactstrap"
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd"

const grid = 8
const getListStyle = (isDraggingOver) => ({
  background: isDraggingOver ? "lightblue" : "none",
  display: "flex",
  padding: grid,
  overflow: "auto",
})

export interface ModalResultOrderProps {
  id?: string
  field?: string
  isVisible?: boolean
  title?: string
  data?: any
  onClick?: (item: any) => void
  onClose?: () => void
}

export const ModalResultOrder = ({
  isVisible = false,
  title,
  data,
  onClick,
  onClose,
}: ModalResultOrderProps) => {
 

  const order = useMemo(
    () => (
      <>
        <DragDropContext
          onDragEnd={(result: any) => {
            const items = Array.from(data)
            const [reorderedItem] = items.splice(result.source.index, 1)
            items.splice(result.destination.index, 0, reorderedItem)
            data = items
          
          }}
        >
          <Droppable droppableId="characters" direction="horizontal">
            {(provided, snapshot) => (
              <ul
                style={getListStyle(snapshot.isDraggingOver)}
                // className="grid grid-cols-1 p-2"
                {...provided.droppableProps}
                ref={provided.innerRef}
              >
                {data?.map((item, index) => (
                  <>
                    <Draggable key={item} draggableId={item} index={index}>
                      {(provided, snapshot) => (
                        <div
                          className="flex items-center bg-blue-500  p-2 m-2 rounded-md"
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                        >
                          <li className="m-2 text-white inline">{`${
                            index + 1
                          }. ${item}`}</li>
                        </div>
                      )}
                    </Draggable>
                  </>
                ))}
              </ul>
            )}
          </Droppable>
        </DragDropContext>
      </>
    ),
    [data]
  )

  return (
    <Container>
      {isVisible && (
        <>
          <div
            className="justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
            onClick={() => {
              //onClose && onClose()
              // setShowModal(false)
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
                      //setShowModal(false)
                    }}
                  >
                    <span className=" text-black h-6 w-6 text-2xl block outline-none focus:outline-none">
                      ×
                    </span>
                  </button>
                </div>
                {/*body*/}

                <div className="relative p-2 flex-auto">{order}</div>

                {/*footer*/}
                <div className="flex items-center justify-end p-2 border-t border-solid border-gray-300 rounded-b">
                  <button
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1"
                    type="button"
                    style={{ transition: "all .15s ease" }}
                    onClick={() => {
                      onClose && onClose()
                      // setShowModal(false)
                    }}
                  >
                    Close
                  </button>
                  <button
                    className="bg-green-500 text-white active:bg-green-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1"
                    type="button"
                    style={{ transition: "all .15s ease" }}
                    onClick={() => {
                      //setShowModal(false)
                      onClick && onClick(data)
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
