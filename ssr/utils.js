/**
 * register or unregister store modules
 * @param {*} stores , store modules
 * @param {*} register ,if true registre module ,else unregistre moduel
 */
export function storeModule(store, stores, register = true) {
  for (let key of Object.keys(stores)) {
    if (register) {
      store.registerModule(key, stores[key]);
    } else {
      store.unregisterModule(key);
    }
  }
}
