function genKaboomEmbed(code: string) {
  return `<!DOCTYPE html>
<html>
  <head>
    <title>Project player</title>
    <script src="https://unpkg.com/kaboom@3000.0.1/dist/kaboom.js"></script>
  </head>
  <body
    style="
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100vh;
      margin: 0;
    "
  >
    <p id="erroLBL" style="display: none"></p>
    <pre id="logLBL" style="display: none"></pre>
    <div
      style="
        display: none;
        justify-content: center;
        align-items: center;
        height: 100vh;
        margin: 0;
      "
      id="contentDIV"
    ></div>
    <div
      style="width: 100%; height: 100%; background-color: black; display: block"
      id="tmpDIV"
    ></div>
    <script type="text/javascript">
      ${code}
    </script>
  </body>
</html>`;
}

export default { genKaboomEmbed };
