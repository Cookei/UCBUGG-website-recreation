# INTRODUCTION

In this lab you'll learn how to animate a pendulum. To follow along, use **follow_along.mb**

[advanced_anim.zip](advanced_anim.zip)

When I say a pendulum I mean something like this: a base, and a chain that responds to the movements in the base.

![](pendulum_pic.png)

This will allow us to practice overlapping action.

So let's say we have the following:  
![](left_motion_pendulum.gif)

How would the chain behave? Let's start with the top of the chain and work our way to the bottom.

# CREATING BELIEVABLE MOTIONS

As the platform moves left, the chain will actually rotate opposite the motion, dragging behind due to inertia. It should look something like this:

![](left_motion_pendulum_step1.gif)

But what about when the pendulum base slows down and stops? Well then we go to Newton. Objects in motion want to stay in motion, so the pendulum will swing back the opposite way. So we get something like this:

![](left_motion_pendulum_step2.gif)

The chain will then continue to swing back and forth until it loses most of its energy.

![](left_motion_pendulum_step3_2.gif)

Great. Now that we're done with the first link in the chain, it's time to do the rest of the links.

We could go through and animate them by hand the same way we did the first one, but let's try to be more clever. Every successive link in the chain will be moving in the same way as the previous link, but offset by some time delay and damping factor.

Please note that your base rotation curve doesn’t need to look exactly like mine: do whatever looks the most realistic to you. Copy-paste your curve from the first link into the second link.

![](copy_pating_link1_to_link2.gif)

Let's see what that looks like by hitting play.

![](left_motion_pendulum_step4.gif)

# (DE)AMPLIFYING CURVES

To me, that looks a little too intense. Let's deamplify the second links rotation. I do this by selecting the curve and typing in _=.5 in the second stats box. _=.5 means "for all the selected keys, multiply their magnitude by .5. This deamps our curve by half.

![](deamp_second_link.gif)

Notice you can type in anything, it doesn't have to be .5. If you want your curve to be a quarter of it's former amplitude just type in .25. If you want to double the amplitude just type in 2.

This is what it looks like now.

![](left_motion_pendulum_step5.gif)

# SHIFTING FRAMES

Notice, however, that right now we have a 1 to 1 relationship between the rotation in the first link and the second link. What I mean is that just as the first link starts rotating clockwise, so does the second link. To create a more realistic flowing motion, let's offset the rotation of the second link by a couple frames.

![](shifting_second_link_curve.gif)

Notice that I shifted it over by 2 frames. But you can do as many or as little as you like based on what you're looking for. Less frames makes it more rigid, more frames makes it more flowy.

So now we have this.

![](left_motion_pendulum_step6.gif)

Now let's repeat the process for the last link. In other words

1. Copy the previous link's rotation into the new link.
2. Deamplify it in the new link if you think it's too big.
3. Shift it over by a couple frames

This is what my final version looks like.

![](pendulum.mp4)

# HOMEWORK

In pendulum_assignment.mb you'll find an already animated pendulum base.

![](pendulum_assignment.gif)

Your job is to animate the chain below it. I'd approach this assignment by animating the first link of the pendulum for the whole scene and then just doing the copy paste deamplify offset procedure from up above.

If you're unsure about how a pendulum would move, I'd suggest checking out this video.

![](reference.mp4)
