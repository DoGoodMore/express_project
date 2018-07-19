module.exports = {
    //定义需要权限的请求列表
    needTokenRequest: [
        '/article/add',
        '/tags/addNewTag',
        '/tags/updateTag',
        '/tags/delTag',
        '/tags/updateHotTags',
        '/article/delArticle',
        '/article/updateArticleHot',
        '/common/changePostFile',
        '/common/changeToppingFile',
        '/article/update',
        '/types/addTypes',
        '/types/delType',
        '/types/updateType',
        '/message/deleteMessage',
        '/message/lookMessage',
        '/todos/addTodo',
        '/todos/finishTodo',
        '/todos/deleteTodo',
        '/todos/updateTodo'
    ]
} ;