/**
 * Created by epotignano on 8/4/16.
 */
var context = require.context('./src', true, /-test\.jsx?$/);
context.keys().forEach(context);
