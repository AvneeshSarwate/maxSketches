<jittershader name="default">
    <description>Default Slab </description>
    <param name="scale" type="float" default="1.0" />
    <param name="tex0" type="int" default="0" />
    <param name="tex1" type="int" default="1" />
    <param name="modelViewProjectionMatrix" type="mat4" state="MODELVIEW_PROJECTION_MATRIX" />
    <param name="textureMatrix0" type="mat4" state="TEXTURE0_MATRIX" />
    <param name="position" type="vec3" state="POSITION" />
    <param name="texcoord" type="vec2" state="TEXCOORD" />
    <language name="glsl" version="1.5">
        <bind param="scale" program="fp" />
        <bind param="tex0" program="fp" />
        <bind param="tex1" program="fp" />
        <bind param="modelViewProjectionMatrix" program="vp" />
        <bind param="textureMatrix0" program="vp" />
        <bind param="position" program="vp" />
        <bind param="texcoord" program="vp" />
        <program name="vp" type="vertex"  >
        <![CDATA[
            #version 330 core
            
            in vec3 position;
            in vec2 texcoord;
            out jit_PerVertex {
                vec2 texcoord;
            } jit_out;
            uniform mat4 modelViewProjectionMatrix;
            uniform mat4 textureMatrix0;
            
            void main(void) {
                gl_Position = modelViewProjectionMatrix*vec4(position, 1.);
                jit_out.texcoord = vec2(textureMatrix0*vec4(texcoord, 0., 1.));
            }
        ]]>
        </program>
        
        <program name="fp" type="fragment"  >
        <![CDATA[
            #version 330 core
            
            in jit_PerVertex {
                vec2 texcoord;
            } jit_in;
            layout (location = 0) out vec4 outColor;
            
            uniform sampler2DRect tex0;
            uniform sampler2DRect tex1;
            uniform float scale;
            void main(void) {
                vec2 amt = vec2(100.);

                vec2 texcoord0 = jit_in.texcoord;
                vec2 texcoord1 = texcoord0;

                //TODO: figure out why you need to do this. 240 is vid height
                //texture seems to be coming in upside down
                //texcoord1 = texcoord1;

                vec4 look = texture(tex1,texcoord0);//sample repos texture
                vec2 offs = vec2(look.y-look.x,look.w-look.z)*amt;
                vec2 coord = offs+texcoord0;    //relative coordinates
                //coord = mod(coord,texdim0);
                vec4 repos = texture(tex0, coord);
                outColor = repos;
            }
        ]]>
        </program>
    </language>
</jittershader>
