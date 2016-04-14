#!/usr/bin/env node
'use strict';

const filenamify = require('filenamify');
const fs = require('fs');
const ipics = require('ipics');
const meow = require('meow');
const opn = require('opn');


const cli = meow(`
  Usage
  $ ipics <searchTerm>

  Options
    -t, --type  Type of item to search for
    (can be one of 'album', 'book', 'ios-app', 'mac-app', 'movie' or 'tv-show')

  Examples
    ipics OU812 -t album
    ipics "Twin Peaks" -t tv-show
  `, {
    alias: {
        't': 'type'
    }
});

if(cli.input.length === 0) {
  cli.showHelp();
}

ipics(cli.input[0], cli.flags.type).then(results => {
  let html = '';
  results.forEach(result => {
    html += `<a href="${result.imageUrl}" title="${result.name}"><img src="${result.thumbnailUrl}"></a>`;
  });
  const outputFilename = `${filenamify(cli.input[0])}.html`;
  fs.writeFileSync(outputFilename, html);
  opn(outputFilename, {wait: false}); // open in default browser
});
