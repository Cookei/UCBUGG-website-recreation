# Introduction

In this lab, we will be learning about the basic materials in Arnold (Maya's default render engine). Specifically, we will be exploring the aiStandardSurface material.

A material is a set of qualities defining the look and feel of an entire object. For example, metal, plastic, orange juice are all examples of a material. What **isn't** a material is something like an image, bump map, or any type of "texture". Please refer to the lecture slides if you're confused about the difference between a material and a texture.

In today's lab, we will be using both materials and textures together to explore how they interact with each other! Please download this lab file to get started.

[ArnoldBasicLabTemplate](ArnoldBasicLabTemplate.zip)

# Making sure Arnold is activated

Go to Windows -> Settings/Preferences -> Plugin Manager and make sure the mtoa plugins are ticked on. Make sure both the "Loaded" and "Auto load" boxes are ticked.

![](basic_materials_arnold_1.png)

# An Introduction to Materials

Materials and shaders as a whole are unique to each render engine. For example, aiStandardSurface is unique to and only works with Arnold. Other render engines have their own equivalents, like Renderman's pxrSurface. There are however, certain shaders that are ubiquitous enough to work with any render engine. One such shader is the lambert shader. In fact, the lambert shader is the default shading material assigned to all meshes once created! (As of Maya 2024, this has been replaced with the standardSurface shader. Not to be confused with the aiStandardSurface shader which we will be using instead).

> (!info)
> Some other shaders that are equally as ubiquitous as the lambert shader are the blinn and phong shaders. The reason why these ones are so widely supported by every render engine is due to them being one of the first and most default and simple shaders to be created!

## The aiStandardSurface

First, let's add a cube and give it the aiStandardSurface shader! Hold right click over the mesh until a dropdown appears. Then select Assign New Material.

![](basic_materials_arnold_3.png)

A popup box should now appear. Here, shaders are categorized by their shading engine. What we're interested are the shaders under the Arnold tab. Go there and then select the aiStandardSurface shader.

![](basic_materials_arnold_2.png)

> Anything that begins with ai means it is an Arnold shader. For example, aiToon is the Arnold toon shader. To make sure you're using Arnold compatible shaders, make sure your shader begins with ai.

Woo! You've now created your first material! You can view this in rendered mode by clicking the little Arnold logo on the top of the viewport. Make sure you turn this off when you're editing settings as it can lag your computer a lot.

![](basic_materials_arnold_4.png)

Though you might notice that it's not too terribly interesting at the moment. To make it more interesting, we have the tweak various parameters in the attribute editor! If you go to the attribute editor and scroll through the tabs to find the aiStandardSurface1 shader, you can see all the attributes related to the shader that you can tweak!

The first thing you should do is rename your shader to something more descriptive than aiStandardSurface1. This is incredibly important! Otherwise, when working in a big project, you might have a shader called aiStandardSurface24 and have no idea what it refers to. You can see that I've renamed it Cube_Shader here

![](basic_materials_arnold_5.png)

Before we get into what each attribute does however, let's start by applying some presets. Clicking the presets tab on the upper right, you can see a bunch of different shading presets that are available. In this class, we encourage you to make the entire shader yourself to learn what each attribute does, but if you want, you can use these presets to get a feel for how to achieve certain effects.

You can click the "Replace" button to replace the entire shader with the preset, or you can blend what you currently have with a percentage of the new shader!

![](basic_materials_arnold_6.png)

Here is a cube of honey!

### aiStandardSurface attributes

I won't go over every single one of the aiStandardSurface attributes, but I will list a few key ones to note here

- Base
  - Weight
    - Controls how much of the base difficuse color is contributed
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

Please refer to the lecture slides if you are confused about parts of this shader or what certain terms mean. Additionally, you can go to the [arnold shader documentation](https://help.autodesk.com/view/ARNOL/ENU/?guid=arnold_user_guide_ac_surface_shaders_ac_standard_surface_html) if you are curious to learn more about the properties of the aiStandardSurface shader!

## To-do:

> (!important)
> Action items here are to play around with the aiStandardSurface settings to see if you can create anything interesting. Afterwards, save a screenshot of what you've created and name it SECTION_HW6_LASTNAMEFIRSTNAME.png

# Textures and UV Editing

Next, let's assign a texture to our objects! As a reminder, textures are 2d images that you assign to materials to give more flexibility in the way they look. Today we'll go over assigning UV Editing and assigning texture maps. Please download and open this lab template.

[ArnoldBasicLabPencilTemplate](ArnoldBasicLabPencilTemplate.zip)

You should see a pencil mesh sitting on top of a plane. The aiStandardSurface has not been assigned to the pencil yet, so please assign it and name it something descriptive.

Let's start by going into the UV Editing workspace. On the upper right corner of Maya, change the workspace to UV Editing.

![](basic_materials_arnold_7.png)

You should now see the UV Editor next to your viewport. Then, go to object mode and select the pencil. To create some default UVs for our pencil first, in the UV Editor, go to create -> Camera-based.

![](basic_materials_arnold_8.png)

You should now see a wireframe of your pencil appear in the UV Editor. Currently, all our UVs are overlapping on top of each other which is not good. We need to mark edges as seams to "unfold" our object. Think Think of it like peeling a tangerine - we need to take off the peel and flatten into a two-dimensional shape, so we need to cut the peel at certain points (mark seams) and then take the peel off and flatten it out (unfold).

To mark seams on your object, go into edge mode and select edges, then go to the UV editor and click Cut/Sew->Cut. (Hotkey is Shift X) Remember that you can double-click an edge to select the whole edge loop, and shift + click to select multiple edges at once. Additionally, shift + double-click selects all edges between the first selection and the second selection.

Let's think a bit about how we would unfold this pencil. The thing to keep in mind is that you want your seams to be at deliminating portions of the mesh. For example, breaking down this pencil into its material components, we might want to separate the metal eraser cap, the body of the pencil, and the exposed wooden tip of the pencil, and the graphite lead portion of it.
Additionally, since our pencil is cylindrical, we want to mark an edge running down the entire cylinder as a seam to "unfold" the cylinder.

Once you finish marking your seams, your pencil should look something like this.

![](basic_materials_arnold_9.png)

Now to unfold the map. Save your work (as this can sometimes crash Maya), then select your whole object and click Modify -> Unfold. Make sure you have your pencil selected in object mode.

Each section of the pencil surrounded by seams has been unwrapped.

![](basic_materials_arnold_10.png)

Now, in the UV Editor, you can hold right-click and and select by UV Shell. You can now use your w e r hotkeys to move, rotate, and scale these shells around to position them around.

To make life a bit easier, we want to our shells to be in the 0-1 UV square. There are a couple tools that we can use to organize our UV shells. Selecting all your shells, you can use Modify -> Layout to automatically layout your shells. Additioanlly, tools like Modify -> Orient Shells can help align your shells properly.

![](basic_materials_arnold_11.png)

Hover over the different “shells” to figure out which shells belongs to which part of the object. This will be important very soon! Mine looks like this.

Now we want to export our map and import it into photoshop or another image editor, to paint on top of it. In the UV editor, click Image -> UV Snapshot… Then, hit “Browse” next to the filename and choose an easy-to-find location. Change the format to PNG, and keep the rest of the settings.

![](basic_materials_arnold_12.png)

Now, open up this file it outputs in an image editor of your choice. I will be using photoshop (free for Berkeley students), but you can use anything you want. Feel free to use procreate, firealpaca, or even MS Paint!. This is the fun part - painting on the details. Create a new layer underneath the UV map, and color it black. This way, we can see our UV seams on top and also have some contrast on the bottom. Make sure to name these layers so you don't accidentally modify them.

![](basic_materials_arnold_13.png)

Now we can see our UV map. Since we know which UV shell corresponds to each part of our mesh, we can color them accordingly. Paint on the black layer to give your shells some color. Here, I have colored the pencil yellow with a tan wooden part pink eraser, and gray ferrule and tip.

![](basic_materials_arnold_14.png)

Now, **hide the layer with the UV map in it**, and export your image to the folder template that was given (IE: where your scene is located). Now, let’s create a metal-ness (specularity) map, to make the metallic parts of the pencil shiny! This will really make it more realistic.

> (!important)
> If you do not hide your UV seams when you export your final image, those UV seams will show up in your final texture!

Un-hide your UV map layer and Un-hide your black layer. Now, we want to color over where our ferrule is and make it metallic. The opacity you paint corresponds to how metallic that part is. For example, 100% opacity will be incredibly metallic while 0% opacity (transparent) will not be metallic. That means we should make the shell that corresponds to the ferrule opaque, and the rest of the image transparent (since it’s not metallic). You can also make the tip semi-opaque since it’s made of graphite. Here’s what I made:

![](basic_materials_arnold_15.png)

Like before, **hide the UV map layer** and export your image. Your image should be located inside the template folder that was given

## Applying Your Textures

Now, let's connect these textures to our object's shader! First, let's switch back to the default, General, workspace in the upper right corner dropdown.

Select your pencil and add the aiStandardSurface shader if you haven't yet already.

In the attribute editor, next to the Base Color, there is a checkerboard square. Clicking that will attach a connection node. This will make the Base Color be whatever is attached here.

![](basic_materials_arnold_16.png)

In the window that pops up, select File.

![](basic_materials_arnold_17.png)

Just like the shader name, make sure you name your file node something descriptive. Here, I've named it Pencil_Diffuse. Next, you want to click on the little file icon next to Image Name. Then, select your file.

![](basic_materials_arnold_18.png)

Do the same with the metallic map for Base Metallic. One important thing to note here is to change your Color Space from sRGB to Raw. It's important to do this with any textures that are data-based and not color based.

> (!important)
> Change the color space to raw ONLY for the metallic map

![](basic_materials_arnold_20.png)

Notice how instead of checkboxes, they've now been replaced with black square icons. Clicking that will bring you to the file node you created.

![](basic_materials_arnold_19.png)

If you did everything correctly and do a test render, it should look like this! Notice how only the ferrule is metallic.

![](basic_materials_arnold_21.png)

# Wrap Up & Submission

Textures and texture maps can go a long way! Textures can represent colors, but they also represent data points. For example, I can use a texture to control the transmission of an object to make certain parts transparent, or use a texture map to add artificial bumpiness with bump or normal maps!

If you're interested in more advanced shading, understanding how it works more in depth and creating procedual textures, please check out the Hypershade Lab!

For deliverables, save your pencil file as SECTION_HW6_LASTNAMEFIRSTNAME.ma and your screenshot of your cube from the first part as SECTION_HW6_LASTNAMEFIRSTNAME.png and submit it to bcourses.
