import logger from "../logger.js";
import ui from "../ui";
import player from "../player";

function observeVideo(store, id) {
  let updates;
  store.subscribe(() => {
    const state = store.getState();
    if (state.ui.videos && state.ui.videos[id] && state.ui.videos[id].updates !== updates) {
      logger.log(`Update video ${id}`);
      const localDispatch = (action) => {
        action = Object.assign({}, action, {
          payload: {
            ...action.payload,
            id      
          }
        });
        store.dispatch(action);
      };
      ui.components.update(state.ui.videos[id], localDispatch);
      updates = state.ui.videos[id].updates;
    }
  });
}

const uiMiddleware = (store) => (next) => (action) => {
  switch (action.type) {
    case player.constants.SETUP_NEW_PLAYER:
    observeVideo(store, action.payload.id);
    break;

    default:
    break;
  }
  next(action);
};

export default uiMiddleware;
