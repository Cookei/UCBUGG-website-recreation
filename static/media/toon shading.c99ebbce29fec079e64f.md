# INTRODUCTION

This lab explores how to get a cell shading effect in Maya.

![](intro_far.png)

![](intro_close.png)

## Pros of toon shading:

Renders super fast (< 1 min per frame generally). A good choice if you don't have access to high performance hardware or cloud rendering resources.
Great control of colors in your scene.

## Cons of toon shading:

Takes a bit of setup even for basic features
Particular to this lab: In this lab, toon shading is done with Arnold, the built-in renderer in Maya, not Renderman. If you want to combine toon shading and Renderman features, you will have to do some compositing in post.  
Also particular to this lab: rendering toon shading with alpha channel requires 2 render passes.

## Pipeline

In this lab, toon shading is just using special shaders in Arnold, the built-in renderer in Maya. You can start toon shading as soon as you are done modeling your assets. You only need to unwrap UVs if you are attaching an image texture to the asset (see Attaching Image Textures). Toon shading will require extra steps in rendering and compositing if you want to render image sequences with alpha channel (see Rendering Image Sequences).

# Getting Started

Download the toon shader lab here and set your project to it:
[ToonShaderLab.zip](ToonShaderLab.zip)

Open ToonShadingLab_Start.ma. You should see a sphere, a human, and a directional light.

![](getting_started_0.png)

# Set the Renderer to Arnold

The toon shaders we are using are part of Arnold, the default renderer that Maya comes with, so let’s set our current renderer to that. Open render settings by clicking on the icon with the clapboard and the gear.

![](set_renderer_to_arnold_0.png)

Set the renderer to Arnold:

![](set_renderer_to_arnold_1.png)

# Creating a Toon Shader

This lab will cover 3 main parts of toon shading: base colors, edges (the outline of color around objects), and rim light (the edge of light around objects)

![](basic_toon_shading_0.png)

Let’s attach a toon shader to the sphere. Hold down the right mouse button on the sphere and in the menu that appears, select Assign New Material.

![](basic_toon_shading_1.png)

Under the Arnold, Shader tab, select aiToon.

![](basic_toon_shading_2.png)

In the attribute editor for the sphere, you should see that an aiToon shader has been attached to the sphere.

![](basic_toon_shading_3.png)

# Base Colors

Find the Base section of the toon shader.

![](basic_toon_shading_4.png)

Set Color to any color you want. I’ll set mine to red.

![](basic_toon_shading_5.png)

This is what it looks like if you render the scene now.

![](basic_toon_shading_6.png)

The colors are incorrect and we want a sharper cutoff between the lights and darks of the sphere. To fix this, let’s add a ramp to the base color (This is easier to explain after it’s seen, so let’s set it up and explain later). Click the grid icon next to the Tonemap attribute.

![](basic_toon_shading_7.png)

Select Ramp

![](basic_toon_shading_8.png)

In the ramp, set interpolation to None (since we want no interpolation).

![](basic_toon_shading_9.png)

Drag the white circle to the middle of the ramp.

![](basic_toon_shading_9b.png)

You should end up with a ramp that’s half black and half white.

![](basic_toon_shading_10.png)

Click on the black circle and set the Selected Color from black to a lighter grey.

![](basic_toon_shading_11.png)

If you render the scene now, it looks like this.

![](basic_toon_shading_12.png)

Explanation: What’s going on is that for the lighter parts of the sphere, the ramp’s white is mixed with the original red color (still the original red), and in the darker parts of the sphere, the ramp’s grey is mixed with the original red color (a darker red).

The x-axis of the ramp represents dark to light. You could actually add more than 2 colors to the ramp and get more complex shading. The color mixing method is equivalent to the “multiply” effect in Photoshop.

This is what happens when I change the grey to a light blue.

![](basic_toon_shading_13.png)

This is what happens when I change the grey to a light brown.

![](basic_toon_shading_14.png)

# Edges

Find the Edge section of the toon shader.

![](edge_0.png)

The default parameters are actually perfect. The only reason why they aren’t showing up is because we need a contour filter.

Open up the render settings again

![](edge_1.png)

Open up the Filter section

