export const API_URL = window._env_.SAME_HOST === 'true' ? 
  `${window._env_.API_PROTOCOL}://${window.location.hostname}:${window._env_.API_PORT}${window._env_.API_PATH}` 
  :
  `${window._env_.API_PROTOCOL}://${window._env_.API_HOSTNAME}:${window._env_.API_PORT}${window._env_.API_PATH}`

export const USER_SERVICE_URL = `${API_URL}userService`;
export const ALARM_SERVICE_URL = `${API_URL}alarmService`;
export const SENSOR_SERVICE_URL = `${API_URL}sensorService`;
export const REPORT_SERVICE_URL = `${API_URL}reportService`;
export const DATA_SERVICE_URL = `${API_URL}dataService`;
export const DOCUMENT_SERVICE_URL = `${API_URL}documentService`;
export const API_GATEWAY_URL = `${API_URL}apiGateway`;
export const CONTROL_SERVICE_URL = `${API_URL}controlService`;
export const ACTION_HOOK_SERVICE_URL = `${API_URL}actionHookService`;

export const API_GATEWAY_SOCKET_PATH = '/apiGatewayLive/socket.io';
export const ALARM_SERVICE_SOCKET_PATH = '/alarmServiceLive/socket.io';