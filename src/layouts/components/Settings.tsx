import React from "react"
import { connect } from "react-redux"

import { toggleBoxedLayout } from "../../redux/actions/layoutActions"
import { toggleStickySidebar } from "../../redux/actions/sidebarActions"
import { toggleSidebar } from "../../redux/actions/sidebarActions"

import { Badge, Button } from "reactstrap"
import PerfectScrollbar from "react-perfect-scrollbar"

import { Settings as SettingsIcon } from "react-feather"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faAngleRight } from "@fortawesome/free-solid-svg-icons"
import { SideBarColorBgImages } from "./SideBarColorBgImages"
import * as Assets from '@lp/library/assets'

// import { createThis } from "typescript"

type Props = { layout; sidebar; dispatch }
type State = { isOpen: boolean; colorList: any; imageList: any }

class Settings extends React.Component<Props, State> {
  constructor(props) {
    super(props)
    this.state = {
      isOpen: false,
      colorList: [
        { color: "#FF0000" },
        { color: "#FFFFFF" },
        { color: "#00FF00" },
        { color: "#FFA500" },
        { color: "#C0C0C0" },
        { color: "#FFFF00" },
        { color: "#0000FF" },
        { color: "#800080" },
        { color: "#000080" },
        { color: "#008080" },
      ],
      imageList: [
        { image: Assets.images.img1 },
        // { image: Assets.images.img2 },
        // { image: Assets.images.img3 },
        // { image: Assets.images.img4 },
      ],
    }

    this.setWrapperRef = this.setWrapperRef.bind(this)
    this.handleClickOutside = this.handleClickOutside.bind(this)
  }

  toggleSidebar() {
    this.setState({ isOpen: !this.state.isOpen })
  }

  // componentDidMount() {
  //   document.addEventListener("mousedown", this.handleClickOutside)
  // }

  // componentWillUnmount() {
  //   document.removeEventListener("mousedown", this.handleClickOutside)
  // }

  setWrapperRef() {
    //  this.wrapperRef = node;
    //console.log({ node })
  }
  
  handleClickOutside(event) {
    console.log({ event })
    // if (this.wrapperRef && !this.wrapperRef.contains(event.target)) {
    //   this.setState({ isOpen: false });
    // }
  }

  render() {
    const { isOpen } = this.state
    const { layout, sidebar, dispatch } = this.props
    return (
      <div ref={this.setWrapperRef} className={"settings " + (isOpen ? "open" : "")}>
        <div className="settings-toggle" onClick={() => this.toggleSidebar()}>
          <SettingsIcon />
        </div>

        <div className="settings-panel">
          <div className="settings-content">
            <PerfectScrollbar>
              <div className="settings-title">
                <Button close onClick={() => this.toggleSidebar()} />
                <h4>Settings</h4>
              </div>

              <div className="settings-section">
                <small className="d-block text-uppercase font-weight-bold text-muted mb-2">
                  Layouts
                </small>

                <ul className="settings-layouts">
                  <li>
                    <span
                      className="settings-layouts-item"
                      onClick={() =>
                        dispatch(toggleStickySidebar(), this.toggleSidebar())
                      }
                    >
                      {sidebar.isSticky ? "Static Sidebar" : "Sticky Sidebar"}
                      <Badge tag="small" className="float-right mt-1">
                        <FontAwesomeIcon icon={faAngleRight} />
                      </Badge>
                    </span>
                  </li>
                  <li>
                    <span
                      className="settings-layouts-item"
                      onClick={() => dispatch(toggleSidebar(), this.toggleSidebar())}
                    >
                      {sidebar.isOpen ? "Collapsed Sidebar" : "Visible Sidebar"}
                      <Badge tag="small" className="float-right mt-1">
                        <FontAwesomeIcon icon={faAngleRight} />
                      </Badge>
                    </span>
                  </li>
                  <li>
                    <span
                      className="settings-layouts-item"
                      onClick={() =>
                        dispatch(toggleBoxedLayout(), this.toggleSidebar())
                      }
                    >
                      {layout.isBoxed ? "Full Layout" : "Boxed Layout"}
                      <Badge tag="small" className="float-right mt-1">
                        <FontAwesomeIcon icon={faAngleRight} />
                      </Badge>
                    </span>
                  </li>
                </ul>
                <SideBarColorBgImages
                  data={this.state.colorList}
                  images={this.state.imageList}
                  onChangeSidebarColor={(color: string)=>console.log({color})}
                  onChangeShoutcutColor={(color: string)=>console.log({color})}
                  onChangeImage={(image: any)=>console.log({image})}
                />
              </div>
            </PerfectScrollbar>
          </div>
        </div>
      </div>
    )
  }
}

export default connect((store: any) => ({
  layout: store.layout,
  sidebar: store.sidebar,
}))(Settings)
