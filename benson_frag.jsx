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
                vec2 scale = vec2(1.);;
                vec2 offset = vec2(0.01) * vec2(1280., 720.);
                float lambda = 5.;
                vec4 lumcoeff = vec4(0.299,0.587,0.114,0.);
                vec2 texcoord0 = jit_in.texcoord;
				vec2 texcoord1 = texcoord0;

				//TODO: figure out why you need to do this. 240 is vid height
				//texture seems to be coming in upside down
                //texcoord1 = vec2(texcoord0.x, 720.-texcoord0.y);

                vec4 a = texture(tex0, texcoord0);
                vec4 b = texture(tex1, texcoord1);
                vec2 x1 = vec2(offset.x,0.);
                vec2 y1 = vec2(0.,offset.y);

                //get the difference
                vec4 curdif = b-a;
                
                //calculate the gradient
                vec4 gradx = texture(tex1, texcoord1+x1)-texture(tex1, texcoord1-x1);
                gradx += texture(tex0, texcoord0+x1)-texture(tex0, texcoord0-x1);
                
				//TODO - y1 - deltas for tex1 flipped compared to x b/c of other todo bug
                vec4 grady = texture(tex1, texcoord1+y1)-texture(tex1, texcoord1-y1);
                grady += texture(tex0, texcoord0+y1)-texture(tex0, texcoord0-y1);
                
                vec4 gradmag = sqrt((gradx*gradx)+(grady*grady)+vec4(lambda));

                vec4 vx = curdif*(gradx/gradmag);
                float vxd = vx.r;//assumes greyscale
                //format output for flowrepos, out(-x,+x,-y,+y)
                vec2 xout = vec2(max(vxd,0.),abs(min(vxd,0.)))*scale.x;

                vec4 vy = curdif*(grady/gradmag);
                float vyd = vy.r;//assumes greyscale
                //format output for flowrepos, out(-x,+x,-y,+y)
                vec2 yout = vec2(max(vyd,0.),abs(min(vyd,0.)))*scale.y;

                //  gl_FragColor = vec4(yout.xy,yout.xy);
				//xout = vec2(1., 0);
    
                outColor = vec4(xout.xy, yout.xy);
            }
        ]]>
        </program>
    </language>
</jittershader>
