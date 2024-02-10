import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { observer } from 'mobx-react';
import { Buttons, Svg } from '@/library/components';

import { toggleBoxedLayout } from '../../redux/actions/layout-action';
import { toggleStickySidebar } from '../../redux/actions/sidebar-action';
import { toggleSidebar } from '../../redux/actions/sidebar-action';
import { Settings as SettingsIcon } from 'react-feather';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleRight } from '@fortawesome/free-solid-svg-icons';
import SideBarColorBgImages from './sidebar-color-bg-image.component';

import { Badge } from 'reactstrap';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { stores, useStores } from '@/stores';

type Props = { layout; sidebar; dispatch };
type State = { isOpen: boolean; colorList: any; imageList: any };

const Settings = observer(props => {
  const { appStore } = useStores();
  const { layout, sidebar, dispatch } = props;
  const [isHidden, setIsHidden] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [colorList, setColorList] = useState([
    { color: '#3CB371' },
    { color: '#BDB76B' },
    { color: '#5F9EA0' },
    { color: '#1E90FF' },
    { color: '#DA70D6' },
    { color: '#FF69B4' },
    { color: '#778899' },
    { color: '#DEB887' },
    // { color: '#778899' },
    { color: '#32CD32' },
    // { color: '#B0E0E6' },
  ]);

  // useEffect(() => {
  //   if (appStore.applicationSetting.theme == 'dark') setIsHidden(true);
  //   else setIsHidden(false);
  // }, [appStore.applicationSetting.theme]);

  return (
    <div className=''>
      <div
        className={`settings ${isOpen ? 'open' : ''} )`}
        style={{ width: 20 }}
      >
        <div
          className='settings-toggle'
          onClick={() => {
            setIsOpen(!isOpen);
          }}
        >
          <SettingsIcon />
        </div>

        <div className='settings-panel dark:bg-boxdark  dark:text-white'>
          <div className='settings-content dark:bg-boxdark  dark:text-white'>
            <PerfectScrollbar>
              <div className='flex items-center p-4 justify-between'>
                <span>Settings</span>
                <Buttons.Button
                  size='medium'
                  buttonClass='pl-4'
                  icon={Svg.Remove}
                  onClick={() => {
                    setIsOpen(!isOpen);
                  }}
                />
              </div>

              <div className='settings-section'>
                <span className='d-block text-uppercase font-weight-bold text-muted mb-2'>
                  Layouts
                </span>

                <ul className='settings-layouts'>
                  <li>
                    <span
                      className='settings-layouts-item'
                      onClick={() =>
                        dispatch(toggleStickySidebar(), setIsOpen(!isOpen))
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
                        dispatch(toggleSidebar(), setIsOpen(!isOpen))
                      }
                    >
                      {'Collapsed Sidebar'}
                      <Badge tag='small' className='float-right mt-1'>
                        <FontAwesomeIcon icon={faAngleRight as any} />
                      </Badge>
                    </span>
                  </li>
                  <li>
                    <span
                      className='settings-layouts-item'
                      onClick={() =>
                        dispatch(toggleSidebar(), setIsOpen(!isOpen))
                      }
                    >
                      {'Visible Sidebar'}
                      <Badge tag='small' className='float-right mt-1'>
                        <FontAwesomeIcon icon={faAngleRight as any} />
                      </Badge>
                    </span>
                  </li>
                  <li>
                    <span
                      className='settings-layouts-item'
                      onClick={() =>
                        dispatch(toggleBoxedLayout(), setIsOpen(!isOpen))
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
                  data={colorList}
                  onChangeSidebarColor={(color: string) => {
                    stores.appStore.updateApplicationSetting({
                      ...stores.appStore.applicationSetting,
                      sideBarColor: color,
                    });
                  }}
                  onChangeNavbarColor={(color: string) => {
                    stores.appStore.updateApplicationSetting({
                      ...stores.appStore.applicationSetting,
                      navBarColor: color,
                    });
                  }}
                />
              </div>
            </PerfectScrollbar>
          </div>
        </div>
      </div>
    </div>
  );
});

export default connect((store: any) => ({
  layout: store.layout,
  sidebar: store.sidebar,
}))(Settings);
