/* eslint-disable */
import React, { useEffect, useState } from 'react';
import { NavLink, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { observer } from 'mobx-react';
import { Badge } from 'reactstrap';
import PerfectScrollbar from 'react-perfect-scrollbar';

import { Icons, AutocompleteSearchGroupBy } from '@/library/components';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircle } from '@fortawesome/free-solid-svg-icons';
import * as Assets from '@/library/assets';

import { stores, useStores } from '@/stores';

import { RouterFlow } from '@/flows';
import { toggleSidebar } from '@/redux/actions/sidebar-action';

const initOpenRoutes = location => {
  /* Open collapse element that matches current url */
  const pathName = location.pathname;
  let _routes = {};
  if (stores.routerStore.userRouter)
    stores.routerStore.userRouter?.forEach((route: any, index) => {
      const isActive = pathName.indexOf(route.path) === 0;
      const isOpen = route.open;
      const isHome = route.containsHome && pathName === '/' ? true : false;
      _routes = Object.assign({}, _routes, {
        [index]: isActive || isOpen || isHome,
      });
    });
  return _routes;
};

const SidebarCategory = withRouter(
  ({
    title,
    badgeColor,
    badgeText,
    isOpen,
    children,
    onClick,
    icon = 'VscListSelection',
    location,
    to,
  }) => {
    const getSidebarItemClass = path => {
      return location.pathname.includes(path) ||
        (location.pathname === '/' && path === '/dashboard')
        ? 'active'
        : '';
    };
    return (
      <li className={'sidebar-item ' + getSidebarItemClass(to)}>
        <span
          data-toggle='collapse'
          className={
            'flex items-center sidebar-link ' + (!isOpen ? 'collapsed' : '')
          }
          onClick={onClick}
          aria-expanded={isOpen ? 'true' : 'false'}
        >
          <Icons.RIcon
            nameIcon={icon}
            propsIcon={{ color: '#ffffff', size: 20 }}
          />
          <span className='align-middle'>{title}</span>
          {badgeColor && badgeText ? (
            <Badge color={badgeColor} size={18} className='sidebar-badge'>
              {badgeText}
            </Badge>
          ) : null}
        </span>
        {isOpen && (
          <ul id='item' className={`sidebar-dropdown list-unstyled `}>
            <PerfectScrollbar>
              <div style={{ height: 'auto', maxHeight: '350px' }}>
                {children}
              </div>
            </PerfectScrollbar>
          </ul>
        )}
      </li>
    );
  },
);

interface SidebarItemProps {
  name: string;
  category: string;
  title: string;
  badgeColor: string;
  badgeText: string;
  icon: any;
  location: any;
  to: string;
  onChangeItem: (category: string, item: string) => void;
}

const SidebarItem = withRouter((props: SidebarItemProps) => {
  const getSidebarItemClass = path => {
    return props.location.pathname === path ? 'active' : '';
  };

  return (
    <li
      className={'sidebar-item ' + getSidebarItemClass(props.to)}
      onClick={e => {
        e.preventDefault();
        props.onChangeItem && props.onChangeItem(props.category, props.name);
      }}
    >
      <NavLink to={props.to} className='sidebar-link' activeClassName='active'>
        <div className='flex items-center p-0 m-0'>
          <Icons.RIcon
            nameIcon={props.icon || 'VscListSelection'}
            propsIcon={{ color: '#ffffff', size: 18 }}
          />
          <span className='flex items-center'>{props.title}</span>
        </div>
        {props.badgeColor && props.badgeText ? (
          <Badge color={props.badgeColor} size={18} className='sidebar-badge'>
            {props.badgeText}
          </Badge>
        ) : null}
      </NavLink>
    </li>
  );
});

