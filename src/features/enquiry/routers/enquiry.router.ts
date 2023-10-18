import async from '@/layouts/components/async.component';

// Settings
const EventLog = async(() => import('../event-logs/screens/event-logs.screen'));

export const enquiryRoutes = {
  path: '/enquiry',
  name: 'Enquiry',
  icon: 'TbTopologyStar3',
  children: [
    {
      path: '/enquiry/event-log',
      name: 'Event Log',
      icon: 'MdOutlineEventNote',
      component: EventLog,
    },
  ],
};
