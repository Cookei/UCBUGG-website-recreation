# INTRODUCTION

Lighting is an essential part of the animation pipeline. There are lighting departments in animation and video game studios with people who are solely specialized to work on lighting. This is why we cover this part of the pipeline in UCBUGG.

The purpose of this guide is to provide you with as much information and examples as possible about the toolset that you have in using lighting in Renderman (for Maya).

There are two demos after this guide in which I light the same scene in daytime and in nighttime. It applies many of the lessons in this guide in case you feel overwhelmed with information.

## CONSIDERATIONS BEFORE LIGHTING

It is considerably easier to gauge the effectiveness/final look of your light if your environments and characters are already textured. Lighting a gray scene with no colors will be of very little help, unfortunately. Textures interact with lighting (e.g. specular, anisotropy, etc.) so not having textures and working on lighting first will not take your scene very far.  
If there are effects in your scene, it would be particularly helpful to, at this point, be capable of applying that effect for at least a frame to test how lighting interacts with it. Example: if one of your characters is a bear and you’re planning on using fur, be sure to test your lighting with the fur on since sometimes these effects change how the lights/shadows interact with the scene.  
Keep testing your lighting through the camera. It doesn’t really matter if there’s a really bright/really dark patch if it’s not visible in the final render? So apply the lights, and do test renders through the camera in your scene, not the perspective view.  
Become familiar with IPR rendering because it will be your best friend in this process. IPR rendering is the second button on the Renderman shelf that says “Start IPR” when you hover over it. IPR rendering is basically a window that will open on the side (in a program called “It”) that will constantly update a test frame render with any changes you make in the scene. It is a really cool tool that will enable you to see almost real-time changes. Example: if you change the intensity of one of your lights, check the IPR window and you’ll actually see the test render updating the image with the changed intensity.  
While configuring your lighting, if you add/delete a light, IPR updates to reflect that. If you change a texture, if you add a new camera, or if there’s any other major changes in your scene that you’re not seeing get updated in the IPR, just close the IPR window and launch it again and it should be updated.
Renderman does not directly produce .png or .jpeg files! The two files types you’ll be dealing with are .exr and .tiff (which can be converted in Photoshop to .pngs or .jpegs)
Let’s say you’re happy with a light setup and you’d like to render an actual full frame to test your light setup. The image that you’ll render will be .exr by default. Make sure to open this image in Photoshop to see the image accurately! If you open a .exr in Preview it’ll be super bright and desaturated, and if you open a .tiff in Preview it’ll be extra saturated and dark. Photoshop will show the photo accurately and that is what the final render will look like, so do not forget to only open these images in Photoshop!!

# TYPES OF LIGHTS COVERED IN THIS GUIDE:

GeoArea Light  
Area Light Cone Angles  
Dome Light  
Daytime Environment Light

### GeoArea Light

GeoArea light produces light rays based on the shape of the light that you can specify (i.e. a rectangle area light will send light rays proportional to the shape and surface area of the rectangle.)

**Common options in the attribute editor that apply to all/most types of light:**

_Camera visibility_
Located in the visibility tab, check/uncheck camera visibility.
This is off by default in area lights but on by default in environment lights. In general this is set to off if you don’t want the actual source of light visible in your scene. Having this on means that you can actually see the source of light as a lit panel:

![](Untitled_primaryvisibility.png)

If the Camera Visibility is unchecked, this is what you get:

![](Untitled.png)

_Exposure_
This controls the intensity of light: low intensity makes the light darker/weaker, higher intensity makes the light brighter/stronger

_Color_
Changes the color of the light emitted

_Color Temperature _
You have to click “enable temperature” to use this feature
This is an alternative to using light color. Why? The theory behind this is that you can choose the temperature of light in terms of Kelvins and you’d get a more plausible/realistic color of light rather than risking choosing an unnatural color off the color wheel. Number references are below with their colors:

![](kelvin-color-temperature.jpg)

This is an image from the Renderman website that samples the color temperature tool:

![](<Kelvin Temperature - Renderman.png>)

_Shadows_
In the “Shadows” tab, the “enable shadows” box allows you to enable/disable shadows.

