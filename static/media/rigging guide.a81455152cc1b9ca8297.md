## INTRODUCTION

> (!info)
> This lab is undergoing revisions and will be updated.

This is the UCBUGG Advanced Rigging Lab. In contrast with the previous advanced lab, there will be no deliverables, but there will be instead a great deal of information and techniques that are important in understanding how Maya works with regards to rigging. We strongly recommend reading through the lab, making sure to have a good understanding of the review section before moving on.

Rigging is one of the more technical stages of the pipeline. The end goal is to create an interface that the animators can immediately and intuitively understand, and that allows them to manipulate the character to the degree they would want. As such, rigging involves two roles: technical engineering and UI/UX design.

As a technical engineer, the rigger creates the actual functionality of the rig. For example, if an animator wants to stretch the length of an arm for emphasis while preserving volume, the rigger has to figure out how to make this happen in Maya without breaking everything.This requires interacting with the various editors and windows in Maya, such as the Node Editor, Channel Box, and Script Editor, and figuring out how to connect things together to create the desired effect. Good organization practices and a strong working knowledge of Maya / ability to play around a lot are key.

As a UI/UX designer, the rigger makes the interface pretty and understandable. For example, the rigger would need to figure out where to put an FKIK switch attribute so that the animators can easily access it. A great deal of this involves how to convey information to the animator concisely, as well as how to give enough control on the rig without exposing its guts and becoming too breakable. Following good design principles and being an animator help.

Remember, the clients here are the animators (which presumably include your future selves and teammates). As such, make sure to do all the hard work now so that animating (already a massively work-intensive process) goes by as smoothly as possible. This means making sure the rigs work and are not a complete pain to use. Make sure not sweep things under the rug (such as default values and orientations) as this will harm the productivity of the animators, who may decide to open up the Outliner and try to break the rig in order to solve their problem. As seen between modeling and rigging (and skinning), problems earlier in the pipeline tend to propagate and compound on each other, requiring many more hours than otherwise required to create hacks and back-fixes. Make the rigs clear and robust, and everybody will be happier in the end.

## REVIEW

Before we start the lab proper, we are going to go into a more in-depth review of some fundamental concepts in Maya, as relevant to rigging.
We may have touched on some of these subjects before, but it is important to have a solid understanding of these concepts before jumping into more advanced rigging techniques.

## AXES

The view axis of the viewport is displayed in the lower left corner. If it is not, it can be toggled by going to Display > Heads Up Display > View Axis. The X, Y, and Z axes (and related attributes) are colored red, green, and blue, respectively. For example, the XY-plane handle of the Move tool and the Rotate Z attribute in the Graph Editor are both colored blue.

Maya’s coordinate system is right-handed, with the world up vector pointing in the positive Y direction. Conventionally, the positive Z-axis is the forward direction (as will be the case in this lab). As such, a character placed at the origin facing the positive Z-axis will have the positive X-axis to their left, and an animator looking at the character head-on will find XY-plane oriented normally, in the same orientation as the standard 2D Cartesian plane.

Transforming an object may change its local pivot/axis. Child objects transform relative to their immediate parents. Everything at the top level of the Outliner hierarchy is implicitly parented under the world space.

## ROTATION

There are various rotation formalisms in 3D. A fairly common and conceptually simple one that Maya uses is called Euler (OY-ler) angles. This is seen in the Rotate X/Y/Z attributes of an object, which are directly manipulated in the Graph Editor during animation. The object’s final rotation (from its parent orientation) is the composition of the three attributes in the (reverse) order specified by the Rotation Order attribute (by default XYZ). For example, with the default rotation order, the object would first rotate around the Z-axis, then the Y-axis and X-axis.

While conceptually simple, Euler angles are prone to a few problems, the main one being gimbal lock. Using the Gimbal axis orientation in the Rotate Tool settings can be useful in seeing this (and when animating in general).

