
let express = require('express');
let router = express.Router();

let mysql_dbc = require('./db_con')();
let connection = mysql_dbc.init();


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'MAP' });
});

router.get('/getMap/', function(req, res, next){
  res.render('getMap', { title: 'GET MAP' });
});
router.get('/mypage/:id', function(req, res, next){
  res.render('getMap', { title: req.params.id });
})

router.post('/mypage', function(req, res, next){
  let ID = req.body.USERID;
  let PW = req.body.PASSWD;

  let query = "select * from USERINFO where USERID=? and PASSWD=?;";
  connection.query(query, [ID, PW], function(err, rows, fields){
    if(err) {
      console.error(err);
      let result = new Object();
      result.resultCode = 400;
      res.json(result);
    } else {
      let result = new Object();
      result.resultCode = 200;
      res.json(result);
    }
  });
});

router.get('/dbcheck', function (req, res, next) {

  var query = "show tables;";
  var tables = [];
  var total = [];
  connection.query(query, function (err, rows, fields) {
      if (err) { console.error(err);}
      else {
          for (var i = 0; i < rows.length; i++) {
              tables.push(rows[i].Tables_in_map);
          }
          for (var j = 0; j < tables.length; j++) {
              var tmpquery = "select * from " + tables[j] + ";";
              connection.query(tmpquery, function (err, rows, fields) {
                  if (err) { console.error(err); }
                  var tbl = new Object();

                  tbl.name = fields[0].table;
                  tbl.row = [];

                  for (var h = 0; h < rows.length; h++) {
                      var tmprow = [];
                      var r = JSON.stringify(rows[h]);
                      var j = JSON.parse(r);
                      for (var k in j) {
                          tmprow.push(j[k]);
                      }
                      tbl.row.push(tmprow);
                  }
                  tbl.col = [];
                  connection.query("SHOW COLUMNS FROM " + fields[0].table, function (err, rows, fields) {
                      for (var c = 0; c < rows.length; c++) {
                          tbl.col.push(rows[c].Field);
                      }
                  });

                  total.push(tbl);
              });
          }
          setTimeout(function () {
              res.render('dbcheck', { title: 'Database Check', tables: total });
          }, 1000);
      }
  });

});

router.get('/delete_table', function(req, res, next){
  let q = "DROP TABLE USERINFO";
  connection.query(q, function(err, rows, fields){
    if(err) {
      console.error(err);
    } else {
      res.redirect("/dbcheck");
    }
  });
  let q1 = "DROP TABLE BIDTABLE";
  connection.query(q1, function(err, rows, fields){
    if(err) {
      console.error(err);
    } else {
      
    }
  });
  let q2 = "DROP TABLE BOARD";
  connection.query(q2, function(err, rows, fields){
    if(err) {
      console.error(err);
    } else {
      
    }
  });
  let q3 = "DROP TABLE BUSKING";
  connection.query(q3, function(err, rows, fields){
    if(err) {
      console.error(err);
    } else {
      
    }
  });
  let q4 = "DROP TABLE COMMENT";
  connection.query(q4, function(err, rows, fields){
    if(err) {
      console.error(err);
    } else {
      
    }
  });
  let q5 = "DROP TABLE VIDEO";
  connection.query(q5, function(err, rows, fields){
    if(err) {
      console.error(err);
    } else {
      
    }
  });
  setTimeout(function() {
    res.send("완료");
  }, 500);
});

