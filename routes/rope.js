var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
    res.render('led', { title: 'LED Control' });
});

router.get('/:switch', function(req, res, next) {
    var onoff = req.params.switch;
    if (onoff == 'on') setLED(1);
    if (onoff == 'off') setLED(0);
    res.render('rope', { title: 'LED Control : ' + req.params.switch });
});

module.exports = router;

// LED 제어 function
function setLED(flag) {
    var fs = require('fs');
    fs.open('/dev/ttyUSB0','a', 666, function(e, fd) {
        fs.write(fd, flag ? '1' : '0', null, null, null, function() {
            fs.close(fd, function() { });
        });
    });
}