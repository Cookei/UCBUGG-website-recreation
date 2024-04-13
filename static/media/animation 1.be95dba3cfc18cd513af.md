# INTRODUCTION

In this lab you'll get familiar with the graph editor and set up your Maya work space. At the end you'll have all the tools you need to do your homework: a bouncing ball.

[basic_anim.zip](basic_anim.zip)

# SETTING UP MAYA

1. Click the running guy at the bottom of Maya. This will bring up the animation preferences
   ![](running.png)

2. Make sure playback speed is set to 24 frames per second (fps). This means that for every 24 frames, a second of animation occurs.
   24 fps is the animation industry standard.
   ![](2.png)

3. In the left categories menu, go to Animation under Settings. Under tangents, make sure you're defaulting to weighted tangents. Also make sure in and out tangents default to flat. We'll explain these settings later.

![](3.png)

# UNDERSTANDING THE GRAPH EDITOR

1. To get to the graph editor: Windows -> Animation Editors -> Graph Editor

2. What is this?

The graph editor plots the motion of an object against time (frames) and allows us to play with that motion.
If you don't have any objects selected the graph editor should be empty like this:
![](2017.png)

3. What's the yellow bar?

To understand the yellow bar, we need to understand the time slider at the bottom of Maya.

![](9.png)

The start number is the frame at which your animation begins when you hit the play button.  
The end number is the frame at which your animation ends when you hit the play button.  
If you only want to see frames 35 to 177, change start to 35, and end to 177.

To change the frame you're on you can either change the current number. Or simply left click drag across the timeline itself. Notice, that as you left click drag your mouse across the timeline, the red bar in the graph editor is moving. The red bar is the frame you're on.

![](timesliderredline.gif)

4. How do I get anything on the graph editor?

First, create a cube from the polygons menu.

![](10.png)

With the cube selected, open the graph editor (if you closed it).

![](11.png)

On the time slider, make sure you're at frame 1. You'll notice that the red bar is now at frame 1 as well.

Now let's say, at frame 1, we want the box to be on top of the grid, like the grid is the floor. Use the move tool and move the box on top of the grid.  
![](12.png)

With the box selected, hit S. This will make a "key frame" at your current frame (should be frame 1). By hitting S, what we're saying is: "at frame 1, I want this box to be here"  
![](13.png)

A few things happened.  
At 1, we have a red tick mark at frame 1. This means that for whatever we have selected, we have a key frame at that frame.  
At 2, our channel box has turned red. This means that we have "keyed" aka set those attributes of the box at the current frame.  
At 3, the graph editor sensed that we made a key for all those attributes aka channels.

Now lets say we want the box to move up in the air for half a second.

Move to frame 12 (24 frames in a second, therefore 12 frames is half a second) on your time slider.  
Use the move tool to drag your box up in the Y direction.  
Hit S.  
You should now have two key frames. One at frame 1 (Box on ground), and another at frame 12 (Box in air).  
Hit play.  
![](boxUp.gif)

Now you have an animation. Lets check out what the upward motion of the box looks like in the graph editor.  
Since the upward motion was a translation in Y, go to the Translate Y channel in the graph editor (make sure your box is selected).  
![](BoxUpY.gif)

Lets look at this.

1. As time passes, the red bar goes forward in time, indicating that we're moving forward in frames.
2. The graph has two black dots which are the keys we put in at frame 1 and frame 12.
3. The graph has a green curve called a spline connecting the keys.

Ok cool, but why do we care about this graph? Again, on the x axis we have frames, and on the y axis we have magnitude.  
So lets say we want our box to go higher. Just grab the key at frame 12 and move it up (with the move tool selected)  
in the graph editor by left click dragging or middle mouse button dragging. To make sure the key only moves in one direction, hold down shift while moving.

![](boxUpHigher.gif)

Now lets say we want the box to reach that height, but later, like after a second. So lets drag that frame 12 key frame to frame 24.

![](blockUpSlow.gif)  
Can't see your whole animation? Make sure your time slider goes at least to frame 24.

Now lets say we want the box to go down, then up.

1. Go to frame 12
2. Drag the box down to where you think the box should go down to.
3. Hit S

![](yo.gif)

Notice how we now have a new key frame at frame 12 on the graph editor that's at a lower magnitude than the initial key frame at frame 1.

