# INTRODUCTION

This lab explores how to achieve a cell shaded toon look in Maya using Arnold. The `aiToon` shader is incredibly powerful and you can achieve various effects with it. This lab is intended to get you the basics of understanding the toon shader, edge outlines, and tonemapping.

As of 3/2/2026, the Spring 2026 semester, we will be using the Maya to Arnold MtoA version 5.5.5.2, corresponding to Arnold version 7.4.4.2, with Maya 2024. This means that we will not have access to the line shader introduced in Arnold version 7.4.5.0. This is just a note in case you find any tutorials out there that use a higher Arnold version.

Additionally, this lab assumes that you have completed the Basic Materials Arnold lab and are exposed to and/or familiar with the basics of creating materials and using the hypershade.

# Getting Started

Download the toon shader lab here:
[ToonShaderLab.zip](ToonShaderLab.zip)

Open `ToonShadingLab_Start.ma` and set your project to the lab (this should be the folder that contains `workspace.mel`). You should see a sphere, a human, and a directional light.

![](getting_started_0.png)

<!-- # Set the Renderer to Arnold

The toon shaders we are using are part of Arnold, the default renderer that Maya comes with, so let’s set our current renderer to that. Open render settings by clicking on the icon with the clapboard and the gear.

![](set_renderer_to_arnold_0.png)

Set the renderer to Arnold:

![](set_renderer_to_arnold_1.png) -->

# The Toon Shader

<!-- This lab will cover 3 main parts of toon shading: base colors, edges (the outline of color around objects), and rim light (the edge of light around objects)

![](basic_toon_shading_0.png)

Let’s attach a toon shader to the sphere. Hold down the right mouse button on the sphere and in the menu that appears, select `Assign New Material`.

![](basic_toon_shading_1.png)

Under the Arnold, Shader tab, select `aiToon`.

![](basic_toon_shading_2.png) -->

Select the sphere and attach the `aiToon` shader to it.

![](ss1.png)

In the attribute editor for the sphere, you should see that an `aiToon` shader has been attached to the sphere.

![](basic_toon_shading_3.png)

Like with everything, make sure to name your shader something descriptive

## Base Colors

If you scroll down, you should find the `Base` section of the toon shader. Here is where you can set your base color, or your diffuse color. By adjusting the `Color` attribute, you can change the color of your object.

If you render the scene now, you should see a colored sphere. It doesn't look too terribly interesting however.

![](ss2.png)

What we want to do to achieve a toon look is to create a sharper cutoff between the light and dark parts of the sphere. In other words, instead of some smooth lighting across its surface, we want it to be stepped and distinct. To fix this, we are going to attach a ramp to the `Tonemap` of the `Base Color` attribute.

A Tonemap is the gradation of the brightest and darkest parts of an object due to lighting. Currently, this is perfectly smooth and linearly interpolated (blended), which would work for something realistic, but not the toon effect we're going for.

![](ss7.png)

Notice here how the darkest part of the object is _not_ the opposite side of the sphere, but at the halfway point. This is because in the tonemap, the values of darkness are the same from here on out. There is not light coming from the opposite side of the sphere since it's only a singular directional light, which means that darkest part of the sphere is at the halfway point where the sphere starts to face away from the light.

In other words, everything past that point is the same color or same "in shadow" level.

In the hypershade network, we are going to open the graph network for the toon shader we've created. I've named mine `ball_shader` so for the rest of this lab, that's what I'm going to be referring to it as.

In this graph, we are going to create a ramp texture node.

![](ss3.png)

A ramp is essentially a gradient that interpolates between two values. Our goal is to be able to create a harsher cutoff between the lightest and darkest parts of the ball. In other words, we want to be able to control its Tonemap using "something". That something is going to be a ramp because a ramp allows us to control the interpolation between two values (the lightest and darkest parts at each end of the gradient)

There's a bit of a problem though. The ball shader doesn't seem to have any input connections to the Tonemap attribute. This is because by default, Maya doesn't expose every single attribute on the node. There would be too many attributes otherwise!

Instead, we can find the attribute ourselves. Drag the `Out Color` of the ramp node to the little white dot here.

![](ss4.png)

Then select `Other`.

Here in the window that pops up, find and select `baseTonemap`. You should now see that the ramp we created is attached to the `Base Tonemap` attribute on the ball shader.

![](ss5.png)

![](ss6.png)

If we take a look at our render now, you can see that it looks exactly the same. This is because our ramp by default is smoothly interpolating between the lightest and darkest parts, which is the same thing as before when we didn't have the ramp.

Let's select our ramp node. If you click the little dots on the gradient, you can view the attributes attached to that specific gradient stop.

Selecting the black dot, lets change the `Interpolation` mode to `None`. You should see the entire ramp turn black. This is because with the interpolation set to `None`, we are saying that it is going to be the same color (black) until it reaches the next gradient stop. IE: it won't blend between the two colors.

Unfortunately, this makes our entire Tonemap the same color. To resolve this, lets move the white gradient stop to the middle.

![](ss9.png)

Taking a look at our render now, we see something that resembles our desired effect a lot more.

