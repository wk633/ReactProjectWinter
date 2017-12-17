export function getRedirectPath({type, avatar}){
    // get redirect address by user info
    // user.type    /boss  /genius
    // user.avatar  /bossinfo  /geniusinfo
    let url = (type === 'boss') ? '/boss' : '/genius';
    if(!avatar) {
        url += 'info';
    }
    return url;
}