So now we know how to get our box somewhere at some time in one axis. But what if we want the box to do this up/down motion but also go forward?

Go to the translate Z channel. What's happening here?

![](1.png)

Why is the spline flat? Well, the box isn't moving in the Z axis. So the magnitude of the curve doesn't change.

Lets have the box come towards the +Z direction until frame 18. From my camera's perspective that's towards the viewer.

![](Animation.gif)

Stacking splines on top of each other like this to get the motion that you want is 3D animation at its core.

# PLAYING WITH TANGENTS

Changing the time and magnitude of key frames isn't all that we can do in the graph editor. We can also change the curvature of the graph by playing with tangents.

What's a tangent again? Its the small grey nodes that pop up in the graph editor when you select a key frame. The tangent allows you to manipulate the spline .

![](7.png)

Unweighted tangents can't be pulled in and out, just rotated.

![](unweightedTangent.gif)

On the other hand weighted tangents allow you to pull them in and out.

![](weightedTangent.gif)

This gives us more control over the curve. Hence, in the first part of the tutorial we set the default tangent type to weighted!

How do you manipulate the tangents?

![](unlocked.png)

Notice the tangent has two sides. To play with a tangent around a key, select the key and then select one side of the tangent handle. Then left click drag or middle mouse drag to rotate and pull out the tangent handles.

![](selectingdifferntsidesoftangent.gif)

As you can see from this gif from up above, when you play with one of the tangent handles, the other one goes with it. In other words, playing with one side of the tangent messes with the graph on both sides of the key frame.
![](weightedTangent.gif)

But what if you want to only modify one side of the graph? Break the tangent handles by right clicking while having a tangent handle selected and hit Break Tangents.

![](breaktangents.gif)

Don't think you have enough control with your current key tangents? Add another key right in the graph editor by navigating to the frame you want add the key on in your timeline, selecting your curve, right click -> insert key.

![](insertkey.gif)

A great test to see if you have your tangent operations down is to create a spline in Paint or on paper and see if you can replicate it in your graph editor. Let me show you what I mean. Lets say I want to replicate this curve.

![](splineDrawing.png)

Here's video of me doing it:

![](spline.mp4)

# HOMEWORK, PART 1 OF 2

The first part of your homework is to generate a graph for this curve below starting from the key I set in the translate Y of the box at frame 1.

![](Homework.png)
Once you open up spline_tracer.ma you should see this.

![](spline_tracer.png)

Your job is to turn that into the curve above just like I did with the previous curve in the youtube video. Don't worry about the box. It's just there so you have something to attach the curves to.

# CURVES

Now that you know how to manipulate curves. What do they actually mean? Lets take a look at a few curves and see if we can describe the motion of an object just by looking at the graph.

1. ![](linear.png)

An object with a linear graph like this is moving at a constant rate. It's not slowing down or speeding up anywhere on this interval.

![](linearBall.gif)

2. ![](slowin.png)

An object with a graph like this is slowing into a stop. You'll notice that as you get closer to the end of the interval your position is changing less and less.

![](slowin.gif)

3. ![](slowout.png)

An object with a graph like this slows out of a stop into some type of motion. In other words, the object is accelerating.

![](slowout.gif)

Using the three up above, can you tell why the ball moves the way it does for the curves in this gif?

![](3ornjK3itVx9NZ3WUM.gif)

# HOMEWORK, PART 2 OF 2

The second part of your homework is to animate a ball falling from a height. Your job is to make sure that the ball dissipates energy correctly until it comes to a stop naturally.

In case that isn't clear, here's what I submitted when I had this homework assignment. You only have to do one ball, but it can be any type of ball.  
If you're feeling overwhelmed, your ball doesn't have to move horizontally. However, it would be pretty hard to drop a ball and have it only move vertically.

![](sample.mp4)

left to right: bowling ball, basketball, ping pong ball, beach ball

Approach: Here's how I'd approach this assignment.

Step 1: Study reference footage

Before you jump in and start animating, it’s always best to look at videos of what you’re animating. It’s even better if you can shoot a live-action video yourself, so you can incorporate the specificity you want in your animation. Also, keep in mind that animation is typically about 30% faster than live-action footage, so make sure you adjust your timing accordingly.

Here’s some reference footage I found for bouncing balls:

https://youtu.be/01cm7H1QoJg (height and timing)

