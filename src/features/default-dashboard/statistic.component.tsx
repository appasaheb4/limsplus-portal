import React from 'react';
import { observer } from 'mobx-react';

import { Users } from 'react-feather';
import { useStores } from '@/stores';

const Statistics = observer(() => {
  const { userStore } = useStores();
  return (
    <div>
      <div className='grid  sm:grid-cols-1 md:grid-cols-4 gap-2 mb-6'>
        <div className='flex rounded-md items-center border-2 border-gray p-4 gap-4 px-4'>
          <div className='flex'>
            <Users className='feather-lg text-primary' />
          </div>
          <div>
            <span>{userStore.userListCount}</span>
            <div>Total number of Users in the System</div>
          </div>
        </div>
      </div>
    </div>
  );
});

export default Statistics;
