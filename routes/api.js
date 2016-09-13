var express = require('express');
var router = express.Router();
var API = require("./../bin/aerohive/api/main");

var devAccount = require("./../bin/aerohive/config").aerohive;
/* GET users listing. */



/**
 * CONFIGURATION
 */
router.get("/configuration/locations", function (req, res, next) {
    API.configuration.locations.locations(req.session.xapi, devAccount, function (err, result) {
        if (err) res.status(err.status).send(err);
        else res.json(result);
    })
})
router.get("/configuration/ssids", function (req, res, next) {
    API.configuration.ssids.GET(req.session.xapi, devAccount, function (err, result) {
        if (err) res.status(err.status).send(err);
        else res.json(result);
    })
})

/**
 * IDENTITY
 */
router.get("/identity/credentials", function (req, res, next) {
    API.identity.credentials.getCredentials(req.session.xapi, devAccount, null, null, null, null, null, null, null, null, null, null, null, null, function (err, result) {
        if (err) res.status(err.status).send(err);
        else res.json(result);
    })
})
router.get("/identity/userGroups", function (req, res, next) {
    API.identity.userGroups.getUserGroups(req.session.xapi, devAccount, null, null, function (err, result) {
        if (err) res.status(err.status).send(err);
        else res.json(result);
    })
})

/**
 * LOCATION
 */
router.get("/location/clients", function (req, res, next) {
    API.configuration.ssid.GET(req.session.xapi, devAccount, function (err, result) {
        if (err) res.status(err.status).send(err);
        else res.json(result);
    })
})

/**
 * MONITOR
 */
router.get("/monitor/clients", function (req, res, next) {
    API.monitor.clients.list(req.session.xapi, devAccount, function (err, result) {
        if (err) res.status(err.status).send(err);
        else res.json(result);
    })
})
router.get("/monitor/devices", function (req, res, next) {
    API.monitor.devices.list(req.session.xapi, devAccount, function (err, result) {
        if (err) res.status(err.status).send(err);
        else res.json(result);
    })
})

/**
 * PRESENCE
 */
router.get("/presence/clientcount", function (req, res, next) {
    if (req.query.locationId) {
        var locationId = req.query.locationId;
        var endTime = new Date().toISOString();
        var startTime = new Date(new Date().setDate(new Date().getDate() - 7)).toISOString();
        API.clientlocation.clientcount(req.session.xapi, devAccount, locationId, startTime, endTime, function (err, result) {
            if (err) res.status(err.status).send(err);
            else res.json(result);
        })
    } else res.status(401).send("Error: no locationId");
})
router.get("/presence/clientpresence", function (req, res, next) {
    if (req.query.locationId) {
        var locationId = req.query.locationId;
        var endTime = new Date().toISOString();
        var startTime = new Date(new Date().setDate(new Date().getDate() - 7)).toISOString();
        var timeUnit = "OneHour";
        API.clientlocation.clientpresence(req.session.xapi, devAccount, locationId, startTime, endTime, timeUnit, function (err, result) {
            if (err) res.status(err.status).send(err);
            else res.json(result);
        })
    } else res.status(401).send("Error: no locationId");
})
router.get("/presence/clienttimeseries", function (req, res, next) {
    if (req.query.locationId) {
        var locationId = req.query.locationId;
        var endTime = new Date().toISOString();
        var startTime = new Date(new Date().setDate(new Date().getDate() - 7)).toISOString();
        var timeUnit = "OneHour";
        API.clientlocation.clienttimeseries(req.session.xapi, devAccount, locationId, startTime, endTime, timeUnit, function (err, result) {
            if (err) res.status(err.status).send(err);
            else res.json(result);
        })
    } else res.status(401).send("Error: no locationId");
})

module.exports = router;
