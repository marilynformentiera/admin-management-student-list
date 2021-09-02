const mysql = require ('mysql2');



const db = mysql.createConnection({
    connectionLimit : 100,
    host        : process.env.DB_HOST,
    user        : process.env.DB_USER,
    password    : process.env.DB_PASS,
    database    : process.env.DB_NAME

});

//to view list
exports.view = (req, res) =>{



db.connect(function (err) {
    if (err) {
        console.error('error connecting: ' + err.stack);
        return;
    } else {
        console.log('MySQL Connected');
        db.query('SELECT * FROM user', (err, rows)=>{
            if(!err){
                res.render('home', { rows });
            } else{
                console.log(err);
            }

            console.log('the data from user table: \n', rows)
        });
    }
});
}

//search
exports.find = (req, res) =>{
    db.connect(function (err) {
        if (err) {
            console.error('error connecting: ' + err.stack);
            return;
        } else {
            console.log('MySQL Connected');

            const searchTerm = req.body.search;

            db.query('SELECT * FROM user WHERE first_name LIKE ?', ['%' + searchTerm + '%'], (err, rows)=>{
                if(!err){
                    res.render('home', { rows });
                } else{
                    console.log(err);
                }
                console.log('the data from user table: \n', rows)
            });
        }
    });
}

//new
exports.create = (req, res) => {
    const { first_name, last_name, email, phone, comments } = req.body;
    let searchTerm = req.body.search;
  
    // User the connection
    connection.query('INSERT INTO user SET first_name = ?, last_name = ?, email = ?, phone = ?, comments = ?', [first_name, last_name, email, phone, comments], (err, rows) => {
      if (!err) {
        res.render('add-user', { alert: 'User added successfully.' });
      } else {
        console.log(err);
      }
      console.log('The data from user table: \n', rows);
    });
  }
  
  // Edit user
exports.edit = (req, res) => {
    // User the connection
    connection.query('SELECT * FROM user WHERE id = ?', [req.params.id], (err, rows) => {
      if (!err) {
        res.render('edit-user', { rows });
      } else {
        console.log(err);
      }
      console.log('The data from user table: \n', rows);
    });
  }
  
  
  // Update User
  exports.update = (req, res) => {
    const { first_name, last_name, email, phone, comments } = req.body;
    // User the connection
    connection.query('UPDATE user SET first_name = ?, last_name = ?, email = ?, phone = ?, comments = ? WHERE id = ?', [first_name, last_name, email, phone, comments, req.params.id], (err, rows) => {
  
      if (!err) {
        // User the connection
        connection.query('SELECT * FROM user WHERE id = ?', [req.params.id], (err, rows) => {
          // When done with the connection, release it
          
          if (!err) {
            res.render('edit-user', { rows, alert: `${first_name} has been updated.` });
          } else {
            console.log(err);
          }
          console.log('The data from user table: \n', rows);
        });
      } else {
        console.log(err);
      }
      console.log('The data from user table: \n', rows);
    });
  }
  
  // Delete User
  exports.delete = (req, res) => {
  
    // Delete a record
  
    // User the connection
    // connection.query('DELETE FROM user WHERE id = ?', [req.params.id], (err, rows) => {
  
    //   if(!err) {
    //     res.redirect('/');
    //   } else {
    //     console.log(err);
    //   }
    //   console.log('The data from user table: \n', rows);
  
    // });
  
    // Hide a record
  
    connection.query('UPDATE user SET status = ? WHERE id = ?', ['removed', req.params.id], (err, rows) => {
      if (!err) {
        let removedUser = encodeURIComponent('User successeflly removed.');
        res.redirect('/?removed=' + removedUser);
      } else {
        console.log(err);
      }
      console.log('The data from beer table are: \n', rows);
    });
  
  }
  
  // View Users
  exports.viewall = (req, res) => {
  
    // User the connection
    connection.query('SELECT * FROM user WHERE id = ?', [req.params.id], (err, rows) => {
      if (!err) {
        res.render('view-user', { rows });
      } else {
        console.log(err);
      }
      console.log('The data from user table: \n', rows);
    });
  
  }
