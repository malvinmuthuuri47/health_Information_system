"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const env_1 = __importDefault(require("./config/env"));
const doctorRoutes_1 = __importDefault(require("./routes/doctorRoutes"));
const app = (0, express_1.default)();
const db_conn_str = env_1.default.MONGO_URI;
const port = env_1.default.PORT;
// middleware to parse JSON request bodies
app.use(express_1.default.json());
app.use('/api', doctorRoutes_1.default);
mongoose_1.default.connect(db_conn_str)
    .then(() => console.log('MongoDb connected successfully'))
    .catch((err) => {
    console.log('MongoDb connection failed', err);
    process.exit(1);
});
app.get('/', (req, res) => {
    res.json('Welcome Home little one');
});
app.listen(port, () => {
    console.log(`Server running on Localhost: ${port}`);
});
