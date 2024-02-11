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
  const [selectedTarget, setSelectedTarget] = useState('sideBarColor');
  const [navBarColor, setNavBarColor] = useState('#ffffff');
  const [sideBarColor, setSideBarColor] = useState('#ffffff');

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
    if (selectedTarget === 'navBarColor') {
      setNavBarColor(color.hex);
      stores.appStore.updateApplicationSetting({
        ...stores.appStore.applicationSetting,
        navBarColor: color.hex,
      });
    } else if (selectedTarget === 'sideBarColor') {
      setSideBarColor(color.hex);
      stores.appStore.updateApplicationSetting({
        ...stores.appStore.applicationSetting,
        sideBarColor: color.hex,
      });
    }
  };

  return (
    <React.Fragment>
      <>
        <hr />
        <div className='flex justify-between items-center'>
          <small className='d-block text-uppercase font-weight-bold text-muted mb-2 my-3.5'>
            Color picker For Sidebar and Navbar
          </small>
          <Icons.RIcon
            nameIcon='CiCircleRemove'
            propsIcon={{
              color: '#000000',
              size: 22,
            }}
            onClick={() => {
              onChangeSidebarColor && onChangeSidebarColor('');
              onChangeNavbarColor?.('');
            }}
          />
        </div>
        <div className='w-full flex justify-between  gap-2'>
          <SketchPicker
            color={
              selectedTarget === 'sideBarColor' ? navBarColor : sideBarColor
            }
            onChangeComplete={handleChangeColor}
          />
          <div>
            <Form.InputWrapper label='SideBar Color'>
              <input
                type='radio'
                name='target'
                value='navBar'
                className='w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600'
                onChange={() => setSelectedTarget('sideBarColor')}
              />
            </Form.InputWrapper>
            <Form.InputWrapper label='Navbar Color'>
              <input
                type='radio'
                name='target'
                value='navBar'
                className='w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600'
                onChange={() => setSelectedTarget('navBarColor')}
              />
            </Form.InputWrapper>
          </div>
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
