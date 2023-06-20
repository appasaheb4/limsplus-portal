import async from '@/layouts/components/async.component';

const PatientRegistrations = async(
  () => import('../patient-registration/screens/patient-registration.screen'),
);

const ClientRegistrations = async(
  () => import('../client-registration/screens/client-registration.screen'),
);

export const registrationRoutes = {
  path: '/registration',
  name: 'Registration',
  icon: 'RiUserAddLine',
  children: [
    {
      path: '/registration/patient',
      name: 'Patient Registration',
      icon: 'FaAddressCard',
      component: PatientRegistrations,
    },
    {
      path: '/registration/client',
      name: 'Client Registration',
      icon: 'FaRegUser',
      component: ClientRegistrations,
    },
  ],
};
