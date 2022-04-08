export function removeProperties(object, list) {
  Object.keys(object)?.forEach(key => {
    if (Array.isArray(object[key])) {
      object[key].forEach(obj => {
        removeProperties(obj, list);
        list.forEach(item => { delete obj[item] });
      })
    }
  })
}
