import { API_GATEWAY_SOCKET_PATH, API_URL, API_GATEWAY_URL } from '../url';
import { getToken } from '../utils/token';
import { SocketIOClient } from './SocketIOClient';

export class DataEventHandler extends SocketIOClient {

  constructor(groupId, sensorId) {
    super(API_URL, `live-data/${groupId}/${sensorId}`, API_GATEWAY_SOCKET_PATH, getToken, groupId, API_GATEWAY_URL);
    this.initialized = false;
  }

  onInitHook() {
    this.clearEventListeners('data');
    this.addEventListener('data', this.dataHandler);
    this.initialized = true;
  }

  onData(dataHandler) {
    this.dataHandler = dataHandler;
    this.initialized && this.clearEventListeners('data');
    !this.initialized ? this.init() : this.addEventListener('data', this.dataHandler);
  }

}