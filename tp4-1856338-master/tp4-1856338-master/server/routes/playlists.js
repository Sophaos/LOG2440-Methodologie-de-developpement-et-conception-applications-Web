const { HTTP_STATUS } = require("../utils/http");
const router = require("express").Router();
const { PlaylistManager } = require("../managers/playlist_manager");

const playlistManager = new PlaylistManager();

/**
 * Retourne la liste de toutes les chansons
 * @memberof module:routes/playlists
 * @name GET /playlists
 */
router.get("/", async (request, response) => {
  try {
    const playlists = await playlistManager.getAllPlaylists();
    response.status(HTTP_STATUS.SUCCESS).json(playlists);
  } catch (error) {
    response.status(HTTP_STATUS.SERVER_ERROR).json(error);
  }
});

/**
 * TODO -stpham : retourne un playlist en fonction de son id
 * Retourne playlist en fonction de son id
 * @memberof module:routes/playlists
 * @name GET /playlists/:id
 */
router.get("/:id", async (request, response) => {
  try {
    const playlist = await playlistManager.getPlaylistById(request.params.id);
    const status = playlist ? HTTP_STATUS.SUCCESS : HTTP_STATUS.NOT_FOUND;
    response.status(status).json(playlist || {});
  } catch (error) {
    response.status(HTTP_STATUS.SERVER_ERROR).json(error);
  }
});

/**
 * Ajoute une playlist
 * @memberof module:routes/playlists
 * @name POST /playlists
 */
router.post("/", async (request, response) => {
  try {
    if (!Object.keys(request.body).length) {
      response.status(HTTP_STATUS.BAD_REQUEST).send();
      return;
    }
    const playlist = await playlistManager.addPlaylist(request.body);
    response.status(HTTP_STATUS.CREATED).json(playlist);
  } catch (error) {
    response.status(HTTP_STATUS.SERVER_ERROR).json(error);
  }
});

/**
 * TODO -stpham: implémenter la modification d'une playlist
 * Mets à jour l'information d'une playlist en fonction de son id
 * @memberof module:routes/playlists
 * @name PUT /playlists/:id
 */
router.put("/:id", async (request, response) => {
  try {
    if (Object.keys(request.body).length) {
      await playlistManager.updatePlaylist(request.body);
      response.status(HTTP_STATUS.SUCCESS).send({ id: request.params.id });
    } else {
      response.status(HTTP_STATUS.BAD_REQUEST).send();
    }
  } catch (error) {
    response.status(HTTP_STATUS.SERVER_ERROR).json(error);
  }
});

/**
 * TODO -stpham: implémenter la suppression de la playlist
 * Supprime une playlist en fonction de son id
 * @memberof module:routes/playlists
 * @name DELETE /playlists/:id
 */
router.delete("/:id", async (request, response) => {
  try {
    const deleted = await playlistManager.deletePlaylist(request.params.id);
    response.status(deleted ? HTTP_STATUS.SUCCESS : HTTP_STATUS.NOT_FOUND).send();
  } catch (error) {
    response.status(HTTP_STATUS.SERVER_ERROR).json(error);
  }
});

module.exports = { router, playlistManager };
