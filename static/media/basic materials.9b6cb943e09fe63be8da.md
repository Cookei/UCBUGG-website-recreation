# INTRODUCTION

In this lab, we will be learning the basics of materials in RenderMan, and then learning how to create textures so you can configure shaders for the assets in your short film.
This lab is longer than most, so bear with us - shading is a complicated process!

## INSTALLING RENDERMAN

Firstly, if you haven't already done so, follow this link to create a Renderman Forums account:

https://renderman.pixar.com/forum/register.php

You will need one in order to use the Non-commercial version of Renderman.
Once you've created and verified your account, go to the following link:

http://renderman.pixar.com/intro

Log into the account you just created, and follow the instructions to download the Non-Commercial version of Renderman for Maya. You will need to fill out a survey; make sure to select Autodesk Maya as the 3D software you use, After Effects as the compositing software, and Tractor as the dispatcher software.
Once downloaded, execute the installer file.

If you have trouble installing Renderman, please let a facilitator know so they can help troubleshoot the issue.

Once RenderMan has been installed, open Maya. Go to Windows->Settings/Preferences-> Plugin Manager.

Scroll down to find RenderMan_for_Maya.py, and then check the "Loaded" and "Auto load" boxes for both.

![](plugin.png)

Once these plugins are loaded, you will notice a new RenderMan tab has appeared on your UI. It should look something like this:

![](rman_shelf.jpg)

# SET THE SCENE

Now that we have RenderMan installed, let’s do a quick recap of what we’re doing here.

Shading is the name that we use for the process of telling the renderer what your object is made of. A renderer is rendering an image by simulating virtual light rays and recording how they bounce into the virtual camera lens, so the process of shading is simply determining how your object interacts with light.

That means the first step to shading any scene is creating a light source, so we can see what we’re actually working with.

We will use one of the default light rigs that come with Renderman's preset browser. Open up the preset browser by clicking this button on the Renderman tab:

![](preset_browser_on_shelf.png)

The Preset browser is a handy library of pre-made materials and light setups. We will be using the Pixar Atrium light sphere. This is a sphere that surrounds your scene and casts light inwards based on the colors of the image.
Right click on it, and click import.

![](preset_browser_light_ATRIUM.jpg)

Now that we have a good light setup, let's create some geometry that we can shade.
Create a primitive polygon (it can be a cube, sphere, torus, etc.) and add a plane to act as the ground. Additionally, you can add a few more planes around the object to bounce light back at the object. This will create a more realistic setup, and will also help you understand your object’s shadow and how it distorts light traveling through it.
Here’s an example of what we’re looking for:

![](example_setup.jpg)

# MATERIALS

Now that we’ve set the scene, we’ll start assigning materials to our object.

There are two ways to add a material to your object.

The first one is the easiest, and the one I recommend for all general UCBUGG purposes. Select your object in object mode, and then click on the ball with a star on it on the Renderman tab. This will add a PxrSurface shader to your object. This shader can be used for pretty much any material you can think of.

![](pxrsurface.png)

The second option the following: Select your object in object mode and right click. Navigate down to Assign New Material. Use the search box (image) to narrow down to Renderman RIS materials which all start with “pxr.” It’s important that you limit yourself to these materials as they are designed to work best with our renderer and will be compatible with the lights we teach you later in the course.

![](pxr21.png)

From this menu, you have several choices for your material. The only shader you should realistically be using is PxrSurface, since it's the newest one and is therefore compatible with our version of Renderman.

Once the material is applied, it will appear in the object’s attribute editor (usually the last tab in the list). If your object has a long history, it may be hard to hunt down. Alternatively, right click your object and click “material attributes” to jump straight to the material in the attribute editor.

## TEST RENDERING

To see what your material will look like in your completed short, we need to render it. Rendering produces an image by simulating light - it sends out virtual photons from the lights in your scene. The way these virtual photons bounce around your scene and end up hitting your camera determines the image that results. (In reality, renderers usually send photons out from the camera itself to save time - if this subject interests you, take CS184!)

To do a test render, click the small blue R at the top left of your viewport. This will do an in-viewport test Render, that updates as you make changes or move the camera.

![](tiny_render_icon.jpg)

To do an actual frame render, go to Renderman -> Render, or click the leftmost icon on the Renderman shelf. This will open the external program IT. IT will slowly fill in detail as it makes more iterations of its light calculations. You can set what camera you render from by clicking "Renderman->Renderman Globals...". You can also adjust the image resolution from the global options. We'll go more in depth on rendering in the next few weeks.

Another option for doing a live-update test render is Renderman -> IPR Render. IPR Render will render a frame and update your material changes on the fly so you don't have to stop and re-render each time.

# EDITING MATERIAL ATTRIBUTES

Now, let’s play around with our shape’s material to figure out how a PxrSurface shader works. Once you’ve added a PxrSurface to all the objects in your scene, click on the one you plan on editing, and then scroll all the way to the rightmost tab in the attribute editor. You should see two tabs, called something like “lambert2” and “PxrSurface1”.

![](pxrsurface_attribute_editor.jpg)

The PxrSurface is the shader attached to your object that RenderMan uses when it renders. The Lambert shader is what Maya uses in the viewport when you’re not rendering. You can ignore the Lambert shader for now and focus on the PxrSurface.

Scroll through the attribute editor and look at the different dropdowns.
There are a bunch - but the most important ones are the following:
**Diffuse:** the base color of your object.
**Primary / Rough Specular:** the highlights / metal-ness of your object.
**Clear coat:** a transparent glazed look.
**Iridescence:** a view-dependent scattering of light that creates a color-shift effect.
**Fuzz:** a fuzzy effect that can simulate velvet or fuzzy fabrics.
**Subsurface Scattering / Single scatter:** these make the shader translucent, so light can scatter around inside it. Subsurface scattering is useful for simulating skin, wax, marble, and other translucent (but not transparent) materials.
**Glow:** Lets your shader emit light. Use this to create a lightbulb or anything glowing.
**Glass:** For creating anything transparent, like glass, water, diamond, etc.