Because the X and Y rotations are applied after the Z rotation (under the default rotation order), the Z rotation rotates the X and Y rotation axes as well. Likewise, the Y rotation affects the X rotation axis (but not the Z axis). Thus, when the Y rotation approaches 90 degrees, the X axis converges to the Z axis, and the object loses a degree of rotation and is in gimbal lock. Although the object theoretically can still be rotated along this missing axis (say, through the Object axis orientation), the rotation interpolation will cause flipping/wobbling/unpredictable behavior in the Graph Editor with the individual rotation values, rendering them unreadable.

Therefore, viewing the rotation axes as a hierarchy from the back to the front of the (default) rotation order, the Z rotation is the primary driver, controlling all the others, and the Y rotation is the secondary driver, where gimbal lock occurs. Gimbal lock cannot be removed with Euler angles (it’s inherent to the system) but its effect can be minimized with good rotation orders. For example, with a root joint on a character facing the positive Z axis and joint orientation matching the world orientation, the Y rotation would be the primary axis (so that the X and Z rotations still rotate the character forward/back and side-to-side, and the Y axis would still follow the world Y axis), and the rotation order would be XZY or ZXY depending on the animation. This choice is determined by what rotations are more important (ZXY is a good starting point), which can be seen by just playing around with the rig.

There’s also another rotation formalism that is commonly used called Quaternions, based on unit quaternions (an extension of the complex numbers). These may be less intuitively obvious (from the perspective of an artist working with raw W/X/Y/Z values) as compared to Euler angles, but solve many of the technical issues with Euler angles. They are easier/more efficient to compose and interpolate, and do not having gimbal lock. For this reason, quaternions are often used internally in game engines and such, and Maya has an option to interpolate animation curves via quaternions. Quaternions are not strictly necessary to know when rigging in Maya, though they can be a useful tool when animating.

## CHANNEL BOX / ATTRIBUTE EDITOR

The Channel Box and Attribute Editor are the primary means of editing an object’s attribute values. Here are some further actions available.

When selecting multiple objects, the last object’s attributes are shown in the Channel Box. Multiple attribute values can be changed at once by selecting multiple text boxes (not channel names). When a value is changed, the value of every selected text box on every similar selected object is changed as well. The Attribute Editor changes one attribute value on one object at a time. Boolean values can be set off/on by entering 0/1 respectively.

Object attributes can be slid by selecting the attribute name (not text box) and MMB-dragging on the viewport. Ctrl+MMB and Shift+MMB changes the sliding speed slower or faster, respectively. Multiple attributes can be slid simultaneously by selecting multiple attribute names. This affects every similar selected object. In the Attribute Editor, individual attributes of individual objects can be slid by Ctrl+MMB-dragging on the text box of the attribute.

Entering a value with Numpad-Enter in the Channel Box keeps the focus on the Channel Box, as opposed to using Enter, which returns the focus to the viewport. When entering a value, pressing Tab enters the value and switches focus to the next attribute in the Channel Box. This can be useful for quickly copying the transformation values of an object (by selecting a bunch of objects and then tabbing through all the channels).

Attribute values in the Channel Box can be changed relative to the previous value by using the “+=”, “-=”, “_=”, “/=”, and “%=” operators (the last one is a modulus or “remainder” operator). For example, entering “_=-1” in the Scale X channel flips the object across the X axis. In the Attribute Editor, typing “=\[expression]” creates an expression for the relevant attribute.

Attributes can be keyed/muted/locked/hidden through the right-click menu of the Channel Box. New attributes can be created/edited by going to the Edit menu of the Channel Box.
The Channel Box by default shows all keyable and nonkeyable displayed attributes. This can be modified by going to Windows > General Editors > Channel Control (also located in the Channel Box Edit menu). This window can also unhide hidden attributes.  
Right-clicking the input/output icons in the Attribute Editor opens a list of all immediate inputs/outputs to select from.

## OUTLINER

Like many windows in Maya, the basic navigation controls behave similarly to the behaviour in the viewport (if it makes sense to do so). In the Outliner, Alt+MMB pans and the ‘F’ hotkey frames the currently selected object.

