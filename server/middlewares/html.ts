export const getPageHtml = (bundleHtml: string) => {
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Shortcut Battle</title>
    </head>
    <body>
        <div id="root">${bundleHtml}</div>
        <script src="/bundle.js"></script>
        <script>
          Client.init();
        </script>
    </body>
    </html>
  `;
};
