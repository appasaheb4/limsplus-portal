import async from '@/layouts/components/async.component';

const PatientRegistrations = async(
  () => import('../screens/patient-registration/patient-registration.screen'),
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
      component: PatientRegistrations,
    },
  ],
};
