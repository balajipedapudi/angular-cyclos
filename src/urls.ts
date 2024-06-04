import contextPaths from "./context";

const urls={
    
    dataForHistory:contextPaths.accounts+"/dataForHistory",
    history:contextPaths.accounts+"/history",
    accounts:contextPaths.accounts,
    transfers:contextPaths.transfer+"/key",
    searchUser:contextPaths.users,
    downloadReport:contextPaths.accounts+"/export",
    home:contextPaths.frontend+"/home",
    sessionToken:contextPaths.auth+"/session"
}

export default urls;