router.get('/create_table', function(req, res, next){
  let USERINFO = "CREATE TABLE IF NOT EXISTS USERINFO "
  + " ("
  + "     `ID`      INT            NOT NULL    AUTO_INCREMENT COMMENT 'ID', "
  + "     `USERID`  VARCHAR(45)    NULL        COMMENT 'USERID', "
  + "     `USERPW`  VARCHAR(45)    NULL        COMMENT 'USERPW', "
  + "     `EMAIL`    VARCHAR(45)  NULL         COMMENT 'EMAIL', "
  + "     `FLAG`    CHAR(1)  NULL         COMMENT 'FLAG', "
  + "     `BID`  INT    NULL        COMMENT 'BID', "
  + "     PRIMARY KEY (ID)"
  + " ) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;";

  let COMMENT = "CREATE TABLE IF NOT EXISTS COMMENT "
  + " ("
  + "     `ID`      INT            NOT NULL    AUTO_INCREMENT COMMENT 'ID', "
  + "     `USERID`  VARCHAR(45)    NULL        COMMENT 'USERID', "
  + "     `BID`  INT    NULL        COMMENT 'BID', "
  + "     `TIME`  DATETIME    NULL        COMMENT 'TIME', "
  + "     `COMMENT`   TEXT  NULL        COMMENT 'COMMENT', "
  + "     PRIMARY KEY (ID)"
  + " ) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;";

  let BOARD = "CREATE TABLE IF NOT EXISTS BOARD "
  + " ("
  + "     `ID`      INT            NOT NULL    AUTO_INCREMENT COMMENT 'ID', "
  + "     `USERID`  VARCHAR(45)    NULL        COMMENT 'USERID', "
  + "     `BID`  INT    NULL        COMMENT 'BID', "
  + "     `TIME`  DATETIME    NULL        COMMENT 'TIME', "
  + "     `TITLE`   TEXT  NULL        COMMENT 'TITLE', "
  + "     `TEXT`   TEXT  NULL        COMMENT 'TEXT', "
  + "     PRIMARY KEY (ID)"
  + " ) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;";

  let VIDEO = "CREATE TABLE IF NOT EXISTS VIDEO "
  + " ("
  + "     `ID`      INT            NOT NULL    AUTO_INCREMENT COMMENT 'ID', "
  + "     `USERID`  VARCHAR(45)    NULL        COMMENT 'USERID', "
  + "     `BID`  INT    NULL        COMMENT 'BID', "
  + "     `URL`  TEXT    NULL        COMMENT 'URL', "
  + "     `UNLIKE`   INT  NULL        COMMENT 'UNLIKE', "
  + "     `LIKE`   INT  NULL        COMMENT 'LIKE', "
  + "     PRIMARY KEY (ID)"
  + " ) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;";

  let BUSKING = "CREATE TABLE IF NOT EXISTS BUSKING "
  + " ("
  + "     `ID`      INT            NOT NULL    AUTO_INCREMENT COMMENT 'ID', "
  + "     `USERID`  VARCHAR(45)    NULL        COMMENT 'USERID', "
  + "     `LOCATION`  TEXT    NULL        COMMENT 'LOCATION', "
  + "     `LAT`  VARCHAR(45)    NULL        COMMENT 'LAT', "
  + "     `LNG`  VARCHAR(45)    NULL        COMMENT 'LNG', "
  + "     `YEAR`   INT  NULL        COMMENT 'YEAR', "
  + "     `MONTH`   INT  NULL        COMMENT 'MONTH', "
  + "     `DAY`   INT  NULL        COMMENT 'DAY', "
  + "     `STRTIME`   INT  NULL        COMMENT 'STRTIME', "
  + "     `STRMINUTE`   INT  NULL        COMMENT 'STRMINUTE', "
  + "     `ENDTIME`   INT  NULL        COMMENT 'ENDTIME', "
  + "     `ENDMINUTE`   INT  NULL        COMMENT 'ENDMINUTE', "
  + "     PRIMARY KEY (ID)"
  + " ) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;";

  let BIDTABLE = "CREATE TABLE IF NOT EXISTS BIDTABLE "
  + " ("
  + "     `ID`      INT            NOT NULL    AUTO_INCREMENT COMMENT 'ID', "
  + "     `BID`      INT            NOT NULL   COMMENT 'BID', "
  + "     PRIMARY KEY (ID)"
  + " ) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;";

  connection.query(BIDTABLE, function(err, rows, fields){
    if(err) {
      console.error(err);
    } else {
    }
  });
  connection.query(BUSKING, function(err, rows, fields){
    if(err) {
      console.error(err);
    } else {
    }
  });
  connection.query(VIDEO, function(err, rows, fields){
    if(err) {
      console.error(err);
    } else {
    }
  });
  connection.query(BOARD, function(err, rows, fields){
    if(err) {
      console.error(err);
    } else {
    }
  });
  connection.query(COMMENT, function(err, rows, fields){
    if(err) {
      console.error(err);
    } else {
    }
  });
  connection.query(USERINFO, function(err, rows, fields){
    if(err) {
      console.error(err);
    } else {
    }
  });
  setTimeout(function() {
    res.send("완료");
  }, 500);
});

