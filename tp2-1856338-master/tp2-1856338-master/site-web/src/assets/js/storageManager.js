import songs from "./songs.js";
import playlists from "./playlists.js";

export default class StorageManager {
  STORAGE_KEY_SONGS = "songs";
  STORAGE_KEY_PLAYLISTS = "playlist";

  /**
   * Charge toutes les données dans le LocalStorage
   */
  loadAllData () {
    this.loadDataFromFile(this.STORAGE_KEY_SONGS, songs);
    this.loadDataFromFile(this.STORAGE_KEY_PLAYLISTS, playlists);
  }

  /**
   * TODO -stpham ok
   * Charge un objet dans LocalStorage selon une clé spécifique
   * Si la clé est déjà présente dans LocalStorage, rien n'est chargé
   * @param {string} storageKey clé de sauvegarde
   * @param {Object} defaultData données à sauvegarder
   */
  loadDataFromFile (storageKey, defaultData = {}) {
    // Charge un objet dans LocalStorage selon une clé spécifique
    if (!localStorage.getItem(storageKey)) {
      localStorage.setItem(storageKey, JSON.stringify(defaultData));
    }
  }

  /**
   * Obtient un objet de LocalStorage en fonction de la clé de sauvegarde
   * @param {string} storageKey clé de sauvegarde
   * @returns {Object} données de LocalStorage
   */
  getData (storageKey) {
    return JSON.parse(localStorage.getItem(storageKey));
  }

  /**
   * TODO -stpham ok
   * Obtient un objet de LocalStorage en fonction de la clé de sauvegarde et un paramètre 'id'
   * @param {string} storageKey clé de sauvegarde
   * @param {string | number} id paramètre 'id' à trouver dans les données
   * @returns {Object} donné de LocalStorage ayant le bon attribut 'id'
   */
  getItemById (storageKey, id) {
    const localData = this.getData(storageKey);
    return localData ? localData.find((item) => item.id === id) : -1;
  }

  /**
   * TODO -stpham ok
   * Ajoute un item aux données sauvegardées avec une clé de sauvegarde
   * @param {string} storageKey clé de sauvegarde
   * @param {Object} newItem  objet à rajouter
   */
  addItem (storageKey, newItem) {
    const localData = JSON.parse(localStorage.getItem(storageKey));
    localData.push(newItem);
    localStorage.setItem(storageKey, JSON.stringify(localData));
  }

  /**
   * Remplace un item dans les données sauvegardées avec une clé de sauvegarde
   * Utilise l'attribut 'id' de l'objet pour trouver l'item à remplacer
   * @param {string} storageKey clé de sauvegarde
   * @param {Object} newItem objet à rajouter. Nécessite l'attribut 'id'
   */
  replaceItem (storageKey, newItem) {
    const localData = JSON.parse(localStorage.getItem(storageKey));
    const newData = localData.map((item) => {
      return item.id === newItem.id ? newItem : item;
    });
    localStorage.setItem(storageKey, JSON.stringify(newData));
  }

  /**
   * TODO -stpham ok
   * Récupère l'attribut 'id' d'un item dans les données sauvegardées avec une clé de sauvegarde
   * Utilise l'attribut 'name' de l'objet pour trouver l'item à retourner
   * @param {string} storageKey clé de sauvegarde
   * @param {Object} elementName nom de l'objet à retrouver. Comparé avec l'attribut 'name'
   * @returns {string|number} id de l'item ayant l'attribut 'name' égale à 'elementName'
   */
  getIdFromName (storageKey, elementName) {
    const localData = JSON.parse(localStorage.getItem(storageKey));
    return localData ? -1 : localData.find((item) => item.name === elementName).id;
  }

  /**
   * Vide le LocalStorage
   */
  resetAllData () {
    localStorage.clear();
  }
}
