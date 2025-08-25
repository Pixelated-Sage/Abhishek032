import crypto from 'crypto';

export function generateDownloadLink(fileId) {
  return `${process.env.BASE_URL || "http://localhost:3000"}/download/${fileId}`;
}
