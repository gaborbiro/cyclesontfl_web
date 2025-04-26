How to start:
- npm install -g firebase-tools
- clone https://github.com/gaborbiro/cyclesontfl_web.git
- cd cyclesontfl_web
- firebase init hosting
    - Use an existing project: cyclesontfl (BikesOnTube)
    - What do you want to use as your public directory? - hit enter
    - Configure as a single-page app (rewrite all urls to /index.html)? - y
    - Set up automatic builds and deploys with GitHub? - n
- fix/add stuff
- firebase emulators:start
- firebase deploy --only hosting

visualping.io - once a week it checks for any changes: https://tfl.gov.uk/modes/cycling/cycles-on-public-transport