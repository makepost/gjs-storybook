#!/bin/bash

modules="$(pwd)/node_modules"

if test -e node_modules/gunit; then
  gunit=node_modules/gunit
else
  gunit=node_modules/gjs-storybook/node_modules/gunit
fi

"$gunit"/bin/repl.js "$modules"/gjs-storybook/src/app.js
