import { format } from 'timeago.js';
const timeagoInstance = format();

const helpers = {
    timeago : (timestamp) => {
        return format(timestamp);
    }
};

export default helpers;