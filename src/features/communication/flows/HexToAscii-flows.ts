import {decode} from '@/library/modules/parser/HEX';
import {toJS} from 'mobx';
import {stores} from '@/stores';
import {DataConversation} from '../dataConversation/models';

class HexToAsciiFlow {
  conversationMapping = async () => {
    const data = stores.dataConversationStore.listdataConversation;
    const values: DataConversation[] | any = [];
    data?.forEach((item: DataConversation) => {
      values.push({
        hexadecimal: item.hexadecimal,
        ascii:
          item.ascii !== undefined
            ? item.ascii
                .replaceAll(/&amp;/g, '&')
                .replaceAll(/&gt;/g, '>')
                .replaceAll(/&lt;/g, '<')
                .replaceAll(/&quot;/g, '"')
                .replaceAll(/â/g, '’')
                .replaceAll(/â¦/g, '…')
                .toString()
            : undefined,
      });
    });
    return values;
  };

  hextoascii = async (hex: string) => {
    const conversationMapping = await this.conversationMapping();
    if ((await conversationMapping).length > 0) {
      const ascii = decode(hex, toJS(conversationMapping));
      stores.hostCommunicationStore.updateHostCommuication({
        ...stores.hostCommunicationStore.hostCommuication,
        txtDataReceivefromInstrument: ascii,
      });
    }
  };
}
export default new HexToAsciiFlow();
