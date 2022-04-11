import { SOCKET_PATH, API_URL, ETL_TRACKER_URL } from '../url';
import { SocketIOClient } from './SocketIOClient';

export class EtlCommandDispatcher extends SocketIOClient {

  constructor() {
    super(API_URL, `etl-commands`, SOCKET_PATH, ETL_TRACKER_URL);
  }

  startProcess(transformationId) {
    this.client.emit('process-start', transformationId);
  }

}