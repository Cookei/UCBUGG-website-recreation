# INTRODUCTION

Lighting is an essential part of the animation pipeline. There are lighting departments in animation and video game studios with people who are solely specialized to work on lighting. This is why we cover this part of the pipeline in UCBUGG.

The purpose of this guide is to provide you with as much information and examples as possible about the toolset that you have in using lighting in Renderman (for Maya).

There are two demos after this guide in which I light the same scene in daytime and in nighttime. It applies many of the lessons in this guide in case you feel overwhelmed with information.

## CONSIDERATIONS BEFORE LIGHTING

- It is considerably easier to gauge the effectiveness/final look of your light if your environments and characters are already textured. Lighting a gray scene with no colors will be of very little help. Textures interact with lighting (e.g. specular, anisotropy, etc.) so not having textures and working on lighting first will not take you very far.

- If there are effects in your scene, it would be particularly helpful to, at this point, be capable of applying that effect for at least a frame to test how lighting interacts with it. Example: if one of your characters is a bear and you’re planning on using fur, be sure to test your lighting with the fur on since sometimes these effects change how the lights/shadows interact with the scene.

- Keep testing your lighting through the camera. Who cares if there’s a really bright/really dark patch if it’s not visible in the final render? So apply the lights, and do test renders through the camera in your scene, not the perspective view.

- Become familiar with IPR rendering because it will be your best friend in this process. IPR rendering is the third button on the Renderman shelf that says “Start IPR” when you hover over it. IPR rendering is basically a window that will open on the side (in a program called “It”) that will constantly update a test frame render with any changes you make in the scene. It is a really cool tool that will enable you to see changes. Example: if you change the intensity of one of your lights, check the IPR window and you’ll actually see the test render updating the image with the changed intensity.  
  While configuring your lighting, if you add/delete a light, IPR updates to reflect that. If you change a texture, if you add a new camera, or if there’s any other major changes in your scene that you’re not seeing get updated in the IPR, just close the IPR window and launch it again and it should be updated.

- Renderman does not produce .png or .jpeg files! The two files types you’ll be dealing with are .exr and .tiff

Let’s say you’re happy with a light setup and you’d like to render an actual full frame to test your light setup. The image that you’ll render will be .exr by default. Make sure to open this image in Photoshop to see the image accurately! If you open a .exr in Preview it’ll be super bright and desaturated, and if you open a .tiff in Preview it’ll be extra saturated and dark. Photoshop will show the photo accurately and that is what the final render will look like, so do not forget to only open these images in Photoshop!!

## TYPES OF LIGHTS COVERED IN THIS GUIDE

- Area Lights (PxrRectLights, PxrDiskLights, PxrSphereLights)
- Light Filters
- Dome Light
- Daytime Environment Light

### AREA LIGHT

- Area lights are light sources that emit light based on a shape (Rectangle, Disk, Sphere).

## LIGHT ATTRIBUTES

Common options in the Shape tab (in the attribute editor) that apply to all/most types of light.

### BASIC TAB

- Intensity
  Scales the contribution of a light linearly; computed using the physical falloff. Think of this as the wattage of a bulb light in your room.
- Exposure
  Specifies the exposure of the area light as a power of 2. Increasing the exposure by 1 will double the energy emitted by the light source. This tends to be set at a low value (from 0-2). If this is too high, it will blow out your scene (try it out to see what I mean). The higher the value, the closer the scene will be the light’s set color.
- Color
  Changes the color of the light emitted
- Color Temperature
  You have to click “enable temperature” to use this feature
  This is an alternative to using light color. Why? The theory behind this is that you can choose the temperature of light in terms of Kelvins and you’d get a more plausible/realistic color of light rather than risking choosing an unnatural color off the color wheel. Number references are below with their colors:

![](kelvin-color-temperature.jpg)

This is an image from the Renderman website that samples the color temperature tool:

![](<Kelvin Temperature - Renderman.png>)

- Refine Tab
  This deals more with getting the light to hit in specific ways. Increasing the “Emission Focus” make the light act like a spotlight. Changing the “Emission Focus Tint” to another color will make the area surrounding the lit area to change to that color. Another way to create a spotlight effect is to change the “Cone Angle”. Notice that the edges are pretty defined, so soften them with the “Cone Softness” (keep the value low).

