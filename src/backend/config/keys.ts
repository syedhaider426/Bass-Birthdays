import privateKeys from "./privateKeys";
import { devKeys } from "./dev";
import { prodKeys } from "./prod";

const keysEnvironment = process.env.NODE_ENV;
let keys: privateKeys = keysEnvironment === "production" ? prodKeys : devKeys;

export { keys };
