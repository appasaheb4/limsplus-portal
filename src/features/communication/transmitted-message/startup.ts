import {stores} from '@/stores';
const startup = async () => {
  stores.transmittedMessageStore.transmittedMessageService.listTransmittedMessage();
};

export default startup;
