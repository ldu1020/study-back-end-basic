"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var helmet_1 = __importDefault(require("helmet"));
var morgan_1 = __importDefault(require("morgan"));
var tweets_1 = __importDefault(require("./router/tweets"));
var app = express_1.default();
app.use(express_1.default.json());
app.use(helmet_1.default());
app.use(morgan_1.default("tiny"));
app.use("/tweets", tweets_1.default);
app.use(function (req, res, next) {
    res.sendStatus(404);
});
app.use(function (error, req, res, next) {
    console.error(error);
    res.sendStatus(500);
});
app.listen(8080);
//# sourceMappingURL=app.js.map