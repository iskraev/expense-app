export default (input, change) => {
    const oldStorage = JSON.parse(localStorage.userInfo);
    oldStorage[input] = change;
    localStorage.userInfo = JSON.stringify(oldStorage)
}