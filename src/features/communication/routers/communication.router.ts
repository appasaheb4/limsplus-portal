import async from '@/layouts/components/async.component';
const HostCommunication = async(
  () => import('../host-communication/screens/host-communication.screen'),
);
const SegmentMapping = async(
  () => import('../segment-mapping/screens/segment-mapping.screen'),
);
const DataConversation = async(
  () => import('../data-conversation/screens/data-conversation.screen'),
);
const InterfaceManager = async(
  () => import('../interface-manager/screens/interface-manager.screen'),
);

export const communicationRoutes = {
  path: '/communication',
  name: 'Communication',
  icon: 'Icons.IconFa.FaCommentDots',
  children: [
    {
      path: '/communication/interfaceManager',
      name: 'Interface Manager',
      icon: 'Icons.IconCg.CgCommunity',
      component: InterfaceManager,
    },
    {
      path: '/communication/mapping/conversationMapping',
      name: 'Conversation Mapping',
      icon: 'Icons.IconGi.GiConversation',
      component: DataConversation,
    },
    {
      path: '/communication/hostCommunication',
      name: 'Host Communication',
      icon: 'Icons.IconRi.RiGhostSmileLine',
      component: HostCommunication,
    },
    {
      path: '/communication/mapping/segmentMapping',
      name: 'Data Segment Mapping',
      icon: 'Icons.IconGi.GiDatabase',
      component: SegmentMapping,
    },
  ],
};
