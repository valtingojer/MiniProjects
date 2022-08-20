import { Linking } from 'react-native';
import * as Network from 'expo-network';


const externalUrl = 'https://google.com';

const checkExternalUrl = async (url) => {
    let sts = false;
    try {
        let conn = await Linking.canOpenURL(url);
        if (conn == true) {
            conn = await fetch(url);
            sts = conn.status !== 200 ? false : true
        }
    } catch (e) {
        console.log("error chacking for internet checkExternalUrl: ", e)
    }

    return sts;
};
const checkNetwork = async (wifiOnly) => {
    let networkState = await Network.getNetworkStateAsync();
    let state = !(wifiOnly === "true" && networkState.type != Network.NetworkStateType.WIFI);
    return state;
}


const NetworkCheck = async (wifiOnly) => {
    let externalStatus = await checkExternalUrl(externalUrl);
    let networkStatus = await checkNetwork(wifiOnly);
    let hasConnection = externalStatus && networkStatus;
    return hasConnection;
}


export default NetworkCheck;
