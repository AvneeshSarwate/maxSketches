<jittershader name="default">
	<description>Default Slab </description>
	<param name="resolution" type="vec2" default="1280., 960." />
	<param name="sliders" type="float[]" default="0.0" />
	<param name="tex0" type="int" default="0" />
	<param name="modelViewProjectionMatrix" type="mat4" state="MODELVIEW_PROJECTION_MATRIX" />
	<param name="textureMatrix0" type="mat4" state="TEXTURE0_MATRIX" />
	<param name="position" type="vec3" state="POSITION" />
	<param name="texcoord" type="vec2" state="TEXCOORD" />
	<language name="glsl" version="1.5">
		<bind param="resolution" program="fp" />
		<bind param="sliders" program="fp" />
		<bind param="tex0" program="fp" />
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
			uniform vec2 resolution;
			
			vec2 uvN(){ return jit_in.texcoord/resolution; }
			
			uniform float sliders[10];
			void main(void) {
				vec2 stN = uvN();
				//stN = jit_in.texcoord/vec2(1280., 960.);
				float posSlider = sliders[int(floor(stN.x*10.))];
				outColor = vec4(posSlider);
			}
		]]>
		</program>
	</language>
</jittershader>
