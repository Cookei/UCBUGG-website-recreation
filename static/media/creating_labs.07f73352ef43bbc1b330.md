# Creating Labs

Welcome to the lab on how to create labs! This lab is updated as of 5/20/24

> (!info)
> It is recommended to use a code editor such a vscode or equivilant with autoformatting enabled (I personally use Prettier to autoformat). This is NOT required, but it's nifty if you have it. Alternatively, you can use any other text editor like notepad

# Getting started

Firstly, you want to get started by creating a folder with the title of your lab, **in lowercase**. In this case, we will be naming our lab _example lab_.

> (!important)
> Do not have these following characters in the name of your lab. / \ - :

![initial lab folder creation](<creating labs - 1.jpg>)

Inside this folder, you want to create a new _.md_ file with the **same name as your folder** with **all spaces replaced with underscores**. This is a markdown file

![lab markdown file creation part 1](<creating labs - 2.jpg>)

![lab markdown file creation part 2](<creating labs - 3.jpg>)

![lab markdown file creation part 3](<creating labs - 4.jpg>)

Your entire lab will live inside of this .md file. The lab itself is written in plain markdown with a few modifications (will get into it later). For now, open this file to start writing your lab

> You can use any text editor you want. For this lab, I will be using VScode with the Prettier autoformatter. You can use anything you want, like notepad for example

# Writing your lab

The website will automatically format and style all the text written in this file when it is published to production as long as it follows the proper markdown style guidelines. Additionally, there are a few guidelines that are recommended to follow for organizational purposes.

## Starting your lab

We will begin by creating a header with the title of the lab. The reason we due this is because (at the time of writing this), the first header is not included in the navbar when viewing labs. Additionally, it's just nice to start off your lab with the title of your lab for consistency and organization

You can create a header starting a new line with # followed by a space followed by whatever text you want. For example, # Example Lab

**All headers must be followed by an empty line**

![title header instructions](<creating labs - 5.jpg>)

Any text that is not formatted will appear as plaintext. For example, in the above picture, \<Welcome to the lab> is plaintext.

This is what our lab currently looks like

![title header instructions 2](<creating labs - 6.jpg>)

As we continue to fill this out, our lab will continue to get populated

## Markdown specifications

Here are some markdown specifications and how they'll look once rendered

### Headings

| Markdown      | Rendered Output    |
| ------------- | ------------------ |
| # heading 1   | <h1>heading 1</h1> |
| ## heading 2  | <h2>heading 2</h2> |
| ### heading 3 | <h3>heading 3</h3> |

Make sure to leave an empty line before and after your header. For example

| ✅ Do this                                                                                              | ❌ Do not do this                           |
| ------------------------------------------------------------------------------------------------------- | ------------------------------------------- |
| make sure to put a blank line before<br><br><p style="margin: 0px"># heading</p><br>and after a heading | dont do this<br>heading<br>followed by this |

> (!important)
> Make sure to put a blank line before and after your heading

### Paragraphs

| Markdown                                                     | Rendered Output                                                    |
| ------------------------------------------------------------ | ------------------------------------------------------------------ |
| This is a lot of text.<br><br>This is a second block of text | <p>This is a lot of text.</p><p>This is a second block of text</p> |

Plain text will be converted into paragraphs. To create a new paragraph, simply seperate the two paragraphs using one or more blank lines.

If you want to have a line break within the same paragraph, end your line with **2 spaces** followed by your line break. Here is a picture to better visualize what this means

![line break](<creating labs - 7.jpg>)

![line break render](<creating labs - 8.jpg>)

Here is what happens when you do not include 2 spaces ⬇️

![line break bad](<creating labs - 9.jpg>)

![line break bad](<creating labs - 10.jpg>)

> As you've seen with this lab, emojis will also work as long as they're in unicode. So go to your hearts content with all your emojis! 😀🙄🤤🤑🤪🤕👽🤖🙉🐱🦓🐆🐐

### Blockquote

You can create blockquotes by doing the following

![blockquotes](<creating labs - 11.jpg>)

![blockquotes rendered](<creating labs - 12.jpg>)

### Horizontal Line

You can create horizontal lines by writing --- on its own line

---

It will produce this. Make sure to have an empty line before it and after it

![horizontal line example](<creating labs - 13.jpg>)

### Lists

| Markdown                                                                                        | Rendered Output                                                                         |
| ----------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------- |
| - This is an<br>- unordered list                                                                | <ul><li>This is an</li><li>unordered list</li></ul>                                     |
| - You can make line breaks by&nbsp;&nbsp;<br>&nbsp;&nbsp;doing this. Note the spaces after "by" | <ul><li>You can make line breaks by<br>doing this. Note the spaces after "by"</li></ul> |
| 1. This is<br>2. an ordered list                                                                | <ol><li>This is</li><li>an ordered list</li></ol>                                       |
| - This is<br>&nbsp;&nbsp;- an indented list                                                     | <ul><li>This is</li><ul><li>an indented list</li></ul></ul>                             |

