var {
  userInfo, storyList, userHistory
} = require('./table'); 
var { query } = require('./db'); 
class Surface { 
  fieds = [];
  sheetName = '';
  index = '';
  value = '';
  selectAll = '';
  query = undefined;
  dateReg = /[0-9]{4}-[0-9]{1,2}-[0-9]{1,2}\s*[0-9]{1,2}:[0-9]{1,2}:[0-9]{1,2}/;
  numReg = /^[0-9]+.?[0-9]*/;
  constructor(sheetName, fiedList, query) {
    if (!sheetName || !fiedList || !query) {
      throw new Error('miss cofficient....');
    }
    this.sheetName = sheetName;
    this.fieds = fiedList;
    this.query = query;
    this.selectAll = `SELECT * from ${sheetName};`;
  }


  checkFieds(obj) {
    for (const k in obj) {
      if (k in this.fieds) {
        delete obj[k];
      }
    }
    return obj;
  }

  insert(args, call) {
    this.index = '';
    this.value = '';
    args = this.checkFieds(args);
    for (let key in args) {
      this.index = `${this.index}${key},`;
      if (this.numReg.test(args[key])) {
        this.value = `${this.value}"${args[key]}",`;
      } else {
        this.value = `${this.value}'${args[key]}',`;
      }
    }
    this.index = this.index.substr(0, this.index.length - 1);
    this.value = this.value.substr(0, this.value.length - 1);

    const sql = `INSERT INTO ${this.sheetName} (${this.index}) VALUES(${this.value})`;
    this.query(sql, call);
  }

  selectCount(data, call) {
    if (data && call && typeof data !== 'function' && typeof call === 'function') {

      delete data.offset;
      delete data.rows;
      let val = Object.entries(data)[0];
      let sql = `SELECT count(1) result from ${this.sheetName} `;
      if (val) {
        sql += ` where ${val[0]}='${val[1]}'`;
      }
      this.query(sql, call);
    }
    if (!call && data && typeof data === 'function') {
      this.query(`SELECT count(1) result from ${this.sheetName};`, data);
    }
  }

  selectPage(data, call) {
    if (data && call && typeof data !== 'function' && typeof call === 'function') {
      let rows = data.rows || 10;
      let offset = data.offset || 1;
      offset = (offset - 1) * rows;
      delete data.offset;
      delete data.rows;
      let order = ""
      if (data['order']) {
        order = ` order by ${data['order']} `;
        delete data.order;
      }
      let val = Object.entries(data)[0];
      let sql = `SELECT * from ${this.sheetName} `
      if (val) {
        sql += ` where ${val[0]}='${val[1]}' `;
      }
      sql += ` ${order} limit ${offset},${rows}`;
      this.query(sql, call);
    }
  }

  selectColum(colum, call) {

    const sql = `SELECT ${colum} from ${this.sheetName};`;
    this.query(sql, call);
  }

  select(data, call) {
    if (data && call && typeof data !== 'function' && typeof call === 'function') {
      let order = ""
      if (data['order']) {
        order = ` order by ${data['order']} `;
        delete data.order;
      }
      let val = Object.entries(data)[0];
      const sql = `SELECT * from ${this.sheetName} where ${val[0]}='${val[1]}' ${order};`;
      this.query(sql, call);
      return;
    }
    if (!call) {
      this.query(this.selectAll, call);
    }
  }


  delete(data, call) {
    const { index, value } = data;
    const sql = `DELETE from ${this.sheetName} where ${index}=${value};`; //按需删除
    this.query(sql, call);
  }

  update(index, args, call) {
    this.value = '';
    args = this.checkFieds(args);
    for (let key in args) {
      if (key !== index) {
        if (this.numReg.test(args[key])) {
          if (this.dateReg.test(args[key])) {
            this.value = `${this.value}${key}="${args[key]}",`;
          } else {
            this.value = `${this.value}${key}=${args[key]},`;
          }
        } else {
          this.value = `${this.value}${key}='${args[key]}',`;
        }
      }
    }
    this.value = this.value.substr(0, this.value.length - 1);
    const sql = `UPDATE ${this.sheetName} SET ${this.value} WHERE ${index}=${args[index]};`;
    this.query(sql, call);
  }
}

const userSheet = new Surface(userInfo.name, userInfo.fieds, query);
const storyListSheet = new Surface(storyList.name, storyList.fieds, query);
const userHistorySheet = new Surface(userHistory.name, userHistory.fieds, query);

module.exports = {
  userSheet,
  storyListSheet,
  userHistorySheet
};
