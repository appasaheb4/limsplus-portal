import async from '@/layouts/components/async.component';
const GeneralResultEntry = async(
  () => import('../screens/general-result-entry.screen'),
);
const MicroResultEntry = async(
  () => import('../screens/micro-result-entry.screen'),
);
const HistoResultEntry = async(
  () => import('../screens/histo-result-entry.screen'),
);

export const resultEntryRoutes = {
  path: '/result-entry',
  name: 'Result Entry',
  icon: 'Icons.Iconsi.SiSentry',
  children: [
    {
      path: '/result-entry/general',
      name: 'General Result Entry',
      icon: 'Icons.IconBi.BiCategory',
      component: GeneralResultEntry,
    },
    {
      path: '/result-entry/micro',
      name: 'Micro Result Entry',
      icon: 'Icons.IconGi.GiMicroscope',
      component: MicroResultEntry,
    },
    {
      path: '/result-entry/histo',
      name: 'Histo Result Entry',
      icon: 'Icons.Iconmd.MdHistoryToggleOff',
      component: HistoResultEntry,
    },
  ],
};