- Shadows
  In the “Shadows” tab, the “enable shadows” box allows you to enable/disable shadows.  
  Shadow color: what color is the shadow? If it’s a colored light, the shadow isn’t going to be a black shadow, so edit that in whichever way makes sense in your scene.  
  Adaptive Shadows: it is conservative by default. Aggressive will result in FASTER renders but LOWER QUALITY (it’s basically tracing less rays).

> (!important)
> Important: only the logical light sources in your scene should produce shadows! If you add an area light to just generally make the scene brighter (like you will see in the example at the end of this guide) you should turn the shadows off if it’s in the opposite direction of the source of light. Otherwise this will confuse the viewers and they won’t understand what the other light source is.

## CAMERA (PRIMARY) VISIBILITY

Located in the Shape tab of the Attribute Editor. Go down to the Basic tab and check/uncheck “Primary Visibility”.
This is off by default in area lights but on by default in environment lights. In general this is set to off if you don’t want the actual source of light visible in your scene. Having this on means that you can actually see the source of light as a lit panel:

![](Untitled_primaryvisibility.png)

If the Primary Visibility is unchecked, this is what you get:

![](Untitled.png)

====

### SPECIFIC LIGHT OPTIONS/NOTES FOR SPOTLIGHT AND DISTANT LIGHT

**Spotlight**

- Core Angle  
  This determines the circumference of the spot that the spotlight creates: a higher value creates a bigger spot while a smaller value creates a smaller spot.
- Penumbra Angle  
  Imagine the penumbra as the outline to the spot: a penumbra of 0 means the circle has a really sharp outline, so it’s a perfect circle spot. A high penumbra means the outline of the spot is blurry, producing a much softer spotlight.
- Penumbra Exponent  
  This determines the falloff of the penumbra angle. A penumbra exponent of 0 means that the penumbra will look a little smaller, decreasing the intensity of light around the outline of the spot. A high penumbra exponent means the light from the spot will be still strong around the outline of the spot.

**Distant (aka directional light)**  
This is light from infinitely far away, and its direction completely depends on the ROTATION of the directional light. It does not matter how big or small the distant light is or where the distant light is placed, the ONLY thing that affects distant light is the direction you point it in your scene.

Use distant light to simulate sunlight. That is a distant light’s primary source.

### ENVIRONMENT LIGHT

Environment light will create a large sphere around your scene. Light rays are created from every point on the sphere, sent inward to a central point.

_Environment Light Settings_  
**Primary Visibility**  
As opposed to area lights, this is turned on by default. This means that when you render an image, you will see the color in the “tint” tab below it on the sphere. So by default, you will see a white sphere in your scene if there isn’t anything in the background.  
Having this left as ON might be a problem for you. Why? Let’s say you render an image from inside a house, and there’s nothing outside the house in your scene. That patch of “nothingness” will be where you can see the environment sphere. If it’s white, then that patch will be white, and you won’t be able to replace it with a background of your choosing in Photoshop (good luck chroma-keying white away).  
Having this turned OFF will render that image with that patch of “nothingness” preserved as transparency, allowing you to go into Photoshop and add a background layer/image of your choosing instead of having the standard white color.

**Exposure**
As opposed to area lights, environment light’s exposure is set to 0 by default. A value of 0 means that it’s producing light at an intensity of 1 (people commonly confuse a value of 0 with the light being off—it’s not.) The higher the exposure, the more intense the light from the environment sphere will be.

**Environment Image**  
If you click on the folder icon, you will be able to open an image file, which will link that image to this sphere. The image will be stretched around the sphere and will serve as a “skybox.”  
Choose an HDR, high-resolution image if you plan on attaching an environment image. The image will be stretched around a huge sphere, so the higher the resolution, the less degradation in quality. Don’t look for these in google images and save them from there: these are actually images that download as .hdr files, not standard .png or .jpeg formats.
The image will automatically color the light. Renderman/Maya understands this image as if it’s a set of colors that you place in front of a light source, therefore, Maya projects these colors into the light.  
-The other options are the same as the ones mentioned in the area lights.

### DAYTIME ENVIRONMENT LIGHT

Since Mental Ray had a default outdoor lighting map (Physical Sun and Sky) for a long time, Renderman has finally decided to throw its hat in the ring and now we have Daytime Environment Light.