https://youtu.be/dEMjMFD_XaU (spacing)

https://youtu.be/zd2V4_FNMls (squash and stretch)

You can also try playing videos on YouTube in slow motion or press the < and > keys to go frame by frame.

Step 2: Understand the rig

I like to play around with each controller until I understand what they do and know which ones I’ll need.

![](ball_rig.png)

The large yellow rounded square is the master controller. This is typically used for initially positioning your object in the scene. We’re not going to put any animation or keyframes on the master controller. Why not? Say we animate our ball bouncing to the right, but then we find out that we placed the ball on the wrong end of the scene and that it was supposed to bounce to the left. If I had set keys on the master controller, then I would have to either change a lot of my animation or deal with constraints and a new controller. If I didn’t set any keys on the master controller, then I can just move and rotate it to reposition my entire animation!

The blue circle is the main controller. This is what we’ll use to animate the ball’s motion. When we think about applying the bouncing ball to character animation, we’ll often think of the hip as a ball. This controller would correspond to a hip controller on a character.

The green squiggly circles squash and stretch the ball. You can move them to the sides too.

The red rounded square inside the main controller is the rotation controller. Why don't we just use the main controller for rotation? When we rotate our main contoller you will see that the squash and stretch controllers rotate with it. This is not ideal because we want the ball to roll while still just squashing up and down, so we have this controller which rotates the ball without rotating the squash and stretch controllers.

The dark blue circle that goes from the top to bottom of the ball serves the exact opposite roll of the rotation controller. This controller will just rotate the axis of the squash and stretch. We won't be using this controller much but it would be usefull in a situation where the ball was boucning off of a wall and we needed to make it squash along the x or z axis instead of the y axis.

Step 3: Get the vertical motion down for the ball

This might be the most important step. You can usually tell how heavy something is just by watching its vertical motion. This is where I tend to spend most of my time.

I can figure out the timing of each jump down by just setting keys at the top and bottom of each bounce. The amount of bounces required to dissipate the ball’s energy will depend on how high the ball started and what kind of ball it is. A tennis ball would bounce more times than a bowling ball.

To get an idea of the spacing we should have, let’s look at this image from The Animator’s Survival Kit:

![](ask1.png)

The ball should ease in and out of each high point, which is why there are more drawings in the high parts of this drawing. It should also accelerate as it approaches and leaves the ground. We can achieve this by editing our tangents in the graph editor. Here’s what my curve looks like:

![](ty_curve.png)

As with timing, spacing can look pretty different depending on the type of ball you are using. Here’s my animation so far:

![](vertical_NEW.gif)

Step 4: Squash and Stretch

Here’s another image from The Animator’s Survival Kit that demonstrates squash and stretch:

![](ask2.png)

You’ll notice the ball is a perfect circle at the top of each arc. It stretches the most on the frames before and after impact, and it squashes on its impact frames. Try not to get carried away with too much squash and stretch. It’s best if it’s something that you feel but don’t really notice or get distracted by when you watch it. Here’s what my ball looks like with squash and stretch:

![](squashandstretch_NEW.gif)

Step 5: Horizontal motion

I want my ball to move horizontally at a mostly constant speed. To do this, I only need two keys on my translate Z curve, one at the start and one at the end. I want my ball to roll to a stop, so I’ll put some ease in to the second key. Here’s what my translate Z curve looks like:

![](tz_curve.png)

Here’s a neat trick that can help you check your arcs. Select the ball’s main controller (the yellow one), and go to the Animation tab in the shelf and press this button:

![](motiontrail1.png)

This gives you a nice visual representation of your animation in your viewport:

![](motiontrail2.png)

You can also move those white dots around to edit your keyframes if you like.

Just make sure you hide or delete the motion trail when you’re not using it because it can slow down your playback speed.

![](horizontalmotion_NEW.gif)

Step 6: Rotation

The ball’s rotation will slow down at about the same speed as its horizontal motion. My ball’s rotation curve looks almost identical to its horizontal translation curve. You can judge whether you have the right amount of rotation by whether it looks like your ball is rolling or sliding at the end.

![](rotation.gif)

For more practice, try animating a bowling ball or a beach ball. They’ll really give you a sense of how weight can change timing and spacing. Don’t forget to study reference footage.

Now go to the Playblasts Lab and make a video of your animation!
