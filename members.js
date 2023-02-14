const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./data/sqlitedb');

const fetchMembers = async (page=1, limit=10, filter='') => {
    console.log("fetchMembers called with page " + page)
    console.log(filter)
    return new Promise((resolve, reject) => {
      let offset = (page - 1) * limit;
      let members = [];
      // Parameterized queries would definitely be preferred, but I was having a strange issue with sqlite3
      let query = `SELECT a.primaryAddress, a.address, a.city, a.state, a.zip, m.firstName, m.lastName, 
                    m.title, m.department, m.phone, m.url, m.company, m.image FROM addresses AS a 
                    LEFT OUTER JOIN members AS m ON m.id = a.memberid`;
      query += " WHERE a.primaryAddress=1"
      if (filter) {
        query += ` AND (m.firstName LIKE '%${filter}%' OR m.lastName LIKE '%${filter}%')`;
      }
      query += ` LIMIT ${limit} OFFSET ${offset}`;
  
      db.all(query, (err, rows) => {
        if (err) {
          reject(err);
        }
        rows.forEach((row) => {
          members.push(row);
        });
        resolve(members);
      });
    });
  };

  const fetchMemberCount = async () => {
    return new Promise((resolve, reject) => {
      let query = "SELECT COUNT(*) as count FROM members";
        
      db.get(query, (err, row) => {
        if (err) {
          reject(err);
        }
        resolve(row);
      });
    });
  };
  
  module.exports = {fetchMembers, fetchMemberCount};
