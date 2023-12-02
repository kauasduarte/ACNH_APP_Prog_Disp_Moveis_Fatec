import axios from 'axios';


const apicrud = axios.create({
  baseURL: 'https://my-json-server.typicode.com/kauasduarte/ACNH_APP_Prog_Disp_Moveis_Fatec/'
});


export default apicrud;