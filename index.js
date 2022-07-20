/**
 * import all the configs
**/
import { development } from './config/development.js';
import { test } from './config/test.js';
import { production } from './config/production.js';

const mergeDeep = (target, ...sources) => {
    const isObject = (item) => {
        return (item && typeof item === 'object' && !Array.isArray(item));
    }

    if (!sources.length) return target;
    const source = sources.shift();

    if (isObject(target) && isObject(source)) {
        for (const key in source) {
            if (isObject(source[key])) {
                if (!target[key]) {
                    Object.assign(target, { [key]: {} });
                }

                mergeDeep(target[key], source[key]);
            } 
            else {
                Object.assign(target, { [key]: source[key] });
            }
        }
    }

    return mergeDeep(target, ...sources);
}

/**
 * start with 'development'
**/
let config = development;

/** 
 * successively merge 'test' and 'production' 
 * as required. Either use `dotenv` to store and 
 * import NODE_ENV in .env or run your program 
 * with NODE_ENV=test node program.js
 */
if (process.env.NODE_ENV === 'test') {
    config = mergeDeep(config, test)
}

if (process.env.NODE_ENV === 'production') {
    config = mergeDeep(config, production);
}

export { config };