![](edge_2.png)

Set the filter to Contour.

![](edge_3.png)

If you render the scene now, it looks like this.

![](edge_4.png)

You can edit the line width and color in the toon shader.

# Rim Light

Find the Rim Lighting section in the toon shader.

![](rim_light_0.png)

Set the light color to white.

![](rim_light_1.png)

If you render the scene now, it looks like this.

![](rim_light_2.png)

Currently, the rim light fades gradually to the center of the sphere. We want a sharper cutoff between the lightest and darkest parts of the rim light. Sound familiar? We need another ramp!

Attach a ramp to the Color attribute by clicking on the grid icon next to it. Select Ramp in the menu that pops up. Again, make a half black half white ramp.

![](rim_light_3.png)

If you render the scene now, it looks like this.

![](rim_light_4.png)

We want the rim light to be thinner. There are two ways to do this.

1. Decrease the white part of the ramp.

![](rim_light_5.png)

or  
2. Back in the toon shader’s Rim Lighting section, decrease the Width parameter (I find that 0.4 works well)

![](rim_light_6.png)

If you render the scene now, it looks like this.

![](rim_light_7.png)

# Shade the character!

Try shading all of the character except his pupils and eye highlights. Colors are up to you. You can select individual faces and assign toon shaders to them to make his skin and suit different colors. (Applying different shaders to different faces on one model is actually considered bad practice, but it works fine for toon shaders)

![](intro_far.png)

# Flat Shaders

The eye highlights (the little circles on his pupils) are going to be the same shade of white no matter what and they don’t need edges. There is a convenient shortcut shader for that: a Flat shader!

Select the eye highlights.

![](highlights_0.png)

Instead of a toon shader, assign an aiFlat shader to them.

![](highlights_1.png)

In the aiFlat shader, the color attribute should already be white.

![](highlights_2.png)

If you render the scene now, it looks like this. It looks the same as before, but now the eye highlights will be this shade of white no matter what the lighting conditions are.

![](highlights_3.png)

# Attaching Image Textures

We are going to attach a texture to a toon shader. Select the pupils and assign a toon shader to them.

![](texture_0.png)

In the Base section, click on the grid icon next to the Color attribute.

![](texture_1.png)

Select File

![](texture_2.png)

Click on the folder icon.

![](texture_3.png)

In the "sourceimages" folder, select the png file called GrunkPupil

![](texture_4.png)

If you render the scene now, it looks like this. The colors may look a bit off since you haven't created a ramp in the base colors section.

![](texture_5.png)

Continue setting up the shader as you normally would (ex: base color ramp, edge. You probably won’t need rim lighting, though).

When you render the scene now, it looks like this.

![](intro_close.png)

# UV MAPPING & TEXTURE CREATION

Download and open this file:
(You may need to right click, hit "Save link as ...". If it takes you to a new page filled with text just right click on that page and "Save as". If the file downloaded ends in ".ma.txt" or anything other than ".ma" rename it to have just ".ma" and ignore the warning)  
[pencil_toon.ma](pencil_toon.ma)

You should see a pencil mesh sitting on top of a plane. The pencil has an AIToon shader already applied to it, called PencilAIToon.  
Let’s go into the UV mapping layout, to see the UV editor. On the top right, click the Workspace dropdown and choose “UV Editing”.

![](uv_editing_workspace.jpg)

You should now see the UV editor next to your viewport.
Now, we have to create UV coordinates for our mesh. Click Create->Camera Based at the top of the UV editor.

![](camera_based.jpg)

This basically squashes your 3D object down across the camera plane, thus converting our 3D coordinates to 2D ones.

But we need a map with no overlapping faces, so we have to divide our UV map up even more. We now have to mark edges as seams, and “unfold” our object.
Think of it like peeling a tangerine - we need to take off the peel and flatten into a two-dimensional shape, so we need to cut the peel at certain points (mark seams) and then take the peel off and flatten it out (unfold).

To mark seams on your object, go into edge mode and select edges, then go to the UV editor and click Cut/Sew->Cut. (Hotkey is Shift X)
Remember that you can double-click an edge to select the whole edge loop, and shift-click to select multiple edges at once.