- Shadow color: what color is the shadow? If it’s a colored light, the shadow isn’t going to be a black shadow, so edit that in whichever way makes sense in your scene.
- Adaptive Shadows: it is conservative by default. Aggressive will result in FASTER renders but LOWER QUALITY (it’s basically tracing less rays).
- Important: only the logical light sources in your scene should produce shadows! If you add an area light to just generally make the scene brighter (like you will see in the example at the end of this guide) you should turn the shadows off if it’s in the opposite direction of the source of light. Otherwise this will confuse the viewers and they won’t understand what the other light source is.

_Cone Angle_
Located in the refine tab of the light in the attribute editor.

![](cone.png)

Imagine a tube around the edges of your light source, and you have control over how much you close in on the light, defining the shape of the light produced.

![](radius.png)

Use cone angle to define the shape of light (example at the end of the guide: you can use it on an area light that simulates light from a television in order to make the light coming from the television more defined in shape.)

## SPECIFIC LIGHT OPTIONS/NOTES FOR DISTANT LIGHT

### Distant (aka Directional light)

This is light from infinitely far away, and its direction completely depends on the ROTATION of the directional light. It does not matter how big or small the distant light is or where the distant light is placed, the ONLY thing that affects distant light is the direction you point it in your scene.

Use this light to simulate sunlight. That is a distant light’s primary source.

### DOME LIGHT (aka Environment light)

Environment light will create a large sphere around your scene. Light rays are created from every point on the sphere, sent inward to a central point.

**Environment Light Settings**

_Camera Visibility_  
This is set to off initially. So when it is turned on, you will see a white sphere in your scene if there isn’t anything in the background.

Having this left as ON might be a problem for you. Why? Let’s say you render an image from inside a house, and there’s nothing outside the house in your scene. That patch of “nothingness” will be where you can see the environment sphere. If it’s white, then that patch will be white, and you won’t be able to replace it with a background of your choosing in Photoshop (good luck chroma-keying white away).

Having this turned OFF will render that image with that patch of “nothingness” preserved as transparency, allowing you to go into Photoshop and add a background layer/image of your choosing instead of having the standard white color.

_Exposure_  
As opposed to area lights, environment light’s exposure is set to 0 by default. A value of 0 means that it’s producing light at an intensity of 1 (people commonly confuse a value of 0 with the light being off—it’s not.) The higher the exposure, the more intense the light from the environment sphere will be.

_Color Map_  
If you click color map, you will be able to open an image file, which will link that image to this sphere. The image will be stretched around the sphere and will serve as a “skybox.”

Choose an HDR, high-resolution image if you plan on attaching an environment image. The image will be stretched around a huge sphere, so the higher the resolution, the less degradation in quality. Don’t look for these in google images and save them from there: these are actually images that download as .hdr files, not standard .png or .jpeg formats.  
The image will automatically color the light. Renderman/Maya understands this image as if it’s a set of colors that you place in front of a light source, therefore, Maya projects these colors into the light.

The other options are the same as the ones mentioned in the area lights.

### DAYTIME ENVIRONMENT LIGHT

Since Mental Ray had a default outdoor lighting map (Physical Sun and Sky) for a long time, Renderman has finally decided to throw its hat in the ring and now we have Daytime Environment Light.

There is a fair bit of warning I’ve included after this section about using this light. Default light maps are problematic and too often misused in UCBUGG.

Clicking on the Daytime Environment Light button will create this funky looking mechanism in the middle of your scene:

![](daytime_env_viewport.png)

It’s a compass! Also note the small sun. This compass represents the position of the sun.

**Daytime Environment Light Options**

_Camera Visibility_  
Same as the environment light. In this case, however, the sky and sun will not show up, producing that area instead as transparency, allowing you to add your own background.

_Exposure_  
Same as before: this controls the intensity of light and, similar the normal environment light, it is 0 by default.

_Direction_  
Insert the vector’s x, y, and z in the direction tab to position the sun

_Haziness_  
Under the sky tab, this controls how clear the sky is. A value of 1.7 indicates the clearest sky, and a value of 10 is the other end.

_Sky/sun tint_  
Gives a color to the sky/sun.

_Sun size_  
If Camera Visibility is ON, then you will be able to see the sun and the sky. This attribute then controls how big that sun is in your view.

_Month_  
Renderman went over and above and simulated a month attribute for this lighting tool. Scroll down to the “month” tab and you will see spaces to enter the month,

