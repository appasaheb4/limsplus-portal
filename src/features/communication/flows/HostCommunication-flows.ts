import {stores} from '@/stores';
import {InterfaceManager} from '../interfaceManager/models';
import {MappingValues} from '../models';
import {SegmentMapping} from '../segmentMapping/models';
import {decode} from '@/library/modules/parser/HL7';

class HostCommunicationFlows {
  mapping = async (interfaceManager: InterfaceManager) => {
    const data = stores.segmentMappingStore.listSegmentMapping;
    const mapping: any[] = [];
    const values: MappingValues[] = [];
    const dataFlowFrom =
      interfaceManager.dataFlowFrom !== undefined
        ? interfaceManager.dataFlowFrom
            .replaceAll(/&amp;/g, '&')
            .replaceAll(/&gt;/g, '>')
            .replaceAll(/&lt;/g, '<')
            .replaceAll(/&quot;/g, '"')
            .replaceAll(/â/g, '’')
            .replaceAll(/â¦/g, '…')
        : undefined;
    data?.forEach((item: SegmentMapping) => {
      if (
        item.equipmentType === interfaceManager.instrumentType &&
        item.dataFlowFrom === dataFlowFrom
      ) {
        values.push({
          segments: item.segments,
          field: `${item.segments?.toLowerCase()}.${item.element_name
            ?.toLowerCase()
            .replaceAll(' ', '_')}`,
          component: [Number(item.field_no), 1],
          field_no: Number(item.field_no),
          mandatory: item.mandatory,
          default: '',
        });
      }
    });
    const group = values.reduce((r: any, a: any) => {
      r[a.segments] = [...(r[a.segments] || []), a];
      return r;
    }, {});

    const entries = Object.entries(group);
    entries.forEach((item: any) => {
      mapping.push({
        [item[0].toLowerCase() || '']: {values: item[1]},
      });
    });

    return mapping;
  };

  convetTo = (type: string, interfaceManager, message: string) =>
    new Promise(async (resolve, reject) => {
      try {
        const mappingList = await this.mapping(interfaceManager);

        // decode
        if (type === 'HL7') {
          const tempData = {};
          mappingList.forEach(item => {
            Object.keys(item).forEach(key => {
              tempData[key] = item[key];
            });
          });
          const mapping = {
            mapping: tempData,
          };
          const hl7 = decode(
            message,
            stores.hostCommunicationStore.selectedInterfaceManager,
            mapping,
          );
          if (!hl7) return alert('Please enter correct message');
          stores.hostCommunicationStore.updateConvertTo({
            ...stores.hostCommunicationStore.convertTo,
            hl7,
          });
          stores.hostCommunicationStore.updateHostCommuication({
            ...stores.hostCommunicationStore.hostCommuication,
            // txtDataReceivefromInstrument: "",
          });
        }
      } catch (error) {
        reject(error);
      }
    });

  newMessage = (message?: any) => {
    stores.hostCommunicationStore.updateHostCommuication({
      ...stores.hostCommunicationStore.hostCommuication,
      txtDataReceivefromInstrument: message,
      convertTo: '',
    });
    stores.hostCommunicationStore.updateConvertTo({
      ...stores.hostCommunicationStore.convertTo,
      hl7: undefined,
    });
  };
}

export default new HostCommunicationFlows();
