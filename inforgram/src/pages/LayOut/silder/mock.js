const menuData = [
    {
        title: '用户管理',
        key: '01',
        icon: 'home',
        level: '1',
        children: [
            {
                title: '用户列表',
                key: '01-01',
                url: '/home',
                level: '2',
            },
            {
                title: '增加用户',
                key: '01-02',
                url: '/home/index',
                level: '2',
            },
            {
                title: 'list页面',
                key: '01-03',
                url: '/list',
                level: '2'
            }
        ]
    }
]

export default menuData;