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
  title: 'PATIENT REPORTS',
  order: 5,
  icon: 'MdOutlineLibraryBooks',
  children: [
    {
      path: '/patient-reports/generate-report',
      name: 'Generate Report',
      icon: 'GiRegeneration',
      component: GenerateReport,
    },
    {
      path: '/patient-reports/delivery-queue',
      name: 'Delivery Queue',
      icon: 'MdOutlineDeliveryDining',
      component: DeliveryQueue,
    },
  ],
};
