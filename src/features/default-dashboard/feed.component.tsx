import React from 'react';

import {
  Badge,
  Button,
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  Media,
} from 'reactstrap';

const Feed = () => (
  <Card className='flex-fill w-100 dark:bg-boxdark dark:border-2 dark:border-white dark:text-white'>
    <CardHeader className='dark:border-b-2 dark:border-white'>
      <Badge color='info' className='float-right'>
        Today
      </Badge>
      <CardTitle tag='h5' className='mb-0'>
        <span className='dark:text-white'>Daily feed</span>
      </CardTitle>
    </CardHeader>
    <CardBody>
      <Media>
        <Media body>
          <small className='float-right text-navy'>5m ago</small>
          <strong>Ashley Briggs</strong> started following <br />
          <small>Today 7:51 pm</small>
        </Media>
      </Media>
      <hr />
      <Media>
        <Media body>
          <small className='float-right text-navy'>30m ago</small>
          <strong>Chris Wood</strong> posted something on <br />
          <small>Today 7:21 pm</small>
          <div className='border text-sm  p-2 mt-1'>
            Etiam rhoncus. Maecenas tempus, tellus eget condimentum rhoncus, sem
            quam semper libero, sit amet adipiscing...
          </div>
        </Media>
      </Media>

      <hr className='mt-2' />
      <Button color='primary' block>
        Load more
      </Button>
    </CardBody>
  </Card>
);

export default Feed;