Additionally, shift-clicking the plus/minus box next to an object fully expands/collapses it. Middle-mouse dragging an object changes its hierarchy. Double clicking a name or pressing Enter with an object selected renames it. The arrow keys can be used to “pick walk” up/down the hierarchy, or to select sibling objects. This is potentially useful when naming many objects at once. Modify > Search and Replace Names may also be useful.  
The outliner also has a split-screen mode, which can be useful as the size of the scene grows. It can be found by pulling up a gray bar in the outliner immediately below the horizontal scroll bar (but above the bottom edge of the window).

By default the Outliner only shows DAG objects, essentially objects that can be parented or parented to. For example, a polygon sphere is a DAG object, but a texture file or shader network is not. This can be toggled by going to Outliner > Display > DAG Objects Only. This option will show a lot. For most purposes, the default display is sufficient, and hides some dangerous, never-to-be-touched nodes (such as lambert1), as well a bunch of seldom-used nodes that would otherwise clutter the outliner. It also normally hides nodes that are not visible/selectable in the viewport, which can be a source of performance issues.. If your Outliner is fairly compact and suddenly explodes (more than expected) when toggling off this behavior, either the scene is super fancy, or there’s a bunch of junk (likely history nodes) that needs to be cleaned up.

DAG stands for Directed Acyclic Graph, which is the structure Maya uses to represent the parent-child hierarchy for applicable objects. This is similar to a tree, except deeper levels can merge, so long as no cycles appear. The structure is similar, then, to a poset (partially ordered set). Maya uses this instead of a tree to do things like instancing.  
Every object’s individual DAG hierarchy contains a transform node and a shape node. The transform node stores the transformation (translate, rotate, scale) and parenting information of an object. The shape node specifies the geometry of an object. The specifics of DAGs are not as crucial as understanding that Maya uses it as a hierarchy of shape nodes parented under transform nodes.

Compare this to Dependency Graph (DG) nodes (which DAG nodes are a subset of), which is a directed graph of connections between attributes and objects, and can be cyclic. Most things in Maya are DG nodes (for examples, shaders are networks of nodes).  
The Outliner also has a search bar at the top. It matches exact phrases, is case sensitive, but accepts the wildcard character ‘\_’. For example, “l\__” searches for everything with the prefix “l\_”, and “\_group_” searches for everything with the word “group” in it. Be careful with Maya’s default naming scheme when searching with this. This is where good Outliner organization and naming schemes/conventions become crucial.

## HISTORY

By default, Maya stores the construction history of objects as input nodes. The technical details of history nodes are beyond the scope of this lab. Instead, we will try to intuit their behavior through the following exercises. While doing these exercises, follow the steps carefully. Try to anticipate the mesh behavior and think about why it would behave the way it does.

## EXERCISE 1

Create an empty scene and create a default polygon cube inside it.  
For right now, let’s just use the creation node attributes, and not the transform tools (translate, rotate, scale). Go to the Channel Box and play around with the width/height/depth and subdivision attributes to see their default behaviors. Remember that channels can be slid by MMB-dragging the viewport. After, set the width and depth to 5, the height to 1, and the subdivision attributes to 1.

Select the top face and extrude it. Don’t move the face. Instead, change the Offset attribute to 0.5. Notice in the Channel Box (or expanded Outliner) the creation of a history node corresponding to the extrusion. This new node is located downstream from the creation node, and so is located at the top of the INPUTS section of the Channel Box.  
Extrude the same face again, and change the Local Translate Z attribute to -0.5. When the history node (not the mesh) corresponding to this second extrusion is selected (either through the expanded outliner, attribute editor, or node editor) the creation node and first extrusion node are listed under its INPUTS section of the Channel Box. Likewise, this node is listed under the latter two nodes’ OUTPUTS section. (The graph of the construction history of the cube can be shown in the Node Editor, by going to Windows > Node Editor).

Go back to the creation node and play around with the width/depth/height attributes. See how the mesh behaves. Then play with the subdivision attributes. See how the mesh behaves now.

## EXERCISE 2

Undo the mesh until just after the second extrusion/local translation.
Go to the extrusion nodes and play around with the Divisions attribute. See how the mesh behaves.

