# Al Tayer Test Task

##### Time spent: 
~16 hours

##### Production Ready ToDo Tasks:
 - Improved webpack.config.js (chunks, ...)
 - Clean package.json
 - Clean layout

##### If I had more time I would:
 - Clean package.json
 - Write more tests
 - Improve webpack.config.json
 - Use ES7
 - Remove bootstrap/font-awesome
 - Sass
 - Hand-writtend OnScroll event listeners
 
 ---
##### Setup Project
```
docker build -t al-tayer-test-mazurik .
```
##### Run
```
docker run -p 3000:3000 al-tayer-test-mazurik npm run start:prod
```
##### Run Test
```
docker build -t al-tayer-test-mazurik npm run test
```
##### Boilerplate
I used personal boilerplate with simple webpack.config.js and usable file-structure, because project is lightweight and created for testing purposes.
