"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Gender = void 0;
var Gender;
(function (Gender) {
    Gender["Male"] = "male";
    Gender["Female"] = "female";
    Gender["Other"] = "other";
})(Gender = exports.Gender || (exports.Gender = {}));
var HealthCheckRating;
(function (HealthCheckRating) {
    HealthCheckRating[HealthCheckRating["Healthy"] = 1] = "Healthy";
    HealthCheckRating[HealthCheckRating["LowRisk"] = 2] = "LowRisk";
    HealthCheckRating[HealthCheckRating["HighRisk"] = 3] = "HighRisk";
    HealthCheckRating[HealthCheckRating["CriticalRisk"] = 4] = "CriticalRisk";
})(HealthCheckRating || (HealthCheckRating = {}));
