---
layout: presentation
sections:
    - |-
        ## Game I/0 - W3
        ### Pixel Art
        Presentation adapted from this [forum post](http://pixeljoint.com/forum/forum_posts.asp?TID=11299), visit the link to get more detailed information
    - sections:
        - |-
            ### What is Pixel Art?
        - |- 
            <q>If the pixel art loses the sense of the importance of the pixels which construct it, then I don't think it can be called pixel art. It is when the pixels hold importance to the nature of the work which defines it as pixelart.</q> - **Alex HW**
        - |- 
            #### Not all digital art is pixel art
            * Artist has to be in control of the image at the level of the single pixel
            * Every pixel should be purposefully placed
            * Automatic tools to blur, blend, smear the pixels are generally not used
        - |-
            #### Changing a few pixels can have a dramatic effect on the image 
            ![pixel parrot](/game-io-workshops/img/w3/pixel_parrot.png)
    - sections:
        - |-
            ### Terms to know
        - |-
            #### Anti-aliasing
            Making jagged edges look smooth
            ![anti-aliasing](/game-io-workshops/img/w3/anti-aliasing.png)
        - |-
            #### Dithering
            Transitioning between two colors without adding new colors to the palette
            ![dithering](/game-io-workshops/img/w3/dithering.gif)
        - |-
            #### Tiling
            * Useful for creating large areas of texture
            * Single image gets repeated 
            * Make sure edges line up with eachother (There are tools for this)
    - sections:
        - |-
            ### Things to avoid
        - |-
            #### Bad Anti-aliasing
            ![much aa](/game-io-workshops/img/w3/toomuchaa.png)

            **Too Much AA**
        - |-
            ![little aa](/game-io-workshops/img/w3/toolittleaa.png)

            **Too little AA**
        - |-
            ![just right](/game-io-workshops/img/w3/just_right.jpg)
        - |-
            #### Jaggies
            * Jagged lines when pixels look out of place
            * Solution can be to use anti-aliasing
        - |-
            ![jaggies](/game-io-workshops/img/w3/jaggies.png)
        - |-
            #### Bad dithering
            * Too much dithering can create unwanted texture 
        - |-
            ![dithering](/game-io-workshops/img/w3/dithering.png)
        - |- 
            #### Banding
            * Pixels that line up create 'bands'
            * They reveal the pixel grid and lower the apparent resolution
        - |-
            ![banding_1](/game-io-workshops/img/w3/banding_1.png)
            ![banding_2](/game-io-workshops/img/w3/banding_2.png)
        - |-
            ![banding_3](/game-io-workshops/img/w3/banding_3.png)
            ![banding_4](/game-io-workshops/img/w3/banding_4.png)
        - |- 
            #### Pillow-shading
            * Shading by surrounding a central area with increasingly darker bands
            * Pays no attention to the light source
            * Fix by taking into account the direction of the light
        - |-
            ![pillow shading](/game-io-workshops/img/w3/pillow_shading.png)
    - sections:
        - |-
            ### Creating a palette
            **Color palette**: The collection of colors used in your image
        - |-
            #### Color count
            * Better to have a lower color count
        - |-
            **Cohesion**:
            > When you're using less colors, the same colors will reappear throughout the piece more frequently, thus tying the piece together, unifying the work.
        - |-
            **Control**:
            > The smaller the palette, the easier it is to manage. You may, and probably will, want to adjust a color later on. Which will change its relationship between itself and its neighbors. With a smaller palette, the effect of changing a single color is more substantial, and there are less relationships to worry about. 
        - |-
            #### Hue, Saturation
            * Hue: identity of a color (red, green, blue...)
            * Saturation: intensity of a color
            
            ![hue_sat](/game-io-workshops/img/w3/hue_sat.png)
        - |-
            ![saturation](/game-io-workshops/img/w3/saturation_bad.gif)

            **Too much saturation burns the eyes**
        - |- 
            #### Luminosity
            * How dark or light a color is
            * Creates contrast between colors
        - |-
            #### Hue-shifting
            * Having a transition of hues in a color ramp
            * Adds more variety in your picture
        - |-
            ![straight ramp](/game-io-workshops/img/w3/straight_ramp.png)

            **Straight ramp**: Only luminosity changes
            
            ![hue ramp](/game-io-workshops/img/w3/hue_ramp.png)

            **Hue shifted ramp**: Luminosity and hue changes
    - |-
        ### Exercise
        Use [Piskel](https://www.piskelapp.com/) to create your own pixel art
        ![piskel](https://domoticx.com/wp-content/uploads/2015/04/piskel-screen.jpg)
---