/* eslint-disable */
import React, {useEffect, useState} from 'react';
import {observer} from 'mobx-react';
import {
  Header,
  PageHeading,
  PageHeadingLabDetails,
  Buttons,
  Icons,
  List,
  Svg,
  Toast,
} from '@/library/components';
import {DragDropContext, Droppable, Draggable} from 'react-beautiful-dnd';

import {useStores} from '@/stores';

const grid = 8;
const getListStyle = isDraggingOver => ({
  background: isDraggingOver ? 'lightblue' : 'none',
  display: 'flex',
  //flexWrap:'none',
  padding: grid,
  overflow: 'auto',
});

const ShortcutMenu = observer(() => {
  const {loginStore, shortcutMenuStore, routerStore} = useStores();
  useEffect(() => {
    const list: any[] = [];
    routerStore.userRouter?.filter(item => {
      item.children.filter((children: any) => {
        const userShortcutMenu =
          loginStore.login?.shortcutMenu &&
          loginStore.login?.shortcutMenu[loginStore.login.role || ''] &&
          loginStore.login?.shortcutMenu[loginStore.login.role || ''].filter(
            userItem =>
              userItem.category === item.name &&
              userItem.name === children.name,
          );

        if (userShortcutMenu && userShortcutMenu?.length > 0) {
          children.selected = true;
        } else {
          children.selected = false;
        }
        children.category = item.name;
        list.push(children);
      });
    });
    shortcutMenuStore.updateShortcutMenu(list);
  }, []);

  const onItemSelect = (item: any, index: number) => {
    const list = shortcutMenuStore.shortcutMenuList;
    if (list) {
      list[index].selected = !list[index].selected;
    }

    shortcutMenuStore.updateShortcutMenu(list);
  };

  const handleOnDragEnd = (result: any) => {
    const items = Array.from(
      (loginStore.login?.shortcutMenu &&
        loginStore.login?.shortcutMenu[loginStore.login.role || '']) ||
        [],
    );
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    loginStore.updateLogin({
      ...loginStore.login,
      shortcutMenu: {[loginStore.login?.role || '']: items},
    });
    shortcutMenuStore.updateDragDrop(true);
  };
  return (
    <>
      <Header>
        <PageHeading title={routerStore.selectedComponents?.title || ''} />
        <PageHeadingLabDetails store={loginStore} />
      </Header>
      {loginStore.login?.shortcutMenu &&
        loginStore.login?.shortcutMenu[loginStore.login.role || ''] &&
        loginStore.login?.shortcutMenu &&
        loginStore.login?.shortcutMenu[loginStore.login.role || ''].length >
          0 && (
          <div>
            <label className='mt-2'>Active:</label>
            <DragDropContext onDragEnd={handleOnDragEnd}>
              <Droppable droppableId='characters' direction='horizontal'>
                {(provided, snapshot) => (
                  <ul
                    style={getListStyle(snapshot.isDraggingOver)}
                    // className="grid grid-cols-1 p-2"
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                  >
                    {loginStore.login?.shortcutMenu &&
                      loginStore.login?.shortcutMenu[
                        loginStore.login.role || ''
                      ].map((item, index) => (
                        <>
                          <Draggable
                            key={item.title}
                            draggableId={item.title}
                            index={index}
                          >
                            {(provided, snapshot) => (
                              <div
                                className='flex items-center bg-blue-500  p-2 m-2 rounded-md'
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                              >
                                <Icons.IconContext color='#fff' size='22'>
                                  {Icons.getIconTag(
                                    Icons.getIcons(item.icon) ||
                                      Icons.IconBs.BsList,
                                  )}
                                </Icons.IconContext>
                                <li className='m-2 text-white'>{item.title}</li>
                              </div>
                            )}
                          </Draggable>
                        </>
                      ))}
                  </ul>
                )}
              </Droppable>
            </DragDropContext>
            {shortcutMenuStore.isDragDropList && (
              <div className='flex items-center justify-center'>
                <Buttons.Button
                  size='medium'
                  type='solid'
                  icon={Svg.Save}
                  onClick={() => {
                    shortcutMenuStore.ShortcutMenuService.updateShortcutMenu({
                      input: {
                        userRole: loginStore.login?.role,
                        selectedList:
                          loginStore.login?.shortcutMenu &&
                          loginStore.login?.shortcutMenu[
                            loginStore.login.role || ''
                          ],
                        _id: loginStore.login?._id,
                      },
                    }).then(res => {
                      if (res.updateShortcutMenu.success) {
                        Toast.success({
                          message: `😊 ${res.updateShortcutMenu.message}`,
                        });
                        shortcutMenuStore.updateDragDrop(false);
                      } else {
                        Toast.error({
                          message: `😔Please try agian.`,
                        });
                      }
                    });
                  }}
                >
                  Update
                </Buttons.Button>
                <br /> <br />
              </div>
            )}
          </div>
        )}

      <hr />
      <div className='flex-wrap'>
        <label className='mt-2'>List:</label>
        <ul className='grid grid-cols-6 p-2'>
          {shortcutMenuStore.shortcutMenuList &&
            shortcutMenuStore.shortcutMenuList?.map((item, index) => (
              <>
                <div className='flex items-center bg-gray-500  p-2 m-2 rounded-md'>
                  <input
                    type='checkbox'
                    className='mr-2'
                    name={item.name}
                    value={item.name}
                    checked={item.selected}
                    onChange={() => onItemSelect(item, index)}
                  />

                  <Icons.IconContext color='#fff' size='22'>
                    {Icons.getIconTag(
                      Icons.getIcons(item.icon) || Icons.IconBs.BsList,
                    )}
                  </Icons.IconContext>
                  <li className='m-2 text-white'>{item.title}</li>
                </div>
              </>
            ))}
        </ul>
        <br />
        <List direction='row' space={3} align='center'>
          <Buttons.Button
            size='medium'
            type='solid'
            icon={Svg.Save}
            onClick={() => {
              const selectedList = shortcutMenuStore.shortcutMenuList?.filter(
                item => item.selected === true,
              );
              const userRole = loginStore.login?.role;
              if (selectedList && selectedList?.length > 0) {
                shortcutMenuStore.ShortcutMenuService.updateShortcutMenu({
                  input: {
                    userRole,
                    selectedList: selectedList,
                    _id: loginStore.login?._id,
                  },
                }).then(res => {
                  if (res.updateShortcutMenu.success) {
                    Toast.success({
                      message: `😊 ${res.updateShortcutMenu.message}`,
                    });
                    loginStore.updateLogin({
                      ...loginStore.login,
                      shortcutMenu: res.updateShortcutMenu.data.shortcutMenu,
                    });
                  } else {
                    Toast.error({
                      message: `😔Please try agian.`,
                    });
                  }
                });
              }
            }}
          >
            Update
          </Buttons.Button>
        </List>
      </div>
    </>
  );
});

export default ShortcutMenu;
