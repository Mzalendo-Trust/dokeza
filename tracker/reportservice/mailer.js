const
  nodemailer = require('nodemailer'),
  dayjs = require('dayjs'),
  CronJob2 = require('node-cron'),
  _ = require('lodash'),
  sgTransport = require('nodemailer-sendgrid-transport')


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


// const transport = nodemailer.createTransport({
//   host: 'mailhog',
//   port: '1025',
//   auth: {
//     user: 'user',
//     pass: 'password',
//   }
// });

// const transport = nodemailer.createTransport({
//   host: 'smtp.gmail.com',
//   port: 465,
//   auth: {
//     user: 'dokeza.mzalendo@gmail.com',
//     pass: 'dokezamasta!'
//   },
//   // tls: {
//   //     rejectUnauthorized: false
//   // }
// });

var options = {
  auth: {
      api_key: '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'
  }
}
var transport = nodemailer.createTransport(sgTransport(options));

var task2 = CronJob2.schedule('30 7 1 * *', function () {

  // select email, trackersubscribed from users_user
  client.query('select email from users_user where is_subscribed_tracker=true', (err, res) => {
    
    let dateObj = dayjs().subtract(1, 'month')
    let rptdate = dateObj.format('MMMM YYYY')

    //TODO: update to current month
    let rptname = `Dokeza Tracking Report-${rptdate}.pdf`;

    console.log(res?.rows)

    var mailOptions = {
      from: '"Dokeza" <dokeza.mzalendo@gmail.com>',
      to: 'dokeza.mzalendo@gmail.com',
      bcc: [..._.map(res?.rows, 'email')].join(', '),
      subject: `Monthly Report on Bill Stages in ${dayjs().format('MMMM')}`,
      html: "Greetings from Mzalendo! Here is this month's update on the Bills in the House", //JSON.stringify(_.map(res?.rows, 'email')), //'<b>Hey there! </b><br> Mimi ni boo wa sue<br />',
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
        // console.log(res)
        return console.error('mailservice err: ', error);
      }
      console.log('Message sent: %s', dayjs().format('ddd D, MMMM YYYY'));

      transport.close();
    });

  });

}, () => null);


try {
  task2.start();
} catch (error) {
  console.error('mailservice catch err: ', error)
}
