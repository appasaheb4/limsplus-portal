import {Stores} from './stores';
const startup = async () => {
    Stores.deliveryScheduleStore.fetchDeliverySchedule();
}

export default startup;