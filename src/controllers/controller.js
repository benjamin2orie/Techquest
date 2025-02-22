

// import multer from 'multer';
// import nodemailer from 'nodemailer';
// import bcrypt from 'bcryptjs';
// import path from 'path';
// import User from '../model/database.js';



// // Set up storage engine for Multer
// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//       cb(null, 'uploads/');
//     },
//     filename: (req, file, cb) => {
//       cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
//     }
//   });

//   export const upload = multer({ storage });

//   export const register = (upload.fields([{ name: 'passportPhoto' }, { name: 'paymentReceipt' }]), async(req, res)=>{
//     const {
//         name,
//         email,
//         phoneNumber,
//         password, 
//         address, 
//         state, 
//         country, 
//         course,
//         paymentType,
//         feedBack,
//         sendEmailCopy } = req.body;
//     const passportPhoto = req.files['passportPhoto'][0].path;
//     const paymentReceipt = req.files['paymentReceipt'][0].path;


//     try {
//         const hashedPassword = await bcrypt.hash(password, 10);
//         const newUser = new User({
//           name,
//           email,
//           phoneNumber,
//           password: hashedPassword,
//           address,
//           state,
//           country,
//           passportPhoto,
//           course,
//           paymentReceipt,
//           paymentType,
//           feedBack,
//           sendEmailCopy
//         });


//         await newUser.save();

//         const passportPhotoUrl = `${req.protocol}://${req.get('host')}/${passportPhoto}`;
//         const paymentReceiptUrl = `${req.protocol}://${req.get('host')}/${paymentReceipt}`;

//       // Send a copy of the user's information if checkbox is selected
//       if (sendEmailCopy) {
//             const transporter = nodemailer.createTransport({
//             service: 'gmail',
//             auth: {
//                 user: process.env.EMAIL_USER,
//                 pass: process.env.EMAIL_PASS,
//             },
//             });
//         }

//         const mailOptions = {
//             from: process.env.EMAIL_USER,
//             to: email,
//             subject: 'Your Registration Information',
//             text: `
//               Name: ${name}
//               Email: ${email}
//               Phone Number: ${phoneNumber}
//               Address: ${address}
//               State: ${state}
//               Country: ${country}
//               Passport Photo: ${passportPhoto}
//               Payment Receipt: ${paymentReceipt}
//             `,
//           };
    
//           await transporter.sendMail;

//           res.status(201).json(newUser);
//     } catch (error) {
//         res.status(500).json({message: "Server error"});
        
//     }
//   });








import nodemailer from 'nodemailer';
import bcrypt from 'bcryptjs';
import path from 'path';
import User from '../model/database.js';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export const register = async (req, res) => {
  const {
    name,
    email,
    phoneNumber,
    password,
    address,
    state,
    country,
    course,
    paid,
    paymentType,
    feedBack,
    sendEmailCopy
  } = req.body;

  const passportPhotoFile = req.files['passportPhoto'] ? req.files['passportPhoto'][0] : null;
  const paymentReceiptFile = req.files['paymentReceipt'] ? req.files['paymentReceipt'][0] : null;

  if (!passportPhotoFile || !paymentReceiptFile) {
    return res.status(400).json({ error: 'Passport Photo and Payment Receipt are required' });
  }

  const passportPhoto = passportPhotoFile.path;
  const paymentReceipt = paymentReceiptFile.path;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      name,
      email,
      phoneNumber,
      password: hashedPassword,
      address,
      state,
      country,
      passportPhoto,
      course,
      paid,
      paymentReceipt,
      paymentType,
      feedBack,
      sendEmailCopy
    });

    await newUser.save();

    const baseUrl = `${req.protocol}://${req.get('host')}/uploads`;
    const passportPhotoUrl = `${baseUrl}/${path.basename(passportPhoto)}`;
    const paymentReceiptUrl = `${baseUrl}/${path.basename(paymentReceipt)}`;

    // Send a copy of the user's information if checkbox is selected
    if (sendEmailCopy) {
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS,
        },
      });

      const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: 'Your Registration Information',
        text: `
          Name: ${name}
          Email: ${email}
          Phone Number: ${phoneNumber}
          Address: ${address}
          State: ${state}
          Country: ${country}
          Passport Photo: ${passportPhotoUrl}
          Payment Receipt: ${paymentReceiptUrl}
        `,
      };

      await transporter.sendMail(mailOptions);
    }

    res.status(201).json(newUser);
  } catch (error) {
    console.log("error", error)
    res.status(500).json({ message: 'Server error' });
  }
};


// New function to get all users
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select('-password -__v -updatedAt');
    res.status(200).json(users);
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'Server error' });
  }  
}