Scale the inner sunk-in face in with the scale tool (the same face that was extruded).
Go back to the extrusion nodes and play with the Divisions attribute. See how the mesh behaves now.

## EXERCISE 3

Delete the cube from the previous exercise, and create a default polygon sphere.
Scale the sphere down with the scale tool.

Go to the creation node in the Channel Box, and play around with the attributes. See how the mesh behaves.

Reset the scale of the sphere.

Go to vertex mode, select all the vertices, and scale them down a similar amount.  
Go to the creation node in the Channel Box, and play around with the Radius attribute. See how the mesh behaves. Then play with the subdivision attributes. See how the mesh behaves now.

After this, hopefully it’s clearer intuitively how the construction history of an object affects its final shape. As the current object in the scene is the final output of all of its inputs so far, any change to the nodes upstream propagates all the way down, potentially causing unexpected behavior, and larger files with too much history tend to become error-prone. This construction history can become fairly complex, and may slow down the scene as well.

For these reasons it is usually a good idea to delete history periodically, and especially when cleaning the scene before moving on in the pipeline (for example, right before rigging). This is done with Edit > Delete by Type > History, which essentially “bakes” the mesh in its current shape (as opposed to deleting editing nodes, which just removes the effect of that node). Note that deformers are part of the construction history of an object, so any rigging/animation deformers (e.g. blendshapes) are deleted with the normal delete history command. Use Edit > Delete by Type > Non-Deformer History instead to preserve these.

## FREEZE TRANSFORMATIONS

The Modify >Freeze Transformations command (also located in the right-click menu in the Channel Box) sets the current transformation of an object as its new zero position, so that the translate/rotate/scale channels are set to the identity. The translate/rotate/scale of an object can be frozen individually. Channels cannot be frozen if there is an incoming connection (e.g. it is constrained or keyed), or if it is locked.

Freezing an object will also freeze all of its children. If one of the children’s attributes are connected or locked, the entire operation will fail. For this reason, any freezing should be done before constraining/locking, etc.

Freezing transformations also preserves the position of an object’s pivot in world space. Note, however, that it will not preserve the local rotation axis of the object. The object’s rotation axis attributes are zeroed out, and the object axis orientation of the transform tools, based on the object’s rotation and rotation axis, is also zeroed out. In effect, the local rotation is instead reset, so that the axis is oriented according to its parent (which is the world space by default).

Additionally, applying Freeze Transformations on joints do not affect their translate channels (joint translates correspond to bone lengths).

## CONSTRAINTS

For constraints in general, avoid using maintain offset. This may behave weirdly later and break the rig. Buffer groups (later in the lab) will be used instead.  
All constraints have a weight attribute that can turn on/turn off/interpolate the effect of the constraint.  
Point/Orient/Scale constraints constrain the translate/rotate/scale channels respectively. Parent constraints constrain the translate and rotate channels. Individual X/Y/Z axes can be constrained through the constraint options.  
Constraint nodes can take in multiple drivers (but only one driven object). The driven object is driven according to the average value of the drivers. For example, Point constraining an object to multiple drivers causes the object to follow the centroid of the translations of the drivers.  
Objects can be constrained to locations on polygonal meshes, NURBS curves, and NURBS surfaces through geometry constraints. Normal constraints additionally orient the driven object along the normals of a polygonal mesh or NURBS surface, and tangent constraints orient along the tangents of a NURBS curve.  
Objects can be constrained to follow a spline through motion paths by going to Constrain > Motion Paths > Attach to Motion Path. This is used more for animation than rigging as it animates the object over time. In rigging, this is more often accomplished through geometry and tangent constraints.  
Objects can be constrained to an individual vertex, edge, or face with point on poly constraints. The driven object will still be constrained to that specific mesh component as the object deforms.  
Maya checks for DG cycles by default. This happens when an attribute (not object) is eventually controlled by itself, and Maya will show a Cycle Check warning. This can occur, for example when a child constrains a parent. This naturally occurs in certain applications (such as rigid body simulations), but should not occur during rigging.

