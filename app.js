// Module dependencies

var express    = require('express'),
    mysql      = require('mysql');
    connect    = require('connect');
// Application initialization

var connection = mysql.createConnection({
        host     : 'localhost',
        user     : 'kvasconcellos',
        password : '3475503'

    });
    


// Database setup

        connection.query('CREATE DATABASE IF NOT EXISTS kvasconcellos', function (err) {
            if (err) throw err;
            connection.query('USE kvasconcellos', function (err) {
                if (err) throw err;
                connection.query('CREATE TABLE IF NOT EXISTS Artists('
                    + 'id INT NOT NULL AUTO_INCREMENT,'
                    + 'PRIMARY KEY(id),'
                    + 'username VARCHAR(30),'
                    + 'password VARCHAR(30)'
                    +  ')', function (err) {
                        if (err) throw err;
                    });
            });
        });

// Configuration
var app = module.exports = express.createServer();

app.use(express.bodyParser());

// Main route sends our HTML file

//app.get('/', function(req, res) {
 //   res.sendfile(__dirname + '/index.html');
//});

app.get('/', function(req,res) {
    res.sendfile('/index.html', {root:__dirname});
});

app.get('/secondpage', function(req,res) {
    res.sendfile('/secondpage.html', {root:__dirname});
});



app.post('/secondpage', function (req, res) {
    console.log(req.body);
    connection.query('INSERT INTO Artists (ID,ArtistName,Genre,FormedIn,NumMembers) VALUES(?,?,?,?,?)',[req.body.ID,req.body.ArtistName,req.body.Genre,req.body.FormedIn,req.body.NumMembers],
        function (err, result) {
            if (err) throw err;
            connection.query('select * from Artists where ID = ?', req.body.ID,
                function (err, result) {
                    console.log(result);
                    if(result.length > 0) {
                      res.send('ID: ' + result[0].ID + '<br />' +
                               'Artist: ' + result[0].ArtistName + '<br />' +
			       'Genre: ' + result[0].Genre + '<br />' + 
			       'Formed In: ' + result[0].FormedIn + '<br />' +
			       'Number of Members: ' + result[0].NumMembers
                      );
                    }
                    else
                      res.send('User was not inserted.');
                });
        }
    );
});



// Begin listening

app.listen(8026);
console.log("Express server listening on port %d in %s mode",  app.settings.env);
