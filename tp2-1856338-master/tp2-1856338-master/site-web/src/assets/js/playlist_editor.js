import StorageManager from "./storageManager.js";

/**
 * TODO -stpham ok
 * Popule l'élément 'dataList' avec des éléments <option> en fonction des noms des chansons en paramètre
 * @param {HTMLDataListElement} dataList élément HTML à qui ajouter des options
 * @param {Object} songs liste de chansons dont l'attribut 'name' est utilisé pour générer les éléments <option>
 */
function buildDataList (dataList, songs) {
  dataList.innerHTML = "";
  // TODO -stpham ok : extraire le nom des chansons et populer l'élément dataList avec des éléments <option>
  songs.forEach(song => {
    const option = document.createElement("option");
    option.value = song.name;
    dataList.appendChild(option);
  });
}

/**
 * Permet de mettre à jour la prévisualisation de l'image pour la playlist
 */
function updateImageDisplay () {
  const imagePreview = document.getElementById("image-preview");
  imagePreview.src = URL.createObjectURL(this.files[0]);
}

/**
 * TODO -stpham ok
 * Ajoute le code HTML pour pouvoir ajouter une chanson à la playlist
 * Le code contient les éléments <label>, <input> et <button> dans un parent <div>
 * Le bouton gère l'événement "click" et retire le <div> généré de son parent
 * @param {Event} e événement de clic
 */
function addItemSelect (e) {
  // TODO -stpham ok : prévenir le comportement par défaut du bouton pour empêcher la soumission du formulaire
  e.preventDefault();

  // TODO -stpham ok : construire les éléments HTML nécessaires pour l'ajout d'une nouvelle chanson
  const songContainer = document.getElementById("song-list");
  const songItem = document.createElement("div");
  const songLabel = document.createElement("label");
  const songInput = document.createElement("input");
  const songDeleteButton = document.createElement("button");

  const index = songContainer.children.length + 1;
  songLabel.setAttribute("for", `song-${index}`);
  songLabel.innerText = `#-${index}`;
  songInput.classList.add("song-input");
  songInput.setAttribute("id", `song-${index}`);
  songInput.setAttribute("type", "select");
  songInput.setAttribute("list", "song-dataList");
  songInput.required = true;
  songDeleteButton.classList.add("fa", "fa-minus");

  songItem.appendChild(songLabel);
  songItem.appendChild(songInput);
  songItem.appendChild(songDeleteButton);
  songContainer.appendChild(songItem);

  // TODO -stpham ok : gérér l'événement "click" qui retire l'élément <div> généré de son parent
  songDeleteButton.addEventListener("click", () => {
    songContainer.removeChild(songItem);
  });
}

/**
 * TODO -stpham ok
 * Génère un objet Playlist avec les informations du formulaire et le sauvegarde dans le LocalStorage
 * @param {HTMLFormElement} form élément <form> à traiter pour obtenir les données
 * @param {StorageManager} storageManager permet la sauvegarde dans LocalStorage
 */
async function createPlaylist (form, storageManager) {
  // TODO -stpham ok: récupérer les informations du formulaire
  // Voir la propriété "elements" https://developer.mozilla.org/en-US/docs/Web/API/HTMLFormElement/elements
  const elements = form.elements;
  const playListSongs = [];
  const songs = document.getElementById("song-list").childElementCount;
  for (let i = 1; i <= songs; i++) {
    playListSongs.push({
      id: storageManager.getIdFromName(
        storageManager.STORAGE_KEY_SONGS,
        elements[`song-${i}`].value
      ),
    });
  }
  const playlistImage = await getImageInput(elements["image"])

  const newPlaylist = {
    id: generateRandomID(),
    name: elements["name"].value,
    description: elements["description"].value,
    thumbnail: playlistImage,
    songs: playListSongs
  };

  // TODO -stpham ok: créer un nouveau objet playlist et le sauvegarder dans LocalStorage
  storageManager.addItem(storageManager.STORAGE_KEY_PLAYLISTS, newPlaylist);
}

/**
 * Fonction qui permet d'extraire une image à partir d'un file input
 * @param {HTMLInputElement} input champ de saisie pour l'image
 * @returns image récupérée de la saisie
 */
async function getImageInput (input) {
  if (input && input.files && input.files[0]) {
    const image = await new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = (e) => resolve(reader.result);
      reader.readAsDataURL(input.files[0]);
    });
    return image;
  }
}

window.onload = () => {
  // TODO -stpham ok: récupérer les éléments du DOM
  const imageInput = document.getElementById("image");
  const form = document.getElementById("playlist-form");
  const addSongButton = document.getElementById("add-song-btn");
  const dataList = document.getElementById("song-dataList");

  const storageManager = new StorageManager();
  storageManager.loadAllData();
  const songs = storageManager.getData(storageManager.STORAGE_KEY_SONGS);

  // TODO -stpham ok: construire l'objet dataList
  buildDataList(dataList, songs);
  imageInput.addEventListener("change", updateImageDisplay);
  addSongButton.addEventListener("click", addItemSelect);
  // TODO stpham ok: gérer l'événement "submit" du formulaire
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    createPlaylist(form, storageManager);
    location.href = "index.html";
  });
};