router.post("/login", function(req, res, next){
  let USERID = req.body.ID;
  let USERPW = req.body.PW;

  let q = "select * from USERINFO where USERID=?";
  connection.query(q, [USERID], function(err, rows, fields){
    if(err) {
      console.error(err);
      let obj = new Object();
      obj.resultCode = 400;
      obj.msg = "Database 작업 중에 오류가 발생했습니다.1";
      res.json(obj);
    } else {
      if(rows.length == 0){
        let obj = new Object();
        obj.resultCode = 300;
        obj.msg = "아이디가 존재하지않습니다.";
        res.json(obj);
      } else {
        if(rows[0].USERPW == USERPW){
          let obj = new Object();
          obj.resultCode = 200;
          obj.msg = "로그인에 성공하였습니다.";
          obj.email = rows[0].EMAIL;
          res.json(obj);
        } else {
          let obj = new Object();
          obj.resultCode = 300;
          obj.msg = "비밀번호가 다릅니다.";
          res.json(obj);
        }
      }
    }
  });
});

router.post("/register", function(req, res, next){
  let USERID = req.body.ID;
  let USERPW = req.body.PW;
  let EMAIL = req.body.Email;
  let FLAG = req.body.Flag;

  let q1 = "select * from USERINFO where USERID=?";
  connection.query(q1, [USERID], function(err, rows, fields){
    if(err) {
      console.error(err);
      let obj = new Object();
      obj.resultCode = 400;
      obj.msg = "Database 작업 중에 오류가 발생했습니다.1";
      res.json(obj);
    } else {
      if(rows.length == 0) {
        //중복 ID 없음
        let q2 = "select * from BIDTABLE order by ID desc limit 1;";
        connection.query(q2, function(err, rows2, fields){
          if(err) {
            console.error(err);
            let obj = new Object();
            obj.resultCode = 400;
            obj.msg = "Database 작업 중에 오류가 발생했습니다.2";
            res.json(obj);
          } else {
            let q3;
            if(rows2.length == 0) {
              q3 = "insert into USERINFO(USERID, USERPW, EMAIL, FLAG, BID) values (?, ?, ?, ?, 1);";
              connection.query(q3, [USERID, USERPW, EMAIL, FLAG], function(err, rows3, fields){
                if(err) {
                  console.error(err);
                  let obj = new Object();
                  obj.resultCode = 400;
                  obj.msg = "Database 작업 중에 오류가 발생했습니다.3";
                  res.json(obj);
                } else {
                  let q4 = "insert into BIDTABLE(BID) values (1);"; 
                  connection.query(q4, function(err, rows4, fields){
                    if(err) {
                      console.error(err);
                      let obj = new Object();
                      obj.resultCode = 400;
                      obj.msg = "Database 작업 중에 오류가 발생했습니다.4";
                      res.json(obj);
                    } else {
                      let obj = new Object();
                      obj.resultCode = 200;
                      obj.msg = "회원가입에 성공했습니다";
                      res.json(obj);
                    }
                  });
                }
              });
            } else {
              q3 = "insert into USERINFO(USERID, USERPW, EMAIL, FLAG, BID) values (?, ?, ?, ?, ?);";
              connection.query(q3, [USERID, USERPW, EMAIL, FLAG, rows2[0].ID*1+1], function(err, rows3, fields){
                if(err) {
                  console.error(err);
                  let obj = new Object();
                  obj.resultCode = 400;
                  obj.msg = "Database 작업 중에 오류가 발생했습니다.5";
                  res.json(obj);
                } else {
                  let q4 = "insert into BIDTABLE(BID) values (1);"; 
                  connection.query(q4, function(err, rows4, fields){
                    if(err) {
                      console.error(err);
                      let obj = new Object();
                      obj.resultCode = 400;
                      obj.msg = "Database 작업 중에 오류가 발생했습니다.6";
                      res.json(obj);
                    } else {
                      let obj = new Object();
                      obj.resultCode = 200;
                      obj.msg = "회원가입에 성공했습니다";
                      res.json(obj);
                    }
                  });
                }
              });
            }
          }
        });
      } else {
        //중복 ID 있음
        let obj = new Object();
        obj.resultCode = 500;
        obj.msg = "중복되는 ID가 있습니다.";
        res.json(obj);
      }
    }
  });
});

