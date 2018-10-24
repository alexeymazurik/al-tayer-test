export default (reactDom, reduxState) => {
  return `
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="utf-8">
        <title>React SSR</title>
        <link rel="stylesheet" type="text/css" href="./main.css" />
    </head>
    
    <body>
        <div id="app">${ reactDom }</div>
        <script>
            window.REDUX_DATA = ${ JSON.stringify( reduxState ) }
        </script>
        <script src="./bundle.js"></script>
    </body>
    </html>
  `;
}