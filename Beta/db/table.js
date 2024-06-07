
const userInfo = {
    name: 'user',
    fieds: ['id', 'username', 'password'],
};


const storyList = {
    name: 'storylist',
    fieds: ['sid', 'title', 'content', 'image'],
};


const userHistory = {
    name: 'user_history',
    fieds: ['upid', 'oricontent','oriimage','orititle', 'usercontent', 'logtime', 'logurl','account','contentresult'],
};


module.exports = {
    userInfo,
    storyList,
    userHistory
}