router.post("/find", function(req, res, next){
  let USERID = req.body.ID;
  let EMAIL = req.body.EMAIL;
  let FLAG = req.body.FLAG;

  let q = "select * from USERINFO where USERID=?";
  connection.query(q, [USERID], function(err, rows, fields){
    if(err) {
      console.error(err);
      let obj = new Object();
      obj.resultCode = 400;
      obj.msg = "Database 작업 중에 오류가 발생했습니다.1";
      res.json(obj);
    } else {
      if(rows.length == 0){
        let obj = new Object();
        obj.resultCode = 300;
        obj.msg = "아이디가 존재하지않습니다.";
        res.json(obj);
      } else {
        if(rows[0].FLAG == FLAG){
          if(rows[0].EMAIL == EMAIL){
            let obj = new Object();
            obj.resultCode = 200;
            obj.msg = rows[0].USERPW;
            res.json(obj);
          } else {
            let obj = new Object();
            obj.resultCode = 300;
            obj.msg = "EMAIL이 일치하지 않습니다.";
            res.json(obj);
          }
        }
        else{
          let obj = new Object();
          obj.resultCode = 300;
          obj.msg = "아이디가 존재하지않습니다.";
          res.json(obj);
        }
      }
    }
  });
});

router.post("/getComment", function(req, res, next){
  let USERID = req.body.USERID;

  let q = "select B.USERID, B.COMMENT, date_format(B.TIME, '%Y-%m-%d %H:%i') as TIME from USERINFO A "
        + "left join COMMENT B on A.BID = B.BID "
        + "where A.USERID=? order by B.TIME desc;";

  connection.query(q, [USERID], function(err, rows, fields){
    if(err) {
      console.error(err);
      let obj = new Obeject();
      obj.resultCode = 300;
      obj.msg = "DB 작업 중 오류가 발생했습니다.";
      res.json(obj);
    } else {
      let obj = new Object();
      obj.resultCode = 200;
      obj.msg = "댓글을 받아오는 데 성공했습니다.";
      
      let arr = [];
      for(let i=0; i<rows.length; i++) {
        let o = new Object();
        o.USERID = rows[i].USERID;
        o.COMMENT = rows[i].COMMENT;
        o.TIME = rows[i].TIME;
        arr.push(o);
      }
      obj.comments = arr;
      console.log(obj);
      res.json(obj);
    }
  });
});

router.post("/getReservation", function(req, res, next){
  let YEAR = req.body.YEAR;
  let MONTH = req.body.MONTH;
  let DAY = req.body.DAY;

  let q = "select * from BUSKING where YEAR=? and MONTH=? and DAY=?";
  connection.query(q, [YEAR, MONTH, DAY], function(err, rows, fields){
    if(err) {
      console.error(err);
      let obj = new Obeject();
      obj.resultCode = 300;
      obj.msg = "DB 작업 중 오류가 발생했습니다.";
      res.json(obj);
    } else {
      let obj = new Object();
      obj.resultCode = 200;
      obj.msg = "예약정보를 받아오는데 성공했습니다.";
      
      let arr = [];
      for(let i=0; i<rows.length; i++) {
        let o = new Object();
        o.USERID = rows[i].USERID;
        o.LOCATION = rows[i].LOCATION;
        o.STRTIME = rows[i].STRTIME;
        o.STRMINUTE = rows[i].STRMINUTE;
        o.ENDTIME = rows[i].ENDTIME;
        o.ENDMINUTE = rows[i].ENDMINUTE;
        arr.push(o);
      }
      obj.comments = arr;
      console.log(obj);
      res.json(obj);
    }
  });
});

