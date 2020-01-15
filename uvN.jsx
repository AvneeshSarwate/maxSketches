<jittershader name="default">
	<description>Default Slab </description>
	<param name="scale" type="float" default="1.0" />
	<param name="modelViewProjectionMatrix" type="mat4" state="MODELVIEW_PROJECTION_MATRIX" />
	<param name="textureMatrix0" type="mat4" state="TEXTURE0_MATRIX" />
	<param name="position" type="vec3" state="POSITION" />
	<param name="texcoord" type="vec2" state="TEXCOORD" />
	<language name="glsl" version="1.5">
		<bind param="scale" program="fp" />
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
			
			uniform float scale;
			void main(void) {
				outColor = vec4(jit_in.texcoord.xy, 0, 0);
			}
		]]>
		</program>
	</language>
</jittershader>
