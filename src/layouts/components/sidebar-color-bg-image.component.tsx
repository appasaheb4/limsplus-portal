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
  const [navIconColor, setNavIconColor] = useState('#ffffff');
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
    setNavBarColor(color.hex);
    setSideBarColor(sideBarColor);
    setSideBarFontColor(sideBarFontColor);
    setNavIconColor(navIconColor);
    stores.appStore.updateApplicationSetting({
      ...stores.appStore.applicationSetting,
      navBarColor: color.hex,
    });
  };

  const sidebarColorChangeHandler = color => {
    setSideBarColor(color.hex);
    setSideBarFontColor(sideBarFontColor);
    setNavIconColor(navIconColor);
    setNavBarColor(navBarColor);
    stores.appStore.updateApplicationSetting({
      ...stores.appStore.applicationSetting,
      sideBarColor: color.hex,
    });
  };

  const sidebarFontColorChangeHandler = color => {
    setSideBarFontColor(color.hex);
    setNavIconColor(navIconColor);
    setNavBarColor(navBarColor);
    setSideBarColor(sideBarColor);
    stores.appStore.updateApplicationSetting({
      ...stores.appStore.applicationSetting,
      sidebarFontColor: color.hex,
    });
  };

  const navbarIconChangeHandler = color => {
    setNavIconColor(color.hex);
    setNavBarColor(navBarColor);
    setSideBarColor(sideBarColor);
    setSideBarFontColor(sideBarFontColor);
    stores.appStore.updateApplicationSetting({
      ...stores.appStore.applicationSetting,
      navbarIconColor: color.hex,
    });
  };

  const handleNavBarChange = () => {
    setNavBarChecked(!navBarChecked);
    if (navBarChecked) {
      setNavBarColor('#fff');
      stores.appStore.updateApplicationSetting({
        ...stores.appStore.applicationSetting,
        navBarColor: '',
      });
    }
  };

  const handleSideBarChange = () => {
    setSideBarChecked(!sideBarChecked);
    if (sideBarChecked) {
      setSideBarColor('#fff');
      stores.appStore.updateApplicationSetting({
        ...stores.appStore.applicationSetting,
        sideBarColor: '',
      });
    }
  };

  const handleSideBarFontColorChange = () => {
    setSideBarFontcolorChecked(!sideBarFontColorChecked);
    if (sideBarFontColorChecked) {
      setSideBarFontColor('#fff');
      stores.appStore.updateApplicationSetting({
        ...stores.appStore.applicationSetting,
        sidebarFontColor: '',
      });
    }
  };

  const handleNavIconColorChange = () => {
    setNavIconColorChecked(!navIconColorChecked);
    if (navIconColorChecked) {
      setNavIconColor('#000');
      stores.appStore.updateApplicationSetting({
        ...stores.appStore.applicationSetting,
        navbarIconColor: '',
      });
    }
  };

  const color = sideBarFontColorChecked
    ? sideBarFontColor
    : sideBarChecked
    ? sideBarColor
    : navIconColorChecked
    ? navIconColor
    : navBarColor;

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
              onChange={() => handleSideBarChange()}
            />
          </Form.InputWrapper>
          <Form.InputWrapper label='Navbar Color'>
            <input
              type='checkbox'
              name='target'
              value='navBarColor'
              checked={navBarChecked}
              className='w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600'
              onChange={() => handleNavBarChange()}
            />
          </Form.InputWrapper>
          <Form.InputWrapper label='Font Color'>
            <input
              type='checkbox'
              name='target'
              value='navBarColor'
              checked={sideBarFontColorChecked}
              onChange={() => handleNavIconColorChange()}
              className='w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600'
            />
          </Form.InputWrapper>
          <Form.InputWrapper label='Icon Color'>
            <input
              type='checkbox'
              name='target'
              value='navBarColor'
              checked={navIconColorChecked}
              onChange={() => handleSideBarFontColorChange()}
              className='w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600'
            />
          </Form.InputWrapper>
        </div>
        <div className='w-full flex justify-center mb-3'>
          <SketchPicker
            color={color}
            onChangeComplete={color => {
              if (sideBarFontColorChecked) {
                sidebarFontColorChangeHandler(color);
              }
              if (sideBarChecked) {
                sidebarColorChangeHandler(color);
              }
              if (navBarChecked) {
                navbarChangeColor(color);
              }
              if (navIconColorChecked) {
                navbarIconChangeHandler(color);
              }
            }}
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

export default React.memo(SideBarColorBgImages);
