import React from 'react';
import {connect} from 'react-redux';

import {toggleBoxedLayout} from '../../redux/actions/layoutActions';
import {toggleStickySidebar} from '../../redux/actions/sidebarActions';
import {toggleSidebar} from '../../redux/actions/sidebarActions';
import {Settings as SettingsIcon} from 'react-feather';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faAngleRight} from '@fortawesome/free-solid-svg-icons';
import {SideBarColorBgImages} from './SideBarColorBgImages';
import {images} from '@/library/assets';

import {Badge, Button} from 'reactstrap';
import PerfectScrollbar from 'react-perfect-scrollbar';
import {stores} from '@/stores';

// import { createThis } from "typescript"

type Props = {layout; sidebar; dispatch};
type State = {isOpen: boolean; colorList: any; imageList: any};

class Settings extends React.Component<Props, State> {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      colorList: [
        {color: '#3CB371'},
        {color: '#BDB76B'},
        {color: '#5F9EA0'},
        {color: '#1E90FF'},
        {color: '#DA70D6'},
        {color: '#FF69B4'},
        {color: '#778899'},
        {color: '#DEB887'},
        {color: '#778899'},
        {color: '#32CD32'},
        {color: '#B0E0E6'},
      ],
      imageList: [
        {image: images.img1},
        {image: images.img2},
        {image: images.img3},
        {image: images.img4},
      ],
    };

    this.setWrapperRef = this.setWrapperRef.bind(this);
    this.handleClickOutside = this.handleClickOutside.bind(this);
  }

  toggleSidebar() {
    this.setState({isOpen: !this.state.isOpen});
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
    console.log({event});
    // if (this.wrapperRef && !this.wrapperRef.contains(event.target)) {
    //   this.setState({ isOpen: false });
    // }
  }

  render() {
    const {isOpen} = this.state;
    const {layout, sidebar, dispatch} = this.props;
    return (
      <div
        ref={this.setWrapperRef}
        className={'settings ' + (isOpen ? 'open' : '')}
      >
        <div className='settings-toggle' onClick={() => this.toggleSidebar()}>
          <SettingsIcon />
        </div>

        <div className='settings-panel'>
          <div className='settings-content'>
            <PerfectScrollbar>
              <div className='settings-title'>
                <Button close onClick={() => this.toggleSidebar()} />
                <h4>Settings</h4>
              </div>

              <div className='settings-section'>
                <small className='d-block text-uppercase font-weight-bold text-muted mb-2'>
                  Layouts
                </small>

                <ul className='settings-layouts'>
                  <li>
                    <span
                      className='settings-layouts-item'
                      onClick={() =>
                        dispatch(toggleStickySidebar(), this.toggleSidebar())
                      }
                    >
                      {sidebar.isSticky ? 'Static Sidebar' : 'Sticky Sidebar'}
                      <Badge tag='small' className='float-right mt-1'>
                        <FontAwesomeIcon icon={faAngleRight as any} />
                      </Badge>
                    </span>
                  </li>
                  <li>
                    <span
                      className='settings-layouts-item'
                      onClick={() =>
                        dispatch(toggleSidebar(), this.toggleSidebar())
                      }
                    >
                      {sidebar.isOpen ? 'Collapsed Sidebar' : 'Visible Sidebar'}
                      <Badge tag='small' className='float-right mt-1'>
                        <FontAwesomeIcon icon={faAngleRight as any} />
                      </Badge>
                    </span>
                  </li>
                  <li>
                    <span
                      className='settings-layouts-item'
                      onClick={() =>
                        dispatch(toggleBoxedLayout(), this.toggleSidebar())
                      }
                    >
                      {layout.isBoxed ? 'Full Layout' : 'Boxed Layout'}
                      <Badge tag='small' className='float-right mt-1'>
                        <FontAwesomeIcon icon={faAngleRight as any} />
                      </Badge>
                    </span>
                  </li>
                </ul>
                <SideBarColorBgImages
                  data={this.state.colorList}
                  //images={this.state.imageList}
                  onChangeSidebarColor={(color: string) => {
                    stores.appStore.updateApplicationSetting({
                      ...stores.appStore.applicationSetting,
                      sideBarColor: color,
                    });
                  }}
                  onChangeShoutcutColor={(color: string) => {
                    stores.appStore.updateApplicationSetting({
                      ...stores.appStore.applicationSetting,
                      shortCutBarColor: color,
                    });
                  }}
                  // onChangeImage={(image: any)=>{
                  //   stores.appStore.updateApplicationSetting({
                  //     ...stores.appStore.applicationSetting,
                  //     imageSideBarBgImage:image
                  //   })
                  // }}
                />
              </div>
            </PerfectScrollbar>
          </div>
        </div>
      </div>
    );
  }
}

export default connect((store: any) => ({
  layout: store.layout,
  sidebar: store.sidebar,
}))(Settings);
