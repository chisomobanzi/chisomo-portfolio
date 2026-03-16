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

  if (!token) {
    res.status(500).send(`Token exchange failed: ${JSON.stringify(data)}`);
    return;
  }

  const message = JSON.stringify({
    token,
    provider: "github",
  });

  res.setHeader("Content-Type", "text/html");
  res.send(`<!DOCTYPE html>
<html>
  <body>
    <p id="status">Completing login...</p>
    <script>
      (function() {
        var status = document.getElementById("status");

        if (!window.opener) {
          status.innerText = "Error: no popup opener. Copy this and report it.";
          return;
        }

        // Decap CMS handshake protocol
        window.addEventListener("message", function onMsg(e) {
          window.removeEventListener("message", onMsg);
          window.opener.postMessage(
            "authorization:github:success:" + ${JSON.stringify(message)},
            e.origin
          );
          status.innerText = "Done! This window should close.";
          setTimeout(function() { window.close(); }, 1500);
        });

        window.opener.postMessage("authorizing:github", "*");
      })();
    </script>
  </body>
</html>`);
}
