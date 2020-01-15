<jittershader name="default">
	<description> Default Slab </description>
	<param name="sliders" type="float[]" default="0.0" />
	<param name="backbuffer" type="int" default="0" />
	<language name="glsl" version="1.0">
		<bind param="backbuffer" program="fp" />
		<program name="vp" type="vertex">
<![CDATA[
varying vec2 texcoord;
void main (void)
{
    gl_Position = ftransform();
    texcoord    = vec2(gl_TextureMatrix[0] * gl_MultiTexCoord0);
}
]]>		
		</program>
		<program name="fp" type="fragment">
<![CDATA[
varying vec2 texcoord;
uniform sampler2DRect backbuffer;
uniform float scale;

void main(void) 
{
	gl_FragColor = vec4(texcoord.xy/vec2(256., 256.), 0, 0);
}
]]>
		</program>
	</language>
</jittershader>
