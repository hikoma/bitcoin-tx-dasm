var express = require('express');
var router = express.Router();

var _ = require('lodash-node');
var bitcoin = require('bitcoinjs-lib');

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', {script: '76A91489ABCDEFABBAABBAABBAABBAABBAABBAABBAABBA88AC', chunks: []});
});

/* POST home page. */
router.post('/', function (req, res, next) {
    var hexScript = req.body.script.replace(/\s/g, '');
    var script = bitcoin.Script.fromHex(hexScript);
    var chunks = script.chunks.map(function (chunk) {
        if (Buffer.isBuffer(chunk)) {
            return {word: '<data>', opcode: chunk.toString('hex')};
        } else {
            var word = _.findKey(bitcoin.opcodes, function (value) {
                return value == chunk;
            });
            return {word: word, opcode: chunk.toString(16)};
        }
    });

    res.render('index', {script: hexScript, chunks: chunks});
});

module.exports = router;
