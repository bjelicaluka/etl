import { SOCKET_PATH, API_URL, ETL_TRACKER_URL } from '../url';
import { SocketIOClient } from './SocketIOClient';

export class EtlEventHandler extends SocketIOClient {

  constructor() {
    super(API_URL, `etl-events`, SOCKET_PATH, ETL_TRACKER_URL);
    this.initialized = false;
  }

  onInitHook() {
    this.clearEventListeners('liveness');
    this.addEventListener('liveness', this.livenessHandler);
    this.initialized = true;
  }

  onLiveness(livenessHandler) {
    this.livenessHandler = livenessHandler;
    this.initialized && this.clearEventListeners('liveness');
    !this.initialized ? this.init() : this.addEventListener('liveness', this.livenessHandler);
  }

  onProcessStatus(handler) {
    this.processStatusHandler = handler;
    this.initialized && this.clearEventListeners('process-status');
    !this.initialized ? this.init() : this.addEventListener('process-status', this.processStatusHandler);
  }

  onProcessDone(handler) {
    this.processDoneHandler = handler;
    this.initialized && this.clearEventListeners('process-done');
    !this.initialized ? this.init() : this.addEventListener('process-done', this.processDoneHandler);
    this.client.emit()
  }

}