**A word to the wise about Daytime Environment Light:**  
Be very careful with this light. Daytime Environment Light and its equivalent in Mental Ray (Physical Sun and Sky) are generally end up being more problematic for students than they are helpful. These are the reasons:

- They require considerably more rendering time.

- They are, after all, more complex light maps than the ones needed for the scenes you’re working on. Render times increasing HURTS because if a frame that takes two minutes to render now takes five minutes, and you’re rendering twenty four frames per second, and your short is a minute long…do the math. Even minor increases in rendering time can completely screw up your rendering schedule.

- They fool students into thinking they’re done with lighting.

- You make a test render and you go, “Gee whiz, look at that!” and you think that it’s good enough for your scene…it’s not. Daytime Environment Light, or any default light map for that matter is a starting point, not a finish point. You still need to respect the lighting principles if you hope to make a good-looking film: you still need to direct the eye, create emotional impact, augment the narrative, and set the mood with the light. A default, generic light map does not help you get any closer to creating lighting that is in line with the principles of lighting. It is disheartening to see so many UCBUGG shorts look identical due to students creating a generic map and thinking they’re done.

- They trick students into thinking that they don’t need a horizon.

- Watch previous UCBUGG shorts on the UCBUGG youtube channel. Chances are that there’s at least a film per semester that used Mental Ray Sun and Sky and had a horizon that was visible and/or above the actual ground of the scene.

- Because default light maps color the sky, they occupy the “empty” parts of the frame with color and light, leading students to believe that those parts of the frame are done and don’t need additional work.

**What should you do instead?**

- Using the options explained above, use a distant light combined with an environment light to simulate a sky. You’ll save rendering time and you’ll have a lot more control over the light. Your short will look unique, and your lighting will probably be more consistent with the principles of lighting.

- If you do choose to use Daytime Environment Light, alter the sky’s color and haziness, the sun’s position, and the color of the light produced to actually create an effect that doesn’t look generic and that supports the story and the mood of your short.

- If your short takes place in an exterior location, make sure to have something in the distance indicating that there’s still a world beyond the small location of your short. Just having colored light in the sky is not enough to complete your environment. Too many shorts that take place outside do not show anything beyond the small street in the scene, implying that there’s a massive void/end of the world beyond the location of your short. Students fall into this trap many times because they use a default light map like Daytime Env. Light, so they’re too distracted by the sky to notice that they still need a sense of depth in their environment!

### MAKING GEOMETRY EMISSIVE

Aside from the normal system of Renderman lights, you can actually make any model in your scene produce light by itself.

![](meshLight.png)

**How do you do this?**

- Select the object.
- In the Renderman shelf, click on the “PxrMeshLight” button. (5th from left button)
  Alter its attributes the same way discussed above for other lights.

# LIGHT LINKING

Live action filmmakers and cinematographers would kill to have this option in real life: creating a light source that only affects a specified list of surfaces/objects despite anything else being the pathway of the light. This is the process of light linking: you can specify which lights should affect which objects. You’re making lights in a virtual space, so you might as well enjoy disobeying the laws of physics, right?

By default, all lights affect all objects. Light linking allows you to alter that.

**How to do this?**
Let’s say you have a scene with three cubes:

![](3cubes.png)

Do you see that light? That’s going to affect all the cubes. This is how you get to choose which cubes it should affect:

Go to **Windows→Relationship Editors→Light Linking→Light-Centric** (or Object-Centric)

- Light-Centric asks: which objects are affected by the selected light?
  If you have more objects than lights, this is probably the one you want to open (most likely the case)

- Object-Centric asks: which lights affect the selected object?
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

# LIGHT LISTER

After all this insanity, you need some kind of catch-all interface to be able to get a sense of all of your lighting, right? Renderman has you covered: the light lister.

Select the light panel above in the Renderman shelf when you have a scene with several lights. If you don’t see a list of lights on the lower section of the panel, click on the lights in the left section labeled “Lights.” This will load whichever light you’ve selected into the panel below.

Take a look at this example:

![](<Light Panel.png>)

As you can see, the light panel shows a list of the lights you’ve selected, and a few attributes on the right of each: the exposure, the color, the specular and diffuse, and whether or not the light causes shadows. This is a convenient place to edit multiple lights at once.

