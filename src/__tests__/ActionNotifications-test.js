/**
 * Created by epotignano on 9/4/16.
 */

'use strict';
import React from 'react';
import TestUtils from 'react-addons-test-utils';
import ActionNotifications from '../components/ActionNotifications';

describe("ActionNotifications", function(){
    it("loads without error", function(){
      var actionNotifications = TestUtils.renderIntoDocument(
        <ActionNotifications/>
      );
      expect(ActionNotifications).toExist();
    })
});

