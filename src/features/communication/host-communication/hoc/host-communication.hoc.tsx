import React, {useEffect} from 'react';
import {observer} from 'mobx-react';
import {useStores} from '@/stores';
// import {getDefaultLookupItem} from "@/library/utils"
import {io} from 'socket.io-client';
let socket;
export const HostCommunicationHoc = (Component: React.FC<any>) => {
  return observer((props: any): JSX.Element => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const {hostCommunicationStore} = useStores();
    socket = io('restapi-hosturl'.split('/api')[0], {
      transports: ['websocket'],
    });
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useEffect(() => {
      socket.on('hostCommunicationSendDataToInstrument', data => {
        hostCommunicationStore.updateHostCommuication({
          ...hostCommunicationStore.hostCommuication,
          txtSendDatafromInstrument: data,
        });
      });

      socket.on('hostCommunicationSourceFile', data => {
        hostCommunicationStore.updateHostCommuication({
          ...hostCommunicationStore.hostCommuication,
          txtDataReceivefromInstrument: data,
        });
      });
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return <Component {...props} />;
  });
};