The most useful part of the light panel is the two columns before the attributes: the “Solo” and “Vis” checkboxes. Checking the “Solo” box on a light will turn off ALL the other lights, and it will just leave that one working. Have an IPR render open on the side as you do this so you can see the effect of that light source alone. This is MASSIVELY helpful if there’s a lighting glitch in your scene and you’re not sure which lighting is causing the problem.

Also, if there’s too many lights and you’re just not sure what each light is contributing, go down the list, turning each light’s “Solo” on and see the light’s effect: is it too small to make an actual difference? If so, delete it. You’ll save rendering time.

Want to see the scene with all the lights on except for one or a few? Click the “Vis” box on the lights you don’t want to see and they’ll be turned off.

# DEMO 1 – LIGHTING AN INDOOR, DAYTIME SCENE

We’ll use the same scene for the daytime and nighttime scene just to control the variables in terms of how many changes you’ll see between the demos.

You can download the scene (without the lights) from here:

[demo_no_lights.ma](demo_no_lights.ma)

This is what this scene looks like by default (everything is hidden except for polys for the sake of clarity). This is the Malcolm rig, so I’ll just refer to him as Malcolm from this point onward.

![](helloMalcolm.png)

Before you light any scene, you should plan out what the sources of light will be. In this example, here’s what I’m thinking:
-There’s sunlight coming in from the window. Since it’s sunlight it will be a distant light.
-This light will likely be too sharp; we’ll need to soften that light by having other lights around the room to reduce the contrast.
That’s what immediately jumps to mind. We can edit the lighting as we go along.

Let’s start with the distant light

- Create an area light and change its shape to “distant.” This will be our DIRECT sunlight. Again, it does not matter where you place a distant light. All that matters is the distant light’s rotation.
- Make it bigger/move it where you can easily manipulate it.
- Reduce its exposure to 4.
- Give it these rotation values:  
  Rotate X: 46. Rotate Y: -46. Rotate Z: -84.

The direct sunlight is not enough to illuminate Malcolm (test it with an IPR for yourself if you want). We want a fill light for Malcolm’s face.

- Create an area light and place it above the right arm (relative to Malcolm) of the armchair.

- Make the light face Malcolm, but it shouldn’t be exactly 90 degrees. Give it a bit of a tilt inward toward Malcolm’s face just so that the shadow line isn’t straight down the middle of his face.

- Decrease the light’s exposure to 5.

- Since this light is mostly for Malcolm’s face, you should unlink the light from all objects and then link it to his face and hair mesh (refer to the light linking tutorial in the guide above if you’re having trouble with light linking)

If you render now, you will see that this fill light has helped bring out Malcolm’s face a bit more. If it’s too intense, turn it lower or if it isn’t intense enough, move it closer to Malcolm’s face or raise the intensity.

Here’s the next problem: the left side of Malcolm (relative to Malcolm) is too dark. Sunlight generally bounces around and makes an entire room bright. We will need a key light there to simulate the effect of the bouncing of the light around the room.

- Create an area light, increase its size (8x bigger works well for me) and put it at a 45-degree angle facing Malcolm.

- This area light should be on the opposite side of the window and at a similar distance from Malcolm as the television is

- Turn down the exposure of this light to 5.

- Scroll down the attribute editor, click on the “shadows” tab and check the “enable shadows” checkbox to disable the shadows.  
  Wait a minute—why are we disabling shadows?  
  Think about it: sunlight is coming from the window—that’s the main light. That’s the light that’s producing the shadows. How can there be a light (that IS NOT a light bulb/any artificial light) opposite the window produce shadows? It’ll look as if there’s some kind of spotlight there producing shadows, which goes against what we’re trying to do with this scene (daytime lighting only)

- Final thing to do: unlink the lamp and the lampshade from this light. Why? We’re trying to direct the eye toward Malcolm. The lamp is metallic and will shine even with a slight amount of light. If it’s too bright, viewers will be distracted and they’ll want to look there instead of at Malcolm. Therefore, we unlink the lamp and lampshade from this key light so that the focus is still on Malcolm.

This is what everything looks like in the viewport for me:

![](viewportMalcolm.png)

This is what the final image looks like for me. It is far from done, but the point of this demo is to give you a good start at least. It's also noisy because I reduced the render samples (so that it doesn't take forever to render):

