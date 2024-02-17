import React, { useEffect, useMemo, useState } from 'react';
import { observer } from 'mobx-react';
import {
  Header,
  PageHeading,
  PageHeadingLabDetails,
  Buttons,
  Form,
  List,
  Svg,
  Toast,
  ModalConfirm,
} from '@/library/components';
import { RoleMappingList } from '../components';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import 'react-dropdown-tree-select/dist/styles.css';
import { dashboardRouter as dashboardRoutes } from '@/routes';
const router = dashboardRoutes;
import { useStores } from '@/stores';
import { RouterFlow } from '@/flows';
import { toJS } from 'mobx';
import MainPageHeadingComponents from '@/library/components/atoms/header/main.page.heading.components';

const grid = 8;
const getListStyle = isDraggingOver => ({
  background: isDraggingOver ? 'lightblue' : 'none',
  display: 'flex',
  padding: grid,
  overflow: 'auto',
});

const RoleMapping = observer(() => {
  const { loginStore, roleMappingStore, roleStore, routerStore } = useStores();

  const [hideRole, setHideRole] = useState<boolean>(false);
  const [modalConfirm, setModalConfirm] = useState<any>();
  let roleList: any = roleStore.listRole || [];
  for (const router of roleMappingStore.roleMappingList || []) {
    if (router) {
      roleList = roleList.filter(item => {
        return item.code !== router?.role.code;
      });
    }
  }
  const [isModify, setIsModify] = useState<any>({ status: false });
  const [commonAction, setCommonAction] = useState([
    {
      title: 'Add',
      checked: false,
    },
    {
      title: 'View',
      checked: false,
    },
    {
      title: 'Update',
      checked: false,
    },
    {
      title: 'Delete',
      checked: false,
    },
    {
      title: 'Import',
      checked: false,
    },
    {
      title: 'Export',
      checked: false,
    },
  ]);
  const [hideAddRoleMapping, setHideAddRoleMapping] = useState<boolean>(true);
  const permission = [
    {
      title: 'Add',
      checked: false,
    },
    {
      title: 'View',
      checked: false,
    },
    {
      title: 'Update',
      checked: false,
    },
    {
      title: 'Delete',
      checked: false,
    },
    {
      title: 'Import',
      checked: false,
    },
    {
      title: 'Export',
      checked: false,
    },
  ];

  const setRouter = (route = router) => {
    const routers: any = route?.filter((item: any) => {
      if (item.name !== 'Dashboard') {
        item.toggle = false;
        item.title = item?.title || item.name;
        item = item.children.filter((childrenItem: any) => {
          childrenItem.title = childrenItem?.title || childrenItem.name;
          childrenItem.toggle = false;
          childrenItem.permission = permission;
          if (
            item.name == 'Result Entry' &&
            childrenItem.name == 'General Result Entry'
          ) {
            childrenItem.permission = permission.concat({
              title: 'ReOpen',
              checked: false,
            });
          } else if (
            childrenItem.name == 'User' ||
            childrenItem.name == 'Lab' ||
            childrenItem.name == 'Analyte Master' ||
            childrenItem.name == 'Test Master' ||
            childrenItem.name == 'Panel Master' ||
            childrenItem.name == 'Test Analyte Mapping' ||
            childrenItem.name == 'Test Panel Mapping' ||
            childrenItem.name == 'Package Master' ||
            childrenItem.name == 'Registartion Locations' ||
            childrenItem.name == 'Corporate Clients' ||
            childrenItem.name == 'Sales Team' ||
            childrenItem.name == 'Possible Results' ||
            childrenItem.name == 'PriceList' ||
            childrenItem.name == 'Library' ||
            childrenItem.name == 'Comment Manager' ||
            childrenItem.name == 'ReferenceRanges'
          ) {
            childrenItem.permission = permission.concat(
              {
                title: 'Version Upgrade',
                checked: false,
              },
              {
                title: 'Duplicate',
                checked: false,
              },
            );
          } else if (childrenItem.name == 'Patient Registration') {
            childrenItem.permission = permission.concat({
              title: 'Cancel',
              checked: false,
            });
          } else if (childrenItem.name == 'Delivery Queue') {
            childrenItem.permission = permission.concat(
              {
                title: 'Generate Report',
                checked: false,
              },
              {
                title: 'Hold',
                checked: false,
              },
              {
                title: 'Cancel',
                checked: false,
              },
              {
                title: 'Report',
                checked: false,
              },
            );
          } else if (childrenItem.name == 'Panel Approval') {
            childrenItem.permission = permission.concat({
              title: 'Approval',
              checked: false,
            });
          }
          // eslint-disable-next-line no-self-assign
          //childernItem.icon = childernItem.icon;
          return childrenItem;
        });
        return item;
      }
    });
    if (routers) {
      routerStore.updateRouter(routers);
    }
  };

  useEffect(() => {
    setRouter();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const roleMappingTable = useMemo(
    () => (
      <RoleMappingList
        data={roleMappingStore.roleMappingList || []}
        totalSize={roleMappingStore.roleMappingListCount}
        isDelete={RouterFlow.checkPermission(
          toJS(routerStore.userPermission),
          'Delete',
        )}
        isEditModify={RouterFlow.checkPermission(
          toJS(routerStore.userPermission),
          'Update',
        )}
        onDelete={selectedUser => setModalConfirm(selectedUser)}
        onDuplicate={async (selectedItem: any) => {
          if (selectedItem?.code !== 'SYSADMIN') {
            const routers: any = selectedItem?.router?.filter((item: any) => {
              const children = item.children?.filter(childrenItem => {
                if (
                  childrenItem.name !== 'Role' &&
                  childrenItem.name !== 'User' &&
                  childrenItem.name !== 'Login Activity' &&
                  childrenItem.name !== 'Role Mapping' &&
                  childrenItem.name !== 'Environment Settings' &&
                  childrenItem.name !== 'Notice Boards'
                ) {
                  // childrenItem.title = childrenItem.name;
                  // childrenItem.toggle = false;
                  //childrenItem.permission = permission;
                  // if (
                  //   item.name == 'Result Entry' &&
                  //   childernItem.name == 'General Result Entry'
                  // ) {
                  //   childernItem.permission = permission.concat({
                  //     title: 'ReOpen',
                  //     checked: false,
                  //   });
                  // }
                  // eslint-disable-next-line no-self-assign
                  return { ...childrenItem };
                }
              });
              item.children = children;
              return item;
            });
            if (routers) {
              routerStore.updateRouter(routers);
            }
          } else {
            routerStore.updateRouter(selectedItem?.router);
          }
          setHideAddRoleMapping(!hideAddRoleMapping);
          setHideRole(true);
          roleMappingStore.updateSelectedRole(toJS(selectedItem));
          setIsModify({ status: true, id: selectedItem.id });
        }}
        onPageSizeChange={(page, limit) => {
          roleMappingStore.fetchRoleMappingList(page, limit);
          global.filter = { mode: 'pagination', page, limit };
        }}
        onFilter={(type, filter, page, limit) => {
          roleMappingStore.roleMappingService.filter({
            input: { type, filter, page, limit },
          });
          global.filter = { mode: 'filter', type, filter, page, limit };
        }}
      />
    ),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [roleMappingStore.roleMappingList],
  );

  return (
    <>
      <MainPageHeadingComponents
        title={routerStore.selectedComponents?.title || ''}
        store={loginStore}
      />
      {RouterFlow.checkPermission(toJS(routerStore.userPermission), 'Add') && (
        <Buttons.ButtonCircleAddRemove
          show={hideAddRoleMapping}
          onClick={status => {
            setRouter();
            setHideAddRoleMapping(!hideAddRoleMapping);
          }}
        />
      )}
      <div className=' mx-auto  flex-wrap'>
        <div
          className={
            'p-2 rounded-lg shadow-xl ' +
            (hideAddRoleMapping ? 'hidden' : 'shown')
          }
        >
          <div className='flex gap-4'>
            <Form.InputWrapper label='Role' id='role'>
              <select
                name='role'
                disabled={hideRole}
                value={roleMappingStore.selectedRole as any}
                className='leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border border-gray-300 rounded-md'
                onChange={e => {
                  const role = roleList[e.target.value];
                  // if (role.code !== 'SYSADMIN') {
                  //   const routers: any = routerStore.router?.filter(
                  //     (item: any) => {
                  //       const children = item.children.filter(childrenItem => {
                  //         // if (
                  //         //   childrenItem.name !== 'Role' &&
                  //         //   childrenItem.name !== 'User' &&
                  //         //   childrenItem.name !== 'Login Activity' &&
                  //         //   childrenItem.name !== 'Role Mapping' &&
                  //         //   childrenItem.name !== 'Environment Settings' &&
                  //         //   childrenItem.name !== 'Notice Boards'
                  //         // ) {
                  //         //   return { ...childrenItem };
                  //         // }
                  //         return { ...childrenItem };
                  //       });
                  //       item.children = children;
                  //       return item;
                  //     },
                  //   );
                  //   if (routers) {
                  //     routerStore.updateRouter(routers);
                  //   }
                  // }
                  roleMappingStore.updateSelectedRole(toJS(role));
                }}
              >
                <option selected>
                  {roleMappingStore.selectedRole?.code || 'Select'}
                </option>
                {roleList.map((item: any, index: number) => (
                  <option key={index} value={index}>
                    {item.code}
                  </option>
                ))}
              </select>
            </Form.InputWrapper>

            <Form.InputWrapper label='Common Action'>
              <div className='flex flex-col bg-blue-600 p-2 text-white w-36 rounded-md'>
                <ul className='ml-2'>
                  {commonAction?.map(item => (
                    <li className='flex items-center'>
                      <input
                        type='checkbox'
                        checked={item.checked}
                        className='m-2 w-4 h-4'
                        onClick={() => {
                          const itemSelected = commonAction?.map(e => {
                            if (e?.title == item?.title) {
                              return {
                                ...e,
                                checked: !e?.checked,
                              };
                            } else {
                              return e;
                            }
                          });
                          setCommonAction(itemSelected);
                        }}
                      />
                      {item.title}
                    </li>
                  ))}
                </ul>
              </div>
            </Form.InputWrapper>
          </div>

          <div className='mt-4 overflow-auto'>
            {routerStore.router && (
              <DragDropContext
                onDragEnd={(result: any) => {
                  const items = Array.from(routerStore.router || []);
                  const [reorderedItem] = items.splice(result.source.index, 1);
                  items.splice(result.destination.index, 0, reorderedItem);
                  routerStore.updateRouter(items);
                }}
              >
                <Droppable droppableId='parent' direction='vertical'>
                  {(provided, snapshot) => (
                    <ul
                      className='nav nav-stacked characters'
                      id='accordion1'
                      {...provided.droppableProps}
                      ref={provided.innerRef}
                    >
                      {routerStore.router?.map((item, index) => (
                        <Draggable
                          key={item.name}
                          draggableId={item.name}
                          index={index}
                        >
                          {(provided, snapshot) => (
                            <li
                              className='flex flex-col mb-2 ml-2 bg-gray-400 p-2 rounded-md'
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                            >
                              {item.toggle ? (
                                <>
                                  <input
                                    type='text'
                                    className='leading-4 p-2 m-2 focus:outline-none focus:ring block  shadow-sm sm:text-base border border-gray-300 rounded-sm'
                                    value={item.title}
                                    onChange={e => {
                                      const title = e.target.value;
                                      const routers = toJS(routerStore.router);
                                      routers[index].title = title;
                                      routerStore.updateRouter(routers);
                                    }}
                                    onBlur={() => {
                                      const routers = toJS(routerStore.router);
                                      routers[index].toggle = false;
                                      routerStore.updateRouter(routers);
                                    }}
                                  />
                                  <input
                                    type='text'
                                    className='leading-4 p-2 m-2 focus:outline-none focus:ring block  shadow-sm sm:text-base border border-gray-300 rounded-sm'
                                    value={item.icon}
                                    onChange={e => {
                                      const icon = e.target.value;
                                      const routers = toJS(routerStore.router);
                                      routers[index].icon = icon;
                                      routerStore.updateRouter(routers);
                                    }}
                                    onBlur={() => {
                                      const routers = toJS(routerStore.router);
                                      routers[index].toggle = false;
                                      routerStore.updateRouter(routers);
                                    }}
                                  />
                                </>
                              ) : (
                                <p
                                  className='flex font-bold items-center'
                                  onDoubleClick={() => {
                                    const routers = toJS(routerStore.router);
                                    routers[index].toggle = true;
                                    routerStore.updateRouter(routers);
                                  }}
                                >
                                  {item?.title}
                                  <input
                                    type='checkbox'
                                    checked={item?.checked}
                                    className='m-2 w-4 h-4'
                                    onClick={() => {
                                      if (
                                        commonAction?.filter(
                                          comA => comA?.checked === false,
                                        )?.length == 4
                                      )
                                        return Toast.error({
                                          message:
                                            '😌 Please select first common action.',
                                        });
                                      const router = [...routerStore.router];
                                      const flag = !item?.checked;
                                      router[index].checked = flag;
                                      let children = router[index]?.children;
                                      children = children?.map(ch => {
                                        return {
                                          ...ch,
                                          checked: flag,
                                          permission: ch?.permission.map(
                                            chp => {
                                              const perFlag = flag
                                                ? commonAction.find(
                                                    coma =>
                                                      coma.title == chp?.title,
                                                  )?.checked
                                                : flag;
                                              return {
                                                ...chp,
                                                checked: perFlag,
                                              };
                                            },
                                          ),
                                        };
                                      });
                                      router[index].children = children;
                                      routerStore.updateRouter(router);
                                    }}
                                  />
                                </p>
                              )}
                              {item.children ? (
                                <DragDropContext
                                  onDragEnd={(result: any) => {
                                    const items = Array.from(
                                      item.children || [],
                                    );
                                    const [reorderedItem] = items.splice(
                                      result.source.index,
                                      1,
                                    );
                                    items.splice(
                                      result.destination.index,
                                      0,
                                      reorderedItem,
                                    );
                                    const router = [...routerStore.router];
                                    router[index].children = items;
                                    routerStore.updateRouter(router);
                                  }}
                                >
                                  <Droppable
                                    droppableId='characters'
                                    direction='horizontal'
                                  >
                                    {(provided, snapshot) => (
                                      <ul
                                        className='flex flex-row ml-1 text-white characters w-screen mr-10'
                                        id={item.name}
                                        style={getListStyle(
                                          snapshot.isDraggingOver,
                                        )}
                                        {...provided.droppableProps}
                                        ref={provided.innerRef}
                                      >
                                        {item.children.map(
                                          (children, indexChildren) => (
                                            <Draggable
                                              key={children.name}
                                              draggableId={children.name}
                                              index={indexChildren}
                                            >
                                              {(provided, snapshot) => (
                                                <li
                                                  className='bg-blue-600 ml-4 p-2 rounded-md'
                                                  ref={provided.innerRef}
                                                  {...provided.draggableProps}
                                                  {...provided.dragHandleProps}
                                                >
                                                  {children.toggle ? (
                                                    <>
                                                      <input
                                                        type='text'
                                                        className='leading-4 p-1 m-1 focus:outline-none focus:ring block text-black  shadow-sm sm:text-base border border-gray-300 rounded-sm'
                                                        value={children.title}
                                                        placeholder='Title'
                                                        onChange={e => {
                                                          const title =
                                                            e.target.value;
                                                          const routers = toJS(
                                                            routerStore.router,
                                                          );
                                                          routers[
                                                            index
                                                          ].children[
                                                            indexChildren
                                                          ].title = title;
                                                          routerStore.updateRouter(
                                                            routers,
                                                          );
                                                        }}
                                                        onBlur={() => {
                                                          const routers = toJS(
                                                            routerStore.router,
                                                          );
                                                          routers[
                                                            index
                                                          ].children[
                                                            indexChildren
                                                          ].toggle = false;
                                                          routerStore.updateRouter(
                                                            routers,
                                                          );
                                                        }}
                                                      />
                                                      <input
                                                        type='text'
                                                        className='leading-4 p-1 m-1 focus:outline-none focus:ring block text-black  shadow-sm sm:text-base border border-gray-300 rounded-sm'
                                                        value={children.icon}
                                                        placeholder='Icon'
                                                        onChange={e => {
                                                          const icon =
                                                            e.target.value;
                                                          const routers = toJS(
                                                            routerStore.router,
                                                          );
                                                          routers[
                                                            index
                                                          ].children[
                                                            indexChildren
                                                          ].icon = icon;
                                                          routerStore.updateRouter(
                                                            routers,
                                                          );
                                                        }}
                                                        onBlur={() => {
                                                          const routers = toJS(
                                                            routerStore.router,
                                                          );
                                                          routers[
                                                            index
                                                          ].children[
                                                            indexChildren
                                                          ].toggle = false;
                                                          routerStore.updateRouter(
                                                            routers,
                                                          );
                                                        }}
                                                      />
                                                    </>
                                                  ) : (
                                                    <p
                                                      className='flex font-bold items-center'
                                                      onDoubleClick={() => {
                                                        const routers = toJS(
                                                          routerStore.router,
                                                        );
                                                        routers[index].children[
                                                          indexChildren
                                                        ].toggle = true;
                                                        routerStore.updateRouter(
                                                          routers,
                                                        );
                                                      }}
                                                    >
                                                      {children.title}
                                                      <input
                                                        type='checkbox'
                                                        checked={
                                                          children?.checked
                                                        }
                                                        className='m-2 w-4 h-4'
                                                        onClick={() => {
                                                          if (
                                                            commonAction?.filter(
                                                              comA =>
                                                                comA?.checked ===
                                                                false,
                                                            )?.length == 4
                                                          )
                                                            return Toast.error({
                                                              message:
                                                                '😌 Please select first common action.',
                                                            });

                                                          const routers = toJS(
                                                            routerStore.router,
                                                          );
                                                          const flag =
                                                            !children?.checked;
                                                          routers[
                                                            index
                                                          ].children[
                                                            indexChildren
                                                          ].checked = flag;
                                                          if (flag) {
                                                            routers[
                                                              index
                                                            ].checked = flag;
                                                            routers[
                                                              index
                                                            ].children[
                                                              indexChildren
                                                            ].permission =
                                                              routers[
                                                                index
                                                              ].children[
                                                                indexChildren
                                                              ].permission?.map(
                                                                perC => {
                                                                  const perFlag =
                                                                    commonAction?.find(
                                                                      comA =>
                                                                        comA.title ==
                                                                        perC.title,
                                                                    )?.checked;
                                                                  return {
                                                                    ...perC,
                                                                    checked:
                                                                      perFlag,
                                                                  };
                                                                },
                                                              );
                                                          } else {
                                                            routers[
                                                              index
                                                            ].children[
                                                              indexChildren
                                                            ].permission =
                                                              routers[
                                                                index
                                                              ].children[
                                                                indexChildren
                                                              ].permission?.map(
                                                                perC => {
                                                                  return {
                                                                    ...perC,
                                                                    checked:
                                                                      false,
                                                                  };
                                                                },
                                                              );
                                                          }
                                                          routerStore.updateRouter(
                                                            routers,
                                                          );
                                                          const routers1 = toJS(
                                                            routerStore.router,
                                                          );
                                                          if (!flag) {
                                                            const allUnCheckTitle =
                                                              routers1[
                                                                index
                                                              ].children?.map(
                                                                chiC =>
                                                                  chiC.checked,
                                                              );
                                                            // title all uncheck
                                                            if (
                                                              allUnCheckTitle?.length ==
                                                              allUnCheckTitle?.filter(
                                                                unCT =>
                                                                  unCT ==
                                                                    false ||
                                                                  unCT ==
                                                                    undefined,
                                                              )?.length
                                                            ) {
                                                              routers1[
                                                                index
                                                              ].checked = flag;
                                                            }
                                                          }
                                                          routerStore.updateRouter(
                                                            routers1,
                                                          );
                                                        }}
                                                      />
                                                    </p>
                                                  )}

                                                  <ul className='ml-2'>
                                                    {children.permission?.map(
                                                      (
                                                        permission,
                                                        indexPermission,
                                                      ) => (
                                                        <li
                                                          className='flex items-center'
                                                          onClick={async () => {
                                                            const routers =
                                                              toJS(
                                                                routerStore.router,
                                                              );
                                                            const modifyPermission =
                                                              item.children[
                                                                indexChildren
                                                              ].permission[
                                                                indexPermission
                                                              ];
                                                            modifyPermission.checked =
                                                              modifyPermission.checked
                                                                ? false
                                                                : true;
                                                            if (
                                                              modifyPermission.title ===
                                                              'Import'
                                                            ) {
                                                              routers[
                                                                index
                                                              ].children[
                                                                indexChildren
                                                              ].permission[0].checked =
                                                                true;
                                                            }
                                                            if (
                                                              modifyPermission.title ===
                                                                'Version Upgrade' ||
                                                              modifyPermission.title ===
                                                                'Duplicate' ||
                                                              modifyPermission.title ===
                                                                'Update' ||
                                                              modifyPermission.title ===
                                                                'Delete' ||
                                                              modifyPermission.title ===
                                                                'Export' ||
                                                              modifyPermission.title ===
                                                                'Cancel'
                                                            ) {
                                                              routers[
                                                                index
                                                              ].children[
                                                                indexChildren
                                                              ].permission[1].checked =
                                                                true;
                                                            }
                                                            routers[
                                                              index
                                                            ].children[
                                                              indexChildren
                                                            ].permission[
                                                              indexPermission
                                                            ] =
                                                              toJS(
                                                                modifyPermission,
                                                              );
                                                            routerStore.updateRouter(
                                                              routers,
                                                            );
                                                          }}
                                                        >
                                                          <input
                                                            type='checkbox'
                                                            checked={
                                                              permission.checked
                                                            }
                                                            className='m-2 w-4 h-4'
                                                            onClick={() => {
                                                              const flag =
                                                                !permission.checked;
                                                              const routers =
                                                                toJS(
                                                                  routerStore.router,
                                                                );
                                                              if (flag) {
                                                                routers[
                                                                  index
                                                                ].checked =
                                                                  flag;
                                                                routers[
                                                                  index
                                                                ].children[
                                                                  indexChildren
                                                                ].checked =
                                                                  flag;
                                                              }
                                                              routerStore.updateRouter(
                                                                routers,
                                                              );
                                                              const routers1 =
                                                                toJS(
                                                                  routerStore.router,
                                                                );
                                                              if (!flag) {
                                                                const allUnCheckPer =
                                                                  routers1[
                                                                    index
                                                                  ].children[
                                                                    indexChildren
                                                                  ].permission?.map(
                                                                    perC =>
                                                                      perC.checked,
                                                                  );
                                                                if (
                                                                  allUnCheckPer?.filter(
                                                                    unC =>
                                                                      unC ==
                                                                      false,
                                                                  )?.length == 3
                                                                ) {
                                                                  routers1[
                                                                    index
                                                                  ].children[
                                                                    indexChildren
                                                                  ].checked =
                                                                    flag;
                                                                  const allUnCheckTitle =
                                                                    routers1[
                                                                      index
                                                                    ].children?.map(
                                                                      chiC =>
                                                                        chiC.checked,
                                                                    );
                                                                  // title all uncheck
                                                                  if (
                                                                    allUnCheckTitle?.length ==
                                                                    allUnCheckTitle?.filter(
                                                                      unCT =>
                                                                        unCT ==
                                                                          false ||
                                                                        unCT ==
                                                                          undefined,
                                                                    )?.length
                                                                  ) {
                                                                    routers1[
                                                                      index
                                                                    ].checked =
                                                                      flag;
                                                                  }
                                                                }
                                                              }
                                                              routerStore.updateRouter(
                                                                routers1,
                                                              );
                                                            }}
                                                          />
                                                          {permission.title}
                                                        </li>
                                                      ),
                                                    )}
                                                  </ul>
                                                </li>
                                              )}
                                            </Draggable>
                                          ),
                                        )}
                                        {provided.placeholder}
                                      </ul>
                                    )}
                                  </Droppable>
                                </DragDropContext>
                              ) : (
                                <li>{item.title}</li>
                              )}
                            </li>
                          )}
                        </Draggable>
                      ))}
                    </ul>
                  )}
                </Droppable>
              </DragDropContext>
            )}
          </div>

          <br />

          <List direction='row' space={3} align='center'>
            <Buttons.Button
              size='medium'
              type='solid'
              icon={Svg.Save}
              onClick={async () => {
                if (
                  roleMappingStore.selectedRole?.description !== undefined &&
                  routerStore.router !== undefined
                ) {
                  let router: any[] = [];
                  routerStore?.router?.filter(item => {
                    return item.children.filter((childern, indexChildren) => {
                      childern.permission.filter(
                        (permission, indexPermission) => {
                          if (permission.checked) {
                            const isRouter = router?.find(
                              routerItem => routerItem.name === item.name,
                            );
                            if (isRouter) {
                              router = router?.filter(function (obj) {
                                return obj.name !== item.name;
                              });
                              let children = isRouter.children.concat([
                                toJS(item.children[indexChildren]),
                              ]);
                              // eslint-disable-next-line unicorn/no-array-reduce
                              children = children.reduce((filtered, item) => {
                                if (
                                  !filtered.some(
                                    filteredItem =>
                                      JSON.stringify(filteredItem) ==
                                      JSON.stringify(item),
                                  )
                                ) {
                                  filtered.push(item);
                                }
                                //item.icon = item.icon.replace('LibraryComponents.Atoms.', '');
                                //item.toggle = false;
                                return filtered;
                              }, []);
                              router.push({
                                path: item.path,
                                name: item.name,
                                icon: item.icon,
                                title: item.title,
                                toggle: item.toggle,
                                children,
                              });
                            } else {
                              router.push({
                                path: item.path,
                                name: item.name,
                                icon: item.icon,
                                title: item.title,
                                toggle: item.toggle,
                                children: [toJS(item.children[indexChildren])],
                              });
                            }
                          }
                        },
                      );
                    });
                  });

                  router = router?.map(item => {
                    return {
                      ...item,
                      toggle: false,
                      children: item.children?.map(e => {
                        return { ...e, toggle: false };
                      }),
                    };
                  });
                  if (isModify.status) {
                    if (router?.length > 0) {
                      roleMappingStore.roleMappingService
                        .update({
                          input: {
                            _id: isModify?.id,
                            role: {
                              ...roleMappingStore?.selectedRole,
                              router: undefined,
                            },
                            router,
                          },
                        })
                        .then(res => {
                          if (res.updateRoleMapping.success) {
                            if (
                              roleMappingStore.selectedRole?.code ===
                              loginStore.login?.role
                            ) {
                              routerStore.updateUserRouter(router);
                            }
                            Toast.success({
                              message: `😊 ${res.updateRoleMapping.message}`,
                            });
                            setHideAddRoleMapping(!hideAddRoleMapping);
                            setHideRole(false);
                            roleMappingStore.updateSelectedRole({} as any);
                            routerStore.updateRouter([]);
                            // roleMappingStore.fetchRoleMappingList();
                            // exists records fetch time facing issue
                            // setTimeout(() => {
                            //   window.location.reload();
                            // }, 100);
                          } else {
                            Toast.error({
                              message: '😊 Data not update. Please try again',
                            });
                          }
                        });
                    }
                  } else {
                    roleMappingStore.roleMappingService
                      .addRoleMapping({
                        input: {
                          role: roleMappingStore.selectedRole,
                          router: router,
                        },
                      })
                      .then(res => {
                        if (res.createRoleMapping.success) {
                          Toast.success({
                            message: `😊 ${res.createRoleMapping.message}`,
                          });
                          setHideAddRoleMapping(!hideAddRoleMapping);
                          setHideRole(false);
                          roleMappingStore.updateSelectedRole({} as any);
                          routerStore.updateRouter([]);
                          roleMappingStore.fetchRoleMappingList();
                        } else {
                          Toast.error({
                            message: '😊 Data not update. Please try again',
                          });
                        }
                      });
                  }
                } else {
                  Toast.warning({
                    message: '😔 Please enter all information!',
                  });
                }
              }}
            >
              {isModify.status ? 'Update' : 'Save'}
            </Buttons.Button>
          </List>
        </div>
        <div className='p-2 rounded-lg shadow-xl overflow-auto'>
          {roleMappingTable}
        </div>
        <ModalConfirm
          {...modalConfirm}
          click={(action?: string) => {
            if (action === 'Delete') {
              roleMappingStore.roleMappingService
                .deleteRoleMapping({ input: { id: modalConfirm.id } })
                .then((res: any) => {
                  setModalConfirm({ show: false });
                  if (res.removeRoleMapping.success) {
                    Toast.success({
                      message: `😊 ${res.removeRoleMapping.message}`,
                    });
                    roleMappingStore.fetchRoleMappingList();
                  }
                });
            }
          }}
          onClose={() => {
            setModalConfirm({
              show: false,
            });
          }}
        />
      </div>
    </>
  );
});

export default RoleMapping;
