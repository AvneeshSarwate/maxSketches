<jittershader name="default">
	<description> Default Slab </description>
	<param name="scale" type="float" default="1.0" />
	<param name="tex0" type="int" default="0" />
	<language name="glsl" version="1.0">
		<bind param="scale" program="fp" />
		<bind param="tex0" program="fp" />		
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
uniform sampler2DRect tex0;
uniform float scale;

void main(void) 
{
	//gl_FragColor = texture2DRect(tex0, texcoord) * scale;
	gl_FragColor = vec4(texcoord.xy, 0, 0);
}
]]>
		</program>
	</language>
</jittershader>
