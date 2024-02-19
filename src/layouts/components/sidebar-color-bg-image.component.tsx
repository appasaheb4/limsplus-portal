import React, { useMemo, useState } from 'react';
import { Form, Icons } from '@/library/components';
import { sidebarBackgroundImage } from '@/library/assets';
import { stores } from '@/stores';
import { SketchPicker } from 'react-color';

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
  const [navBarColor, setNavBarColor] = useState('#ffffff');
  const [sideBarColor, setSideBarColor] = useState('#ffffff');
  const [sideBarFontColor, setSideBarFontColor] = useState('#ffffff');
  const [navIconColor, setNavIconColor] = useState('#000');
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

  const navbarChangeColor = color => {
    setNavBarColor(currentColor);
    stores.appStore.updateApplicationSetting({
      ...stores.appStore.applicationSetting,
      navBarColor: currentColor,
    });
  };

  const sidebarColorChangeHandler = color => {
    setSideBarColor(currentColor);
    stores.appStore.updateApplicationSetting({
      ...stores.appStore.applicationSetting,
      sideBarColor: currentColor,
    });
  };

  const sidebarFontColorChangeHandler = color => {
    setSideBarFontColor(currentColor);
    stores.appStore.updateApplicationSetting({
      ...stores.appStore.applicationSetting,
      sidebarFontColor: currentColor,
    });
  };

  const navbarIconChangeHandler = color => {
    setNavIconColor(currentColor);
    stores.appStore.updateApplicationSetting({
      ...stores.appStore.applicationSetting,
      navbarIconColor: currentColor,
    });
  };

  const handleCheckboxChange = checkboxType => {
    switch (checkboxType) {
      case 'navBar':
        setNavBarChecked(!navBarChecked);
        if (navBarChecked) {
          setNavBarColor('#fff');
          stores.appStore.updateApplicationSetting({
            ...stores.appStore.applicationSetting,
            navBarColor: '',
          });
        }
        break;
      case 'sideBar':
        setSideBarChecked(!sideBarChecked);
        if (sideBarChecked) {
          setSideBarColor('#fff');
          stores.appStore.updateApplicationSetting({
            ...stores.appStore.applicationSetting,
            sideBarColor: '',
          });
        }
        break;
      case 'sidebarFont':
        setSideBarFontcolorChecked(!sideBarFontColorChecked);
        if (sideBarFontColorChecked) {
          setSideBarFontColor('#fff');
          stores.appStore.updateApplicationSetting({
            ...stores.appStore.applicationSetting,
            sidebarFontColor: '',
          });
        }
        break;
      case 'navIconColor':
        setNavIconColorChecked(!navIconColorChecked);
        if (navIconColorChecked) {
          setNavIconColor('#000');
          stores.appStore.updateApplicationSetting({
            ...stores.appStore.applicationSetting,
            navbarIconColor: '',
          });
        }
        break;
      default:
        break;
    }
  };

  const handleChangeColor = color => {
    setCurrentColor(color.hex);
    if (sideBarFontColorChecked) {
      sidebarFontColorChangeHandler(color.hex);
    } else if (sideBarChecked) {
      sidebarColorChangeHandler(color.hex);
    } else if (navBarChecked) {
      navbarChangeColor(color.hex);
    } else if (navIconColorChecked) {
      navbarIconChangeHandler(color.hex);
    }
  };

  return (
    <React.Fragment>
      <>
        <hr />
        <div className='flex justify-between gap-2 mt-2'>
          <Form.InputWrapper label='SideBar Color'>
            <input
              type='checkbox'
              name='target'
              value='sideBarColor'
              checked={sideBarChecked}
              className='w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600'
              onChange={() => handleCheckboxChange('sideBar')}
            />
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
