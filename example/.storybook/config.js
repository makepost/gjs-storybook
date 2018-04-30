'use strict';

const { configure } = require('gjs-storybook');

configure(() => {
  // Should I add require.context to Gunit instead of LAST_DIRNAME_WHITELIST?

  const context = (relativePath) => require(`../src/${relativePath}`);

  context.id = __filename;
  context.keys = () => ["./index.story.js"];

  return context;
}, module);
