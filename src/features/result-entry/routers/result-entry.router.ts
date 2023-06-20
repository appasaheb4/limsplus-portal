import async from '@/layouts/components/async.component';
const GeneralResultEntry = async(
  () => import('../general-result-entry/screens/general-result-entry.screen'),
);
const MicroResultEntry = async(
  () => import('../micro-result-entry/screens/micro-result-entry.screen'),
);
const HistoResultEntry = async(
  () => import('../histo-result-entry/screens/histo-result-entry.screen'),
);

export const resultEntryRoutes = {
  path: '/result-entry',
  name: 'Result Entry',
  icon: 'SiSentry',
  children: [
    {
      path: '/result-entry/general',
      name: 'General Result Entry',
      icon: 'BiCategory',
      component: GeneralResultEntry,
    },
    {
      path: '/result-entry/micro',
      name: 'Micro Result Entry',
      icon: 'GiMicroscope',
      component: MicroResultEntry,
    },
    {
      path: '/result-entry/histo',
      name: 'Histo Result Entry',
      icon: 'MdHistoryToggleOff',
      component: HistoResultEntry,
    },
  ],
};
