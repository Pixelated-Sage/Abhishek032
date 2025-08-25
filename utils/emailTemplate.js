export function emailTemplate(downloadLink, expiryTime) {
  return `
    <div>
      <h2>Your file is ready!</h2>
      <p>Download link (expires: ${expiryTime}): <a href="${downloadLink}">${downloadLink}</a></p>
    </div>
  `;
}
