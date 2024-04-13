# RENDERING OVERVIEW

So you are at last done with your animation/modeling/rigging/shading etc. and are finally READY TO RENDER!! This rendering lab will guide you through the entire **Batch Rendering** process (rendering on your local computer).

**Cloud Rendering** is also available this semester. You should still follow along with the "Render Settings" section of this lab before uploading jobs to the cloud. For more information, please follow along with this [guide](https://docs.google.com/document/d/1pVxzuMMktaG0x_Kt-pLAYqit0EboGIGSAgSYCKGq3eE/edit?usp=sharing).

In the final section of this lab, we also discuss how to render your shadows on a separate **layer**, which might be helpful to save some computing power!

# RENDER SETTINGS

Here is a quick breakdown on the different render settings that are important to remember before you send off your jobs.

Go to **RenderMan -> Render Settings**.

![](renderSettings.png)

If you don't see the Renderman tab, it's because the Renderman plugin is disabled. Make sure to go to the plug-in manager, and enable the Renderman plugin if it is not already enabled.

## COMMON SETTINGS

After opening the **Render Settings** tab you should see a gray window like this:

![](commonSettings.png)

These are your general or common render settings that apply to all renderers that you use. Pay attention to the areas outlined in red:

1. First, you want to make sure that **Render Using** is set to **Renderman**.
2. Next, make sure that you are in the **Common Tab** towards the top left.
3. Go to the FRAME RANGE section and change the settings to **Animation** if you want to render more than one frame. Then set the correct frame range of your scene. You can leave the other frame range settings as they were.
4. Go to the RENDERABLE CAMERAS section. Make sure you have the correct camera you want to render in renderable cameras. If you see multiple cameras in that section you should click the little trash button for each camera you **do not want to render**.
5. Finally, go to the IMAGE SIZE section. If you are rendering for your final short, make sure your image size is set to HD 1080. If you are not rendering your final short, you can use HD720 or HD540 to submit some tests.

## RENDERMAN SETTINGS

Now that we've set your common render settings, let's go into the **Renderman tab** on the top left and adjust some settings specific to Renderman.

## SAMPLING

Once you've clicked on the Renderman tab you should see a tab below that called **Sampling**.

![](sampling_NEW.png)

For sampling, we recommend students sample at a range between 16-32. Submit some test renders to figure out what the best sampling rate for your short is. Start at 16 samples, then go up by a factor of 2 (so 32, 64, 128 etc) until you render out something that looks like good enough quality.

DO NOT exceed 32 samples unless you are given permission by a facilitator to do so. Increasing your sample size will significantly increase your render time so don't go overboard with your samples.

> (!info)
> Make sure you are changing your samples under the first section of the sampling tab and NOT under the IPR Samples section. Your IPR Sampling Rate will not have any effect on your final batch renders.

The "Max Depth" parameter sets the maximum number of times we allow each light ray to bounce in the scene, and should normally be set to a value of 7 or 8. There is rarely a need to exceed 10 bounces.

Lastly, we want to make sure that we are using **PxrPathTracer** under the INTEGRATOR tab. Unless you are doing stylistic rendering of some kind, you will most likely never have to change this setting.

## AOVs

Next go to the **AOVs** tab. It should look like this:

![](denoise_NEW.png)

On the right you'll see a section titled Displays. Make sure your settings match mine in the above image: mainly, you want to make sure that you have a **Beauty** tab, and a **Ci**, **a** tab below it. These are all important for your final images to come out correctly.

If for some reason the Ci and a channels have been imported from another scene (you can tell if the name is extended by some other file path), then you will want to replace those channels with "clean" channels. Simply select the Ci and a channels on the right and click on the **minus button**. Then, click on the empty beauty tab, navigate to the left scroll-down window, and locate the Ci and a channels. Use the **arrow button** near the middle to swap those new channels over to the right side. If done correctly, your channels should EXACTLY match mine in the image above.

## Denoising

Below that in the DENOISE TAB, you'll see a **Denoise** option which you can optionally turn on. Denoising is a nice tool to help your renders come out without background render noise.

**HOWEVER PLEASE NOTE:**

Often the Denoise option will **result in your final image coming out completely black.** If this does happen to you, you will have to come back to this option to **TURN DENOISE OFF** and increase your Sampling Rate if necessary to remove excess noise.

Note that if you have denoising turned on, you will have two frames rendered out. One of the images will have "\_filtered" appended to the end of the file name, and that will be the denoised image.

# LOCAL BATCH RENDERING

Local batch rendering is a great option that allows you to render scenes on your local machine rather than sending them off onto a Render Farm. Keep in mind that local rendering will probably take longer than remote, and could (literally) render you laptop unusable for several hours. Therefore, it's a good idea to try rendering large/complex scenes remotely.

## WORKSPACE

For local Batch Rendering, the last thing you'll need to check out in Render Settings is the **Workspace** tab.

![](workspace.png)

In this tab we only need to check the **Image Output Directory and RIB Output Directory** settings. The image output directory is essentially the place where your final renders will be sent, and the RIB output directory is where Renderman will set up the RIB data that it needs to start rendering your images. By default, they are set to the **Images** and **Renderman** folder of your project window.

It is fine to keep them there, however, sometimes it becomes easy to lose track of your renders if they get placed in your project folder. Additionally, renders are HEAVY files, and it might be best to not crowd your project space with renders but rather keep them in a separate place. I personally like to create a folder on my desktop for my local renders and that is where I redirect both my Image Output as well as my RIB Output. That way its easy to keep track of and I can easily put them on a hard drive for my teammates to access.

If you do decide to change your file outputs make sure you change BOTH the Image and RIB Outputs to **THE SAME PLACE**. It should look something like this:

![](newOutputLocation.png)

It is important to remember that both of these filepaths **SHOULD NOT HAVE ANY SPACES, PERIODS, OR SPECIAL CHARACTERS** in them otherwise your job will most likely error.

## SENDING OFF YOUR BATCH RENDER

Once you've checked all of these settings **and have rendered a few test frames**, you are ready to send off your Batch Render. Simply go to **Renderman -> Batch Render**.

![](batchRender.png)

Maya will scroll through your animation in the timeline in order to generate the RIB files needed for rendering. Once they are done generating, another window like this should open up.

![](batchRender_monitor.png)

This window allows you to monitor the status of your jobs, including the progress of individual frames.

You may want to wait to check the first frame before leaving your computer to do its thing. If at any point you decide that the renders coming out are not correct, you can right click on the job and either pause or delete it.

# RENDERING SHADOWS SEPARATELY

Throughout the semester, we've been warning you about the rendering headaches caused by moving cameras. Now that you've all done such a great job limiting yourself mostly to still cameras, it's time to reap the rewards of your restraint!

There are a few reasons you might want to render your shadows separately from your background. Most likely, if you have a static camera, you can save big on render time by not re-rendering your incredible but also unchanging background EVERY frame. Another reason you might want to do this is if you are immersing a CG object in a real scene. In either case you've come to the right place. Remember, this works best if the camera is still.

So you might be wondering why you need this thing called a holdout to render a shadow. In the usual case, your moving objects are rendered in the same go as everything else in your scene, so the path tracer correctly calculates all of the shadows and reflections between everything in the scene. However, we want to avoid rendering parts of the scene more than once, but keep the shadows and reflections from the objects we did decide to render. Thus we need something that will be used to collect shadows and reflections while also not appearing in the render. This is the holdout!

## DISPLAY LAYERS

Before you start rendering the shadows, we want to render ONE frame of everything that **doesn't move**.

To hide the moving objects, put them in a separate layer using the Layer Editor (aka the menu that hangs out underneath the Channel Box).

First create a new display layer by clicking the new layer button:  
![](chanelBoxLayerAdd.png)  
Now with the objects you want to hide selected, right click this layer and click on "Add Selected Objects". After this, you can hide all of these objects at once by clicking the V icon on the layer (toggling its visibility).  
![](visibleLayer.png)  
While you're at it, repeat this process to create another layer with only the **non-moving objects**. So you can tell them apart, rename each layer by double clicking the layer name.

With the moving objects hidden, render one beautiful background frame. Since it is only one frame, it will be quick enough to render locally.

## HOLDOUTS

Now let's render those shadows:

**STEP 1.** Make a duplicate mesh of the object you want shadows and reflections on  
**STEP 2.** With this mesh selected, click the holdout button in the Renderman tab. You can find it right here:

![](holdouts.png)

**STEP 3.** Hide the layer of objects that don't move  
**STEP 4.** Run some tests and batch render (see previous sections)  
**STEP 5.** Composite the image sequence on top of the background image using whatever program you wish. We support After Effects in this class, so see the Compositing Lab for help with this.

For more details and example pictures, check out the Renderman doc page for holdouts [https://rmanwiki.pixar.com/display/REN/Holdouts](here)

Good job, you're almost done with your shorts!