![](ss10.png)

> Here are some questions to test your understanding of what's happening. Why do you think that even though the ramp is at the halfway point, the cutoff on the ball (the boundary between the light and dark parts), isn't perfectly at the middle of the ball?  
> If you are struggling to answer this question, refer back to what a Tonemap is and what we are specifically doing to the Tonemap.

Unless this is the specific effect you're going for, this usually doesn't look too good. We might want more than 2 colors determining the shadows of our object. To create a more detailed gradation, we can simply add more gradient stops.

In the attribute editor of your ramp node, you can click anywhere on the ramp to add a new gradient stop. Make sure you change your interpolation mode to `None`, and adjust the color so it creates a smoother blend between the two colors.

![](ss11.png)

Here I've added a few more stops, making sure that white is still on the rightmost stop. Each gradient stop corresponds to a band of color, which you can see reflected in the ball here. 4 stops = 4 bands.

![](ss12.png)

The Base Tonemap is multiplied against the Base Color. In other words, if you multiply gray with the base color, the final look will be just a darker version of that color. This is essentially the same as the "multiply" layer effect in Photoshop or other drawing softwares.

Oftentimes, you don't want the shadows of an object to be pure black. I tend to like to set the darkest parts to a dark gray instead of pure black.

![](ss13.png)

By changing the color of the tonemap, you can also achieve different effects. Here's me messing with some different colors for the shadows. Shadows in real life tend to be blueish so you can experiment with that if you desire, or go for something completely unrealistic as well!

![](ss14.png)

Hopefully this gets you familiar with how the Tonemap works. Understanding the Tonemap is key to getting toon styled looks. This is just the Tonemap for the diffuse color, but there also exists separate Tonemaps for the specular as well. Additionally, we explored having no interpolation in our Ramp, however, depending on the style you want, you can have linear interpolation and just weigh it differently by moving the sliders around, or even a mix!

> Depending on the light being used, the Tonemap looks different. A distant/directional light (the one used in this lab) creates harsher cutoffs and brighter colors. The Tonemap essentially has a larger effect. A dome light however creates a more diffuse look and less harsh changes between each gradient band. I suggest reading the Arnold Toon documentation for more information

> The Tonemap Hue Saturation allows you to control the RGB value separately from the value (brightness). We will not be getting into this but when used in conjunction, the Tonemap controls the brightness of the Tonemap and the Hue Saturation controls the Tonemap only with respect to color

## Edges

In a lot of cartoon style looks, we tend to have a lot of edge outlines for lineart. To do this with the toon shader, we will employ the `edge` attribute.

In order for this to work however, we need to change our render filter to `contour`. Don't worry too much about what this means, but it's necessary for edge outlines to work.

Go to `Windows` &rarr; `Rendering Editors` &rarr; `Render Settings`. Then navigate to the `Arnold Renderer` tab, and under `Filter`, change the `Type` to `Contour`.

![](ss15.png)

The edge outline is actually enabled by default on the `aiToon` shader, but in case it isn't, go to the `Edge` section of the toon shader and enable it.

If you render the scene now, it now looks like this!

![](ss16.png)

Here you can adjust the color as well as the tonemap of the edge! Here I've just attached a simple linearly interpolated ramp to the Tonemap and changed the color a bit. If you don't remember how to attach a ramp to a tonemap on the toon shader, refer back to the above section.

![](ss17.png)

In your own models, you might have more complex models where you want more control over how and where edges appear. You can adjust the `Edge Detection` radius to only make edges appear different angles.

## Specular

Find the Specular section of the toon shader. The specular is by default set to 0. By increasing it, you can make the object appear to be more of a mirror like surface, or in other words, have reflections. The higher the specular weight, the more specular and less base color it has. A specular weight of 1 means only specular color, no base color.

In the toon shader, the Roughness attribute controls how close to a diffuse surface it is. A roughness value of 0 is a perfect mirror while a roughness value of 1 is a perfectly diffuse surface.

![](ss18.png)

Here I've increased the specular weight by just a little, and given it a bit of specular roughness. Additionally, I attached a ramp to the tonemap to make the specular reflection have a toon look by separating its colors.

## Rim Light

Find the Rim Lighting section in the toon shader.

A rim light is defined by the shadow of a light. It is the boundary of an object where the light stops lighting the surface relative to the viewer. In other words, it is the part of the object that starts to turn away from the viewer (the edges of an object, or, the "rim").

Set the color of the rim light to white.

![](ss19.png)

![](ss20.png)

Unfortunately, this looks kinda bad. Our rim light goes all the way to the center and it's perfectly smooth, which is not the effect we're going for.

To resolve the first issue, we can adjust the `Width` attribute of the Rim Lighting.

![](ss21.png)

Lowering the width attribute gives us a much more localized rim light.

To resolve the perfectly smooth issue, we need a... ramp! Remember, a ramp allows us to control the gradation of an attribute. The rim light doesn't have tonemap. This is because by definition, a tonemap doesn't really apply to a rim light. However, we can instead just attach a ramp to the color of the rim light instead.

![](ss22.png)

Here's what my graph looks like so far

![](ss23.png)

