import logger from "../logger.js";
import player from "../player";

function getDuration(metadata, numberOfAds) {
  let sum = 0;
  metadata.adBreak._currentSession.insertionPoints.forEach((ad, index) => {
    if (index < numberOfAds) {
      sum += ad.slots[0].ads[0].creatives[0].duration;
    }
  });
  return Math.floor(sum);
}

function ooyalaEvents(store, adPlayer) {

  adPlayer.addEventListener(window.OO.Pulse.AdPlayer.Events.AD_AUTOPLAY_BLOCKED, (event, metadata) => {
    //logger.log("ooyalaEvent", "AD_AUTOPLAY_BLOCKED", event, metadata);
  });
  adPlayer.addEventListener(window.OO.Pulse.AdPlayer.Events.AD_BREAK_FINISHED, (event, metadata) => {
    //logger.log("ooyalaEvent", "AD_BREAK_FINISHED", event, metadata);
    store.dispatch({
      type: player.constants.AD_BREAK_FINISHED,
      payload: {
        type: metadata.adBreak._adBreakType
      }
    });
  });
  adPlayer.addEventListener(window.OO.Pulse.AdPlayer.Events.AD_BREAK_STARTED, (event, metadata) => {
    //logger.log("ooyalaEvent", "AD_BREAK_STARTED", event, metadata);
    store.dispatch({
      type: player.constants.AD_BREAK_STARTED,
      payload: {
        total: metadata.adBreak._playableAdsTotal,
        type: metadata.adBreak._adBreakType,
        duration: getDuration(metadata, metadata.adBreak._playableAdsTotal) // concept
      }
    });
  });
  adPlayer.addEventListener(window.OO.Pulse.AdPlayer.Events.AD_CLICKED, (event, metadata) => {
    //logger.log("ooyalaEvent", "AD_CLICKED", event, metadata);
  });
  adPlayer.addEventListener(window.OO.Pulse.AdPlayer.Events.AD_CLICKTHROUGH, (event, metadata) => {
    //logger.log("ooyalaEvent", "AD_CLICKTHROUGH", event, metadata);
  });
  adPlayer.addEventListener(window.OO.Pulse.AdPlayer.Events.AD_SESSION_FINISHED, (event, metadata) => {
    logger.log("ooyalaEvent", "AD_SESSION_FINISHED", event, metadata);

    store.dispatch({
      type: player.constants.AD_SESSION_FINISHED,
      payload: {}
    });
  });
  adPlayer.addEventListener(window.OO.Pulse.AdPlayer.Events.AD_VOLUME_CHANGED, (event, metadata) => {
    //logger.log("ooyalaEvent", "AD_VOLUME_CHANGED", event, metadata);
  });
  adPlayer.addEventListener(window.OO.Pulse.AdPlayer.Events.FLASH_AD_BLOCKED, (event, metadata) => {
    //logger.log("ooyalaEvent", "FLASH_AD_BLOCKED", event, metadata);
  });
  adPlayer.addEventListener(window.OO.Pulse.AdPlayer.Events.LINEAR_AD_ERROR, (event, metadata) => {
    logger.log("ooyalaEvent", "LINEAR_AD_ERROR", event, metadata);
  });
  adPlayer.addEventListener(window.OO.Pulse.AdPlayer.Events.LINEAR_AD_FINISHED, (event, metadata) => {
    logger.log("ooyalaEvent", "LINEAR_AD_FINISHED", event, metadata);
    store.dispatch({
      type: player.constants.AD_FINISHED,
      payload: {}
    });
  });
  adPlayer.addEventListener(window.OO.Pulse.AdPlayer.Events.LINEAR_AD_FIRST_QUARTILE, (event, metadata) => {
    //logger.log("ooyalaEvent", "LINEAR_AD_FIRST_QUARTILE", event, metadata);
  });
  adPlayer.addEventListener(window.OO.Pulse.AdPlayer.Events.LINEAR_AD_IMPRESSION, (event, metadata) => {
    logger.log("ooyalaEvent", "LINEAR_AD_IMPRESSION", event, metadata);
  });
  adPlayer.addEventListener(window.OO.Pulse.AdPlayer.Events.LINEAR_AD_MIDPOINT, (event, metadata) => {
    //logger.log("ooyalaEvent", "LINEAR_AD_MIDPOINT", event, metadata);
  });
  adPlayer.addEventListener(window.OO.Pulse.AdPlayer.Events.LINEAR_AD_PAUSED, (event, metadata) => {
    //logger.log("ooyalaEvent", "LINEAR_AD_PAUSED", event, metadata);
  });
  adPlayer.addEventListener(window.OO.Pulse.AdPlayer.Events.LINEAR_AD_PLAYING, (event, metadata) => {
    //logger.log("ooyalaEvent", "LINEAR_AD_PLAYING", event, metadata);
  });
  adPlayer.addEventListener(window.OO.Pulse.AdPlayer.Events.LINEAR_AD_PROGRESS, (event, metadata) => {
    store.dispatch({
      type: player.constants.AD_TIMEUPDATE,
      payload: {
        currentTime: Math.floor(metadata.position)
      }
    });
    //logger.log("ooyalaEvent", "LINEAR_AD_PROGRESS", event, metadata);
  });
  adPlayer.addEventListener(window.OO.Pulse.AdPlayer.Events.LINEAR_AD_SKIPPED, (event, metadata) => {
    //logger.log("ooyalaEvent", "LINEAR_AD_SKIPPED", event, metadata);
  });
  adPlayer.addEventListener(window.OO.Pulse.AdPlayer.Events.LINEAR_AD_STARTED, (event, metadata) => {
    logger.log("ooyalaEvent", "LINEAR_AD_STARTED", event, metadata);
  });
  adPlayer.addEventListener(window.OO.Pulse.AdPlayer.Events.LINEAR_AD_THIRD_QUARTILE, (event, metadata) => {
    //logger.log("ooyalaEvent", "LINEAR_AD_THIRD_QUARTILE", event, metadata);
  });
  adPlayer.addEventListener(window.OO.Pulse.AdPlayer.Events.OVERLAY_AD_CLICKED, (event, metadata) => {
    //logger.log("ooyalaEvent", "OVERLAY_AD_CLICKED", event, metadata);
  });
  adPlayer.addEventListener(window.OO.Pulse.AdPlayer.Events.OVERLAY_AD_CLOSED, (event, metadata) => {
    //logger.log("ooyalaEvent", "OVERLAY_AD_CLOSED", event, metadata);
  });
  adPlayer.addEventListener(window.OO.Pulse.AdPlayer.Events.OVERLAY_AD_COLLAPSED, (event, metadata) => {
    //logger.log("ooyalaEvent", "OVERLAY_AD_COLLAPSED", event, metadata);
  });
  adPlayer.addEventListener(window.OO.Pulse.AdPlayer.Events.OVERLAY_AD_ERROR, (event, metadata) => {
    //logger.log("ooyalaEvent", "OVERLAY_AD_ERROR", event, metadata);
  });
  adPlayer.addEventListener(window.OO.Pulse.AdPlayer.Events.OVERLAY_AD_SHOWN, (event, metadata) => {
    //logger.log("ooyalaEvent", "OVERLAY_AD_SHOWN", event, metadata);
  });
  adPlayer.addEventListener(window.OO.Pulse.AdPlayer.Events.PAUSE_AD_CLOSED, (event, metadata) => {
    //logger.log("ooyalaEvent", "PAUSE_AD_CLOSED", event, metadata);
  });
  adPlayer.addEventListener(window.OO.Pulse.AdPlayer.Events.PAUSE_AD_PLAYER_HIDDEN, (event, metadata) => {
    //logger.log("ooyalaEvent", "PAUSE_AD_PLAYER_HIDDEN", event, metadata);
    store.dispatch({
      type: player.constants.AD_HIDE_PAUSE_AD,
      payload: {}
    });
  });
  adPlayer.addEventListener(window.OO.Pulse.AdPlayer.Events.PAUSE_AD_SHOWN, (event, metadata) => {
    logger.log("ooyalaEvent", "PAUSE_AD_SHOWN", event, metadata);
    store.dispatch({
      type: player.constants.AD_SHOW_PAUSE_AD,
      payload: {}
    });
  });
  adPlayer.addEventListener(window.OO.Pulse.AdPlayer.Events.SESSION_STARTED, (event, metadata) => {
    //logger.log("ooyalaEvent", "SESSION_STARTED", event, metadata);
  });
  adPlayer.addEventListener(window.OO.Pulse.AdPlayer.Events.SHOW_SKIP_BUTTON, (event, metadata) => {
    //logger.log("ooyalaEvent", "SHOW_SKIP_BUTTON", event, metadata);
  });
  return {
    startContentPlayback: () => {
      store.dispatch(player.actions.contentPlay());
      logger.log("Starting the content playback");
    },
    pauseContentPlayback: () => {
      store.dispatch(player.actions.contentPause());
      logger.log("Pausing the content playback and hide our player");
    },
    illegalOperationOccurred: (message) => {
      logger.warn(`Illegal operation: ${message}`);
    },
    sessionEnded: () => {
      logger.log("Session ended!");
    },
    openClickThrough: (url) => {
      store.dispatch({
        type: "ADD_CLICK_THROUGH",
        payload: {
          url
        }
      });
      window.open(url);
      //Tell the SDK the clickthrough URL was opened, so the associated VAST event can be tracked
      //adPlayer.adClickThroughOpened();
    }
  };
}

export default ooyalaEvents;
