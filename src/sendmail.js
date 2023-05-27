var nodemailer = require('nodemailer');

var sender = nodemailer.createTransport({
    host:'smtp.gmail.com',
    secure:true,
    port:465,
    auth: {
        user: 'murugans1510@gmail.com',
        pass: 'epjdegpqjgkwpgdw'
    }
});

var composemail = {
    from: 'murugans1510@gmail.com',
    to: 'muruganp1510@gmail.com',
    subject: 'send mail using nodejs',
    texT: 'Hello world'
}

sender.sendMail(composemail, function (error, info) {
    if (error) {
        console.log(error);
    } else {
        console.log('Mail send successfully' + info.response)
    }
})