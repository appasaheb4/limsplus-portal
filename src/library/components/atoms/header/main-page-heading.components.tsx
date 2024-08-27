import React from 'react';
import { Header, PageHeading, PageHeadingLabDetails } from './header.component';
import { connect } from 'react-redux';
import { useStores } from '@/stores';
import { useHistory } from 'react-router-dom';
import { RouterFlow } from '@/flows';
import { AutocompleteSearch } from '../../molecules/auto-complete-search/autocomplete-search.component';

const MainPageHeading = ({ sidebar, title, store }) => {
  const { routerStore } = useStores();
  const history = useHistory();
  return (
    <div className='relative'>
      <Header>
        <PageHeading title={title || ''} />
        <PageHeadingLabDetails store={store} />
      </Header>

      <div className='absolute left-[50%] top-7 transform -translate-x-1/2 -translate-y-1/2 w-[500px]  z-99'>
        {!sidebar?.isOpen && (
          <AutocompleteSearch
            data={routerStore.userRouter}
            onChange={async (item: any, children: any) => {
              const { permission, selectedComp } =
                await RouterFlow.updateSelectedCategory(
                  item?.name,
                  children?.name,
                );
              routerStore.updateSelectedComponents(selectedComp);
              routerStore.updateUserPermission(permission);
              history.replace(children.path);
            }}
          />
        )}
      </div>
    </div>
  );
};

export default connect((store: any) => ({
  sidebar: store.sidebar,
}))(MainPageHeading);
