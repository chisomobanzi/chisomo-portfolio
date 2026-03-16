export default async function handler(req, res) {
  const { code } = req.query;

  if (!code) {
    res.status(400).send("Missing code parameter");
    return;
  }

  const tokenRes = await fetch("https://github.com/login/oauth/access_token", {
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

  const data = await tokenRes.json();
  const token = data.access_token;

  res.setHeader("Content-Type", "text/html");
  res.send(`<!DOCTYPE html>
<html>
  <body style="font-family: monospace; padding: 2rem; font-size: 16px;">
    <h2>OAuth Debug</h2>
    <p><strong>Token received:</strong> ${token ? "YES (" + token.substring(0, 8) + "...)" : "NO"}</p>
    <p><strong>GitHub response:</strong> ${JSON.stringify(data).replace(/</g, "&lt;")}</p>
    <p><strong>Has opener:</strong> <span id="opener">checking...</span></p>
    <p><strong>Handshake status:</strong> <span id="handshake">waiting...</span></p>
    <p><strong>Message sent:</strong> <span id="sent">no</span></p>
    <script>
      var openerEl = document.getElementById("opener");
      var handshakeEl = document.getElementById("handshake");
      var sentEl = document.getElementById("sent");

      openerEl.innerText = window.opener ? "YES" : "NO";

      ${token ? `
      if (window.opener) {
        window.addEventListener("message", function onMsg(e) {
          window.removeEventListener("message", onMsg);
          handshakeEl.innerText = "received from " + e.origin;

          var msg = "authorization:github:success:" + JSON.stringify({
            token: "${token}",
            provider: "github"
          });
          window.opener.postMessage(msg, e.origin);
          sentEl.innerText = "YES - " + msg.substring(0, 60) + "...";
        });

        window.opener.postMessage("authorizing:github", "*");
        handshakeEl.innerText = "sent authorizing:github, waiting for reply...";
      }
      ` : `
        sentEl.innerText = "FAILED - no token from GitHub";
      `}
    </script>
  </body>
</html>`);
}
