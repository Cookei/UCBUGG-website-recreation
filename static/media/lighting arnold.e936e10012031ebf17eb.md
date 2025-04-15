# Introduction

Lighting is an essential part of the animation pipeline and is a lot more complex than it initially seems. There are entire lighting departments in animation and video game studios with people who are solely specialized to work on lighting.

The purpose of this lab is to guide you and get you familiar with the tools related to lighting in Maya with Arnold. Note that lighting is a very creative process, and requires a lot of time and experience in order to get right. Although the tools may be simple, you will need to practice a lot in order to effectively light a scene that works for your specific scenes!

# Considerations Before Lighting

- It is considerably easier to gauge the effectiveness/final look of your light if your environments and characters are already textured. Lighting a gray scene with no colors will be of very little help. Textures interact with lighting (e.g. specular, anisotropy, etc.) so not having textures and working on lighting first will not take you very far.

- Lighting is an iterative process. If it doesn't look good it, or tweak the shaders

- Keep testing your lighting through the camera. Who cares if there’s a really bright/really dark patch if it’s not visible in the final render? So apply the lights, and do test renders through the **final camera** in your scene, not the perspective view.

- Be familiar with viewport or IPR rendering. You can click the below button to define a "crop window" to only render in certain regions of your screen. This can help speed up your rendering times when you're previewing changes in a complex scene.

![](img1.png)

# Dome Light

To start, please download this lab file.

[lighting_lab.zip](lighting_lab.zip)

