#!/usr/bin/env node

const Fuse = require('fuse.js')
const fs = require('fs')
const path = require('path');
const os = require('os');

let sites = path.resolve(os.homedir(), 'sites')

let overrides = {
  
}

function goto(folder) {
    process.stdout.write(path.resolve(sites, folder))
    process.exit(0)
}

let directories = fs.readdirSync(sites).map(x => {
    return {
        directory: x
    }
})

let fuseOpts = {
    shouldSort: true,
    threshold: 0.6,
    location: 0,
    distance: 100,
    maxPatternLength: 32,
    minMatchCharLength: 1,
    includeScore: true,
    keys: [
        "directory"
    ]
}

let fuse = new Fuse(directories, fuseOpts)

let argument = process.argv.slice(2).join(' ')

if(argument.length == 0) {
    console.error('you must provide a site name')
    process.exit(1)
}

if(overrides[argument]) {
    goto(overrides[argument])
}

let searchResults = fuse.search(argument)

if(searchResults.length) {
    goto(searchResults[0].item.directory)
} else {
    console.error('no matching sites found')
}