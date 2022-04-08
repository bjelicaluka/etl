import axios from 'axios';
import { io } from 'socket.io-client';

export class SocketIOClient {

  constructor(host, namespace, path, tokenFactory, groupId, serviceHost) {
    this.host = host;
    this.serviceHost = serviceHost;
    this.namespace = namespace;
    this.path = path;
    this.tokenFactory = tokenFactory;
    this.groupId = groupId;
  }

  init() {
    this.client = io(`${this.host}${this.namespace}`, {
      path: this.path,
      forceNew: true,
      query: {
        token: `Bearer ${this.tokenFactory()}`
      },
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
    axios.post(`${this.serviceHost}/groups/${this.groupId}/namespaces`, { namespace: this.namespace })
      .then(resp => { console.log("Namespace creation success."); this.init() })
      .catch(e => console.log('Namespace creation failed.'));
  }

}