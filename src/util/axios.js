
import axios from 'axios';

axios.defaults.baseURL = 'http://www.young1024.com:666';
axios.defaults.withCredentials=true;  // 携带cookie

export default axios;
