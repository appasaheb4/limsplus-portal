import React, { useMemo } from 'react';
import { Icons } from '@/library/components';
import { sidebarBackgroundImage } from '@/library/assets';
import { stores } from '@/stores';

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

  return (
    <React.Fragment>
      <>
        <hr />
        <div className='flex justify-between items-center'>
          <small className='d-block text-uppercase font-weight-bold text-muted mb-2 my-3.5'>
            Color For Sidebar
          </small>
          <Icons.RIcon
            nameIcon='CiCircleRemove'
            propsIcon={{
              color: '#000000',
              size: 22,
            }}
            onClick={() => {
              onChangeSidebarColor && onChangeSidebarColor('');
            }}
          />
        </div>
        <div className='sideBarColorOptions my-1.5'>
          <div className='row'>
            <div className='col-md-12 d-flex theme-options overflow-x-scroll  p-0'>
              {data.map((item, index) => {
                return (
                  <div
                    key={index}
                    className='w-5 h-5 rounded-3xl px-2.5 mx-1.5 border-solid'
                    style={{ backgroundColor: `${item.color}` }}
                    onClick={() =>
                      onChangeSidebarColor && onChangeSidebarColor(item.color)
                    }
                  />
                );
              })}
            </div>
          </div>
        </div>
        <div className='sideBarColorOptions my-1.5'>
          <div className='flex justify-between items-center'>
            <small className='d-block text-uppercase font-weight-bold text-muted mb-2 my-3.5'>
              Color For Navbar
            </small>
            <Icons.RIcon
              nameIcon='CiCircleRemove'
              propsIcon={{
                color: '#000000',
                size: 22,
              }}
              onClick={() => {
                onChangeNavbarColor && onChangeNavbarColor('');
              }}
            />
          </div>
          <div className='row'>
            <div className='col-md-12 d-flex theme-options overflow-x-scroll p-0'>
              {data.map((item, index) => {
                return (
                  <div
                    key={index}
                    className='w-5 h-5  rounded-3xl border-black px-2.5	mx-1.5'
                    style={{ backgroundColor: `${item.color}` }}
                    onClick={() =>
                      onChangeNavbarColor && onChangeNavbarColor(item.color)
                    }
                  />
                );
              })}
            </div>
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
