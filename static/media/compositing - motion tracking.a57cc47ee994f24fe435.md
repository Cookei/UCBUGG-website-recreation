# INTRODUCTION

As explained during lecture, compositing is the part of the post-production pipeline in which one would compile all their different images and video layers together in order to create one cohesive film. Compositing comes in handy when you need to save time and when you need a way to "cheat" your special effects.

There are a few different compositing programs you can explore, but for the sake of this course and free software access, we'll be using Adobe After Effects. You can download the program at: https://software.berkeley.edu/. This lab was written for After Effects CC 2018, but the same functions exist in later versions of the program as well. Please contact a facilitator if you have any download or installation issues.

In this lab, you will learn how to use After Effect's motion tracking capabilities to do a quick photo replacement. After completing this lab, you should be comfortable enough with using motion tracking in your own shorts to perform actions such as screen replacements or adding signs to walls. The UCBUGG Basic section may use this lab as an "extra credit" replacement for a missed lab.

I will assume you have some basic familiarity with the After Effects interface, but in general this lab can be completed without any prior After Effects knowledge. If you would like a refresher on the interface, read through the first few sections of our Compositing - Layer Management lab.

[DOWNLOAD THE LAB HERE](https://drive.google.com/file/d/1pGB8xeVQTX8Odhlg6WIEwXlVwHcPOulO/view?usp=sharing)

# PROJECT SETUP

Included in the lab download are two files: Nickelstats.mp4 and spacesinfilepaths.png.

Nickelstats.png  
![](Nickelstats.png)

spacesinfilepaths.png  
![](spacesinfilepaths.png)

In this lab, we'll be creating our own version of the [Look at this Graph meme,](https://www.youtube.com/watch?v=sIlNIVXpIns) a spoof of Nickelback's [Photograph](https://www.youtube.com/watch?v=T3rXdeOvhNE) song.

If you want to forgo these files and use your own instead, please feel free to do so (go ahead and replace the files now)! However, you will only recieve extra credit for a .mp4 submission outside of your group short (ie you may not use your group project as a stand in for this lab).

## IMPORTING YOUR FILES

Let's begin by setting up our project files in a new project. In your After Effects window, start by saving your project in the lab folder using File > Save or CTRL/CMD + s. As with Maya, you should remember to **SAVE OFTEN**!

Now, let's import Nickelstats.mp4 and spacesinfilepaths.png. You can do this in a few different ways:

- File > Import > File...
- File > Import > Multiple Files...
- Dragging and dropping

Your Project tab should now look like this:

![](001.PNG)

> (!info)
> Pro tip: The Nickelstats.mp4 video is very repetitive and the music can quickly become very annoying. Go ahead and mute the sound since it won't be an important part of this lab.

![](001_mute.png)

## CHANGING YOUR WORKSPACE

In After Effects, much like Maya, you can change your workspace to have quick access to different menus, depending on what you need. For this lab, we'll be using the Motion Tracking workspace. To enable it, click these arrows on the Tools panel:

![](002.png)

Select Motion Tracking in the menu that opens. Now, you should be able to see a panel called Tracker on the right hand side of your interface:

![](003.png)

This Tracker panel will allow us to perform different kinds of motion tracking! We'll be learning how to use it in the following sections.

# TRACKING THE VIDEO: TRANSFORM

To create our own Nickelstats meme, we'll need to first track the picture frame. The video cuts a few times, so we'll need different trackers for these different shots. Let's perform a simple Transform tracking first.

## CREATING THE TRACKER

Add the Nickelstats.mp4 to your timeline. This will create an associated Nickelstats composition. Adjust your work area to the just the first shot in the video:

![](004.gif)

The beginning of the shot begins with a fade in and we don't actually see the photo frame, so we can't track from the very beginning of the video. Instead, I keep my Time Indicator at the end of the current Work Area, so we can track from the last frame to the first:

![](005.png)

Go to the Tracker panel and change the Motion Source from None to Nickelstats.mp4. Next, select the Nickelstats.mp4 layer in your Timeline. With the video selected, click the Track Motion button.

![](006.png)

You should see some new options appear in the Tracker panel.

![](007.png)

By selecting "Track Motion," you created a new tracker called Tracker 1. It should have the track type Transform and by default have the Position option selected. Since the photo frame in our video changes both position and rotation, we want to check the Rotation option as well. Now, if you look at your Nickelstats.mp4 Layer video, you'll be able to see two tracker points.

![](008.png)

Each Tracker Point has a box on the inside, a box on the outside, and a crosshair in the middle:

![](009.png)

The box inside is called the _feature region_. This is the region that should contain some element, or feature, in the video to be tracked. It (the feature) should be distinguishable and trackable (ie, not disappear throughout the video) for best results. This is where contrast is incredibly important - the feature you want to track should be easily identifiable.

The box outside is called the _search region_. This is the area that After Effects will search to locate the tracked feature. If the search region is too small, After Effects might not be able to find the right feature to track between frames. On the other hand, if your search region is too large, it will take a long time to search. Note that your feature of interest should be unique within the search region, but not necessarily within the entire frame.

The crosshair in the center is called the _attach point_. This is where a _target_ that follows the movement of your tracker will be attached. In our case, the target will be the spacesinfilepaths.png layer we will add later. For now, let's focus on setting up our feature regions and search regions correctly.

> _Note:_ A set of tracker points is called a tracker! You can change the name of your tracker by clicking on the Options button, then renaming your tracker.

![](015.png)

Before you continue, remember to save!

## EDITING THE TRACKING POINTS

Let's play around with adjusting the tracking points. You can move the entire point by clicking and dragging in the spaces in the tracking point, or change the size of the feature and search regions by clicking and dragging on the boxes.

![](010.gif)

After you feel comfortable adjusting the tracking points, let's actually set them up on the two top corners of the (photo)graph.

> _Note:_ You can easily pan in After Effects by clicking and dragging using the middle mouse button.

![](011.gif)

Notice how, since this video is relatively short, I use some pretty large feature and search regions. You can always adjust the size of these regions later.

> _Note:_ Remember to save!

## ANALYZING THE MOTION

Now it's time to analyze the motion in our video.

![](012.png)

This step tells After Effects to search for pixels matching the feature region frame by frame. Since my time indicator is at the end of the clip I want to analyze, I'll select one of the two analyze backward options. You can either analyze just one frame at a time, which is useful for debugging between frames, or all the frames in the backward/forward direction. Generally, you'll want to begin by analyzing a large chunk of your video, then going back and updating frames where the tracker might have failed. So, I'll start by simply analyzing backward:

![](013.png)

I stop analyzing when the (photo)graph exits the frame:

![](014.png)

Since the tracker takes a while to analyze, I'll save again just to be safe.

This is where you should check if your tracker has done a good job or not, and where your results might not match mine. Here are some tips for fixing some common issues:

- If your tracker point(s) suddenly jumps to a different location, that might be because your search region or feature region was too small and the feature exited the search region between frames. In this case, After Effects had to guess the most similar feature in its search region to the feature you wanted, and it chose something that wasn't quite right. Enlarge your search region and analyze the clip again.

- If your tracker point(s) is flying around, it might be because there is not enough contrast to make the feature in your feature region very distinguishable. But you might be able to circumvent the issue by tracking some other feature with the same movement you want, then setting the attach point to be at the desired location. Unfortunately, if your frames simply do not have enough contrast, this might mean rerendering them.

- If your tracker point(s) is flying around, it might be because you have some options selected that don't make sense for the video you are trying to analyze.

  ![](015.png)

  Try adjusting the options in the resulting pop-up box, then analyze the clip again.

- If you feel like you're losing the tracking data every time you click away from your video layer and back, it might be because you have the wrong tracker selected. You can see a list of all your trackers under the Current Track dropdown. You might even have a few extra trackers that were made on accident - simply delete the ones you don't need by selecting it in the layer's properties as if it were an effect:

![](016.png)

![](<Once you're satisfied with the tracking, it's time to move on to adding our spacesinfilepaths.png>)!

## MOTION TARGETS

![](<In this section, let's a new layer (spacesinfilepaths.png>)) which will follow the motion track we just created. First, add it to the composition timeline.

![](017.png)

Adjust the layer so that it only plays for the duration of our current work area.

![](017_2.png)

Select your Nickelstats.mp4 layer and the tracker (in the Tracker panel) again. Click the Edit Target button under Motion Target:

![](018.png)

And select the layer you want to apply the motion to.

![](019.png)

Hit OK. Then, in the Tracker panel, hit Apply to apply the effect.

![](020.png)

In the Motion Tracker Apply Options pop-up box, apply both the X and Y dimensions and hit OK. You should now be taken back to the Nickelstats composition, where you can see that the spacesinfilepaths.png is now tilted at the same angle as the (photo)graph!

![](021.png)

Save, then go ahead and watch how your video looks so far.

## FINAL ADJUSTMENTS

Lastly, it's time to actually place spacesinfilepaths.png in the correct location on the picture frame and give it a fade in effect to match the rest of the video.

To move the spacesinfilepaths.png, simply adjust its anchor point position. You can also adjust its scale!

![](022.png)

And finally, let's have spacesinfilepaths.png fade in with the the rest of the video. Key its opacity, and have it change from 0% to 100%. You don't need to be very precise about this part to get a good look since the video is very quick.

![](023.png)

Ta-da!!! You have now learned how to use trackers in After Effects and completed the most important section of this lab.

![](Nickelstats_part1.gif)

In the following section, we will continue motion tracking on the next shot in Nickelstats.mp4 - this time using a different tracker, the perspective corner pin.

# TRACKING THE VIDEO: PERSPECTIVE CORNER PIN

In this section, we will motion track the next shot in Nickelstats.mp4 using the perspective corner pin tracker. In reality, since this lab is so simple, you could simply use the same technique we just used to complete this section as well, but it's good to learn new tools. The perspective corner pin is a more powerful tool that will let you track four points (instead of one or two). To use it, we will follow the same steps as before.

## CREATING THE TRACKER

Before creating the tracker, adjust the size of the work area to match the duration of the second shot. Then, select the Nickelstats.mp4 layer and click the Track Motion button. This will create a new tracker! Since I renamed my tracker from the previous section to "Transform," my new tracker was automatically named "Tracker 1". I'll change its name to "PerspCornerPin," so my list of trackers looks like this:

![](024.png)

Change the Track Type to Perspective corner pin. You should now see four track points.

![](025.png)

## EDITING THE TRACKING POINTS

As before, move the tracking points so they each track a corner of the photo frame. Mine looks something like:

![](026.png)

## ANALYZING THE MOTION

As before, let's analyze the motion in the clip. Depending on where your time indicator is, you'll have to analyze either forward, backward, or both. Mine was at the end of the clip, so I analyze backwards again.

![](027.gif)

Once you have a tracking motion that you like, we can proceed to adding a motion target.

## MOTION TARGETS

Since we've created a new tracker, we'll need another spacesinfilepaths.png layer to add our motion to. As before, add spacesinfilepaths.png to the composition and set its duration to be the size of your work area. Unfortunately, you might notice that your layers all share the same name as the source of the layer:

![](028.png)

This might be very confusing to work with, so we should rename the layers to something that makes more sense. You can do this by clicking the tab that says Source Name, right clicking the layer, and renaming it:

![](029.gif)

Now, let's specify the new layer as a motion target.

![](030.png)

Click apply in the Tracker Panel to apply your tracker, and watch how awesome your clip looks!

## FINAL ADJUSTMENTS

Here's what my clip looks like (in slow motion):

![](Nickelstats_part2.gif)

Overall, the tracker is doing pretty well! There's just two noticeable flaws in my video: firstly, Chad Kroeger's fingers are a bit covered by spacedsinfilepaths.png; secondly, near the end of the video, spacesinfilepaths.png stretches a little in the top right corner. Since this lab is a simple demonstration of motion tracking, having this in your submission is perfectly fine!

If you really want to clean up your video, there are some tricks you can do. To fix the photo covering Kroeger's fingers, create a mask on spacesinfilepaths.png and key it to move with the fingers. [Here is a pretty good introduction to masking in After Effects.](https://www.youtube.com/watch?v=Ymrzv7EH0qs) On the other hand, to fix the little stretch on the top right hand corner of the replacement, you could try 1) adjusting the loction of the tracking pin in that corner, then reanalyzing the video; 2) manually changing the tracking pin's keyed position in the frames that look off; 3) tracking the outer edges of the photo frame instead, then scaling down the spacesinfilepaths.png layer; 4) learning how to use the (free, included with your AE download) Mocha AE plugin to perform some super advanced motion tracking and rotoscoping ([here's a super advanced example](https://www.youtube.com/watch?v=G7V0Mu9YyiY)); 5) any other fixes you can think of!

Since the Nickelstats video is pretty simple and there's not much change in the photo frame's perspective, it's hard to see the full power of the perspective corner pin versus the transform tracker. However, for most cases involving screen/sign/billboard/etc. replacements, I recommend using this method to ensure your replacement matches the perspective of your renders.

# FINAL TIPS

Now, you should be done motion tracking the most important parts of the Nickelstats video. I highly recommend you try to track the last shot of the video on your own, to really check you understand how to use trackers. The challenge here is to figure out what points to track, since the photo frame is cut off and very out of focus in this shot!

In addition, I recommend adjusting your motion target images/videos to integrate them more believably in your composites. Consider color correcting your image/video to match lighting, or overlaying a gradient layer with some blending mode that suits your needs. In the case you would like to replace a digital screen, consider adding a vignette and/or changing the blending mode of your replacement so screen glare can show through. If your object is in the foreground, you could add a blur effect to your image/video that will mimic an out-of-focus effect.

# SUBMISSION

For this lab, your submission should be an **.mp4 file of your final composite, with the naming format: Section_motiontracking_LastnameFirstname.** Since this is an extra credit assignment, please also indicate on the bCourses submission page which lab you would like to make up for.

Before exporting your video, make sure that your file is ready to go. Watch your video once, checking to make sure that your sounds are unmuted and that there are no missing frames.

To export, go to File > Export > Add to Adobe Media Encoder Queue.

![](032.png)

This should automatically open the Adobe Media Encoder software, which should have been automatically downloaded when you downloaded After Effects. If you do not have this program, simply open your Adobe Creative Cloud software and download it. Make sure you download the same version as your version of After Effects, as otherwise your programs won't recognize each other!

The Adobe Media Encoder might take some time to open, so be patient and avoid spamming multiple export commands. Once it opens, check your export settings and make sure that you are using the **H.264 file format**. Once you're done checking the options, select your filename in the Adobe Media Encoder and press enter or File > Start Queue.

If you have any questions please let us know by posting on Piazza or emailing us at staff@ucbugg.com. Congrats on finishing the lab!