You can also check out [the Pixar documentation](https://rmanwiki.pixar.com/display/REN22/PxrSurface) for a full list of PxrSurface properties and visuals on what they all do.

Each dropdown has multiple properties. Diffuse has Color, Roughness, and Gain, Primary Specular has Face Color, Edge Color, etc. Every property takes in a value - some take in RGB values (i.e. 3 numbers between 0-1), and some only take in black & white values (i.e. one number between 0-1).
In general, the “\_\_\_ gain” property determines how much this attribute contributes to the shader as a whole. Turn this up to make the property actually show up.

You can choose a color for a property by clicking the colored box next to its name, or adjust the slider to make it lighter/darker.

![](properties1.jpg)

Press the little R icon to preview render in viewport. Now, play around with your object’s properties and try creating something interesting. Here I have created a shiny glass shape with some roughness, by increasing glass refraction & reflection gain, changing the refraction color, lowering diffuse gain, and increasing glass roughness. Feel free to create any type of material you like.

![](example_test_render.jpg)

Once you’ve created something to your liking, **take a clear screenshot of your rendered setup** and save it in an easily-retrievable place. We will ask for the screenshot as part of your lab submission. If you need any help with rendering, remember to ask for help from the facilitators!

## TEXTURES AND PATTERNS

Now, let’s discuss maps and textures. Instead of assigning a single value or color to an attribute, we can assign an image or procedural pattern.

Properties that take in RGB values can have an RGB image applied, and properties that have a 0-1 slider can have a black & white image applied. A lighter color in a pixel in an image correlates to a higher slider value, and a darker color in a pixel correlates to a lower slider value.

But how do we apply a 2D image onto a 3D object? Maya will need a scheme to apply any image to your mesh, that can convert 3D coordinates into something 2-dimensional. The process of creating this scheme is called UV mapping, because each 3D x,y,z coordinate is converted into a 2D u,v coordinate.

Let’s learn how to UV map and create our own textures in the next section!

# UV MAPPING & TEXTURE CREATION

Download and open this file:
(You may need to right click, hit "Save link as ...". If it takes you to a new page filled with text just right click on that page and "Save as". If the file downloaded ends in ".ma.txt" or anything other than ".ma" rename it to have just ".ma" and ignore the warning)
FILE: pencil.ma

You should see a pencil mesh sitting on top of a plane. The pencil has a PxrSurface shader already applied to it, called pencil_PxrSurface. Go ahead and add any quick lighting to the scene using the Preset browser.
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
Now, let’s create a metal-ness (specularity) map, to make the metallic parts of the pencil shiny! This will really make it more realistic.

Un-hide your UV map layer, and create another black layer on top of the color layer.

Now, we want to color over where our ferrule is and make it metallic. The color you paint (grayscale, from black to white) corresponds to the shininess of the metal at that point. That means we should make the shell that corresponds to the ferrule gray, and the rest of the image black (since it’s not metallic). You can also make the tip dark gray since it’s made of graphite. Here’s what I made:

![](uv_spec.jpg)

Like before, hide the UV map layer and export your image.

# APPLYING YOUR TEXTURES

Finally, we have to apply our textures we created to our pxrsurface shader. Switch back to the “Maya Classic” workspace in the top right dropdown, and find the pencil’s PxrSurface shader in the Attribute Editor.

In general, to add any image to a shader attribute, click the checkerboard icon beside an attribute.

For the purposes of this lab, make sure to click on the checkerboard icon next to an attribute like Color under the Diffuse tab, NOT "Input Material"!
You'll want to put your color image into Diffuse Color, and your metallic map into Specular Face Color.

On the sidebar in the window that results, choose RenderMan->Pattern, then choose PxrTexture from the list on the right.

![](pxrtexture.jpg)

The images we created will get plugged into Diffuse color and Specular Face Color. Click the checkerboard icon beside both attributes and add files to each.

Once the files are created, you should see a tab called “PxrTexture1” or something similar in the attribute editor. Click the blue folder icon to look up an image to apply to the attribute.

![](file_icon2.jpg)

For the file plugged into diffuse color, select your color image, and for the file plugged into specular face color, select your metal-ness image.

Now, do a test render! You should see something like the following:

![](pencil_shaded.jpg)

Congratulations, you have shaded your first object! Make sure to save your work.

# WRAP-UP & SUBMISSION

You can use patterns and textures to change more than just the color of your object - you can assign them to any attribute. For example, if I want my material to be transparent in some areas but not others, I can add a black and white fractal to the glass refraction gain property. The darker areas of the fractal correlate to less glassiness, and the lighter areas of the image will be glassier. Also, by assigning a black and white pattern to a “bump” or “normals” attribute, you can add fine details that would take forever to model by hand.

When you’re shading objects for your short film, remember the following: after you’ve made your material for your object, **delete any additional lights or meshes you used to test it**. If you plan on referencing these objects into your scene, they’ll bring the lights along and that can clutter everything up really quickly.

If you’re interested in learning more about shading in Maya, read the UCBUGG Shading Guide or advanced Hypershade lab.

You will be required to submit screenshots of your experiments in the Attribute Editor, as well as the pencil .ma file that you have been editing. Make sure to save your work in the following format: “SECTION_HW6_LASTNAMEFIRSTNAME.ma” and submit to bCourses!
