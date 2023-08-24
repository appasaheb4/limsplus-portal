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
const InstrumentResultMapping = async(
  () =>
    import('../instrument-result-mapping/screens/inst-result-mapping.screen'),
);
const TransmittedMessage = async(
  () => import('../transmitted-message/screens/transmitted-message.screen'),
);

export const communicationRoutes = {
  path: '/communication',
  name: 'Communication',
  icon: 'FaCommentDots',
  children: [
    {
      path: '/communication/interface-manager',
      name: 'Interface Manager',
      icon: 'CgCommunity',
      component: InterfaceManager,
    },
    {
      path: '/communication/mapping/conversation-mapping',
      name: 'Conversation Mapping',
      icon: 'GiConversation',
      component: DataConversation,
    },
    {
      path: '/communication/host-communication',
      name: 'Host Communication',
      icon: 'RiGhostSmileLine',
      component: HostCommunication,
    },
    {
      path: '/communication/mapping/segment-mapping',
      name: 'Data Segment Mapping',
      icon: 'GiDatabase',
      component: SegmentMapping,
    },
    {
      path: '/communication/instrument-result-mapping',
      name: 'Instrument Result Mapping',
      icon: 'VscOutput',
      component: InstrumentResultMapping,
    },
    {
      path: '/communication/transmitted-message',
      name: 'Transmitted Message',
      icon: 'AiOutlineMessage',
      component: TransmittedMessage,
    },
  ],
};
