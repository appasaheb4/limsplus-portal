import React from 'react';

export const Header: React.FunctionComponent<any> = props => (
  <div className='sticky top-0 z-20 flex justify-between items-center px-2 py-2 border-b border-gray-300 bg-white'>
    {props.children}
  </div>
);

interface PageHeadingProps {
  title: string;
}

export const Heading: React.FunctionComponent<PageHeadingProps> = props => (
  <div className='text-center border-b border-gray-300 bg-white sticky top-14 z-20 font-FugazOne'>
    <h2 className='text-lg font-bold leading-4 text-gray-900 mt-0'>
      {props.title}
    </h2>
  </div>
);
interface PageHeadingProps {
  title: string;
  subTitle?: string;
}

export const PageHeading: React.FunctionComponent<PageHeadingProps> = props => (
  <div>
    <h2 className='text-lg font-bold leading-4 text-gray-900 mt-0'>
      {props.title}
    </h2>
    {props.subTitle && (
      <p className='text-xs leading-4 text-gray-500 m-0'>{props.subTitle}</p>
    )}
  </div>
);

interface PageHeadingLabDetailsProps {
  store: any;
}

export const PageHeadingLabDetails = (props: PageHeadingLabDetailsProps) => {
  const loginStore = props.store;
  return (
    <div className='flex flex-row items-center justify-between'>
      <img
        src={loginStore.login && loginStore.login.labLogo}
        alt='banner'
        className='object-fill h-10 w-12 rounded-md mr-2 d-none d-sm-inline-block'
      />
      <h2 className='text-base  leading-4 text-gray-900 mt-0'>
        {(loginStore.login &&
          loginStore.login.labList &&
          loginStore.login.labList.find(
            item => item.code === loginStore.login.lab,
          )?.name) ||
          loginStore.login?.lab}
      </h2>
    </div>
  );
};
