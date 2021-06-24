import React from "react"
import { connect } from "react-redux"

import { toggleBoxedLayout } from "../../redux/actions/layoutActions"
import { toggleStickySidebar } from "../../redux/actions/sidebarActions"
import { toggleSidebar } from "../../redux/actions/sidebarActions"
import * as LibraryComponents from "@lp/library/components"
import { Badge, Button } from "reactstrap"
import PerfectScrollbar from "react-perfect-scrollbar"
// import  IMAGES from '../../library/assets/backimg'
import img1 from '../../library/assets/images/back-img-1.jpg'
import { Settings as SettingsIcon } from "react-feather"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faAngleRight } from "@fortawesome/free-solid-svg-icons"

import '../../library/assets/css/setting.css';

type Props = { layout; sidebar; dispatch }
type State = { isOpen: boolean }

class Settings extends React.Component<Props, State> {
  constructor(props) {
    super(props)
  
    this.state = {
      isOpen: false,
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
                <hr/>
                <small className="d-block text-uppercase font-weight-bold text-muted mb-2">
                  COLOR
                </small>
                <div className='sideBarColorOptions'>
                  <div className='row'>
                      <div className='col-sm-5'>
                          <h4>Side Bar</h4>
                      </div>
                      <div className='col-md-7 d-flex theme-options'>
                          <div className='theme color-black'/>
                          <div className='theme color-white' />
                          <div className='theme color-red' />
                          <div className='theme color-green' />
                          <div className='theme color-blue'/>
                          <div className='theme color-yellow'/>
                          <div className='theme color-violet'/>
                          <div className='theme color-purple'/>
                          <div className='theme color-indigo'/>
                          <div className='theme color-grey'/>
                          <div className='theme color-silver'/>
                          <div className='theme color-pink'/>
                          <div className='theme color-brown'/>
                          <div className='theme color-beige'/>
                          <div className='theme color-gold'/>
                          <div className='theme color-orange'/>

                      </div>
                  </div>
                </div>

                 {/* <hr /> */}
                <div className='sideBarColorOptions'>
                  <div className='row'>
                      <div className='col-sm-5'>
                          <h4>Shortcut Bar</h4>
                      </div>
                      <div className='col-md-7 d-flex theme-options'>
                          <div className='theme color-black'/>
                          <div className='theme color-white' />
                          <div className='theme color-red' />
                          <div className='theme color-green' />
                          <div className='theme color-blue'/>
                          <div className='theme color-yellow'/>
                          <div className='theme color-violet'/>
                          <div className='theme color-purple'/>
                          <div className='theme color-indigo'/>
                          <div className='theme color-grey'/>
                          <div className='theme color-silver'/>
                          <div className='theme color-pink'/>
                          <div className='theme color-brown'/>
                          <div className='theme color-beige'/>
                          <div className='theme color-gold'/>
                          <div className='theme color-orange'/>
                      </div>
                  </div>
                </div>  

                <hr />     
                <small className="d-block text-uppercase font-weight-bold text-muted mb-2">
                  IMAGES
                </small>
                <div className='backImages d-flex'>
                      <h4>Background Images (Yes/no) </h4>
                      <LibraryComponents.Atoms.Form.Toggle/>
                      </div>
                      <h4>Background Images</h4>
                      <div className='d-flex'>
                        <img src={img1} alt="" width='100px' height='100px' />
                        {/* {
                          IMAGES.map((item)=>
                          <div key={item.id}>
                            <img src={item.image} alt='' style={{width:'100px',height:'100px'}} />
                          </div>
                          )
                         
                        } */}
                      </div>
                

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
