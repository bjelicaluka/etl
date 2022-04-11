import axios from 'axios';
import { io } from 'socket.io-client';

export class SocketIOClient {

  constructor(host, namespace, path, serviceHost) {
    this.host = host;
    this.serviceHost = serviceHost;
    this.namespace = namespace;
    this.path = path;
  }

  init() {
    this.client = io(`${this.host}${this.namespace}`, {
      path: this.path,
      forceNew: true,
    });

    this.addEventListener('connect', () => {
      console.log(`Connected to ${this.namespace} namespace.`);
    });
    this.addEventListener('disconnect', () => {
      console.log(`Disconnected from ${this.namespace} namespace.`);
    });
    this.addEventListener('connect_error', (e) => {
      console.log(`Connection to ${this.namespace} namespace failed. Requesting namespace creation.`);
      setTimeout(() => {
        this.requestNamespaceCreation();
      }, 5000);
    });

    this.onInitHook();
  }

  onInitHook() {}

  addEventListener(event, listener) {
    this.client.on(event, listener);
  }

  clearEventListeners(event) {
    this.client.off(event);
  }

  dispatchEvent(event, data) {
    this.client.emit(event, data);
  }

  close() {
    this.client.close();
  }

  requestNamespaceCreation() {
    axios.post(`${this.serviceHost}/namespaces`, { namespace: this.namespace })
      .then(resp => { console.log("Namespace creation success."); this.init() })
      .catch(e => console.log('Namespace creation failed.'));
  }

}