### Images

To embed images, first get your image ready. For this example, I will be using this following image.

![example image](<example image.jpg>)

First, you want to save your image preferably in a .jpg file format. The reason for this is to save file space and decrease loading times on the website.

Place the image in the same folder as your .md file

![how to do images](<creating labs - 14.jpg>)

To create an image, simply do \!\[alt text]\(imageName.jpg). If your image name has spaces, then do this \!\[alt text]\(\<image name.jpg>)

![how to do images 2](<creating labs - 15.jpg>)

> (!info)
> To embed gifs and even videos, simply just do the same thing but with .gif or .mov or .mp4

### Links

| Markdown                             | Rendered Output                                |
| ------------------------------------ | ---------------------------------------------- |
| https://www.ucbugg.com/              | https://www.ucbugg.com/                        |
| \[alt text](https://www.ucbugg.com/) | <a href="https://www.ucbugg.com/">alt text</a> |

### Download buttons

To create a download button, first put the file in the same folder as your .md file, the same way you would do images.

Next, simply do the same thing as a link with \[file name](file name.zip). If the link in () ends with .zip, .ma, .mb, .iff, or .exr, it will automatically be converted into a download button

![how to do download](<creating labs - 16.jpg>)

![how to do download rendered](<creating labs - 17.jpg>)

### Emphasis

| Markdown                                                  | Rendered Output                               |
| --------------------------------------------------------- | --------------------------------------------- |
| This is how you \*\*bold\*\* text                         | This is how you **bold** text                 |
| You can also \_\_bold\_\_ like this                       | You can also **bold** like this               |
| \*Italics\* are done like this                            | \*Italics\* are done like this                |
| Or like \_this\_                                          | Or like _this_                                |
| And if you're feeling \*\*\*spicy\*\*\* \*\*\_spicy\_\*\* | And if you're feeling **_spicy_** **_spicy_** |

> (!info)
> It is recommended to use \* as opposed to \_ when possible

> (!info)
> You can use \ to escape markdown. For example if you want to have asterisk but don't want to bold, you can do \\\*\\\*bold\\\*\\\* this

### Code

You can do `inline code blocks` by surrounding it with single back ticks.

\`inline code block\` => `inline code block`

If you want larger code blocks, you can use triple back ticks followed by a newline

\`\`\`  
This is a code block  
 With indentation  
\`\`\`

```
This is a code block
    With indentation
```

---

You can also have code highlighting by specifying the Python programming language (currently, this is the only language supported in order to reduce website file sizes)

\`\`\`python  
def hihi:  
 print("Hello Mel-chan")  
\`\`\`

```python
def hihi():
    print("Hello Mel-chan")
```

# That's it!

That's it! Now you can create labs and fill them with lots of information.

These markdown specifications are a slightly modified version of [the markdown basic syntax](https://www.markdownguide.org/basic-syntax/)  
I have not covered how to make tables as they are a bit finicky, but if you are curious, you can look [here](https://github.com/wataru-chocola/remark-extended-table). This reason for this because it is finicky as what markdown is allowed in the table or not. Hence, why if you look inside the markdown file for this lab, there is a lot of html embedded in there

You can also navigate [here](https://www.ucbugg.com/labs/Website/example_lab) to see the example lab that was created to make this lab

---

# Uploading to Github

> (!important)
> Only proceed if you know what you're doing!!!

If you want to upload the lab to the github repo, follow along.

All labs in the website exist inside `src/assets/labs`. Inside this folder are categories, marked by being capitalized. There are 2 different ways of putting a lab inside a category

- Basic and Advanced subsections

  - Inside the selected category, there may be two folders titled Advanced and Basic (note the capitals). If you put your lab file within this respective folder, it will appear underneath that respective subsection

- No Basic and Advanced subsections
  - Otherwise, if you just put the lab directly inside the category, it won't be apart of any subsections

Note that the only thing that is in all lowercase is the lab itself. All _non-lab file structure_ is capitalized

> (!important)
> You want to push this commit to the main branch (or whatever branch you're working on). Do not push to the gh-pages branch

To push it to production. Please contact whoever is in charge of the website

If you want to test your changes to an already existing lab, you can run the site by navigating inside ucbugg-site and running `npm start` (Make sure you have all the dependencies installed by running `npm install dependencyname`).

If you added a new lab, first run `node generateLabsExport src/assets/labs src/pages all` in the ucbugg-site directory, then run `npm start` to see your changes.
