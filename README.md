# UCBUGG website recreation

 ## Running the website on your local server
 **Important**: You need to have Node installed and added to PATH  
 
To run the website locally, run from your terminal:
<ul>
 <li>
<code>git clone https://github.com/Cookei/UCBUGG-website-recreation.git</code>
  </li>
 <li>
<code>cd UCBUGG-website-recreation/ucbugg-site</code>
  </li>
 <li>
<code>npm start</code>
  </li>
 <li>
If you get a message like "sh: react-scripts: command not found" or similar, run
<code>npm install</code>
  </li>
 <li>
Then run
 <code>npm start</code> again
  </li>
</ul>

## To deploy the website on [www.ucbugg.com](https://www.ucbugg.com)
<ul>
 <li>
  In the directory <code>.../UCBUGG-website-recreation/ucbugg-sites</code>, run <code>npm run build</code>
 </li>
 <li>
  <code>npm run deploy</code>
 </li>
 <li>
  Push your changes. Then in Github, under the gh-pages branch, create a new file in the root directory called <code>CNAME</code> which contains only <code>www.ucbugg.com</code> on the first line
 </li>
 <li>
  Changes should be reflected on the [website](https://www.ucbugg.com) ~10 minutes.
 </li>
</ul>