## SCENE MAINTENANCE

Again, make sure to clean the scene regularly, and especially before moving on in the pipeline. In particular, make sure everything is consistently named, is organized in a hierarchy in the Outliner, and doesn’t have any double transformations. Don’t forget to name materials and other objects not normally in the Outliner. Freeze transformations and delete history on objects as applicable.  
Make efficient use of display layers. The Layer Editor is located just below the Channel Box. Most relevant commands are found under the Layers tab and in the right-click menu when selecting a layer. The three toggles to the left of layers control layer visibility, playback visibility, and layer type (normal, template, or reference) respectively. Layers can also be colored, causing objects in the layer to be shaded that color in wireframe mode.  
Before rigging, make sure the model is done and is axis-aligned in the scene (centered above the origin, facing (conventionally) the positive Z axis). This is important for a myriad of rigging and animation reasons, and especially so if the model is symmetric.  
Before adding stuff to a skeleton, make sure that every joint is oriented properly, has sensible rotation orders, and has their transforms (rotate and scale) frozen. Make sure that any joint chain that will be rigged in IK is planar. A sufficient (but not necessary) condition for this that is fairly easy to check is if the child joints (beyond the top joint) in the chain altogether modify no more than one translate and joint orient channel. For example, if the child joints in a chain have values only in Translate X and Joint Orient Z, then the joint chain is planar. (The necessary condition is that such a configuration is possible with some initial joint orientation of the top joint).
Before skinning, make sure the model is UV mapped, and any blendshapes the model has are made and applied.  
Before passing off the rig to the animators, make sure every attribute that should not be accessible is locked and hidden. For example, an elbow that only rotates around the Y axis would have just the Rotate Y field visible in the Channel Box when the controller is selected, and nothing else. The elbow joint would be hidden, by turning off either its visibility or draw style in the Attribute Editor. In this respect, make sure the rig makes sense anatomy-wise, so that the animators can’t break anything that isn’t meant to be broken. Also make sure everything in the scene is under one top-level group, to avoid reference node clutter, and clean up the display layers.

Now, without further ado, let’s jump into the lab proper.

## CUSTOM CONTROLLERS, REVISITED

The basic rigging lab introduced custom controllers. Here are some other techniques involved in creating more user-friendly controls (see analogy to UI above).

## CONTROLLER COLORS

Individual controllers can be colored, as well as the wireframes of polygons, etc. This is done in the Attribute Editor, under Object Display > Drawing Overrides. Check the “Enable Overrides” box and the (first) slider at the bottom of the panel controls the color.  
When overriding colors, make sure to override the shape node of the object, and not the transform node. Layer colors override transform node colors without saving the previous override. Transform node color overrides also override child colors, making everything underneath the object that same color.  
Color overrides are a very strong way of conveying information to the animator. For example, the left side controllers could be blue and the right side controllers could be red. Or the colors can be used to distinguish between FK and IK controls, or between translatable and rotatable controls, etc. Try to avoid using a color that is already used for something in Maya.

## SHAPE PARENTING

As mentioned in the basic rigging lab, controllers can be combined with Curves > Attach. This only works with open NURBS curves though (it stitches endpoints together, resulting in a new open curve). Recall the previous discussion on DAG hierarchy and transform and shape nodes. Another method to combine controllers is to parent the shape node of one controller onto the transform node of another. This works no matter what shape the controller is, be it a closed NURBS circle, a polygon cube, or a skeleton joint, and treats them as one object (leaving them disjoint as before).  
To see this in action, take two controllers / create two NURBS circles and open up the Outliner. Check the box at Display > Shapes, and find the two controllers. Notice how the shape nodes of the controllers are parented under their transform nodes. Trying to middle-mouse drag the shapes results in dragging the entire object, since Maya does not have a UI option to change the hierarchy of shape nodes independent of their transform nodes. Instead, this can be done through MEL, Maya’s internal computer language.  
Make sure to first freeze transformations (and delete history). Then go to the Maya command line in the lower left and enter: “parent -relative -shape \[shapeToParent] \[parentName]” (or “parent -r -s \[shapeToParent] \[parentName]”). As seen in the Outliner, this command has moved the first argument shape under the second argument object, leaving behind the transform node of the first argument, which should be deleted. (The “relative” flag prevents different transform values from interfering.) Now both shape nodes should appear as tabs under a single object in the Attribute Editor, etc., and are now selectable as one object.  
Maya supports Python as well. To toggle between MEL and Python, click the language name to the left of the command line. The relevant Python command is “cmds.parent('\[shapeToParent]', '\[parentName]', relative=True, shape=True)”. Note that the shape and object names are in quotes.  
This is useful in creating disjoint curves, combining circles, and using anything that is not an open curve.  
Note that each individual shape can have its own color override, and altogether still act as one object.

