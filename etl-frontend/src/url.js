export const API_URL = window._env_.SAME_HOST === 'true' ? 
  `${window._env_.API_PROTOCOL}://${window.location.hostname}:${window._env_.API_PORT}${window._env_.API_PATH}` 
  :
  `${window._env_.API_PROTOCOL}://${window._env_.API_HOSTNAME}:${window._env_.API_PORT}${window._env_.API_PATH}`

export const ETL_TRACKER_URL = `${API_URL}`;

export const SOCKET_PATH = '/socket.io';