# Introduction

In this lab, we will be learning about the basic materials in Arnold (Maya's default render engine). Specifically, we will be exploring the `aiStandardSurface` shader in order to make PBR, or realistic, materials. This lab is split into the following 2 parts.

1. Uniform Materials
2. Texture Mapping

At the end of each section, you will be required to prepare a few items for the submission for this lab.

---

As a review on some terminology, a **shader** is a network of attributes and textures. These attributes link together and tell the renderer how your mesh reacts to light. This defines the _material_ of your mesh.  
A **material** is a set of qualities defining the look and feel of an entire object. For example, metal, plastic, orange juice are all examples of a material. What _isn't_ a material is something like an image, bump map, or any type of **texture**.

Please refer to the lecture slides if you're confused about the difference between a shader, material, and a texture.

In today's lab, we will be using both materials and textures together to explore how they interact with each other! Please download this lab file to get started.

---

# Setup

## Updating Arnold

As of 3/2/2026, the Spring 2026 semester, we will be using the Maya to Arnold MtoA version 5.5.5.2, corresponding to Arnold version 7.4.4.2, with Maya 2024. As this is a newer version of Arnold than what comes defaultly installed on Maya 2024, you will need to update your Arnold version. The following instructions are listed here.

Open up this [link](https://manage.autodesk.com/products/all) to access your Autodesk Maya products. Make sure to sign in with your Berkeley email, or whichever account your Maya account is linked to. You should see something like this.

![](ss22.png)

Your page might not look exactly the same as mine as you might have access to different Autodesk products, however you should be able to find the following Maya product. Click on the `View details` button here.

![](ss23.png)

Then click on `2024` here.

![](ss24.png)

Then click on `Extensions` here. Make sure to also change your operating system to Windows if you're using Windows, or Mac if you're using Mac.

![](ss25.png)

Scroll down until you find `MtoA 5.5.5.2 for Windows` (or `MtoA 5.5.5.2 for Mac`) and click download. Make sure you are using the correct version.

![](ss26.png)

For this next step, make sure you have Maya closed. If you're on Windows, run the `MtoA-5.5.5.2-windows-2024.msi` file that was just downloaded. If you're on Mac, run the `.pkg` file that was downloaded and go through the steps.

![](ss27.png)

You should be brought into this installation wizard. Complete the process. It'll look different on Mac but the process is the same. Just click continue.

![](ss28.png)

### Verifying Installation

Open up Maya and make sure Arnold is activated. Go to `Windows` &rarr; `Settings/Preferences` &rarr; `Plugin Manager` and make sure the mtoa plugin is ticked on. Make sure both the `Loaded` and `Auto load` boxes are ticked.

![](basic_materials_arnold_1.png)

Next, navigate to the Arnold button on your menu bar and click `About`. Verify that the MtoA version is `5.5.5.2` and the Arnold Core version is `7.4.4.2`.

![](ss30.png)

> (!important)
> Please take a screenshot of this window. You will need to submit this for your homework.

# An Introduction to Materials

Please download the following lab file to get started.

[ArnoldBasicLabTemplate](ArnoldBasicLabTemplate.zip)

Materials and shaders as a whole are unique to each render engine. For example, `aiStandardSurface` is unique to and only works with Arnold. Other render engines have their own equivalents, like Renderman's `pxrSurface`. There are however, certain shaders that are ubiquitous enough to work with any render engine. One such shader is the `lambert` shader. In fact, the `lambert` shader is the default shading material assigned to all meshes once created! (As of Maya 2024, this has been replaced with the `standardSurface` shader. Not to be confused with the `aiStandardSurface` shader which we will be using instead).

> (!info)
> Some other shaders that are equally as ubiquitous as the lambert shader are the blinn and phong shaders. The reason why these ones are so widely supported by every render engine is due to them being one of the first and most default and simple shaders to be created!

## The aiStandardSurface

First, let's add a cube and give it the `aiStandardSurface` shader! Hold right click over the mesh until a dropdown appears. Then select `Assign New Material`.

![](basic_materials_arnold_3.png)

A popup box should now appear. Here, shaders are categorized by their shading engine. What we're interested are the shaders under the `Arnold` tab. Go there and then select the `aiStandardSurface` shader.

![](basic_materials_arnold_2.png)

> Anything that begins with `ai` means it is an Arnold shader. For example, `aiToon` is the Arnold toon shader. To make sure you're using Arnold compatible shaders, make sure your shader begins with `ai`.

Woo! You've now created your first material! You can view this in rendered mode by clicking the little Arnold logo on the top of the viewport. Make sure you turn this off when you're editing settings as it can lag your computer a lot.

![](basic_materials_arnold_4.png)

Though you might notice that it's not too terribly interesting at the moment. To make it more interesting, we have the tweak various parameters in the attribute editor! If you go to the attribute editor and scroll through the tabs to find the `aiStandardSurface1` shader, you can see all the attributes related to the shader that you can tweak!

The first thing you should do is rename your shader to something more descriptive than `aiStandardSurface1`. This is incredibly important! Otherwise, when working in a big project, you might have a shader called aiStandardSurface24 and have no idea what it refers to. You can see that I've renamed it `Cube_Shader` here

![](basic_materials_arnold_5.png)

Before we get into what each attribute does, let's start by applying some presets. Clicking the presets tab on the upper right, you can see a bunch of different shading presets that are available. In this class, we encourage you to make the entire shader yourself to learn what each attribute does, but if you want, you can use these presets to get a feel for how to achieve certain effects.

You can click the `Replace` button to replace the entire shader with the preset, or you can blend what you currently have with a percentage of the new shader!

![](basic_materials_arnold_6.png)

Here is a cube of honey!

### aiStandardSurface attributes

I won't go over every single one of the `aiStandardSurface` attributes, but I will list a few key ones to note here

- Base
  - Weight
    - Controls how much of the base diffiuse color is contributed
  - Color
    - Controls the color of the diffuse
  - Metallic
    - Controls how metallic the diffuse is
- Specular
  - Weight
    - Controls the strength/presence of reflections
  - Color
    - Controls what color reflections on the object are
  - Roughness
    - Controls how rough the surface is. A lower value means more shiny, while a higher value means more matte
  - IOR
    - Index of Refraction for glasslike objects or liquids that bend light
- Transmission
  - Weight
    - Controls how transparent an object is
- Subsurface
  - Weight
    - Controls how transluscent an object is
  - Subsurface Color
    - Controls the color of transluscence

Please refer to the lecture slides if you are confused about parts of this shader or what certain terms mean. Additionally, you can go to the [arnold shader documentation](https://help.autodesk.com/view/ARNOL/ENU/?guid=arnold_user_guide_ac_surface_shaders_ac_standard_surface_html) if you are curious to learn more about the properties of the `aiStandardSurface` shader!

## To-do:

![](gummy.jpg)

> (!important)
> Action items here are to play around with the aiStandardSurface settings to see if you can recreate this material here as best as you can. Some helpful hints are to think about what this material is made of. Is it a dielectric or a conductor (metal or non-metal). Is it reflective? Is it rough? Is it transparent? Is it transluscent?

# UV Unwrapping and Texturing

## UV Unwrapping

Next, let's assign a texture to our objects! As a reminder, textures are 2d images that you assign to materials to give more flexibility in the way they look. Today we'll go over assigning UV Editing and assigning texture maps. Please download and open this lab template.

[ArnoldBasicLabPencilTemplate](ArnoldBasicLabPencilTemplate.zip)

You should see a pencil mesh sitting on top of a plane. The `aiStandardSurface` has not been assigned to the pencil yet, so please assign it and name it something descriptive.

Let's start by going into the UV Editing workspace. On the upper right corner of Maya, change the workspace to UV Editing.

![](basic_materials_arnold_7.png)

You should now see the UV Editor next to your viewport. Then, go to object mode and select the pencil. To create some default UVs for our pencil first, in the UV Editor, go to `create` &rarr; `Camera-based`. We can't unwrap UVs unless we have them. That's why it's important to always create default UVs to work with.

![](basic_materials_arnold_8.png)

You should now see a wireframe of your pencil appear in the UV Editor. Currently, all our UVs are overlapping on top of each other which is not good. We need to mark edges as seams to "unfold" our object. Think of it like peeling a tangerine - we need to take off the peel and flatten into a two-dimensional shape, so we need to cut the peel at certain points (mark seams) and then take the peel off and flatten it out (unfold).

To mark seams on your object, go into `edge mode` and select edges, then go to the UV editor and click `Cut/Sew` &rarr; `Cut`. (Hotkey is `Shift X` while your mouse is hovered over the UV Editor). Remember that you can `double-click` an edge to select the whole edge loop, and `shift` + `click` to select multiple edges at once. Additionally, `shift + double-click` selects all edges between the first selection and the second selection.

Before we start unwrapping, let's think a bit about how we would unfold this pencil. The thing to keep in mind is that you want your seams to be at deliminating portions of the mesh. For example, breaking down this pencil into its material components, we might want to separate the metal eraser cap, the body of the pencil, and the exposed wooden tip of the pencil, and the graphite lead portion of it.  
Separating these out into multiple parts would allow us to easily differentiate between different key sections of our object. When creating seams, we want seams to be in places that are hidden or not easily visible. You wouldn't want your T-Shirt to have a seam down the middle of your torso would you?

Additionally, since our pencil is cylindrical, we want to mark an edge running down the entire cylinder as a seam to "unfold" the cylinder. You can't unfold a cylinder otherwise! If you want to visualize this in real life, try to unfold a cylinder without making any cuts.

Once you finish marking your seams, your pencil should look something like this.

![](basic_materials_arnold_9.png)

Now to unfold the map. Save your work (as this can sometimes crash Maya), then select your whole object and click `Modify` &rarr; `Unfold`. Make sure you have your pencil selected in object mode. You can also easily access these tools in the UV Toolkit on the side.

![](ss31.png)

Each section of the pencil surrounded by seams has been unwrapped.

![](basic_materials_arnold_10.png)

Now, in the UV Editor, you can hold right-click and and select by UV Shell. You can now use your `w`, `e`, `r` hotkeys to move, rotate, and scale these shells around to position them around.

To make life a bit easier, we want to our shells to be in the 0-1 UV square. There are a couple tools that we can use to organize our UV shells. Selecting all your shells, you can use `Modify` &rarr; `Layout` to automatically layout your shells. Additionally, tools like `Modify` &rarr; `Orient Shells` can help align your shells properly.

![](basic_materials_arnold_11.png)

Hover over the different "shells" to figure out which shells belongs to which part of the object. This will be important very soon! Mine looks like this.

With any UV Unwrapping process, we need to make sure that our UVs are not distorted. There are a few ways to view this.

You want to click these two buttons here at the top of your UV Editor Panel. This will place a checkerboard pattern across your UV Tiles and display them on your mesh. You can then see how a texture gets tiled across your surface.

![](ss32.png)

We can also go to `Image` &rarr; `UV Distortion` to view the UV Distortion on our mesh.

![](ss34.png)

The key important things to notice here are the colors. Our mesh should be mostly white, which means there is little to no distortion. Blue means the texture is compressed while red means the texture is stretched. When UV Unwrapping, we want to minimize as much distortion as possible.

Overall, we did a pretty good job.

Another thing to note is the direction of your UVs. You can see here in the eraser that the UVs are actually swirling around the eraser. Although this is not a problem with our current mesh, this can pose issues for other textures you might have that are dependant on the direction of the UVs. For example, a wooden plank goes in a single direction, however if your UVs are slanted or swirly, then your texture will also be slanted/swirly.

An important thing to note is that your UVs don't have infinite resolution. In order words, the larger your shells, the more pixels we are able to allocate to that specific UV region. This is known as texel density. In order to get more detail on specific shells, we need to make the shells larger so they take up more space in the UV editor, which in turn will allow more texels/pixels to be inside each shell.

You also don't want your shells to be too close to each other or the edges of your UV tile to avoid any issues where the colors might bleed into each other. You can do this by going to the option box for the Layout tool (`Modify` &rarr; `Layout` option box).

![](ss38.png)

![](ss37.png)

![](ss36.png)

Understanding these concepts is key to UV Unwrapping properly.

## Texturing

Now we want to export our map and import it into photoshop or another image editor, to paint on top of it. In the UV editor, click `Image` &rarr; `UV Snapshot`. Then, hit `Browse` next to the filename and choose an easy-to-find location. Change the format to PNG, and keep the rest of the settings.

![](basic_materials_arnold_12.png)

Now, open up this file it outputs in an image editor of your choice. I will be using Photoshop (free for Berkeley students), but you can use anything you want. Feel free to use Krita, Procreate, FireAlpaca, or even MS Paint!. This is the fun part - painting on the details. Create a new layer underneath the UV map, and color it black. This way, we can see our UV seams on top and also have some contrast on the bottom. Make sure to name these layers so you don't accidentally modify them.

![](basic_materials_arnold_13.png)

Now we can see our UV map. Since we know which UV shell corresponds to each part of our mesh, we can color them accordingly. Paint on the black layer to give your shells some color. Here, I have colored the pencil yellow with a tan wooden part pink eraser, and gray ferrule and tip.

Here, I encourage you to add more detail than what I have added here. For example, some simple shading to the pencil, scratch marks, a rough wooden texture to the wooden tip, etc.

![](basic_materials_arnold_14.png)

Now, **hide the layer with the UV map in it**, and export your image to the folder template that was given (IE: where your scene is located). Now, let’s create a metal-ness (metallic) map, to make the metallic parts of the pencil shiny! This will really make it more realistic.

> (!important)
> If you do not hide your UV seams when you export your final image, those UV seams will show up in your final texture!

Un-hide your UV map layer and Un-hide your black layer. Now, we want to color over where our ferrule is and make it metallic. This will be a grayscale image. The more white your color is, the more metallic it will be. The more black your color is, the more non-metallic it will be. That means we should make the shell that corresponds to the ferrule white, and the rest of the image black (since it’s not metallic). You can also make the tip gray since it’s made of graphite. Here’s what I made:

![](basic_materials_arnold_15.png)

Like before, **hide the UV map layer** and export your image. Your image should be located inside the template folder that was given

## Applying Your Textures

Now, let's connect these textures to our object's shader! First, let's switch back to the default, General, workspace in the upper right corner dropdown.

Select your pencil and add the `aiStandardSurface` shader if you haven't yet already.

Next, we want to open up the Hypershade editor. Go to `Windows` &rarr; `Rendering Editors` &rarr; `Hypershade`.

You should see something like this

![](ss39.png)

To view the graph network of your shader, go to the Materials section and find the shader that you wish to edit. In this case, it is the shader that I attached to the pencil.

Hold right click and go to `Graph Network`.

![](ss40.png)

You should then see your shader network appear in the graph.

![](ss41.png)

I would also recommend naming your shader to something more descriptive.

You can pan around by holding `middle mouse` + `drag`. Additionally, you can zoom in and out using the scroll wheel, and just like in your viewport, `f` will focus on whatever you have selected.

Remember from lecture that a node is a unit of information. Here, we want to connect some information that the pencil shader is going to use to control its base color.

To do this, hover over somewhere in your graph and click tab. This will allow you to type in the name of the node you want to use. If you do not know the name of the node you want to use, you can always select it from the list of all shaders on the left hand side.

We want to create the `file [Texture]` node.

![](ss42.png)

![](ss43.png)

If we select the `file1` node we just created and go to the attribute editor, we can attach the texture we just created the `Image Name` attribute.

![](ss44.png)

Then, by selecting the little green dot next to `Out Color` in the file node, we can drag that over to the `Base Color` attribute in the pencil shader.

![](ss45.png)

This will then connect our file texture to the Base Color. In other words, the Base Color of the shader is whatever is connected to it. The thing that's connected to it, is this file texture.

I'm also going to rename this file node to "diffuse" since that's what I called my texture file.

Next, let's connect our metallic map. To do this, create a new file texture node and assign it the metallic map file you created earlier.

Notice how you cannot drag the `Out Color` into the `Metalness` attribute in the pencil shader.

![](ss46.png)

The reason for this is because the `Out Color` is 3 values, the red, green, and blue channel. However, the `metalness` attribute is only a singular value (also known as a float). It is simple a single number saying how metal an object is, not 3 different numbers telling you how much red, green, and blue they are.

So then, how do we use our metallic map if our metallic map outputs a color? This is how data textures work. By using only black and white, our red, green, and blue channels are all the same. We can just interpret this as a singular gray value that says, the more white it is, the higher the metallic number, the more black it is, the lower the metallic number.

If we click the `+` button next to the `Out Color`, we can expand it into its individual R, G, and B channels, which are each singular values. Remember that a gray color has all R, G, and B all the same value, so it doesn't matter which one you use.

Here, I can drag one of these channels into the `Metalness` attribute in our pencil shader.

![](ss47.png)

> (!important)
> Due to the way color spaces work, for data textures such as this metallic map (and other maps such as specular roughness maps, etc), we need to make sure we're not doing any color conversion to this texture. To do this, we need to set our Color Space to `Raw` which will tell Maya to not use any color conversions on this file, and to instead just use the raw associated value.

![](ss48.png)

If you did everything correctly and do a test render, it should look like this! Notice how only the ferrule is metallic.

![](basic_materials_arnold_21.png)

> (!important)
> Take a screenshot of this and make sure you are showcasing and angle that makes your metallic map visible. You will be required to submit this.

# Trying it out on your own & Triplanar Projection!

Go to the following website [here](https://polyhaven.com/textures). Polyhaven is an amazing website that has many materials available for you to use! Pick an interesting material and download its associated texture maps. Make sure the file format you're downloading is ZIP

![](ss49.png)

Additionally, click the three lines next to the right of the Download button and make sure the following are checked.

![](ss54.png)

Go back to the ArnoldBasicLabTemplate from earlier. The one with the nice fancy dome light and the cube you experimented on. Delete the cube and instead make a default gear. You can do this by going to `Create` &rarr; `Polygon Primitives` &rarr; `Gear`.

Try to connect your diffuse texture into the base color.

![](ss51.png)

You notice here how bad UVs on the side cause the texture to stretch really badly. This is really annoying, especially for environment models where UV unwrapping might be more tedious than helpful. Here, we will employ something called triplanar projection to solve this.

Triplanar projection allows us to "project" the texture uniformly onto the surface instead of relying on UVs. Essentially, we can place a texture on an object without needing UVs, allowing us to texture things efficiently. This is incredibly useful for uniform materials. If you are confused, refer back to the lecture slides.

![](ss52.png)

We can create an `aiTriplanar` node and connect our textures like this instead. Essentially, we take our texture, plug it into a triplanar projection, and then plug the triplanar projection into the base color.

Analyzing it backwards, our base color is driven by a projection, and that projection is projecting the file texture we've inputted.

If it's difficult to understand how nodes connect together, it's okay! It's hard, but understanding these effectively will be really helpful.

![](ss53.png)

Notice how our texture is now uniformly projected and how there's no more UV stretching!

Next, connect the rest of your textures. Remember, data textures (so roughness maps, etc. Anything that's not related to the color of the final output) need to have its color space set to `raw`.

Don't forget to plug each texture into its own triplanar projection node.

For your normal map, plug your file into an `aiNormalMap` node, and plug the `outValue` of the normal map node into the `Normal Camera` attribute. Remember, normal maps are data textures so make sure to set your color space to `raw`.

For your displacement map, create a `displacementShader` node. It will come with a blue `displacementShader1SG` node but you can delete that.

![](ss55.png)

To apply your displacement map, plug your displacement texture (remember it's data texture) into your `displacementShader`'s Displacement attribute. Then connect the output of your `displacementShader` to the `Displacement Shader` attribute in your `aiStandardSurface1SG` node.

![](ss56.png)

In your `displacementShader` node, you can adjust the `Scale` attribute in your attribute editor to adjust how strong the displacement map is. I generally find that a scale of 0.1 is sufficient.

Don't forget all _all_ your textures should go through an `aiTriplanar` node before plugging in anywhere.

If you've done it correctly, then you should get something like this

![](ss57.png)

> (!important)
> Take a screenshot of this. You will need to submit this for your homework.

# Wrap Up & Submission

Textures and texture maps can go a long way! Textures can represent colors, but they also represent data points. For example, I can use a texture to control the transmission of an object to make certain parts transparent, or use a texture map to add artificial bumpiness with bump or normal maps!

If you're interested in more advanced shading, understanding how it works more in depth and creating procedual textures, please check out the Hypershade Lab (note that this uses a different render engine, Renderman. Talk to a facilitator if you don't know how to install it)!

For deliverables, save your pencil file by going to `File` &rarr; `Archive Scene`, save all your texture files accordingly, have all required screenshots, and submit to Gradescope.