Since our pencil is cylindrical, we want to mark an edge going down the whole thing as a seam. We also want to divide our pencil up by material, since we will be creating our own maps. So, mark the edge loops that divide the ferrule, eraser, wood part, and tip of the pencil.

Once you’re done marking seams, your UV editor should look something like this:

![](pencil_seams_marked.jpg)

Now to unfold the map. Save your work (as this can sometimes crash Maya), then select your whole object and click Modify->Unfold.

Each section of the pencil surrounded by seams has been unwrapped.

![](pencil_unfolded.jpg)

Now, we still have some overlapping parts. To fix this, select your whole object and click Modify->Layout. Now the pencil will be perfectly laid out in the 0-1 UV square, with no overlapping. Hold down right click in the UV editor and select UV shell mode, then hover over the different “shells” to figure out which one is which. This will be important very soon!
Mine looks like this:

![](pencil_layout.jpg)

Now we want to export our map and import it into photoshop or another image editor, to paint on top of it. In the UV editor, click Image->UV Snapshot…
Then, hit “Browse” next to the filename and choose an easy-to-find location. Change the format to PNG, and keep the rest of the settings.

![](uv_snapshot.jpg)

Now, open up this file it outputs in an image editor of your choice. This is the fun part - painting on the details. Create a new layer underneath the UV map, and color it black.

![](uvs_on_black.jpg)

Now we can see our UV map. Since we know which UV shell corresponds to each part of our mesh, we can color them accordingly. Paint on the black layer to give your shells some color. Here, I have colored the pencil yellow with a tan wooden part pink eraser, and gray ferrule and tip.

![](uvs_colored.jpg)

Now, hide the layer with the UV map in it, and export your image to an easy-to-find location.

# APPLYING YOUR TEXTURES

Finally, we have to apply our textures we created to our AIToon shader. Switch back to the “Maya Classic” workspace in the top right dropdown, and find the pencil’s AIToon shader in the Attribute Editor.

In general, to add any image to a shader attribute, click the checkerboard icon beside an attribute.

For the purposes of this lab, make sure to click on the checkerboard icon next to an attribute like Color under the Base tab, NOT "Input Material"!

On the sidebar in the window that results, choose 2D Textures->File.

![](pencil_1.png)

Once the files are created, you should see a tab called “file1” or something similar in the attribute editor. Click the folder icon to look up an image to apply to the attribute.

![](pencil_2.png)

Select your image.

Now, do a test render! You should see something like the following:

![](pencil_3.png)

Congratulations, you have shaded your first object! Make sure to save your work.

# Submission

You can now submit the lab at this point. Please submit your .ma file for the pencil, along with the image texture you created for the colors. Please submit a screenshot of a full body render of your character as well as a .zip file of the entire project folder.

# Other Toon Shading Sections

### Silhouette

A bit like edges, but only covers the outline of the model, while edges can appear on hard edges not on the boundaries of the model as well

### Specular

For reflections and shiny objects. I recommend adding a ramp to its tonemap for sharper highlight areas.

### Transmission

For glass and transparent objects. Make sure Opacity is checked in the model’s render stats. Also, the weight attribute in the specular section must be greater than 0.0 or Transmission will have no effect at all.

### Emission

For a glowing effect

### Geometry

Connect normal maps here

### Sheen

For a microfiber “velvety” look

For more details check [the official toon shader](https://docs.arnoldrenderer.com/display/A5AFMUG/Toon) documentation.

# Rendering Image Sequences

How you render your toon shaders depends on if you want to render images with alpha channel (transparency).

## Quick Crash course on rendering with Arnold

Open the render settings window. In the Common tab, set up everything as you would with Renderman. You can set the render image type here.

![](image_sequences_0.png)

In the Arnold Render tab, there is a Camera (AA) field. In a nutshell, this field controls the overall quality of the render. For toon shading, 1 is low quality (use for render previews), and 3 is good generally. If your render seems noisy, feel free to turn it up even more.

![](image_sequences_1.png)

In the Rendering menu set, go to Render > Render Sequence. The images will be rendered to the “images” folder of the currently set project.

## Rendering without Alpha Channel

Render as png images.

## Rendering with Alpha Channel

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
