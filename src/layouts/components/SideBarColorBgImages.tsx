import React from "react"
import * as LibraryComponents from "@lp/library/components"

interface SideBarColorBgImagesProps {
  data: Array<{ color: string }>
  images: Array<{ image: any }>
  onChangeShoutcutColor?: (color: string) => void
  onChangeSidebarColor?: (color: string) => void
  onChangeImage?: (image: any) => void
}

export const SideBarColorBgImages = ({
  data,
  images,
  onChangeSidebarColor,
  onChangeShoutcutColor,
  onChangeImage,
}: SideBarColorBgImagesProps) => {
  // console.log('Data in props',props)
  return (
    <React.Fragment>
      <>
        <hr />
        <small className="d-block text-uppercase font-weight-bold text-muted mb-2 my-3.5">
          COLOR
        </small>
        <div className="sideBarColorOptions my-1.5">
          <div className="row">
            <div className="col-sm-5">
              <h4>Side Bar</h4>
            </div>
            <div className="col-md-7 d-flex theme-options overflow-x-scroll  p-0">
              {data.map((item, index) => {
                return (
                  <div
                    key={index}
                    className="w-5 h-5 rounded-3xl px-2.5 mx-1.5 border-solid"
                    style={{ backgroundColor: `${item.color}` }}
                    onClick={() =>
                      onChangeSidebarColor && onChangeSidebarColor(item.color)
                    }
                  />
                )
              })}
            </div>
          </div>
        </div>
        <div className="sideBarColorOptions my-1.5">
          <div className="row">
            <div className="col-sm-5">
              <h4>Shortcut Bar</h4>
            </div>
            <div className="col-md-7 d-flex theme-options overflow-x-scroll p-0">
              {data.map((item, index) => {
                return (
                  <div
                    key={index}
                    className="w-5 h-5  rounded-3xl border-black px-2.5	mx-1.5"
                    style={{ backgroundColor: `${item.color}` }}
                    onClick={ ()=>
                      onChangeShoutcutColor && onChangeShoutcutColor(item.color)
                    }
                  />
                )
              })}
            </div>
          </div>
        </div>

        <hr />

        <small className="d-block text-uppercase font-weight-bold text-muted mb-2 my-2.5">
          IMAGES
        </small>
        <div className="backImages d-flex justify-content-between">
          <h4>Background Images</h4>
          <LibraryComponents.Atoms.Form.Toggle />
        </div>
        <h4 className="title my-2.5">Background Images</h4>
        <div className="d-flex justify-content-between">
          {images.map((item, index) => {
            return (
              <img
                key={index}
                className="w-15 h-20"
                src={item.image}
                alt=""
                onClick={() => onChangeImage && onChangeImage(item.image)}
              />
            )
          })}
        </div>
      </>
    </React.Fragment>
  )
}