router.post("/getPin", function(req, res, next){

  function Distance(lat1,lon1,lat2,lon2) {
    var R = 6371; // Radius of the earth in km
    var dLat = deg2rad(lat2-lat1);  // deg2rad below
    var dLon = deg2rad(lon2-lon1); 
    var a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * 
      Math.sin(dLon/2) * Math.sin(dLon/2)
      ; 
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
    var d = R * c; // Distance in km
    return d;
  }
  
  function deg2rad(deg) {
    return deg * (Math.PI/180)
  }

  let newDate = req.body.Date;
  let date = newDate.split(" ");
  let year = date[0].split("-")[0];
  let month = date[0].split("-")[1];
  let day = date[0].split("-")[2];
  let hour = date[1].split(":")[0];
  let min = date[1].split(":")[1];
  let lat = req.body.Latitude;
  let lng = req.body.Longitude;


  let q = "select * from BUSKING where YEAR=? and MONTH=? and DAY=?";
  connection.query(q, [year, month, day], function(err, rows, fields){
    if(err) {
      console.error(err);
      let obj = new Obeject();
      obj.resultCode = 300;
      obj.msg = "DB 작업 중 오류가 발생했습니다.";
      res.json(obj);
    } else {
      let obj = new Object();
      obj.resultCode = 200;
      obj.msg = "핀정보를 받아오는데 성공했습니다.";
      let arr = []; let count = 0;
      for(let i=0; i<rows.length; i++) {
        if(Distance(lat,lng,rows[i].LAT,rows[i].LNG) < 10){
          console.log("dfdf");
          if(rows[i].ENDTIME>hour){
            let o = new Object();
            o.USERID = rows[i].USERID;
            o.LOCATION = rows[i].LOCATION;
            o.STRTIME = rows[i].STRTIME;
            o.STRMINUTE = rows[i].STRMINUTE;
            o.ENDTIME = rows[i].ENDTIME;
            o.ENDMINUTE = rows[i].ENDMINUTE;
            o.LAT = rows[i].LAT;
            o.LNG = rows[i].LNG;
            arr.push(o);
          }
          else if (rows[i].ENDTIME==hour){
            if(rows[i].ENDMINUTE>min){
              let o = new Object();
              o.USERID = rows[i].USERID;
              o.LOCATION = rows[i].LOCATION;
              o.STRTIME = rows[i].STRTIME;
              o.STRMINUTE = rows[i].STRMINUTE;
              o.ENDTIME = rows[i].ENDTIME;
              o.ENDMINUTE = rows[i].ENDMINUTE;
              o.LAT = rows[i].LAT;
              o.LNG = rows[i].LNG;
              arr.push(o);
            }
          }
        }
      }
      obj.comments = arr;
      console.log(obj);
      res.json(obj);
    }
  });
});

router.post("/busking", function(req, res, next){
  let USERID = req.body.ID;
  let LOCATION = req.body.LOCATION;
  let LAT = req.body.LAT;
  let LNG = req.body.LNG;
  let YEAR = req.body.YEAR;
  let MONTH = req.body.MONTH;
  let DAY = req.body.DAY;
  let STRTIME = req.body.STRTIME;
  let STRMINUTE = req.body.STRMINUTE;
  let ENDTIME = req.body.ENDTIME;
  let ENDMINUTE = req.body.ENDMINUTE;

  let q = "insert into BUSKING(USERID, LOCATION, LAT, LNG, YEAR, MONTH, DAY, STRTIME, STRMINUTE, ENDTIME, ENDMINUTE)"
          +" values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);";
  connection.query(q, [USERID, LOCATION, LAT, LNG, YEAR, MONTH, DAY, STRTIME, STRMINUTE, ENDTIME, ENDMINUTE], function(err, rows, fields){
    if(err) {
      console.error(err);
      let obj = new Object();
      obj.resultCode = 400;
      obj.msg = "Database 작업 중에 오류가 발생했습니다.1";
      res.json(obj);
    } else {
      let obj = new Object();
      obj.resultCode = 200;
      obj.msg = "일정 등록에 성공하셨습니다.";
      res.json(obj);
    }
  });
});