There is a fair bit of warning I’ve included after this section about using this light. Default light maps are problematic and too often misused in UCBUGG.

Clicking on the Daytime Environment Light button will create this funky looking mechanism in the middle of your scene:

![](daytime_env_viewport.png)

There’s a compass and a sun for a reason: this represents the sun’s position in your scene.

_Daytime Environment Light Options_  
**Primary Visibility**  
Same as the environment light. In this case, however, the sky and sun will not show up, producing that area instead as transparency, allowing you to add your own background.

**Exposure**  
Same as before: this controls the intensity of light and, similar the normal environment light, it is 0 by default.

**-Sun size**  
If Primary Visibility is ON, then you will be able to see the sun and the sky. This attribute then controls how big that sun is in your view.

**Direction Method**

- Vector:  
  Insert the vector’s x, y, and z in the spaces below to position the sun
- Heliodon:  
  Renderman went over and above and simulated a heliodon for this lighting tool. Scroll down to the “Heliodon” tab and you will see spaces to enter the month, day, year, hour, time zone, latitude, and longitude that Renderman can calculate to give you an accurate position of the sun as it would be seen on Earth.

**Haziness**  
Under the sky tab, this controls how clear the sky is. A value of 1.7 indicates the clearest sky, and a value of 10 is the other end.

**Sky tint**  
Gives a color to the sky.

A word to the wise about Daytime Environment Light:  
You’re probably thinking: this is insane, I can put my exact position on Earth and the year, time zone, time of day, month, and day to get a representation of the sun on that day—awesome!

Fair enough, but be careful with this. Daytime Environment Light and its equivalent in Mental Ray (Physical Sun and Sky) are generally a lot more problematic for students than they are helpful. These are the reasons:

- They require considerably more rendering time.  
  They are, after all, more complex light maps than the ones needed for the scenes you’re working on. Render times increasing HURTS because if a frame that takes two minutes to render now takes five minutes, and you’re rendering twenty four frames per second, and your short is a minute long…do the math. Even minor increases in rendering time can completely screw up your rendering schedule.

- They trick students into thinking they’re done with lighting.  
  You make a test render and you go, “Wow, look at that!” and you think that it’s good enough for your scene…it’s not. Daytime Environment Light, or any default light map for that matter is a starting point, not a finish point. You still need to respect the lighting principles if you hope to make a good-looking film: you still need to direct the eye, create emotional impact, augment the narrative, and set the mood with the light. A default, generic light map does not help you get any closer to creating lighting that is in line with the principles of lighting. It is disheartening to see so many UCBUGG shorts look identical due to students creating a generic map and thinking they’re done.

- They trick students into thinking that they don’t need a horizon.  
  Watch previous UCBUGG shorts on the UCBUGG youtube channel. Chances are that there’s at least a film per semester that used Mental Ray Sun and Sky and had a horizon that was visible and/or above the actual ground of the scene.  
  Because default light maps color the sky, they occupy the “empty” parts of the frame with color and light, leading students to believe that those parts of the frame are done and don’t need additional work.

What should you do instead?

- Using the options explained above, use a distant light combined with an environment light to simulate a sky. You’ll save rendering time and you’ll have a lot more control over the light. Your short will look unique, and your lighting will probably be more consistent with the principles of lighting.
- If you do choose to use Daytime Environment Light, alter the sky’s color and haziness, the sun’s position, and the color of the light produced to actually create an effect that doesn’t look generic and that supports the story and the mood of your short.
- If your short takes place in an exterior location, make sure to have something in the distance indicating that there’s still a world beyond the small location of your short. Just having colored light in the sky is not enough to complete your environment. Too many shorts that take place outside do not show anything beyond the small street in the scene, implying that there’s a massive void/end of the world beyond the location of your short. Students fall into this trap many times because they use a default light map like Daytime Env. Light, so they’re too distracted by the sky to notice that they still need a sense of depth in their environment!

## MAKING GEOMETRY EMISSIVE

Aside from the normal system of Renderman lights, you can actually make any model in your scene produce light by itself. We DO NOT recommend this method as it makes renders very noisy. This is more for your information.

How do you do this?