## NURBS TEXT

Maya can also create text curves, taking the spline definitions directly from the given scalable font. This is found under Create > Text. The output (under the “Curves” option) is a set of curves for each character, all grouped together. To make the entire piece of text selectable as one object, apply the parenting method in the previous section.  
To parent multiple shapes to one transform node, first list all the child arguments in the command, then the parent name. For example, in MEL this would look like: “parent -r -s \[shape1] \[shape2] \[parentName]”.  
Maya supports OpenType, TrueType, and Postscript font types. The standard system fonts are supported on all supported operating systems, and so text geometry will work across different computers. Maya can also create text using custom fonts installed onto the computer.

## RIGGING TECHNIQUES

This section is a collection of standard rigging systems. As a great deal of rigging is using technical knowledge of Maya to solve problems for animation (the other half is UI/UX), these techniques are staged as a series of potential solutions to problems that occur when creating useful features for animation. In creating custom/better/more robust rigs for non-standard models/standard models/anything really, this kind of problem solving really comes into play. Try to not only understand the technique, but also gain a sense of the problem solving methodology behind it.

## BUFFER GROUPS

One feature of rigs that is crucial to animation is to have the controllers zeroed out in the default position (i.e. the transformations set to the identity). Another feature that is crucial is to be able to transform controllers along the same local axes as the objects they control. As mentioned previously, Freeze Transformations solves this first issue, but resets the local rotation axis of objects, so that they end up oriented with their parents. The problem then becomes how to create zeroed-out controllers that retain their own object axis orientations.  
Since the local axis orientation needs to be stored somewhere, if it won’t be stored in the controller itself (and the controller can’t directly use the orientations of the objects they control), one idea is to create an empty group that stores the transforms of the controller. This way, as the group and the controller have the same transform, when the controller is parented under the group, all its transforms are zeroed-out by default.  
As applied to a controller hierarchy, instead of controllers being parented under each other, each controller would be parented under a buffer group and these buffer group/controller systems, as single units, make up the hierarchy.  
The buffer group cannot be frozen now as that would reset the rotation axis, but it is not directly selectable except through a parent/ancestor or the outliner, and this solves both problems simultaneously. Also there shouldn’t be a need to freeze transformations later, since that is the point of setting up buffer groups, and most things will be constrained/locked, so the rig won’t break from accidentally trying to freeze transformations. Make sure as well to give the buffer group the same rotation order as the object.  
This setup solves another animation issue as well. The individual Translate X/Y/Z channels that are directly manipulated in the Graph Editor are oriented according to the parent of the object, not the object’s local axis orientation. With a transformation buffer group, the orientation of the parent buffer is the same as the controller orientation, and so moving the controller in one axis under object orientation only affects one translate channel.  
The idea of buffer groups can be extended beyond just that of transformations. The benefit of multiple buffer groups is that each is zeroed out with proper orientations and can be constrained/keyed independently. For example, there can be buffer groups for Set Driven Keys, proxy attribute controls, and isolation simultaneously. The transformation buffer group would sit at the top, and the actual controller would sit at the bottom.

## BROKEN DRIVER HIERARCHY

(To be expanded)  
Make the driver joint chains in a separate hierarchy from the bind skeleton (and the controllers). The controllers should drive the drivers, which drive the bind skeleton.

