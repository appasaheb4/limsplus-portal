"use strict"
//main module that exports all other sub modules

exports.parseString = require("./parser.js").parseString
exports.serializeJSON = require("./serializer.js").serializeJSON
exports.translate = require("./translate.js").translate