1. Select the object.
2. In the Renderman shelf, click on the “PxrMeshLight” button. (5th from left button)
3. Click the PxrBlack tab that shows up in the attribute editor, and click the link button (next to PxrMeshLightShape#)
4. Alter its attributes the same way discussed above for other lights.

# LIGHT LINKING

Live action filmmakers and cinematographers would kill to have this option in real life: creating a light source that only affects a specified list of surfaces/objects despite anything else being the pathway of the light. This is the process of light linking: you can specify which lights should affect which objects. You’re making lights in a virtual space, so you might as well enjoy disobeying the laws of physics, right?

By default, all lights affect all objects. Light linking allows you to alter that.

How to do this?  
Let’s say you have a scene with three cubes:

![](<Screen Shot 2015-11-16 at 2.16.00 PM.png>)

Do you see that area light? That’s going to affect all the cubes. This is how you get to choose which cubes it should affect:
Go to Windows -> Relationship Editors -> Light Linking -> Light-Centric (or Object-Centric)  
Light-Centric asks: which objects are affected by the selected light?  
If you have more objects than lights, this is probably the one you want to open (most likely the case)  
Object-Centric asks: which lights affect the selected object?  
If you have more lights than objects, this is probably the one you want to open  
Select a light. Do you see all the highlighted objects on the right? These are all the objects that are affected by the light you have selected. All the shaders below the objects do not actually matter since the objects ultimately determine what gets lit, not the shaders.

![](lightcentric.png)

Without editing the light linking, this is what the image would look like:

![](light_linking_1.png)

For this example, I want to make the blue and red cubes stand out brighter than the white cube, so I created another area light and placed it at another angle.

![](3cube2.png)

However, if you render now, the whole scene will be brighter, which isn’t what I want. I just want the red cube and the blue cube to be brighter. Therefore, I will go into the light linking menu and I will make the second area light only affect the blue cube and red cube.

![](lightcentricfurreal.png)

This is the result:
![](light_linking_2.png)

This is an immensely helpful tool. It can be used in character lighting to place an area light behind the character and have it only affect that character. You can use light linking to make objects “pop” by being brighter than everything around them like we did with the boxes here. You can also reduce lighting on a specific object by reducing how many lights affect it.

Example with an unlinked cube:
![](light_linking_3.png)

If you find yourself liking the lighting in some parts of your frame but not in others, consider using light linking to fix the parts that you don’t like.

# LIGHT PANEL

After all this insanity, you need some kind of catch-all interface to be able to get a sense of all of your lighting, right? Renderman has you covered: the light panel.

Select the light panel above in the Renderman shelf when you have a scene with several lights. If you don’t see a list of lights on the lower section of the panel, click on the lights in the left section labeled “Lights.” This will load whichever light you’ve selected into the panel below.

Take a look at this example:

![](<Light Panel.png>)

As you can see, the light panel shows a list of the lights you’ve selected, and a few attributes on the right of each: the exposure, the color, the specular and diffuse, and whether or not the light causes shadows. This is a convenient place to edit multiple lights at once.

The most useful part of the light panel is the two columns before the attributes: the “Solo” and “Vis” checkboxes. Checking the “Solo” box on a light will turn off ALL the other lights, and it will just leave that one working. Have an IPR render open on the side as you do this so you can see the effect of that light source alone. This is MASSIVELY helpful if there’s a lighting glitch in your scene and you’re not sure which lighting is causing the problem.

Also, if there’s too many lights and you’re just not sure what each light is contributing, go down the list, turning each light’s “Solo” on and see the light’s effect: is it too small to make an actual difference? If so, delete it. You’ll save rendering time.

Want to see the scene with all the lights on except for one or a few? Click the “Vis” box on the lights you don’t want to see and they’ll be turned off.

# LIGHTING ROOMS

(You may need to right click, hit "Save link as ...". If it takes you to a new page filled with text just right click on that page and "Save as". If the file downloaded ends in ".ma.txt" or anything other than ".ma" rename it to have just ".ma" and ignore the warning)
[lightingLab.ma](lightingLab.ma)

This lab is meant to familiarize you with the lighting workspace. There is no one right way to light a scene, so feel free to experiment with your scene.

## Scene 1

Open up the scene, and the view from the 'whiteroom' camera.

![](wr1.png)

There are three lights in the scene, wr_yellow, wr_magenta, and wr_cyan. They all are on the ceiling, above their respective pyramids. Each have a color associeted with them, and are at Intensity: 1.0 and Exposure: 6.0. The "Primary Visibility" attribute is on for all of them.

If you were to render this right now, you would see this:

![](wr2.png)

Going to the attribute editor, and clicking the Refine tab (right under the basic tab), we will see emission focus. Emission focus serves to concentrate the emission of light. Increasing the focus would create a spotlight effect.

For each light, change the emission focus value as follows:  
yellow: 1.0  
magenta: 10.0  
cyan: 100.0

Now if you were to render it, this is what you would see:

![](wr3.png)

Notice that the light source for the magenta and cyan light are "missing" now. This is because the emission focus value no longer aligns with the size of the source.

Once satisfied with your lighting do the following:

Open PhotoShop

[**DOWNLOAD PHOTOSHOP HERE**](https://software.berkeley.edu/adobe/')
If you have PhotoShop installed on your computer follow this method:  
Save this EXR: Click File->Export File and save the corresponding EXR file somewhere you can access later. Open up the EXR in PhotoShop. A window should pop up, and you should select “As Transparency”. Now go to File->Export->Export As PNG. Now save that somewhere accessible, you will send this for grading.

Ensure that this image is saved before moving on!

## Scene 2

Now lets go next door, and open the viewport from the "ballroom" camera. There is one light present in the scene, with Camera Visibility set to OFF. Here we will mess with the scale of light.

![](br1.png)

If you were to click on the light in this scene, and go to the attribute editor, you will notice that the scale for the light is "0.354" in the x,y,and z dimension.

![](br2.png)

Now we want to see the effect of the light when we scale it. With the scale tool, scale the x,y,z of the light source to somewhere between 0.70 - 0.80 (up to you!).

![](br3.png)

Scaling it up to 1.4 - 1.5:

![](br4.png)

With the same light source, while have the intensity set to 1 and exposure to 6, scaling the size of the light source changes the amount of light that bounces in the scene.

Save another image here.

## Scene 3

Now go to the viewport for the "hallway" camera.

In this hallway, you ‘see’ that the four spheres appear to be the same size. But looking around in the perspective camera you notice that is not the case. We want to light the scene in order for us to see that there is depth in the scene.

First we will create a PxrDiskLight. The light is emitted in the direction of the arrow pointing out of the circle. Place it right under one of the holes in the ceiling. Ensure that the arrow is pointing downward toward the red floor (using the rotate tool of course).

![](l0.png)

In the attribute editor, for now we will keep the color to the standard white. Now set the intensity to some number between 35-45, think of this as the wattage on a bulb. For this lab be sure to set the exposure to 1. Do this process for the other two holes in the ceiling.

![](l1.png)

Now lets quickly test the render. Hit the render button (first button in Renderman Shelf). have a A program called “It” will pop up, and you can have a look at your lit scene.

![](l2.png)

![](l3.png)

It looks good, but we can fine tune our lights a little more, perhaps by adjusting the Cone Angle. Cone Angle can give more specification on how a light will interact with a scene. Click one of your lights and in the Attribute Editor go to "Refine". You will see a slider for Cone Angle and Cone Softness.

![](cone.png)

Adjust the radius to somewhere from 60 and 80 play around with the softness to your liking. It should look something like this:

![](cone_angle.png)

**Do this process for the other two lights**

Now hit render and see your realistic hotel hallway lighting! Looks awesome! You can add a little more variety by Enabling Temperature, you can simulate the effect of a indoor light bulb, which is typically 3500 Kelvin. Additionally changing the color of the light could give interesting effects, test out by changing the color of one of the lights to see the difference.

![](l9.png)

Applying color temperature

![](l10.png)

Anyone else reminded of Wong Kar-wai’s masterpiece In the Mood for Love (2000)?

Just me? Okay.

Save another image here.

Go into the outliner and select all three lights and all three farmdoors and click H. (if youre ambitious just delete them.)

Now we will create a directional light. Click on the Renderman shelf, right click the light button, and select PxrDistantLight. The interesting thing to note about this type of light is that its location in the scene does NOT matter, all that matters is the direction.

![](l11.png)

Now, keeping the color at white, enable temperature and set it to 2500 Kelvin (this is typical of sunrise light). Hit render and see the shadows it produces on the wall with doors.

![](l12.png)

![](l13.png)

Follow the same process to save the image.

By the end of this lab, you should have 4 renders! One in the whiteroom, one in the ballroom, and two in the hallway.
