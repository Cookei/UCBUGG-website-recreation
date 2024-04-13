# INTRODUCTION

As explained during lecture, compositing is the part of the post-production pipeline in which one would compile all their different images and video layers together in order to create one cohesive film. Compositing comes in handy when you need to save time and when you need a way to "cheat" your special effects. However, this can easily go south if lighting does not match up.

There are a few different compositing programs you can explore, but for the sake of this lab and free software access, I'll be using Adobe After Effects. If you are already familiar with the compositing process, please feel free to use the program you are most comfortable with. As I am familiar with the general Adobe interface, I find After Effects much more intuitive and useful for my own purposes. With this being said, you do not need any experience in any Adobe product to be able to follow along; I will be covering everything you'll need to successfully complete your short.

Because some of you may have already had experience in using Adobe After Effects and because this is a pretty thorough lab, I have split this up into different parts, so you can easily skip ahead where needed and go back where you would like.

[DOWNLOAD THE LAB HERE](https://drive.google.com/file/d/0B6h3FLpfC5gNWkFKNGxVM1J6cm8/view?usp=sharing&resourcekey=0-jy9KI4NuzfEcHnqqWEH0uQ)

# GETTING STARTED

First, if you do not already have UC Berkeley's free Adobe CC software, please download that at https://software.berkeley.edu/

When you have that completed, let's move on to opening up the program.

## CREATING A NEW PROJECT

By default, when you open up the program, Ae should already be in the Standard workspace. If your windows don't look similar to mine, you can change your workspace format by going to Window > Workspace > Standard.

![](<Screen Shot 2016-04-04 at 2.41.31 PM.png>)

With a blank project, you will need to create a new composition from the menu bar: Composition > New Composition. This opens up the Composition Settings window. Use the HDTV 1080p 24 preset, as you want to keep your film at a high quality 16:9 ratio. Name your composition as you wish (preferably the title of your film).

![](<Screen Shot 2016-04-04 at 2.38.31 PM.png>)

# FAMILIARIZING YOURSELF WITH THE INTERFACE

Adobe After Effects is like the lovechild between Photoshop and Premiere Pro. Not only are you able to edit your images and videos, but you are also able to combine different layers, or composite your files, to create one movie file. But, to do this, you'll need to equip yourself with some of the tools Ae provides for you. I've only noted the ones that you will primarily use, but feel free to ask about and use the other tools if they are necessary to further your short.

## TOOLBAR

![](toolboop.png)

In the standard workspace, you can find the toolbar at the very top of your window, just above the "Effect Controls" tab. Here, you can also change your workspace options on the right of the toolbar. Unless you plan on creating a snazzy live-action effects and 3D animation film hybrid, you will likely only use the Select tool and the Text tool buttons.

## LAYER TRANSFORMATION ATTRIBUTES

![](transform.gif)

Each file has its own properties, which are listed under "Transform" This includes

Anchor Point: This is the point in which your image rotates from. You can move this point of reference by pressing Y and clicking and dragging the point to where you want it to be. This is similar to moving your pivot on Maya, where you wouldn't want to have your pivot at the center of your door, but rather at its hinges, the side you want it to turn from.

Position: The position of your layer indicates the position of where it is at. By default, your layer's position will be 960.0, 540.0, where the first number indicates your x-axis and the last number represents the y-axis. If you drag these integers left and right, you can see that your layer moves along with the value. Ultimately, this is useful if you need to pan left or right in your background and more.

Scale: Just like Maya's own Scale Tool, After Effects's scale can also make your layer bigger or smaller as necessary. This comes in especially helpful when the resolution of your layers do not match up, which I will point out later in the lab.

Rotation: Again, like Maya's Rotate Tool, After Effects also owns a rotation tool that will rotate your layers as you please. I personally don't use this tool very much, but if you have a small secondary 2D action that you need to animate separate from Maya, this will come in quite useful.

Opacity: A little self-explanatory, but this determines how opaque your image is. If you decide to animate this, you can get a really nice fade in or fade out, depending on what you want.

Similar to Maya's Move, Rotate, and Scale tools, each of these properties is key-able. The grey stopwatch symbol next to each of these titles means that you can create an animation for these properties. If you click on it, it will turn blue, and you are able to create key frames, which I will go more into depth later, when I talk about Time Remapping.

Note that you should have your Playback speed at 24 frames per second, which you can check in your "Preview" tab. Make sure your options are similar to mine here:

![](<Screen Shot 2016-04-10 at 6.15.14 PM.png>)

# IMPORTING AND ADJUSTING FILES

![](<After Effects has the capacity of opening your typical .png>)/.jpeg files, but it can also open up .psd/.ai files (in other words, files that have layers within them), so use this to your advantage.

## SINGLE IMAGE FILES

Once you've created your new composition and you understand how the basic tools work, you'll notice that Ae creates a new tab in your workspace with the new composition. Let's import the renderman_static_background.exr image from the final_render folder (File > Import > File...) into the project. You'll notice that Ae toggles between the Project tab and the Composition tab at the bottom window. Your file will be in the project window, and you'll have to manually drag that into your composition, as so:

![](ha.gif)

Here, I'm clicking and dragging my mouse in the background image, renderman_static_background.exr into my composition, FILE_NAME_HERE via the "Project" tab.

You may notice that the background image does not have a horizon, however. So, I imported the .exr background into Photoshop and created a matte painting based on the image and its lighting.

Like how I did for the .exr image, I'm going to import my matte painting .psd file into my Project tab.

![](<Screen Shot 2016-04-10 at 4.50.18 PM.png>)

When you import a file that has layers within it (such as Photoshop or Illustrator files), After Effects will promptly open up a window.

![](<Screen Shot 2016-04-10 at 4.50.34 PM.png>)

You should select your "Import Kind" as Composition and "Layer Options" as Editable Layer Styles, as I have in the screenshot above.

Ultimately, what this does is create a new composition from your newly imported file. Since you only need to render one composition, this creates a composition inception; you can think of "FILM_NAME_HERE" as your master composition that you will be exporting and your .psd/.ai files as sub-compositions that lie within the master composition.

When you have different layers within your Photoshop or Illustrator file, you can adjust them individually as you do your single image layer files; you simply need to double-click on the composition file. This will lead to another tab of your "Toggle Switches/Modes" that lists all the attributes of said composition.

So, with this, first, I'm going to drag my new matte painting into my master composition, FILM_NAME_HERE, that I put my renderman_static_backgroud in.

![](matte.gif)

![](<Screen Shot 2016-04-10 at 5.06.58 PM.png>)

This is the color that is in my background. I don't particularly like it, but that's okay, because I can tweak it.
To edit your composition, double click the file, and Ae should take you to its layer attributes under the newly opened "mattepainting" tab.

![](<Screen Shot 2016-04-10 at 5.11.39 PM.png>)

Here, I'll be editing the "Hue/Saturation 1" layer, since I don't like how the color interacts with the houses; the orange and yellow is too saturated for my taste. So, double click that layer, which should open up the Effects Controls tab, and adjust the Master Hue, Master Saturation, and Master Lightness as needed. You can test how each of these attributes interacts with the color and the entire background by toggling the visibility of Layer 0 (but remember to turn visibility OFF when you're finished!)

Play around with the different controls until you achieve the desired effect you'd like; your values may be different from mine. I'll readjust this and go more in-depth with this process later, but here's a sneak preview of what I have thus far:

![](<Screen Shot 2016-04-10 at 5.17.12 PM.png>)

This is how my composition looks like so far:

![](<Screen Shot 2016-04-10 at 5.30.31 PM.png>)

## IMPORTING IMAGE SEQUENCES

As you render your images, you will have to composite them in order to create your film. So, to do so, you'll want to import your images as sequences, so that they appear one after the other. In this case, I want to import the fox and cloth animations, which you can find in the folder fox and cloth. Again, File > Import > File...

![](<Screen Shot 2016-04-10 at 5.49.25 PM.png>)

Make sure PNG Sequence is checked; otherwise, your image will only import individually (which is a total headache). Now, in your Project tab, your PNG sequence should appear as so:

![](<Screen Shot 2016-04-10 at 5.52.50 PM.png>)

Now, just as you've done for the matte painting and the renderman background, drag your cloth_cached PNG sequence into your master composition file.

When you drag it into FILM_NAME_HERE, you'll notice that the sequence is much shorter than the length of the backgrounds. To account for this, you can shrink playback time by adjusting the blue Timeline bars:

![](ok.gif)

If you want to playback your film so far, you can press the Play symbol on the Preview tab OR press Spacebar on your computer.

# BUILDING COMPOSITION LAYERS AND DEPTH

As I previously hinted at before, Adobe After Effects is also a software that you can use to animate with. Unfortunately, as this is a 3D animation course, this is not a section that will be covering how to animate characters in Ae. However, with that being said, in order to save you time and stress in animating in Maya, you can take shortcuts in After Effects.

Now, I want to integrate the shadow into my film to create a sense of depth and solidity. However, when I first add the shadow .mp4 file into my master composition, it covers the entire screen.

![](<Screen Shot 2016-04-10 at 6.58.44 PM.png>)

To go around this problem, you want to go up to your menu options. Click Layer > Blending Mode > Darken.

![](<Screen Shot 2016-04-10 at 7.02.27 PM.png>)

![](<Screen Shot 2016-04-10 at 8.51.30 PM.png>)

## TIME REMAPPING

Now, when you playback, you may notice that your shadow slows down at random spots, such as when the fox jumps up, lifts its leg, etc.

![](blah.gif)

This is an indicator that the frame rate of the shadow is inconsistent to the frame rate of the fox, so you may need to Time Remap its shadow so that it follows the fox directly.

First, click on the layer you want to apply the Time Remap to (in this case, it would be shadow.mp4). Then, go to Layer > Time > Enable Time Remapping

![](<Screen Shot 2016-04-10 at 9.22.58 PM.png>)

Once you do so, you'll notice that the Time Remap option will pop up underneath your shadow.mp4 layer. What this means is that Time Remap is now an attribute of shadow.mp4, and you can animate that as you can with any other layer.

![](<Screen Shot 2016-04-10 at 9.25.31 PM.png>)

I've highlighted the main things you need to look at here, which are your key frame buttons. The blue diamond indicates that a key frame has been set at that time (in this screenshot, a key has been set at 0:00:00:00); on the other hand, the grey diamond means that there is no key frame at that time. You can create and delete key frames by simply clicking the diamond symbol, toggling it 'on' (blue) and 'off' (grey).

Now, to speed up the time at certain areas, I'm going to open up the Graph Editor, which you can find at the top of your panel.

![](<Screen Shot 2016-04-10 at 10.03.48 PM.png>)

A window that replaces the Timeline mode should pop up. This is your Graph Editor window. To alter the graph of the Time Remap function, click on the function so that it is highlighted and scrub through, frame by frame, to see where the shadow first slows down in relation to the fox.

Remember: to set a key, click on the grey diamond, and when it turns blue, it means you have successfully set a key at your Current Time Indicator (the red line with the blue trapezoidal head). If you raise a key higher, the that part of the .mp4 clip will speed up, and if you lower it, that part of the .mp4 clip will slow down. I had to raise the keys at certain points but never had to lower any. Here's how my graph turned out:

![](<Screen Shot 2016-04-10 at 9.13.35 PM.png>)

Now, when I play back the clip, the shadow aligns nicely with my fox.

![](yay.gif)

Congratulations! You've essentially just learned how to animate on Adobe After Effects!

# USING ADJUSTMENT EFFECTS TO MAINTAIN STYLE

One primary part of compositing and post-production includes color correction to maintain consistency in lighting. If you've ever edited photos on Photoshop, this section of the lab may ring familiar to you. The only menu you will want to use when adjusting this will be the Color Correction menu in After Effects. You can find this in the top menu, under Effects > Color Correction.

So, with this, before I import the fire and water effects into my composition, I want to finish adjusting and color correcting my matte painting. I want the scene to take place during the evening, during sunset hours. So, as the shadows indicate that the sun is facing directly towards the houses, the matte painting should be less saturated in oranges. After selecting the mattepainting layer, under the Color Correction menu, I decided to use Hue/Saturation to desaturate my colors and Curves to lessen the contrast.

Keep in mind that, when you select the layer you want to add an adjustment to, you only click the layer ONCE so that the adjustment affects ALL of your layers within that one composition.

![](<Screen Shot 2016-04-10 at 11.31.16 PM.png>)

Adjust your values as you see fit; this is the part where you get to play around with your colors. This is how mine ended up:

![](<Screen Shot 2016-04-10 at 11.38.17 PM.png>)

Remember that I only adjusted the matte painting and nothing else. Make sure that you add adjustments to the correct layer. You can check this by toggling the layer's attributes and checking which effects you added to it.

![](<Screen Shot 2016-04-10 at 11.40.19 PM.png>)

Next, I want to adjust the lighting of the houses so that they reflect the color of the sun and the sky. Again, under the Color Correction menu, I used Color Balance, Exposure, Curves, and Hue/Saturation.

![](2.PNG)

Please note that you don't necessarily have to follow the color correction options I used exactly. If you think only three of the options do the trick, feel free to do it your way, and if you want to try out other options, go for it.

Here is what I ended up with:

![](<Screen Shot 2016-04-10 at 11.45.48 PM.png>)

I think the grass looks a little odd, so I'm going to adjust the color of it. To do so, I'm going to use another option under the Color Correction menu: Change to Color

![](color.gif)

![](<Essentially what I did in the .gif>) was color pick the "From" to pick the color of the grass in the composition, and adjust the "To" part to a more yellow-green color in order to reflect the color of the sun. I adjusted "Change" to Hue and Saturation. Here's a screenshot of what I got to make my results look more clear to you:

![](<Screen Shot 2016-04-11 at 12.09.35 AM.png>)

And this is how my composition looks like now:

![](<Screen Shot 2016-04-11 at 12.14.12 AM.png>)

Now, to account for the sunlight, I'm going to adjust only the Brightness & Contrast of my fox and flag. The only reason why I didn't choose to color correct is because I wanted both objects to maintain their true colors.

![](<Screen Shot 2016-04-11 at 12.16.44 AM.png>)

Finally, because shadows tend to not have such defined edges, instead of using the Color Correction menu, I'm going to use the Effects > Blur & Sharpen > Gaussian Blur

![](blur.png)

Now, I'm going to change the opacity of the shadow so that it's nearly at half its opacity (~50%)

![](<Screen Shot 2016-04-11 at 1.06.13 AM.png>)

These are how my adjustments look altogether before adding the fire and water effects:

![](<Screen Shot 2016-04-11 at 1.08.26 AM.png>)

Have fun with this; your composition doesn't necessarily have to look exactly like my own.

# INTEGRATING VISUAL EFFECTS

With effects, you have the option of (a) using Maya effects, (b) creating particle simulations in After Effects, or (c) drawing and animating 2D effects. Because the compositing and and visual effects lecture go hand-in-hand, this lab will be using the first option of using Maya effects, which are already rendered for you in the ZIP folder.

## IMPORTING FIRE

Just like how you imported your shadow.mp4 into your Project tab earlier, you want to import the fire (fiyah.mp4), and, as routine, drag your new fiyah.mp4 into your FILM*NAME_HERE composition. To remove the black background in the .mp4 file, go to \_Layers -> Blending Mode -> Lighten*.

I'm going to isolate the fire and the background so I can focus on adding effects on my fire without getting distracted by the fox. To do so, I turned visibility off on the fox and its shadow by clicking the eye symbol.

![](<Screen Shot 2016-04-11 at 1.14.19 AM.png>)

Now, when you play, you'll notice that the fire looks pretty neat, but a little off-colored in terms of its lighting and placement in the scene:

![](fiayer-h-ydk.gif)

So, to fix this, I'll be going under the Effects > Color Correction menu again. My goal is to make the colors of the fire more vibrant. I adjusted Brightness & Contrast, Color Balance, and Selective Color (Method: Absolute). This is my result:

![](editedfire.gif)

## IMPORTING WATER

Now, similar to how you imported the fox animation, you want to do the same thing with the water animation: import it as an image sequence. With this, make sure that the PNG Sequence box is checked when you import your image.

![](<Screen Shot 2016-04-11 at 2.39.33 AM.png>)

As usual, drag your water image sequence into your master composition. At the same time, I'm going to import the foam in as well. The foam (the bifrost sequence) will be the layer on top of the water.

Once you import the foam, you'll see that the foam composition is much smaller than our master composition. To fix this, I'm simply going to click on the layer and scale it up, like so:

![](resize.gif)

This will create a bit of pixelation in your image, but we'll fix this later with a blur.

You might notice that this goo-ish water image overlaps with your entire scene and doesn't entirely make sense. You will want to rearrange the time in which the water begins. To judge this, I turned the visibility of my fox and shadow back on. Once the fox looks away, I want the water to come rushing in and knock the fox away.

To move the image sequence, I simply click and dragged the bar corresponding to it to the time in which I want the water to hit the fox.

![](clickdrag.gif)

This is how my composition looks now:

![](h2o.gif)

Note that I also started the fire a bit earlier, which is why you don't see the fire erupt when the fox comes in.

Clearly, the color of the water is very, very off. So, to account for this, I'm going to adjust the opacity of both the water and the foam and go to the Color Correction menu. On the water layer, I used Selective Color so I could get a blue-ish undertone and changed opacity to about 80%. On the foam layer, I used Selective Color, Brightness & Contrast, and Gaussian Blur, the latter of which I used to emphasize movement in the water and hide the pixelation. Here's a still of what I have so far:

![](<Screen Shot 2016-04-11 at 4.30.15 AM.png>)

Remember that these are all only suggestions! Feel free to get creative with this.

## FINAL TOUCHES

Since we're nearly done, this part is optional. But here are the things I'll be going over and fixing before exporting the film:
Making the fire dissipate  
Animate the clouds moving  
Have the flag continue to remain standing until the water clip ends

Now, you can easily cut your film a bit short and export it exactly when the fire and flag suddenly disappear. Instead, I'm going to work around this and, instead, first make the fire dissipate.

Since fire tends to disappear upwards I'm first going to move my anchor point (by pressing Y and clicking and dragging the circle at the center of the composition) to the top of the flame, like so:

![](fireanchorpoint.gif)

![](<Screen Shot 2016-04-11 at 12.45.58 PM.png>)

As I stated before, you can toggle animation on and off by clicking on the stopwatch. So, now that my anchor point is where I want the fire to disappear at, I'm going to toggle animation ON (clicking on the grey stopwatch to make it blue) for my Scale Tool, set a key where i want the fire to begin to shrink, and another key where the fire should shrink to 0.

![](scalekeys.gif)

Notice how, when I change the value of the Scale Tool, Ae automatically creates a new key for me where my Time Indicator is at.

This is how my fire looks now:

![](scalefire.gif)

You can adjust timing as you'd like by clicking your individual keys and dragging them left or right across the timeline. After all, remember that, arguably, the most important part of animation is timing.

After I'm done with that, I'm going to animate my clouds. To access my clouds, I'm going to double-click on my mattepainting Composition Layer, which will open up a new tab in my Project window:

![](<Screen Shot 2016-04-11 at 1.06.36 PM.png>)

This part may already look familiar to you, as we opened this up earlier to adjust our Hue/Saturation 1 layer.

Unfortunately, I didn't label the layers with different names (this is also why naming things in Maya and other programs is really, really helpful!), but I know that my cloud layer is going to be Layer 2.

After selecting Layer 2, I'm going to move my Anchor Point upwards so that it lies in the center of all my clouds:

![](<Screen Shot 2016-04-11 at 1.10.22 PM.png>)

Now, I'm going to animate the Position of the clouds by, again, toggling the stopwatch symbol on, setting a key at the very beginning of my clip and at the very end. This is what I ended up with:

![](<Screen Shot 2016-04-11 at 1.18.59 PM.png>)

As you can see, all I did was change the x value of the position. Because it is a large x value, there will also be a long translation over time, and I am able to successfully have my clouds move slowly across the screen.

Finally, as a last touch, I'm going to keep my flag on the screen rather than simply cutting my film short. Unfortunately, as the flag disappears at the same time with the fox, we are unable to time remap the PNG Sequence. The way I plan to approach this is to duplicate the file. Now, on the new, duplicated layer, I'm going to add a layer mask in it by going to Layer > Mask > New Mask.

![](<Screen Shot 2016-04-11 at 1.36.58 PM.png>)

Now, I'm going to be utilizing the Toolbar menu again and select the Eraser Tool.

![](<Screen Shot 2016-04-11 at 1.39.00 PM.png>)

Here, I'm going to open up my layer attributes, open up the Masks menu, and double-click the Mask 1 attribute. Something like this should pop up:

![](<Screen Shot 2016-04-11 at 1.41.59 PM.png>)

Under the Layer menu (the tab that holds the blank background with the fox and flag), you will be able to edit your layer mask. My goal is to fully erase the fox: I'm going to use the Eraser tool over the fox, scrub through the clip, and erase any other remaining parts of it. Note that you can change the size of your Eraser tool in your Brushes tab, simply by increasing the diameter of your brush.

![](<Screen Shot 2016-04-11 at 1.45.16 PM.png>)

![](eraser1.gif)

Finally, now that I've scrubbed through and erased all traces of the fox, I'm going to move the time at which this layer begins to the end of the original fox clip.

![](<Screen Shot 2016-04-11 at 2.11.39 PM.png>)

When you play back, however, you'll see that there is a jagged, obvious disjunction between the two clips. To solve this, I'm going to crop the beginning of my flag clip (labeled as 4 in the screenshot above) and try to match it up with the end of the flag. This part may be a little tedious, but I promise it's worth the result! Keep scrubbing back and forth, and remember to erase traces of your fox if it keeps popping up. This is how my clips align:

![](<Screen Shot 2016-04-11 at 2.22.04 PM.png>)

# ADDING SOUND TO YOUR FILM

As you are finishing up your film, you may want to add sound effects. You have two options:  
You can record your own sound effects  
You can download sound effects from the internet

Regardless of what you do, you need to make sure that your sound does not exceed the orange/red spots on the graph (-3.0 to 0.0); otherwise, there will be a strange fuzziness and your sound will start clipping. So, a safe number to stay at would be about the -12.0 to -9.0 (green to yellow-green) range. Make sure ALL your sounds are at around this same range unless otherwise told. Use your Audio manager on After Effects to manage this:

![](<Screen Shot 2016-04-11 at 2.50.56 PM.png>)

Another tip in adding sound to your film: do NOT have silences in your film, unless you have consulted with your facilitator about this and it is intentional. Otherwise, you would want to find a background sound to your film. For example, if your film takes place in a forest, some sounds you may hear would include leaf rustling, wind, and birds chirping.

Here are a few websites I recommend in using and have done the job for me:  
https://www.freesound.org  
http://soundbible.com/  
http://www.audiomicro.com/  
http://www.soundsnap.com/  
http://www.flashkit.com/soundfx/

# EXPORTING THE FILE

Now that you're finally finished with compositing your short, you should export your film. To do so, go to File > Export > Add to Adobe Media Encoder Queue. In the program that opens, make sure that the export settings for your file are using H.264 file format. Once you're done checking the options, select your filename in the Adobe Media Encoder and press enter or File -> Start Queue.

Finally, you should have your final movie rendered! If you have any trouble with playback, please let us know by posting on Piazza or e-mailing us at staff@ucbugg.com. Congratulations on finishing your first 3D animated film!