const Sidebar = observer(({ location, sidebar, layout, dispatch }) => {
  const { appStore } = useStores();
  const history = useHistory();
  const [openRoutes, setOpenRoutes] = useState(() => initOpenRoutes(location));

  useEffect(() => {
    setOpenRoutes(initOpenRoutes(location));
  }, [stores.routerStore.userRouter]);

  const toggle = index => {
    for (const item of Object.keys(openRoutes))
      openRoutes[index] ||
        setOpenRoutes(openRoutes =>
          Object.assign({}, openRoutes, { [item]: false }),
        );
    // Toggle selected element
    setOpenRoutes(openRoutes =>
      Object.assign({}, openRoutes, { [index]: !openRoutes[index] }),
    );
  };

  return (
    <>
      <nav
        className={
          'sidebar' +
          (!sidebar.isOpen ? ' toggled' : '') +
          (sidebar.isSticky ? ' sidebar-sticky' : '')
        }
        style={{
          backgroundColor: `${appStore.applicationSetting?.sideBarColor}`,
          backgroundImage: `url(${appStore.applicationSetting?.imageSideBarBgImage})`,
          backgroundSize: '100% 100%',
        }}
      >
        <div className='sidebar-content'>
          <PerfectScrollbar>
            <a className='flex sidebar-brand items-center' href='/'>
              <img
                src={Assets.images.limsplusTran}
                alt='appIcon'
                style={{ width: '100%' }}
              />
            </a>
            <div className='p-2'>
              <AutocompleteSearchGroupBy
                data={stores.routerStore.userRouter}
                onChange={async (item: any, children: any) => {
                  const { permission, selectedComp } =
                    await RouterFlow.updateSelectedCategory(
                      item?.name,
                      children?.name,
                    );
                  stores.routerStore.updateSelectedComponents(selectedComp);
                  stores.routerStore.updateUserPermission(permission);
                  history.replace(children.path);
                }}
              />
            </div>
            {stores.routerStore.userRouter && (
              <ul className='sidebar-nav'>
                {stores.routerStore.userRouter?.map((category: any, index) => {
                  return (
                    <React.Fragment key={index}>
                      {category.children ? (
                        <SidebarCategory
                          name={category.name}
                          title={category.title}
                          badgeColor={category.badgeColor}
                          badgeText={category.badgeText}
                          icon={category.icon}
                          to={category.path}
                          isOpen={openRoutes[index]}
                          onClick={() => toggle(index)}
                        >
                          {category?.children?.map((route, index) => (
                            <>
                              <SidebarItem
                                key={index}
                                category={category.name}
                                name={route.name}
                                title={route.title}
                                to={route.path}
                                badgeColor={route.badgeColor}
                                badgeText={route.badgeText}
                                icon={route.icon}
                                onChangeItem={async (category, item) => {
                                  const { permission, selectedComp } =
                                    await RouterFlow.updateSelectedCategory(
                                      category,
                                      item,
                                    );
                                  stores.routerStore.updateSelectedComponents(
                                    selectedComp,
                                  );
                                  stores.routerStore.updateUserPermission(
                                    permission,
                                  );
                                  if (!sidebar.isOpen) {
                                    dispatch(toggleSidebar());
                                  }
                                }}
                              />
                            </>
                          ))}
                        </SidebarCategory>
                      ) : (
                        <>
                          <h1>Second</h1>
                          <SidebarItem
                            name={category.name}
                            title={category.title}
                            to={category.path}
                            icon={category.icon}
                            badgeColor={category.badgeColor}
                            badgeText={category.badgeText}
                            onChangeItem={async (category, item) => {
                              const { permission, selectedComp } =
                                await RouterFlow.updateSelectedCategory(
                                  category,
                                  item,
                                );
                              stores.routerStore.updateSelectedComponents(
                                selectedComp,
                              );
                              stores.routerStore.updateUserPermission(
                                permission,
                              );
                            }}
                          />
                        </>
                      )}
                    </React.Fragment>
                  );
                })}
              </ul>
            )}
            {!layout.isBoxed && !sidebar.isSticky ? (
              <div className='sidebar-bottom d-none d-lg-block'>
                <div className='media'>
                  <img
                    className='rounded-circle mr-3'
                    src={
                      stores.loginStore.login?.picture || Assets.defaultAvatar
                    }
                    alt={stores.loginStore.login?.fullName}
                    width='40'
                    height='40'
                  />
                  <div className='media-body'>
                    <h5 className='mb-1'>
                      {stores.loginStore.login?.fullName}
                    </h5>
                    <div>
                      <FontAwesomeIcon
                        icon={faCircle as any}
                        className='text-success'
                      />{' '}
                      Online
                    </div>
                  </div>
                </div>
              </div>
            ) : null}
          </PerfectScrollbar>
        </div>
      </nav>
    </>
  );
});

export default withRouter(
  connect((store: any) => ({
    sidebar: store.sidebar,
    layout: store.layout,
    app: store.app,
  }))(Sidebar),
);

// export default Sidebar;
