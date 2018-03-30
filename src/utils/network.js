import Axios from 'axios';
import Config from '../app/config';

const instance = Axios.create({
  baseURL: Config.baseApiUrl,
  timeout: 30000
});

export default instance;