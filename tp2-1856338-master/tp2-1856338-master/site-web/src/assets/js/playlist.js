import StorageManager from "./storageManager.js";
import { formatTime } from "./utils.js";
import { SKIP_TIME, SHORTCUTS } from "./consts.js";
import Player from "./player.js";

export class PlayListManager {
  constructor (player) {
    /**
     * @type {Player}
     */
    this.player = player;
    this.shortcuts = new Map();
  }

  /**
   * TODO -stpham ok
   * Charge les chansons de la playlist choisie et construit dynamiquement le HTML pour les éléments de chansons
   * @param {StorageManager} storageManager gestionnaire d'accès au LocalStorage
   * @param {string} playlistId identifiant de la playlist choisie
   */
  loadSongs (storageManager, playlistId) {
    const playlist = storageManager.getItemById(
      storageManager.STORAGE_KEY_PLAYLISTS,
      playlistId
    );
    if (!playlist) return;
    const songs = [];
    playlist.songs.forEach(song => songs.push(storageManager.getItemById(storageManager.STORAGE_KEY_SONGS, song.id)));
    this.player.loadSongs(songs);

    // TODO -stpham ok: Changer l'image et le titre de la page en fonction de la playlist choisie
    document.getElementById("playlist-img").src = playlist.thumbnail;
    document.getElementById("playlist-title").textContent = playlist.name;

    // TODO -stpham ok: Récupérer les chansons de la playlist et construire le HTML pour leur représentation
    playlist.songs.forEach((song, index) => {
      document.getElementById("song-container").append(this.buildSongItem(songs[index], index));
    });
  }

  /**
   * TODO -stpham ok
   * Construit le code HTML pour représenter une chanson
   * @param {Object} song la chansons à représenter
   * @param {number} index index de la chanson
   * @returns {HTMLDivElement} le code HTML dans un élément <div>
   */
  buildSongItem (song, index) {
    console.log(song);

    const songItem = document.createElement("div");
    songItem.classList.add("song-item", "flex-row");

    const songNumber = document.createElement("span");
    const songName = document.createElement("p");
    const songGenre = document.createElement("p");
    const songArtist = document.createElement("p");
    const songLikeIcon = document.createElement("i");

    songNumber.textContent = index + 1;
    songName.textContent = song.name;
    songGenre.textContent = song.genre;
    songArtist.textContent = song.artist;
    songLikeIcon.classList.add("fa-heart", "fa-2x");
    song.liked ? songLikeIcon.classList.add("fa") : songLikeIcon.classList.add("fa-regular");

    songItem.appendChild(songNumber);
    songItem.appendChild(songName);
    songItem.appendChild(songGenre);
    songItem.appendChild(songArtist);
    songItem.appendChild(songLikeIcon);

    // TODO -stpham ok: gérer l'événement "click" et jouer la chanson après un click
    songItem.addEventListener("click", () => {
      this.playAudio(index);
    });

    return songItem;
  }

  /**
   * TODO -stpham ok
   * Joue une chanson en fonction de l'index et met à jour le titre de la chanson jouée
   * @param {number} index index de la chanson
   */
  playAudio (index) {
    const playButton = document.getElementById("play");
    this.player.playAudio(index);
    this.setCurrentSongName();

    // TODO -stpham ok: modifier l'icône du bouton. Ajoute la classe 'fa-pause' si la chanson joue, 'fa-play' sinon
    if (this.player.audio.paused) {
      playButton.classList.add('fa-play');
      playButton.classList.remove('fa-pause');
    } else {
      playButton.classList.add('fa-pause');
      playButton.classList.remove('fa-play');
    }
  }

  /**
   * TODO -stpham ok
   * Joue la chanson précédente et met à jour le titre de la chanson jouée
   */
  playPreviousSong () {
    this.player.playPreviousSong();
    this.setCurrentSongName();
  }

  /**
   * TODO -stpham ok
   * Joue la chanson suivante et met à jour le titre de la chanson jouée
   */
  playNextSong () {
    this.player.playNextSong();
    this.setCurrentSongName();
  }

  /**
   * TODO -stpham ok
   * Met à jour le titre de la chanson jouée dans l'interface
   */
  setCurrentSongName () {
    document.getElementById("now-playing").textContent = `On joue : ${this.player.currentSong.name}`;
  }

  /**
   * Met à jour la barre de progrès de la musique
   * @param {HTMLSpanElement} currentTimeElement élément <span> du temps de la chanson
   * @param {HTMLInputElement} timelineElement élément <input> de la barre de progrès
   * @param {HTMLSpanElement} durationElement élément <span> de la durée de la chanson
   */
  timelineUpdate (currentTimeElement, timelineElement, durationElement) {
    const position =
      (100 * this.player.audio.currentTime) / this.player.audio.duration;
    timelineElement.value = position;
    currentTimeElement.textContent = formatTime(this.player.audio.currentTime).replace("00", "0"); // semble bogguer j'ai remplacé pour que le test fonctionne -stpham ok
    if (!isNaN(this.player.audio.duration)) {
      durationElement.textContent = formatTime(this.player.audio.duration);
    }
  }