# Shade the character!

Using what you've learned try shading all of the character _except his pupils and eye highlights_. Colors are up to you. You can select individual faces and assign toon shaders to them to make his skin and suit different colors. (Applying different shaders to different faces on one model is actually considered bad practice, but it works fine for toon shaders)

![](ss25.png)

## Flat Shaders

The eye highlights (the little circles on his pupils) are going to be the same shade of white no matter what and they don’t need edges. There is a convenient shortcut shader for that: a Flat shader!

Select the eye highlights.

![](highlights_0.png)

Instead of a toon shader, assign an aiFlat shader to them.

![](highlights_1.png)

In the aiFlat shader, the color attribute should already be white.

![](highlights_2.png)

If you render the scene now, it looks like this. It looks the same as before, but now the eye highlights will be this shade of white no matter what the lighting conditions are.

![](ss26.png)

Don't forget to name your shaders!

## Attaching Image Textures

We are going to attach a texture to a toon shader. Select the pupils and assign a toon shader to them.

![](texture_0.png)

Here, we want to attach a texture file to the pupils. In the `sourceImages` folder, use the png file called `GrunkPupil`.

![](ss27.png)

Then set up the shader normally (ex. Tonemaps, specular, edge. You probably won't need a rim lighting though).

---

Here are my final shaders!

![](ss28.png)

Note that in this lab, the lighting is made intentionally dark to showcase the idea of a Tonemap better. In your real lighting, you might want to have multiple lights, and/or a dome light instead of only a directional light.

## Final Notes

Here we used the ramp shader almost exclusively. However, feel free to play around with things. For example, you might not want to have hard cutoffs for the specular or rim lighting. Or you might only want 2 colors instead of the multiple gradient stops we included in this lab. Additionally, you can always attach different shaders that aren't the ramp shader to these tonemaps.

# Submission

You can now submit the lab at this point. Please submit a screenshot of a full body render of your character as well as a .zip file of the entire project folder.

# Other Toon Shading Sections

- Silhouette
  - A bit like edges, but only covers the outline of the model, while edges can appear on hard edges not on the boundaries of the model as well
- Transmission
  - For glass and transparent objects. Make sure Opacity is checked in the model’s render stats. Also, the weight attribute in the specular section must be greater than 0.0 or Transmission will have no effect at all.
- Emission
  - For a glowing effect
- Geometry
  - Connect normal maps here
- Sheen
  - For a microfiber “velvety” look

For more details check [the official toon shader](https://docs.arnoldrenderer.com/display/A5AFMUG/Toon) documentation.

## Quick Crash course on rendering with Arnold

This section is nice to know when you're in the rendering pipeline stage. You can ignore this otherwise (for the purposes of this lab assignment, you can ignore this.)

Open the render settings window. In the Common tab, set up everything as you would normally. You can set the render image type here.

### Rendering without Alpha Channel

Render as png images.

### Rendering with Alpha Channel

Render as exr images. Alpha channel is supported in Arnold EXR image sequence renders.
However, you will need to render twice. When the filter is set to Contour, Arnold only renders edges. When the filter is set to the default Gaussian filter, Arnold renders everything but edges.  
You will have to render one pass with the Contour filter and another pass with the Gaussian filter. Then composite the edges over everything else.

# (optional read) Cool Stuff You Can Do With Toon Shading: Combining 2D and 3D Animation

Toon shading makes it easier to combine 2D and 3D animation by making the two styles look more consistent. There are many ways to combine 2D and 3D animation.

## Faces

Do you suck at modeling, rigging or animating faces in 3D? Well why not just do it in 2D? Sometimes it's easier to draw faces than to model them. Also in 3D, every facial change needs to be accounted for with a rig control and/or blendshape. In 2D animation, however, subtle changes in expressions can be accomplished with just a few pen strokes.

Ex: Clip from Land of the Lustrous, an almost fully CGI anime. Faces drawn in 2D.

![](2d3d_0.gif)

Cool optional read: <a href="https://sites.psu.edu/ayfunthingsarefun/2018/01/23/cgi-in-land-of-the-lustrous/" target="_blank">Land of the Lustrous BTS</a>

Ex: Clip of Mel-chan from 3DMA. 3DMA (3D Modeling and Animation) is a student organization in UC Berkeley (Join us!). Mel-chan is the human form of Mel, 3DMA’s fox mascot. Face and hair drawn in 2D.

![](2d3d_1.gif)

## Characters in 2D, Backgrounds in 3D

2D animation studios often keep their characters in 2D and create backgrounds in 3D. This technique is great if you have a moving camera. No need to redraw the background every frame.

Ex: Clip from the The Promised Neverland. Background is CGI

![](2d3d_2.gif)

Ex: Clip from the Attack on Titan. Background is CGI.

![](2d3d_3.gif)

## Rotoscoping over 3D animation

Rotoscoping is an animation technique of tracing over parts of existing footage (in this case 3D animation) frame by frame. It can make putting 2D characters in 3D environments easier. Anime studio Ufotable (the studio behind the Fate series and Demon Slayer) sometimes does this.

![](2d3d_4.gif)