router.post("/sendComment", function(req, res, next){
  let USERID = req.body.yourID;
  let MYID = req.body.myID;
  let COMMENT = req.body.Comment;
  let dateString = req.body.Date;

  let q1 = "select * from USERINFO where USERID=?";
  connection.query(q1, [USERID], function(err, rows, fields){
    if(err) {
      console.error(err);
      let obj = new Object();
      obj.resultCode = 400;
      obj.msg = "Database 작업 중에 오류가 발생했습니다.1";
      res.json(obj);
    } else {
      let q2 = "insert into COMMENT(USERID, BID, TIME, COMMENT) values (?, ?, ?, ?);";
      connection.query(q2, [MYID, rows[0].BID, dateString, COMMENT], function(err, rows2, fields){
        if(err) {
          console.error(err);
          let obj = new Object();
          obj.resultCode = 400;
          obj.msg = "Database 작업 중에 오류가 발생했습니다.5";
          res.json(obj);
        } else {
          let obj = new Object();
          obj.resultCode = 200;
          obj.msg = "댓글 작성에 성공하셨습니다.";
          res.json(obj);
        }
      });
    }
  });
});

router.post("/search", function(req, res, next){
  let USERID = req.body.ID;

  console.log(USERID);
  let q = "select * from USERINFO where USERID=?";
  connection.query(q, [USERID], function(err, rows, fields){
    if(err) {
      console.error(err);
      let obj = new Object();
      obj.resultCode = 400;
      obj.msg = "Database 작업 중에 오류가 발생했습니다.1";
      res.json(obj);
    } else {
      if(rows.length == 0){
        let obj = new Object();
        obj.resultCode = 300;
        res.json(obj);
      } else {
        let obj = new Object();
        obj.resultCode = 200;
        obj.id = rows[0].USERID;
        obj.email = rows[0].EMAIL;
        console.log(obj);
        res.json(obj);
      }
    }
  });
});

router.post("/sendLike", function(req, res, next){
  let URL = req.body.URL;
  let URLS = URL.split(" ");
  let URLS2 = URLS[3].split('src="https://www.youtube.com/embed/')[1];
  URLS2 = URLS2.split('"')[0];
  let q1 = "select * from VIDEO where URL=?;";
  connection.query(q1, [URLS2], function(err, rows, fields){
    if(err) {
      console.error(err);
      let obj = new Object();
      obj.resultCode = 400;
      obj.msg = "Database 작업 중에 오류가 발생했습니다.";
      res.json(obj);
    } else {
      if(rows.length == 0) {
        let obj = new Object();
        obj.resultCode = 300;
        obj.msg = "존재하지 않는 동영상입니다";
        res.json(obj);
      } else {
        let likeNum = rows[0].LIKES*1;
        likeNum++;
        let q2 = "update VIDEO set LIKES=LIKES+1 where URL=?;";
        connection.query(q2, [URLS2], function(err, rows2, fields){
          if(err) {
            console.error(err);
            let obj = new Object();
            obj.resultCode = 400;
            obj.msg = "Database 작업 중에 오류가 발생했습니다.";
            res.json(obj);
          } else {
            let obj = new Object();
            obj.resultCode = 200;
            obj.LIKE = likeNum;
            res.json(obj);
          }
        });
      }
    }
  });

});

