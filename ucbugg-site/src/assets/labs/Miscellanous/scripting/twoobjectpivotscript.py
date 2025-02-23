import maya.cmds as cmds
import sys

def execute(objtext0, objtext1):
    '''
    PART 1, 2: Get object names from their textfields and 
    change the position of the pivot of the first object 
    to the second object's center
    '''
    try:
        #TODO Part 1.1: Get the object names of two selected objects
        #  in the scene (assume we are always selecting two objects)
        obj0 = ... 
        obj1 = ...
        #End TODO
    
        pivotcoord = None #TODO Part 1.4: Get the center attribute of obj0
        
        #TODO Part 2.3: Change obj1's pivot to be placed at the center we just calculated
        cmds.xform(...)
        cmds.xform(...)
        # End TODO
    except:
         sys.stderr.write("Pivot object and Object (pivot to be moved) fields must store valid objects \n")
         return
    print("executed successfully")

    print("executed successfully")
    
def store_obj(textfield):
    '''
    TODO: Store object in the text field if one object is selected. 
    Otherwise, throw an error
    '''
    if None: #TODO Part 1.2: Make sure we are selecting only one object
            sel = ... # TODO Part 1.2: Assign the object we are selecting to sel
            cmds.textField(textfield, e=True, text=sel)
    else:
        print("Only one object can be selected")
        

def createWindow():
    '''
    TODO PART 3: Create the UI for our script
    '''
    title = "Center Pivot Around Object tool"
    size = (450,300)
    execute(None, None)

    # Fill this out here

createWindow()

'''
Extra Credit opportunities:

1.  Modify the second object's pivot to be placed at the first object's pivot
    position - even if the first object's pivot position isn't centered!
    Create a button that toggles between this new method and our current 
    implementation.

    Functions to modify:
    - execute(objtext0, objtext1)
    - createWindow()

2.  Modify the code so that we can have multiple objects' pivots be placed
    at the first object's pivot position all at once!

    Functions to modify:
    - execute(objtext0, objtext1)
    - createWindow()
    - store_obj(textfield) (maybe you need to make another function, 
        or you can create a boolean argument determining whether or not
        you should put one object or multiple objects inside a text box)
'''
