import axios from "axios"
const http=axios.create({
    baseURL:"http://localhost:9080",
    headers:{"ContentType":"application/json"}
}

)
export default http;