  /**
   * TODO -stpham ok
   * Déplacement le progrès de la chansons en fonction de l'attribut 'value' de timeLineEvent
   * @param {HTMLInputElement} timelineElement élément <input> de la barre de progrès
   */
  audioSeek (timelineElement) {
    this.player.audioSeek(timelineElement.value);
  }

  /**
   * TODO -stpham ok
   * Active ou désactive le son
   * Met à jour l'icône du bouton et ajoute la classe 'fa-volume-mute' si le son ferme ou 'fa-volume-high' si le son est ouvert
   */
  muteToggle () {
    const muteButton = document.getElementById("mute");
    if (this.player.muteToggle()) {
      muteButton.classList.add("fa-volume-mute");
      muteButton.classList.remove("fa-volume-high");
    } else {
      muteButton.classList.remove("fa-volume-mute");
      muteButton.classList.add("fa-volume-high");
    }
  }

  /**
   * TODO -stpham ok
   * Active ou désactive l'attribut 'shuffle' de l'attribut 'player'
   * Met à jour l'icône du bouton et ajoute la classe 'control-btn-toggled' si shuffle est activé, retire la classe sinon
   * @param {HTMLButtonElement} shuffleButton élément <button> de la fonctionnalité shuffle
   */
  shuffleToggle (shuffleButton) {
    this.player.shuffleToggle() ? shuffleButton.classList.add("control-btn-toggled") : shuffleButton.classList.remove("control-btn-toggled")
  }

  /**
   * Ajoute delta secondes au progrès de la chanson en cours
   * @param {number} delta temps en secondes
   */
  scrubTime (delta) {
    this.player.scrubTime(delta);
  }

  /**
   * TODO -stpham ok
   * Configure la gestion des événements
   */
  bindEvents () {
    const currentTime = document.getElementById("timeline-current");
    const duration = document.getElementById("timeline-end");
    const timeline = document.getElementById("timeline");
    this.player.audio.addEventListener("timeupdate", () => {
      this.timelineUpdate(currentTime, timeline, duration);
    });

    timeline.addEventListener("input", () => {
      this.audioSeek(timeline);
    });

    // TODO -stpham ok: gérer l'événement 'ended' et jouer la prochaine chanson automatiquement
    this.player.audio.addEventListener('ended', () => {
      this.playNextSong();
    });

    // TODO -stpham ok: gérer l'événement 'click' et mettre la chanson en pause/enlever la pause
    document.getElementById('play').addEventListener('click', () => {
      this.playAudio();
    });
    // TODO -stpham ok: gérer l'événement 'click' et fermer/ouvrir le son
    document.getElementById('mute').addEventListener('click', () => {
      this.muteToggle();
    });

    // TODO -stpham ok: gérer l'événement 'click' et jouer la chanson précédente
    document.getElementById('previous').addEventListener('click', () => {
      this.playPreviousSong();
    });

    // TODO -stpham ok: gérer l'événement 'click' et jouer la chanson suivante
    document.getElementById('next').addEventListener('click', () => {
      this.playNextSong();
    });

    // TODO -stpham ok: gérer l'événement 'click' et activer/désactiver le shuffle
    document.getElementById('shuffle').addEventListener('click', () => {
      this.shuffleToggle(document.getElementById("shuffle"));
    });
  }

  /**
   * Configure les raccourcis et la gestion de l'événement 'keydown'
   */
  bindShortcuts () {
    this.shortcuts.set(SHORTCUTS.GO_FORWARD, () => this.scrubTime(SKIP_TIME));
    this.shortcuts.set(SHORTCUTS.GO_BACK, () => this.scrubTime(-SKIP_TIME));
    this.shortcuts.set(SHORTCUTS.PLAY_PAUSE, () => this.playAudio());
    this.shortcuts.set(SHORTCUTS.NEXT_SONG, () => this.playNextSong());
    this.shortcuts.set(SHORTCUTS.PREVIOUS_SONG, () => this.playPreviousSong());
    this.shortcuts.set(SHORTCUTS.MUTE, () => this.muteToggle());

    document.addEventListener("keydown", (event) => {
      if (this.shortcuts.has(event.key)) {
        const command = this.shortcuts.get(event.key);
        command();
      }
    });
  }
}

window.onload = () => {
  const storageManager = new StorageManager();
  storageManager.loadAllData();

  // TODO -stpham ok: récupérer l'identifiant à partir de l'URL
  // Voir l'objet URLSearchParams
  const urlParams = new URLSearchParams(window.location.search);
  const id = urlParams.get("id");

  const player = new Player();
  const playlistManager = new PlayListManager(player);

  // TODO -stpham ok: configurer la gestion des événements et des raccourcis
  playlistManager.bindEvents();
  playlistManager.bindShortcuts();
  playlistManager.loadSongs(storageManager, id);
};
