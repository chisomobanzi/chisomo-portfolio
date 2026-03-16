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

  const content = data.access_token
    ? `authorization:github:success:{"token":"${data.access_token}","provider":"github"}`
    : `authorization:github:error:${JSON.stringify(data)}`;

  res.setHeader("Content-Type", "text/html");
  res.send(`<!DOCTYPE html>
<html>
  <body>
    <p id="status">Authorizing...</p>
    <script>
      var content = ${JSON.stringify(content)};
      var status = document.getElementById("status");

      if (!window.opener) {
        status.innerText = "Error: no opener window found. Please try logging in again.";
      } else {
        // Handshake: tell the CMS we are authorizing
        window.opener.postMessage("authorizing:github", "*");

        // Wait for CMS to respond, then send the token
        window.addEventListener("message", function(e) {
          window.opener.postMessage(content, e.origin);
          status.innerText = "Authorization complete. This window will close.";
          setTimeout(function() { window.close(); }, 1000);
        }, false);
      }
    </script>
  </body>
</html>`);
}
