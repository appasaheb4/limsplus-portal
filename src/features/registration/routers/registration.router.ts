import async from '@/layouts/components/async.component';
const PatientRegistation = async(
  () => import('../screens/PatientRegistration/patient-registration.screen'),
);

export const registrationRoutes = {
  path: '/registration',
  name: 'Registration',
  icon: 'Icons.IconRi.RiUserAddLine',
  children: [
    {
      path: '/registration/patient',
      name: 'Patient Registration',
      icon: 'Icons.IconFa.FaAddressCard',
      component: PatientRegistation,
    },
  ],
};