> "Lamppost - Street Light" (https://skfb.ly/6WXI6) by Humphrorange is licensed under Creative Commons Attribution (http://creativecommons.org/licenses/by/4.0/).
> "Caltrans streetlight 2" (https://skfb.ly/oC6ON) by Streetlights & ETC is licensed under Creative Commons Attribution (http://creativecommons.org/licenses/by/4.0/).

Open up lighting_lamps.ma. You should see a simple scene with two different looking lamps.

If we try to render now, we'll notice that we can't see anything. This is because there are no lights in our scene. Let's start off by adding an Arnold dome light!

Navigate to the Arnold tab on the shelf, and click this button to create a dome light.

![](img2.png)

Now if we try to render, we should be able to see things! Unfortunately, it's not very bright, and it's also not very interesting.

We can change the color, exposure, and intensity of the light by editing the light's settings in the attribute editor.

![](img4.png)

Try playing around with the color, exposure, and intensity to get something interesting! Remember the formula for the brightness of a light is `color * intensity * 2^exposure`. This means that you should use exposure to get the general brightness of your light, and then use the intensity to tweak it.

![](img5.png)

Here is the result of me tweaking some settings!

> (!important)
> Take a screenshot of your experimentation with the dome light and save it. You will need to submit this later. Make sure to have the dome light deselected.

## Physical Sky

Unfortunately, with only just our dome light, it isn't terribly interesting. Generally speaking, for outdoor scenes like this, we want to have a real sky. This is really important for look dev, which is the process that requires constant, quick, and easy iteration to test various visual styles.

To help with this, we're going to employ something called the Physical Sky.

Delete your existing dome light, and instead create a physical sky.

![](img6.png)

In the attribute editor for the light, we can scroll over and access the physical sky node. This will give us a list of settings associated with the physical sky. You can also access the dome light node to get the same settings as before to adjust exposure and intensity.

![](img7.png)

Here you can adjust various settings to get a simulated sky look. The key attributes to note are the Elevation and Azimuth, which control the verticality and the horizontal rotation of the sun respectively. You can also tint the sky and sun w/ the color sliders.

Mess around with the settings to see if you can create anything interesting!

> (!important)
> Take a screenshot of your experimentation with the physical sky and save it. You will need to submit this later. Make sure to have the dome light deselected.

Here is what I made. Notice how the color of the sky affects the lamp's glass.

![](img8.png)

## HDRIs

Unfortunately, while this is good for experimentation, it's not particularly... good and accurate at realistic lighting. For one, there are no clouds, buildings, and trees. All which contribute to a fully realistic lighting scenario.

Here, we will employ the usage of an HDRI (High Dynamic Range Image). These are 360 degree images that capture the lighting information in the real world so we can import it to our digital one, getting perfectly accurate lighting results.

Go to [HDRI Haven](https://polyhaven.com/hdris) here. This will take you to a website that has a lot of free HDRIs you can download. Find an outdoor scene that looks interesting and download it as either a 2k or 4k texture file. In your shorts, if you need the actual image and hyper realistic lighting, go with 4k. Otherwise, 2k lighting is good enough.

Make sure you download it as an HDR file.

![](img9.png)

In Maya, delete your physical sky and create a dome light instead. Then, connect the color attribute to a file node, and plug in the HDR file.

![](img10.png)

Notice how instantly, we get a more interesting lighting scenario. The light is soft and is also non uniform. If you chose a night time scene, you may need to crank up the exposure a lot in order for it to light your scene effectively.

If you do not want to be able to see the HDR in your final render, and only want the lighting from it, turn down the Camera slider under the Visibility tab here.

![](img11.png)

> (!important)
> Take a screenshot of your experimentation with the HDR and save it. You will need to submit this later. Make sure to have the dome light deselected.

# Lighting Lamps

Here, we will be lighting the two lamps. This will cover various techniques so make sure you pay attention!

First, we want to delete our existing dome light and create a point light. To do this, go to Create -> Lights -> Point Light. It is a bit confusing that this isn't in the Arnold tab, but it is what it is.

> The reason why the Point Light, Directional Light, and Spot Lights aren't in the Arnold tab is that those lights are Maya lights. Maya lights work together with Arnold so there's no issue, but due to trying to maintain legacy systems, that's why it's there and not in the Arnold tab. The general rule of thumb is, if it doesn't exist in the Arnold tab, then check the Maya lights. Always use Arnold lights if possible.

![](img12.png)

Next, we want to position this light such that it is inside the light bulb in Lamp1.

![](img13.png)

Unfortunately, if we render now, we won't be able to see anything! This is because our point light is _inside_ the mesh, which means no light can escape. How would we make it so the light can go through only the light bulb object?

There are two ways to do this. Both are equally valid but depends on the use case.

## Render Stats

In the shape node for the light bulb, under the Render Stats tab, uncheck Cast Shadows. This will make lights pass through this object. This makes sense since our light bulb is supposed to be the one "emitting" light. It shouldn't contribute to any shadows from other light sources.

![](img14.png)

You should now be able to see some small reflections in the glass.

![](img15.png)

## Light Linking

The second method is to use light linking. Note that for this specific purpose, light linking is not the most efficient way to achieve this effect. However, in situations in which you have one or multiple objects that you don't want to be affected by a **_specific_** light, you want to use light linking.

Light linking allows you to control which objects are lit by which lights, and which lights light which objects.

To access this menu, go to Windows -> Relationship Editors -> Light Linking -> Light Centric

![](img16.png)

This will bring up the Light Centric light linking menu.

Light centric means you control which objects are lit by a specific light.

Object centric means you control which lights light a specific object.

Depending on your use case, you may want to use one or the other. You can switch between the two modes in the dropdown menu on the upper left hand corner.

Here, let's select our point light on the left panel. Doing this will select all the objects on the right because by default, the light affects every object. However, we can click certain objects to deselect them.

![](img17.png)

Here, I deselected the Lamp object, which is the mesh for the light bulb. This means that _for this light_, it will _ignore this mesh_.

If you render again, you will notice how the effect is the same as if you did it via the Render Stats menu. Make sure to turn back on the Cast Shadows in the Render Stats to verify that this is true.

![](img15.png)

---

Once again, let's increase the exposure to get a brighter light. This is located under the Arnold tab in the attribute editor for the point light. Here the menu looks slightly different since this is a Maya light, but you should find most of your familiar settings under that Arnold tab.

![](img18.png)

Looking pretty good! There's a couple issues though. For one, the shadows are suuuper harsh. In order to make them softer, we need to increase the radius of the light. Just like in real life, the bigger the light in relation to the object, the softer the shadow.

We can do this by adjusting the Radius slider in the attribute editor.

![](img19.png)

Here, I set the Radius to 0.2 to achieve my desired effect.

Another issue we have is that the light is perfectly white. In real life, rarely are most lamppost lights pure white. While we _can_ change the color of the light using the color attribute, it would be better to use the Color Temperature slider to achieve a more accurate light color.

Under the Arnold tab, check the Use Color Temperature tickbox and then change the color temperature to your desired color temperature. I chose something warm.

![](img20.png)

We have one last issue with our light unfortunately. Namely, the actual bulb doesn't look like it's emitting any light! To fix this, we're going to be using the Emission attribute in its _shader_. Select the light bulb, go to its shader in the attribute editor, and under the Emission tab, set the Weight to 1. I also adjust the color to give it a brighter appearance.

> (!important)
> Emission is NOT an effective way to light a scene. It simply gives of the APPEARANCE that an object is glowing. Use a combination of emission and real lights to achieve your desired effect

![](img21.png)

You should now be able to see your light bulb.

## Lamp2

For Lamp2, we're going to be using a spot light. A spot light is another Maya light, so go to Create -> Lights -> Spot Light and position it accordingly.

![](img22.png)

Once again, increase the exposure and adjust the intensity to your desired brightness

![](img23.png)

We can notice a couple things here. Namely, the spot light's cone angle is very small, and the light is very harsh (there's no smooth falloff).

To adjust this, we can adjust the Cone Angle and Penumbra Angle attributes of the light respectively.

![](img24.png)

Once again, we can adjust the color temperature to give a very cold look.

![](img25.png)

> (!important)
> Take a screenshot of both your lights together and save it. You will need to submit this later.

## Bonus: Volumetric Lighting

This is cool and all, but what if we wanted to see the cone of the light itself? What if we wanted volumetric lighting? God rays? Just like in real life, in order to achieve this effect, we need fog in our scene.

To do this, go to Windows -> Rendering Editors -> Render Settings to access your render settings. Here, go to the Arnold Renderer tab and under Environment, connect a aiAtmosphereVolume to the Atmosphere attribute.

![](img26.png)

Clicking the black square with the arrow pointing in to the right of it, you can now access the attributes of the atmosphereVolume in your attribute editor.

![](img27.png)

Setting the density to something like 0.1, you can see how it affects the scene. You will have to tweak your light settings and/or your density values to get your desired look since fog, just like in real life, spreads out light so things could appear "brighter". Here, I combined this with an HDRI with the intensity set low so it simulates a nighttime scene.

![](img28.png)

# Indoor Lighting

Let's close out of lighting_lamps.ma and instead open lighting.ma. You should be greeted with an enclosed room with a couple of windows.

> "ROOMV1352233754567" (https://skfb.ly/puT6t) by tokoissick is licensed under Creative Commons Attribution (http://creativecommons.org/licenses/by/4.0/).

> (!note)
> I have created a display layer to help you navigate the room a bit more. Toggle on and off the V in the display layer to turn on and off the walls. Make sure to turn them back on when you're rendering.

![](img29.png)

Additionally there is a camera called FinalCam that you can look through to see the entire scene. Use this when taking your screenshots.

# Ambient Lighting

To start off with, let's add a dome light to get some light pouring in through the windows. Set the exposure to something high like 5. I've also adjusted the color temperature to something a bit more blue.

We do **NOT** want to use an HDRI since that adds unneeded complexity and render time. The window is small and the pros of an HDRI in an indoor scene like this one are negligable.

> (!important)
> For this part of the assignment, **ALL images must be generated from the render view**. You can go to the render view by going to Arnold -> Render View. This should open up a popup window.

![](img30.png)

You can see here in our render that it is incredibly noisy. This is because there is only a small opening for the light to come through. Since the dome light spans all 360 degrees, there a high likelihood that most of the light rays will be blocked by an object, leading to a lot of noise.

To fix this, we need to use a light portal. Light potals work in conjunction with dome lights. They essentially bias the lighting sample rays towards the light portal instead of the dome light. Or in non-technical terms, pushes more light into the scene.

![](img31.png)

![](img32.png)

Create two light portals and position and scale them outside the windows so that they cover the entire width of the window like so. You do not need to be exact. Additionally, make sure that it is pointing _into_ the room.

![](img33.png)

After creating the light portal, we can see how the noise is drastically reduced. Use the snapshots to switch between no portal, and with portal to see the difference.

We can improve this even more by increasing the sample count. Selecting the dome light, we can increase the Samples attribute to something like 3. I would generally recommend not increasing it above 3-4 since it has diminishing returns and drastically increases render times.

![](img34.png)

## Interior lighting

Now, let's work on lighting the interior scene. We'll start with realistic light sources from the scene. This includes the lamp post, fairy lights, as well as the TV and Monitor screens.

Starting with the lamp, let's do what we did before with the spot light and use that to light the scene.

![](img35.png)

Next, let's work on the TV and the Computer screen. Here, we want to create Area Lights and position them accordingly.

![](img36.png)

![](img37.png)

Here I used the display layer toggle to make it easier to move around in the scene.

After adjusting the exposure settings, we get this image! I also adjusted the Visibility -> Camera slider so we can see the light itself. The area light is very useful and has a couple shape settings. By default, it's a rectangle, but depending on your scene, it can be a disk as well.

![](img38.png)

Not bad! For the fairy lights, this would be the perfect situation to use the Emission attribute in the shader. Unfortunately, since this is a new lab, I didn't have the time to set up the aiStandardSurface for the lights and instead they're phong shaders. If you want, you can assign aiStandardSurfaces to them to get them to glow. You can also take the time to make point lights for each them to get them to glow as well (light linking would be helpful here). Instead, I'm going to skip doing them.

## Motivated lighting.

The scene is looking quite good, but let's add some motivated lighting. Motivated lighting is unrealistic lighting meant to add to a scene artistically. Here, we want to brighten up maybe parts of this person's desk. We can add a motivated light to achieve this.

![](img39.png)

Here I added in an area light to light up the part of the scene. I also unchecked normalize. What normalize does is that it scales down the strength of your light depending on how big it is. In other words, it distributes your brightness evenly across the entire surface area of your light. However, for motivated lighting, I personally find it easier to have a constant brightness no matter how big my light is, and the size of my light only dictates how big the light should be rather than how bright it is.

![](img40.png)

> (!important)
> Take a screenshot of your lit bedroom and save it.

# Bonus

![](img41.jpg)

Here are some volumetrics! I added some area lights outside the window with their spread set to 0. Then, for every other light, I turned their volume samples to 0 such that they don't contribute to the volumetric. This gives off this god ray effect from the windows.

> (!important)
> Please zip up your your project file (should have both maya files, texture folders, etc) and submit it to bcourses. Additionally, also submit all required rendered images.
