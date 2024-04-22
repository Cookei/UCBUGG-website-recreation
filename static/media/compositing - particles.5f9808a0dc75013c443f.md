# INTRODUCTION

As explained during lecture, compositing is the part of the post-production pipeline in which one would compile all their different images and video layers together in order to create one cohesive film. Compositing comes in handy when you need to save time and when you need a way to "cheat" your special effects.

There are a few different compositing programs you can explore, but for the sake of this course and free software access, we'll be using Adobe After Effects. You can download the program at: https://software.berkeley.edu/

In this lab, you will learn how to use After Effect's particle playground to create a scene containing some stylized snow. After completing this lab, you should be comfortable enough with using particles in your own shorts to create effects such as rain, snow, sparks, or even a flock of birds.

I will assume you have some basic familiarity with the After Effects interface. If you would like a refresher, read through the first few sections of our Compositing - Layer Management lab.

# PROJECT SETUP

Let’s start by downloading the lab files - the only external file you will need is **snow_day.exr**, an OpenEXR image file of the background we are going to composite onto.

[snow_day.exr](snow_day.exr)

Open a new After Effects Project File and create a new Composition - there should be a graphic for **New Composition** displayed pretty prominently in the UI, but if not, navigate to **Composition > New Composition**. Let’s rename our new comp _particles_, and update the settings so it looks like this:

![](comp_settings.png)

**Import** the media file we just downloaded by using **⌘+ i** or **CTRL + i** and drag it onto the particles comp icon in the Project Panel. You should see the snow_day.exr file appear in the project timeline near the bottom of your screen.

Finally, we’ll go to the **Layer** tab at the top of the screen and select **Layer > New > Adjustment Layer** - after creating this new layer, rename it _snow_ so we remember what adjustments are being made on that layer. We want to perform all our particle simulation on this empty layer so that we don’t make any permanent changes to our base layer footage!

![](create_adjustment_layer.gif)

# CREATING THE PARTICLE SYSTEM

Our project is all set up - now it’s time to make some snow!

To start working in our magical **s i m u l a t i o n**, we’ll first make sure our adjustment layer _snow_ is selected and then navigate to **Effect > Simulation > CC Particle World** (you will know that the correct layer is selected because otherwise the Effect tab will be grayed out).

This should create a very different situation in the viewport - you should see a black background and a blue floor grid (kind of reminds me of Maya!) and a new particle system in the middle of the screen. If you move the playhead of the timeline around a little, you can see what looks like a fountain of fireworks - very cool, but not quite the “shape” of the snowstorm we want. Let’s fix that!

![](particle_world_overview.png)

There are a few attribute tabs you can see within the Particle World effects window. Let’s start by looking under the **Producer** tab.

Here we see two main attributes - the XYZ coordinates for both **Position** and **Radius**. Let’s bump the X Radius to around 2.0 and the Y Radius to 0.0 - this should give us a nice spread-out pattern of particles. Adjust the Y Position to somewhere between -0.3 and -0.5 - this will push the simulation origin offscreen and give us a nice full frame of “snow”!

![](shape_out_ps.gif)

# CREATING THE SNOW (SHAPE)

The shape of our particle system is starting to come together, but the particles themselves are still a little out of place. Let’s fix the particle shapes next!

Back in our Particle World attributes window, let’s select the section labeled **Particle**. Select **Particle Type** - there are many options here that will give us some unique effects, but we want to select **Faded Sphere**.

Now let’s play with some of the sizing randomization parameters. Set the attributes for **Birth Size** and **Death Size** to 0.1. Set the **Size Variation** parameter to 75.0%, **Max Opacity** to 50.0%, and both the **Birth Color** and the **Death Color** to a solid white matte (the hex code for solid white in the color picker window is _#FFFFFF_). Now we’re working with snow! We can see there’s some pretty significant variance to the size of our snowflakes - this will help simulate perspective depth in our composite, suggesting that there is snow falling in both the **foreground** and the **background**!

![](snow_shape.gif)

# CREATING THE SNOW (PHYSICS)

The shape of our particle system and our individual particles now looks about right, but we still haven’t addressed the physics of our particles, namely how they interact with gravity. If you load up a few seconds of the simulation and play it back in real time, you will see that the particles fall very quickly and feel a little too weighty. We know that snowflakes are quite light - they don’t exactly fall down to the ground, it's more like floating. We’ll tweak the physics to address this.

Navigate to the **Physics** attributes tab. We want to make sure that the **Animation** drop-down is selected for **Explosive** (it should be this by default). Next, expand the tab under Physics labeled **Floor**. There is a parameter here for **Floor Position** - let’s drop that sucker like the Tower of Terror. If you bump that attribute to around 0.50, you should see the blue grid drop well out of frame - now we won’t see any snow particles halting and magically disappearing in frame. There is another tab here for something called **Floor Action** - we won’t be using it today, but this tab allows us to give the “floor” of our simulation collision properties that can interact with the particles in some fun ways. Play around with it if you want!

Next, find the tabs under Physics for **Gravity** and **Velocity**. Set the Gravity parameter to 0.01 and Velocity to 0.5. Immediately, you’ll notice that the particles seem to only fall a foot or two before disappearing in our simulation - this is because we’ve tweaked gravity to make them fall more slowly, but not the longevity of the particles themselves, so they’re “dying” before they can travel down the screen! To fix this, there should be a tab labeled **Longevity** near the top of the attributes window. Change the longevity to 10.0, and the particles should live long enough to travel out of frame before vanishing.

There is another attribute above Longevity called **Birth Rate**. As it is now, we should have the appropriate density of particles to simulate a light snowfall - however, we can increase this value and tweak the Gravity parameter once more to simulate something more like a blizzard. For now, let’s leave Birth Rate at its default value.

![](snow_physics.gif)

# COMPOSITING THE SIMULATION

Congratulations! You now have a pretty believable simulation of snow. Only one step remains - layering, or “comp-ing”, the adjustment layer onto our base footage.

To do this, we will use an After Effects feature to **pre-compose** the simulation into a new composition. This will bundle up all our tweaks into one locked layer.

![](pre_comp.gif)

Select our adjustment layer snow in the timeline and right-click to bring up the options dialogue. Find the option to **Pre-compose** - clicking it will bring up a new options box. Click the second option here to move all attributes into the new composition.

Voila! You should see your beautiful snow sim appear against the background footage of Gerald the Snowman and his cabin. Magnifique, mes amis. (Note: notice that because we are using a simulation, you will see the particles spawning from the origin point. This means unless you want to show the snow entering frame, you should edit your simulation a few seconds in.)

Keep one thing in mind as you finish the lab - the simulation is being created and referenced against a black matte background. This is an important way for After Effects to “paint” the important parts of the image (your snow) onto the background. Because the background is so bright, the snow may appear a little darker than you thought it might. You can keep testing this by adjusting the opacity parameters in the simulation, but at this point you may also submit the lab for full credit. Well done!

# SUBMISSION

Please submit the lab by uploading your project file **LASTNAME_FIRSTNAME_TUES/THURS.aep** to bCourses.