![](daytime_finished.png)

# DEMO 2 – LIGHTING AN INDOOR, NIGHTTIME SCENE

Download this scene and follow along this tutorial (same file for the daytime demo):

[demo_no_lights.ma](demo_no_lights.ma)

This is what the scene currently looks like. Same as with the daytime scene.

![](helloMalcolm.png)

Just like the previous demo, before you light any scene, you should plan out what the sources of light will be. In this example, here’s what I’m thinking:

- The light from the lamp should be visible, but obviously won’t be the main light because it’s not shining directly on Malcolm. This light will probably be colored yellow/orange.

- There should probably be a tiny bit of light coming from the window to Malcolm’s left. It is nighttime, but there’s likely some moonlight/streetlight outside. This light will probably be white.

- I’ve placed a rectangular polygon where the television would be. The camera is going to be looking at Malcolm, so we’re not going to be seeing the television. The main light source that’s going to illuminate Malcolm is going to be light from the television. This light will also be white.

This, of course, does not mean that I am going to restrict myself to this initial interpretation: I’ll add/remove lights if needed as I’m going along, and so should you.

Here are the parameters that will give you a good result. Feel free to experiment with these as you like. The ones posted below are the ones that produced the screenshot at the end of this demo. This does not mean that this is the only/best approach to light this scene.

Step 1: Create a spotlight and place it inside the lampshade, where a lightbulb would be.

- Face the spotlight downward so it’ll create a spot on the floor and a bit on the wall.
- Leave its attributes the same except for the color: give it a slightly yellowish tint.

Step 2: Duplicate the spotlight and point it straight upward.

- This is because a lamp like this will create spots on the floor and on the ceiling due to the shape of its lampshade.

![](lampshade.png)

These are two spotlights: one facing up, one facing down (they're overlapping, so it's a bit difficult to see).

You should be launching a new IPR render between every two-three steps to see the effect of every change you’re making!

Step 3: Create an area light and put it on the window. Scale, rotate, and position it so that it’s matching the window opening as if the light itself is the window pane.

- Make sure the arrow of the area light is pointing inside the room (if it’s pointing outside the light will go there).
- Give it a bit of a downward tilt since moonlight/streetlight would be taller than Malcolm, not parallel to the ground.
- Change its exposure to 1.5-2. It’s barely an effect, but it’s certainly there.

Step 4: Create an area light and match it to the television’s position and size. Make sure it’s pointing at Malcolm.

- Change the light’s exposure to 7.
- Now we are going to change the cone angle to really emphasize the fact that the light is coming from a small source (the television). Go to the refine tab of the light in the attribute editor.
- Change the cone angle parameters to these:
  Cone angle: somewhere from 15-25. Softness:between 0.5-0.8
  These depend on the size of the area light! These angles will likely be different for you! If the spot that the light creates is too small/too big, edit the parameters to get a result like in the final image. The point is to constrict the area of light produced to roughly a square around Malcolm.

So far this is what the viewport looks like:  
![](viewpt.png)

If you IPR render from the camera (NOT the perspective view), you’ll see that the image is mostly there. Here’s a cool touch that will make the image look better.

Step 5: Create an area light, put it behind Malcolm, a little closer to the lamp than directly behind Malcolm, and at a bit of a height so that it’s just slightly pointing down at Malcolm’s hair. This is a backlight for Malcolm: its primary point is to give Malcolm a bit of an illuminated outline, separating his dark hair from the dark background by a little bit.

- Turn this light’s exposure to 2.5. This light is a subtle one that shouldn’t be too strong.

- If you render now, you’ll see that this light affects everything. We don’t want that. We want it to only affect Malcolm’s head/hair.

- Go to Window —> Relationship Editors —> Light Linking —> Light-Centric

- Select the area light you created behind Malcolm and unlink it from everything.

- With the same light selected, open the Malcolm node in the “illuminated objects” column and expand the second node (Malcolm_v109:grpGeo). Select the second item (Malcolm_v109:head) and the twelfth item (Malcolm_v109:hairFlatTop). Now the light will only affect Malcolm’s head and hair.

Make an IPR render. If everything looks okay, you might want to batch render a single image to produce a high quality, final image. It should look something like this:

![](nighttime_finished.png)

Malcolm is in the empire business…
