const
  nodemailer = require('nodemailer'),
  dayjs = require('dayjs'),
  CronJob = require('node-cron'),
  _ = require('lodash')


//// db connect
const { Client } = require('pg')
const client = new Client({
  host: 'postgres',
  user: 'dokezamasta',
  database: 'dokeza',
  password: 'dawn-rope-humdrum-topical-habitude',
  port: 5432,
})
client.connect();

const transport = nodemailer.createTransport({
  host: 'mailhog',
  port: '1025',
  auth: {
    user: 'user',
    pass: 'password',
  }
});

// const transport = nodemailer.createTransport({
//   host: 'mail.craftitsolutions.com',
//   port: 465,
//   auth: {
//     user:'vantagechms@craftitsolutions.com',
//     pass: 'daudi2016'
//   },
//   // tls: {
//   //     rejectUnauthorized: false
//   // }
// });

// var task = CronJob.schedule('0 9 28 * *', function () {
var task = CronJob.schedule('*/3 * * * *', function () {

  // select email, trackersubscribed from users_user
  client.query('select email from users_user', (err, res) => {

    let rptname = `report_${dayjs().format('MMMYYYY')}.pdf`;

    var mailOptions = {
      from: '"kimana" <dakn2005@gmail.com>',
      to: 'nyendebirungi@gmail.com, dakn2005@yahoo.com, dakn2005@live.com',
      subject: 'Nice Nodemailer test',
      // text: 'Hey there, Nodemailer msg ',
      html: JSON.stringify(_.map(res?.rows, 'email')), //'<b>Hey there! </b><br> Mimi ni boo wa sue<br />',
      attachments: [
        {
          // filename: 'allbills.pdf',
          path: __dirname + `/reports/${rptname}`,
          // cid: 'uniq-mailtrap.png' 
        }
      ]
    };

    transport.sendMail(mailOptions, (error, info) => {
      if (error) {
        return console.log(error);
      }
      console.log('Message sent: %s', info.messageId);
      console.log(res)
      transport.close();
    });

  });
}, () => null, { scheduled: false });

task.start();