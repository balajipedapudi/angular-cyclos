import { environment } from "./environments/environment";
const contextPaths={
accounts:environment.apiUrl+"/accounts",
transfer:environment.apiUrl+"/transfer",
users:environment.apiUrl+"/users",
frontend:environment.apiUrl+"/frontend",
auth:environment.apiUrl+"/auth"
}

export default contextPaths;