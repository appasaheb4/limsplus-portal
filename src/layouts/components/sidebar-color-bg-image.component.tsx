import React, { useMemo, useState } from 'react';
import { Form, Icons } from '@/library/components';
import { sidebarBackgroundImage } from '@/library/assets';
import { stores } from '@/stores';
import { SketchPicker } from 'react-color';
import { GrPowerReset } from 'react-icons/gr';

interface SideBarColorBgImagesProps {
  data: Array<{ color: string }>;
  onChangeNavbarColor?: (color: string) => void;
  onChangeSidebarColor?: (color: string) => void;
}

const SideBarColorBgImages = ({
  data,
  onChangeSidebarColor,
  onChangeNavbarColor,
}: SideBarColorBgImagesProps) => {
  const [navBarChecked, setNavBarChecked] = useState(false);
  const [sideBarChecked, setSideBarChecked] = useState(false);
  const [sideBarFontColorChecked, setSideBarFontcolorChecked] = useState(false);
  const [navIconColorChecked, setNavIconColorChecked] = useState(false);
  const [currentColor, setCurrentColor] = useState('#ffffff');
  const sideImages = useMemo(() => {
    return (
      <div className='flex flex-wrap justify-start gap-4'>
        {sidebarBackgroundImage.map((item, index) => (
          <img
            src={item.path}
            key={index}
            className='rounded-3xl'
            style={{ width: 60, height: 90 }}
            onClick={() => {
              stores.appStore.updateApplicationSetting({
                ...stores.appStore.applicationSetting,
                sidebarImage: item.path,
              });
            }}
          />
        ))}
      </div>
    );
  }, []);

  const navbarImages = useMemo(() => {
    return (
      <div className='flex flex-wrap justify-start gap-4'>
        {sidebarBackgroundImage.map((item, index) => (
          <img
            src={item.path}
            key={index}
            className='rounded-3xl'
            style={{ width: 60, height: 90 }}
            onClick={() => {
              stores.appStore.updateApplicationSetting({
                ...stores.appStore.applicationSetting,
                navbarImage: item.path,
              });
            }}
          />
        ))}
      </div>
    );
  }, []);

  const handleChangeColor = color => {
    setCurrentColor(color.hex);
    if (sideBarFontColorChecked) {
      stores.appStore.updateApplicationSetting({
        ...stores.appStore.applicationSetting,
        sidebarFontColor: color.hex,
      });
    } else if (sideBarChecked) {
      stores.appStore.updateApplicationSetting({
        ...stores.appStore.applicationSetting,
        sideBarColor: color.hex,
      });
    } else if (navBarChecked) {
      stores.appStore.updateApplicationSetting({
        ...stores.appStore.applicationSetting,
        navBarColor: color.hex,
      });
    } else if (navIconColorChecked) {
      stores.appStore.updateApplicationSetting({
        ...stores.appStore.applicationSetting,
        navbarIconColor: color.hex,
      });
    }
  };

  const handleCheckboxChange = checkboxType => {
    switch (checkboxType) {
      case 'navBar':
        setNavBarChecked(!navBarChecked);
        setSideBarChecked(false);
        setSideBarFontcolorChecked(false);
        setNavIconColorChecked(false);
        break;
      case 'sideBar':
        setSideBarChecked(!sideBarChecked);
        setNavBarChecked(false);
        setSideBarFontcolorChecked(false);
        setNavIconColorChecked(false);
        break;
      case 'sidebarFont':
        setSideBarFontcolorChecked(!sideBarFontColorChecked);
        setNavBarChecked(false);
        setSideBarChecked(false);
        setNavIconColorChecked(false);
        break;
      case 'navIconColor':
        setNavIconColorChecked(!navIconColorChecked);
        setNavBarChecked(false);
        setSideBarChecked(false);
        setSideBarFontcolorChecked(false);
        break;
      default:
        break;
    }
  };

  return (
    <React.Fragment>
      <>
        <hr />
        <div className='flex justify-between gap-2 mt-2'>
          <Form.InputWrapper label='SideBar Color'>
            <div className='flex gap-1'>
              <input
                type='checkbox'
                name='target'
                value='sideBarColor'
                checked={sideBarChecked}
                className='w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600'
                onChange={() => handleCheckboxChange('sideBar')}
              />
              <div>
                <GrPowerReset />
              </div>
            </div>
          </Form.InputWrapper>

          <Form.InputWrapper label='Navbar Color'>
            <input
              type='checkbox'
              name='target'
              value='navBarColor'
              checked={navBarChecked}
              className='w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600'
              onChange={() => handleCheckboxChange('navBar')}
            />
          </Form.InputWrapper>
          <Form.InputWrapper label='Font Color'>
            <input
              type='checkbox'
              name='target'
              value='navBarColor'
              checked={sideBarFontColorChecked}
              onChange={() => handleCheckboxChange('sidebarFont')}
              className='w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600'
            />
          </Form.InputWrapper>
          <Form.InputWrapper label='Icon Color'>
            <input
              type='checkbox'
              name='target'
              value='navBarColor'
              checked={navIconColorChecked}
              onChange={() => handleCheckboxChange('navIconColor')}
              className='w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600'
            />
          </Form.InputWrapper>
        </div>
        <div className='w-full flex justify-center mb-3'>
          <SketchPicker
            color={currentColor}
            onChangeComplete={handleChangeColor}
          />
        </div>

        <hr />
        <div className='flex justify-between items-center'>
          <small className='d-block text-uppercase font-weight-bold text-muted mb-2 my-3.5'>
            Sidebar Background Images
          </small>
          <Icons.RIcon
            nameIcon='CiCircleRemove'
            propsIcon={{
              color: '#000000',
              size: 22,
            }}
            onClick={() => {
              stores.appStore.updateApplicationSetting({
                ...stores.appStore.applicationSetting,
                sidebarImage: '',
              });
            }}
          />
        </div>
        {sideImages}

        <div className='flex justify-between items-center'>
          <small className='d-block text-uppercase font-weight-bold text-muted mb-2 my-3.5'>
            Navbar Background Images
          </small>
          <Icons.RIcon
            nameIcon='CiCircleRemove'
            propsIcon={{
              color: '#000000',
              size: 22,
            }}
            onClick={() => {
              stores.appStore.updateApplicationSetting({
                ...stores.appStore.applicationSetting,
                navbarImage: '',
              });
            }}
          />
        </div>
        {navbarImages}
      </>
    </React.Fragment>
  );
};
export default SideBarColorBgImages;
