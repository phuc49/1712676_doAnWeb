const db = require("./db.js");

module.exports = {
    singleID: (ma_sp) =>
      db.load(`SELECT * FROM san_pham sp, loai_sp l WHERE sp.ma_sp = ${ma_sp} AND sp.loai = l.ma_loai`),
    all: (loai) =>
      db.load("SELECT * FROM san_pham sp, loai_sp l WHERE sp.loai = l.ma_loai"),
    allByPage: (offset,limit)=>db.load(`SELECT * FROM san_pham sp, loai_sp l 
                                         WHERE sp.loai = l.ma_loai
                                         LIMIT ?,?`,[offset * limit, limit]),
    count: () => db.load("SELECT COUNT(*) AS sl FROM san_pham"),
    allByCategory: (loai, offset,limit)=>db.load(`SELECT * FROM san_pham sp, loai_sp l 
                                                  WHERE l.ma_loai = ${loai} AND sp.loai = ${loai}
                                                  LIMIT ?,?`,[offset * limit, limit]),
    countByCategory: (loai) => db.load(`SELECT COUNT(*) AS sl FROM san_pham WHERE loai = ${loai}`),
    allByName: (ten, offset,limit)=>db.load(`SELECT * FROM san_pham sp, loai_sp l 
                                             WHERE sp.ten_sp LIKE '%${ten}%' AND sp.loai = l.ma_loai
                                             LIMIT ?,?`,[offset * limit, limit]),
    countByName: (ten) => db.load(`SELECT COUNT(*) AS sl FROM san_pham WHERE ten_sp LIKE '%${ten}%'`)
};

