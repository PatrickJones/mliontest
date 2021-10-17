"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const express_fileupload_1 = __importDefault(require("express-fileupload"));
const env_var_1 = __importDefault(require("env-var"));
const config_json_1 = __importDefault(require("./config.json"));
const ResponseModel_1 = __importDefault(require("./ResponseModel"));
const port = config_json_1.default.appPort;
const userName = env_var_1.default.get('USERNAME').asString();
const app = (0, express_1.default)();
app.use(express_1.default.urlencoded({ extended: false })); //needs to be false for file uploads
app.use(express_1.default.json());
app.use((0, express_fileupload_1.default)());
app.all('*', (req, res, next) => {
    let apiVersion = req.header('x-api-version');
    if (apiVersion === undefined) {
        res.status(400).send("Missing 'x-api-version' header");
    }
    next();
});
app.get('/inputX/:x/inputY/:y', (req, res, next) => {
    let add = new ResponseModel_1.default(+req.params.x, +req.params.y);
    res.send(add.result().toString());
});
app.post('/postdata', (reqBody, resBody, next) => {
    let body = reqBody.body;
    console.log(body);
    resBody.send(body);
});
app.post("/postfiles", (req, res, next) => {
    let uploadedFile;
    let uploadPath;
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).send('No files were upload');
    }
    uploadedFile = req.files.testfile; // name must match key in request
    console.log(uploadedFile);
    uploadPath = path_1.default.resolve(__dirname, '..') + "\\fileuploads";
    console.log(uploadPath);
    //res.send('File uploaded.')
    uploadedFile.mv(uploadPath, (err) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.send('File uploaded.');
    });
});
app.put('/updatedata', (reqBody, resBody, next) => {
    let body = reqBody.body;
    console.log(body);
    resBody.send(body);
});
app.delete('/deletedata/:d', (req, res, next) => {
    let delKey = +req.params.d;
    console.log(`Deleting ${delKey}`);
    let resValue = (delKey - 1);
    res.send({ "Deleted": resValue });
});
app.listen(port, () => console.log(`${config_json_1.default.appName} Server running on ${port}`));
//# sourceMappingURL=app.js.map