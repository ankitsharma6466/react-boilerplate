import prodConfig from './prod-config.json'
import devConfig from './dev-config.json'

export default (process.env.NODE_ENV === "production") ? prodConfig : devConfig;
