import {stores} from '@/stores';
const startup = async () => {
    stores.loginActivityStore.fetchLoginActivity();
}

export default startup;