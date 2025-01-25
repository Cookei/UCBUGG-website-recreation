# UCBUGG website recreation

 ## Running the website on your local server
 **Important**: You need to have Node installed and added to PATH  
 
To run the website locally, run from your terminal:

```bash
git clone https://github.com/Cookei/UCBUGG-website-recreation.git;

cd UCBUGG-website-recreation/ucbugg-site;

npm start;

```
If you get a message like "sh: react-scripts: command not found" or similar, run

```bash
npm install
```

Then run
```bash
 npm start</code> again
```

## To deploy the website on [www.ucbugg.com](https://www.ucbugg.com)
In the directory UCBUGG-website-recreation/ucbugg-sites, run
```bash
npm run build;
npm run deploy
```
  Push your changes. Then in Github, under the gh-pages branch, create a new file in the root directory called <code>CNAME</code> which contains only <code>www.ucbugg.com</code> on the first line

Changes should be reflected on the [website](https://www.ucbugg.com) ~10 minutes.