router.get("/temp", function(req, res, next){
  let q = "drop table VIDEO;";
  connection.query(q, function(err, rows, fields){
    if(err) {
      console.error(err);
    } else {
      let VIDEO = "CREATE TABLE IF NOT EXISTS VIDEO "
      + " ("
      + "     `ID`      INT            NOT NULL    AUTO_INCREMENT COMMENT 'ID', "
      + "     `USERID`  VARCHAR(45)    NULL        COMMENT 'USERID', "
      + "     `BID`  INT    NULL        COMMENT 'BID', "
      + "     `URL`  TEXT    NULL        COMMENT 'URL', "
      + "     `UNLIKES`   INT  NULL        COMMENT 'UNLIKES', "
      + "     `LIKES`   INT  NULL        COMMENT 'LIKES', "
      + "     PRIMARY KEY (ID)"
      + " ) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;";
      connection.query(VIDEO, function(err, rows, fields){
        if(err){
          console.error(err);
        }  else {
          res.redirect("/dbcheck");
        }
      })
    }
  });
})

router.post("/sendSource", function(req, res, next){
  let USERID = req.body.ID;
  let SOURCE = req.body.SOURCE;

  let q1 = "select * from USERINFO where USERID=?";
  connection.query(q1, [USERID], function(err, rows, fields){
    if(err) {
      console.error(err);
      let obj = new Object();
      obj.resultCode = 400;
      obj.msg = "Database 작업 중에 오류가 발생했습니다.1";
      res.json(obj);
    } else {
      let url = SOURCE.split("https://youtu.be/");
      url = url[1];
      let q2 = "insert into VIDEO(USERID, BID, URL, UNLIKES, LIKES) values (?, ?, ?, 0, 0);";
      connection.query(q2, [USERID, rows[0].BID, url], function(err, rows2, fields){
        if(err) {
          console.error(err);
          let obj = new Object();
          obj.resultCode = 400;
          obj.msg = "Database 작업 중에 오류가 발생했습니다.5";
          res.json(obj);
        } else {
          let obj = new Object();
          obj.resultCode = 200;
          obj.msg = "동영상 추가에 성공하셨습니다.";
          res.json(obj);
        }
      });
    }
  });
});

router.post("/getSource", function(req, res, next){
  let USERID = req.body.ID;

  let q1 = "select * from USERINFO where USERID=?";
  connection.query(q1, [USERID], function(err, rows, fields){
    if(err) {
      console.error(err);
      let obj = new Object();
      obj.resultCode = 400;
      obj.msg = "Database 작업 중에 오류가 발생했습니다.1";
      res.json(obj);
    } else {
      let q2 = "select * from VIDEO where BID=?";
      connection.query(q2, [rows[0].BID], function(err, rows2, fields){
        if(err) {
          console.error(err);
          let obj = new Object();
          obj.resultCode = 400;
          obj.msg = "Database 작업 중에 오류가 발생했습니다.5";
          res.json(obj);
        } else {
          let obj = new Object();
          obj.resultCode = 200;

          let arr = [];
          for(let i=0; i<rows2.length; i++) {
            let o = new Object();
            o.SOURCE = rows2[i].URL;
            o.LIKE = rows2[i].LIKES;
            arr.push(o);
          }
          obj.source = arr;
          console.log(obj);
          res.json(obj);
        }
      });
    }
  });
});

router.post("/getTop", function(req, res, next){
  let q1 = "select * from VIDEO order by LIKES DESC"
  connection.query(q1, function(err, rows1, fields){
    if(err) {
      console.error(err);
      let obj = new Object();
      obj.resultCode = 400;
      obj.msg = "Database 작업 중에 오류가 발생했습니다.5";
      res.json(obj);
    } else {
      let obj = new Object();
      obj.resultCode = 200;
      obj.msg = "좋아요 순위 상위 10개의 동영상 목록입니다.";

      let arr = [];
      for(let i=0; i<rows1.length; i++) {
        let o = new Object();
        o.SOURCE = rows1[i].URL;
        o.LIKE = rows1[i].LIKES;
        arr.push(o);
      }
      obj.source = arr;

      res.json(obj);
    }
  });
});

module.exports = router;