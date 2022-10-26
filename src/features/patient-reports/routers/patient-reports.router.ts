import async from '@/layouts/components/async.component';
const GenerateReport = async(
  () => import('../generate-reports/screens/generate-reports.screen'),
);
const DeliveryQueue = async(
  () => import('../delivery-queue/screens/delivery-queue.screen'),
);

export const patientReportsRoutes = {
  path: '/patient-reports',
  name: 'Patient Reports',
  icon: 'Icons.Iconmd.MdOutlineLibraryBooks',
  children: [
    {
      path: '/patient-reports/generate-report',
      name: 'Generate Report',
      icon: 'Icons.IconGi.GiRegeneration',
      component: GenerateReport,
    },
    {
      path: '/patient-reports/delivery-queue',
      name: 'Delivery Queue',
      icon: 'Icons.Iconmd.MdOutlineDeliveryDining',
      component: DeliveryQueue,
    },
  ],
};
