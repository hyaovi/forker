import axios from 'axios';
const searchInstance = new axios.create({
  baseURL: 'https://api.github.com/'
});
export default searchInstance;
