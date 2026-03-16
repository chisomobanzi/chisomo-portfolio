export default async function handler(req, res) {
  const { code } = req.query;

  const response = await fetch("https://github.com/login/oauth/access_token", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      client_id: process.env.OAUTH_GITHUB_CLIENT_ID,
      client_secret: process.env.OAUTH_GITHUB_CLIENT_SECRET,
      code,
    }),
  });

  const data = await response.json();

  const token = data.access_token;
  const error = data.error_description || data.error || "Unknown error";

  const script = token
    ? `
      const msg = "authorization:github:success:" + JSON.stringify({token: "${token}", provider: "github"});
      (function sendMsg() {
        if (window.opener) {
          window.opener.postMessage(msg, "*");
          setTimeout(function() { window.close(); }, 500);
        }
      })();
    `
    : `
      const msg = "authorization:github:error:" + ${JSON.stringify(error)};
      if (window.opener) {
        window.opener.postMessage(msg, "*");
      }
      document.body.innerText = "Authorization failed: " + ${JSON.stringify(error)};
    `;

  res.setHeader("Content-Type", "text/html");
  res.send(`<!DOCTYPE html><html><body><script>${script}</script></body></html>`);
}
