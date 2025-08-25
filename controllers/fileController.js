import cloudinary from '../config/cloudinary.js';
import transporter from '../config/mailer.js';
import File from '../models/file.js';
import { generateDownloadLink } from '../utils/linkGenerator.js';
import { emailTemplate } from '../utils/emailTemplate.js';

export async function upload(req, res) {
  const { userId } = req.body;
  const uploadRes = await cloudinary.uploader.upload(req.file.path,
    { resource_type: 'auto' });
  const expiryTime = new Date(Date.now() + 60 * 60 * 1000); 
  const file = new File({
    filename: req.file.originalname,
    fileURL: uploadRes.secure_url,
    uploadedBy: userId,
    expiryTime,
  });
  await file.save();
  const link = generateDownloadLink(file._id);
  const userEmail = req.body.email;
  await transporter.sendMail({
    from: process.env.SMTP_EMAIL,
    to: userEmail,
    subject: 'Your file download link',
    html: emailTemplate(link, expiryTime),
  });
  res.json({ link });
}

export async function download(req, res) {
  const file = await File.findById(req.params.id);
  if (!file) return res.status(404).json({ error: 'File not found' });
  if (Date.now() > file.expiryTime.getTime()) return res.status(403).json({ error: 'Link expired' });
  file.downloadCount += 1;
  await file.save();
  res.json({ url: file.fileURL });
}
