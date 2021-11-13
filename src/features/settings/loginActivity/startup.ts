import {stores} from '@lp/stores';
const startup = async () => {
    stores.loginActivityStore.fetchLoginActivity();
}

export default startup;