## REVERSE FOOT SYSTEM

When walking, the heel of the foot generally comes off the ground before the toe. For this reason, being able to lift the heel while the toe stays put is invaluable when animating walk cycles. The current IK scheme does not have that functionality.  
A common solution is to create a reverse foot system. The idea is to have the ball control the ankle and the toe control the ball (up the hierarchy) somehow in FK, while maintaining the IK system from the foot. The foot joints are already in an FK hierarchy (containing the leg IK) so there needs to be a separate FK hierarchy to go in the reverse direction. Additionally, the toe still has to be able to be raised from the ball.  
Create locators at the positions of the ankle, ball, and toe joints, as well as another at the back of the foot (right outside the mesh, on top of the floor/grid). To create the proper orientations to go up the foot chain, orient the ball locator so that it matches the ankle joint, and the ankle locator so that it matches the ball joint. Make buffer groups.
Parent the locators back up the chain, with the heel locator at the top, then the toe locator, etc. Duplicate the ball/toe chain and put it under the previous ball. This driver chain is going to control the bind ankle.  
Point constrain the ankle to its locator, and orient constrain the ankle and old ball to the ball and toe locators respectively.
Create a foot controller, controlling the heel locator. In this, create custom attributes to raise the heel (rotate the old ball) and raise the toe (rotate the new ball). Put these attributes in the foot controller. Create a toe controller that controls the toe locator. Maybe put in a ball controller controlling the old ball. Lock and hide / change visibility as necessary.

## IK/FK SWITCH

For many shots, it’s essential to be able to switch between IK and FK. For example, when jumping into water. Or opening a door. Or kicking something. Or touching anything that can’t be picked up.  
There are several ways of creating this system. The method described here uses three joint chains: one FK chain, one IK chain, and one joint chain that the model is bound to. The connections can be made either through Set Driven Keys, expressions, or the Node Editor. Since the full power of the Graph Editor is not necessary, the Node Editor seems a good choice for its fast evaluation performance.  
After setting up the three joint chains, constrain the bind chain to the FK and IK chains. Since these are joints, only the rotate channels should be constrained, so orient constrain the relevant joints. In selecting the arguments, load all the drivers first, then the driven. All drivers (and any future ones) are added to the same constraint node.  
Create a custom float attribute (call it “FKIK”, say) going from 0 to 1. A name of “FKIK” implies that 0 corresponds to FK and 1 corresponds to IK. An enum can be used as well, though the switch will not be able to blend between FK and IK. This attribute should be located somewhere off the chain, so that IK/FK switching will not hide it. For example, it can be on the main body controller. Or it can be on a dedicated FKIK controller in the shape of text saying “FkIk”.  
Throw the FKIK attribute controller, the orient constraint nodes, and any other controllers in the chain into the Node Editor. The usage of the this window is analogous to the Hypershade. Note that creating connections by click/dragging in here creates the same result as doing so in the Connection Editor.  
Connect the FKIK attribute into the IK weight attributes of the orient constraints. The IK weights should be on and off exactly when the FKIK attribute is, so direct connections will work. The FK weights should then be equal to one minus the IK weights. There is a node to perform this exact operation called “Reverse”, which outputs one minus the input values. Throw a Reverse node in the editor and wire the FK weights accordingly. Then wire the FKIK attribute accordingly into the visibility channels of the controllers, so that they appear only when the bind chain is in the appropriate space. Note that the FKIK attribute will be cast into an integer here, so FK controllers will be visible when the attribute is less than 0.5, and IK controllers will be visible with a value greater than 0.5 (both will appear when it is equal to 0.5).

## ISOLATION

_(To be expanded)_  
Use buffer groups to nullify parent transformations. The MultiplyDivide and PlusMinusAverage nodes may be useful.

## TWIST

_(To be expanded)_  
Add intermediate joints to the bind/driver chains. Make sure that rotation orders are correct. Use the Node Editor or Expression editor to make intermediate joints rotate some percentage of the final joint Rotate X (or whichever) based on their position on the bone chain. Skin as necessary.
