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
    <div className=' relative'>
      <Header>
        <PageHeading title={title || ''} />
        {!sidebar?.isOpen && (
          <div style={{ width: '50%' }}>
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
          </div>
        )}
        <PageHeadingLabDetails store={store} />
      </Header>
    </div>
  );
};

export default connect((store: any) => ({
  sidebar: store.sidebar,
}))(MainPageHeading);
