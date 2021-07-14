import React from 'react';
import { VERSION } from '@twilio/flex-ui';
import { FlexPlugin } from 'flex-plugin';

import reducers, { namespace } from './states';

const PLUGIN_NAME = 'ChatMessagesQueryPlugin';

export default class ChatMessagesQueryPlugin extends FlexPlugin {
  constructor() {
    super(PLUGIN_NAME);
  }

  /**
   * This code is run when your plugin is being started
   * Use this to modify any UI components or attach to the actions framework
   *
   * @param flex { typeof import('@twilio/flex-ui') }
   * @param manager { import('@twilio/flex-ui').Manager }
   */
  init(flex, manager) {
    this.registerReducers(manager);

    manager.workerClient.on('reservationCreated', (reservation) => {
      const channelSid = reservation.task.attributes.channelSid;
      console.log("***Chat Channel***", channelSid)
      const trueReservation = reservation.addListener
        ? reservation
        : reservation.source;
      trueReservation.addListener('wrapup', (payload) => {
        // Replace with function's URL
        fetch('https://functionURL?channelsid=' + channelSid)
          .then(res => res.json())
          .then(json = console.log("!!! Conversation JSON:", json)
          )
      })
    })
  }

  /**
   * Registers the plugin reducers
   *
   * @param manager { Flex.Manager }
   */
  registerReducers(manager) {
    if (!manager.store.addReducer) {
      // eslint: disable-next-line
      console.error(`You need FlexUI > 1.9.0 to use built-in redux; you are currently on ${VERSION}`);
      return;
    }

    manager.store.addReducer(namespace, reducers);
  }
}
