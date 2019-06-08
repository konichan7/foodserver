module.exports = (function () {
    return {
      local: { // localhost
        host: 'localhost',
        port: '3306',
        user: 'root',
        password: 'rootroot',
        database: 'map'
      },
      real: { // real server db info
        host: 'mapserverdatabase.c803u9draov8.ap-northeast-2.rds.amazonaws.com',
        port: '3306',
        user: 'root',
        password: 'rootroot',
        database: 'map'
      },
      dev: { // dev server db info
        host: '',
        port: '',
        user: '',
        password: '',
        database: ''
      }
    }
  })();