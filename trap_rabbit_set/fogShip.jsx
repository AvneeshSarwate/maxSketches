<jittershader name="default">
    <description>Default Slab </description>
    <param name="resolution" type="vec2" default="480., 480." />
    <param name="sliderVals" type="float[]" default="0.0" />
    <param name="time" type="float" default="0.0" />
    <param name="useBop" type="int" default="0" />
    <param name="vtime" type="float" default="0.0" />
    <param name="backbuffer" type="int" default="0" />
    <param name="image" type="int" default="1" />
    <param name="modelViewProjectionMatrix" type="mat4" state="MODELVIEW_PROJECTION_MATRIX" />
    <param name="textureMatrix0" type="mat4" state="TEXTURE0_MATRIX" />
    <param name="position" type="vec3" state="POSITION" />
    <param name="texcoord" type="vec2" state="TEXCOORD" />
    <language name="glsl" version="1.5">
        <bind param="resolution" program="fp" />
        <bind param="sliderVals" program="fp" />
        <bind param="time" program="fp" />
        <bind param="useBop" program="fp" />
        <bind param="vtime" program="fp" />
        <bind param="backbuffer" program="fp" />
        <bind param="image" program="fp" />
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
            
            uniform sampler2DRect backbuffer;
            uniform sampler2DRect image;
            uniform vec2 resolution;
            
            vec2 uvN(){ return jit_in.texcoord/resolution; }
            float PI = 3.14159;
            float PI2 = 6.28318;

            vec3 black = vec3(0.0);
            vec3 white = vec3(1.0);

            // normalize a sine wave to [0, 1]
            float sinN(float t){
               return (sin(t) + 1.) / 2.; 
            }

            // normalize a cosine wave to [0, 1]
            float cosN(float t){
               return (cos(t) + 1.) / 2.; 
            }

            vec2 rotate(vec2 space, vec2 center, float amount){
                return vec2(cos(amount) * (space.x - center.x) + sin(amount) * (space.y - center.y) + center.x,
                    cos(amount) * (space.y - center.y) - sin(amount) * (space.x - center.x) + center.y);
            }

            vec2 mod289(vec2 x) { return x - floor(x * (1.0/289.0)) * 289.0; }
            vec3 mod289(vec3 x) { return x - floor(x * (1.0/289.0)) * 289.0; }
            vec3 permute(vec3 x) { return mod289(((x*34.0)+1.0)*x); }
            vec4 permute(vec4 x){return mod(((x*34.0)+1.0)*x, 289.0);}
            vec4 taylorInvSqrt(vec4 r){return 1.79284291400159 - 0.85373472095314 * r;}

            const mat2 myt = mat2(.12121212,.13131313,-.13131313,.12121212);
            const vec2 mys = vec2(1e4, 1e6);
            vec2 rhash(vec2 uv) {
                uv *= myt;
                uv *= mys;
                return  fract(fract(uv/mys)*uv);
            }
            vec3 hash( vec3 p ){
                return fract(sin(vec3( dot(p,vec3(1.0,57.0,113.0)), 
                                       dot(p,vec3(57.0,113.0,1.0)),
                                       dot(p,vec3(113.0,1.0,57.0))))*43758.5453);

            }

            float rand(const in float n){return fract(sin(n) * 1e4);}
            float rand(const in vec2 n) { return fract(1e4 * sin(17.0 * n.x + n.y * 0.1) * (0.1 + abs(sin(n.y * 13.0 + n.x))));
            }

            float noise(float x) {
                float i = floor(x);
                float f = fract(x);
                float u = f * f * (3.0 - 2.0 * f);
                return mix(rand(i), rand(i + 1.0), u);
            }

            float noise(vec2 x) {
                vec2 i = floor(x);
                vec2 f = fract(x);

                // Four corners in 2D of a tile
                float a = rand(i);
                float b = rand(i + vec2(1.0, 0.0));
                float c = rand(i + vec2(0.0, 1.0));
                float d = rand(i + vec2(1.0, 1.0));

                vec2 u = f * f * (3.0 - 2.0 * f);
                return mix(a, b, u.x) + (c - a) * u.y * (1.0 - u.x) + (d - b) * u.x * u.y;
            }

            float noise(vec3 x) {
                const vec3 step = vec3(110, 241, 171);

                vec3 i = floor(x);
                vec3 f = fract(x);

                float n = dot(i, step);

                vec3 u = f * f * (3.0 - 2.0 * f);
                return mix(mix(mix( rand(n + dot(step, vec3(0, 0, 0))), rand(n + dot(step, vec3(1, 0, 0))), u.x),
                               mix( rand(n + dot(step, vec3(0, 1, 0))), rand(n + dot(step, vec3(1, 1, 0))), u.x), u.y),
                           mix(mix( rand(n + dot(step, vec3(0, 0, 1))), rand(n + dot(step, vec3(1, 0, 1))), u.x),
                               mix( rand(n + dot(step, vec3(0, 1, 1))), rand(n + dot(step, vec3(1, 1, 1))), u.x), u.y), u.z);
            }

            const vec4 C = vec4(0.211324865405187, 0.366025403784439, -0.577350269189626, 0.024390243902439);
            float snoise(vec2 v){
                vec2 i  = floor(v + dot(v, C.yy));
                vec2 x0 = v -   i + dot(i, C.xx);
                vec2 i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
                vec4 x12 = x0.xyxy + C.xxzz;
                x12.xy -= i1;
                i = mod289(i);
                vec3 p = permute( permute( i.y + vec3(0.0, i1.y, 1.0 )) + i.x + vec3(0.0, i1.x, 1.0 ));
                vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
                m = m*m;
                m = m*m;
                vec3 x = 2.0 * fract(p * C.www) - 1.0;
                vec3 h = abs(x) - 0.5;
                vec3 ox = floor(x + 0.5);
                vec3 a0 = x - ox;
                m *= 1.79284291400159 - 0.85373472095314 * ( a0*a0 + h*h );
                vec3 g;
                g.x  = a0.x  * x0.x  + h.x  * x0.y;
                g.yz = a0.yz * x12.xz + h.yz * x12.yw;
                return 130.0 * dot(m, g);
            }

            const vec2  CC = vec2(1.0/6.0, 1.0/3.0) ;
            const vec4  D = vec4(0.0, 0.5, 1.0, 2.0);
            float snoise(vec3 v){ 

              vec3 i  = floor(v + dot(v, CC.yyy) );
              vec3 x0 =   v - i + dot(i, CC.xxx) ;
              vec3 g = step(x0.yzx, x0.xyz);
              vec3 l = 1.0 - g;
              vec3 i1 = min( g.xyz, l.zxy );
              vec3 i2 = max( g.xyz, l.zxy );
              vec3 x1 = x0 - i1 + 1.0 * CC.xxx;
              vec3 x2 = x0 - i2 + 2.0 * CC.xxx;
              vec3 x3 = x0 - 1. + 3.0 * CC.xxx;
              i = mod(i, 289.0 ); 
              vec4 p = permute( permute( permute( 
                         i.z + vec4(0.0, i1.z, i2.z, 1.0 ))
                       + i.y + vec4(0.0, i1.y, i2.y, 1.0 )) 
                       + i.x + vec4(0.0, i1.x, i2.x, 1.0 ));
              float n_ = 1.0/7.0; // N=7
              vec3  ns = n_ * D.wyz - D.xzx;

              vec4 j = p - 49.0 * floor(p * ns.z *ns.z);  //  mod(p,N*N)

              vec4 x_ = floor(j * ns.z);
              vec4 y_ = floor(j - 7.0 * x_ );    // mod(j,N)

              vec4 x = x_ *ns.x + ns.yyyy;
              vec4 y = y_ *ns.x + ns.yyyy;
              vec4 h = 1.0 - abs(x) - abs(y);

              vec4 b0 = vec4( x.xy, y.xy );
              vec4 b1 = vec4( x.zw, y.zw );

              vec4 s0 = floor(b0)*2.0 + 1.0;
              vec4 s1 = floor(b1)*2.0 + 1.0;
              vec4 sh = -step(h, vec4(0.0));

              vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy ;
              vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww ;

              vec3 p0 = vec3(a0.xy,h.x);
              vec3 p1 = vec3(a0.zw,h.y);
              vec3 p2 = vec3(a1.xy,h.z);
              vec3 p3 = vec3(a1.zw,h.w);
              vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2, p2), dot(p3,p3)));
              p0 *= norm.x;
              p1 *= norm.y;
              p2 *= norm.z;
              p3 *= norm.w;

              vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
              m = m * m;
              return 42.0 * dot( m*m, vec4( dot(p0,x0), dot(p1,x1), 
                                            dot(p2,x2), dot(p3,x3) ) );
            }
            
            uniform float sliderVals[10];
            uniform float time;
			uniform float vtime;
			uniform int   useBop;

            // quantize and input number [0, 1] to quantLevels levels
            float quant(float num, float quantLevels){
                float roundPart = floor(fract(num*quantLevels)*2.);
                return (floor(num*quantLevels)+roundPart)/quantLevels;
            }

            // same as above but for vectors, applying the quantization to each element
            vec3 quant(vec3 num, float quantLevels){
                vec3 roundPart = floor(fract(num*quantLevels)*2.);
                return (floor(num*quantLevels)+roundPart)/quantLevels;
            }

            // same as above but for vectors, applying the quantization to each element
            vec2 quant(vec2 num, float quantLevels){
                vec2 roundPart = floor(fract(num*quantLevels)*2.);
                return (floor(num*quantLevels)+roundPart)/quantLevels;
            }

            /* bound a number to [low, high] and "wrap" the number back into the range
            if it exceeds the range on either side - 
            for example wrap(10, 1, 9) -> 8
            and wrap (-2, -1, 9) -> 0
            */
            float wrap3(float val, float low, float high){
                float range  = high - low;
                if(val > high){
                    float dif = val-high;
                    float difMod = mod(dif, range);
                    float numWrap = dif/range - difMod;
                    if(mod(numWrap, 2.) == 0.){
                        return high - difMod;
                    } else {
                        return low + difMod;
                    }
                }
                if(val < low){
                    float dif = low-val;
                    float difMod = mod(dif, range);
                    float numWrap = dif/range - difMod;
                    if(mod(numWrap, 2.) == 0.){
                        return low + difMod;
                    } else {
                        return high - difMod;
                    }
                }
                return val;
            }
            vec2 wrap(vec2 val, float low, float high){
                return vec2(wrap3(val.x, low, high), wrap3(val.y, low, high));
            }

            //slice the matrix up into columns and translate the individual columns in a moving wave
            vec2 columnWaves3(vec2 stN, float numColumns, float time2, float power){
                return vec2(wrap3(stN.x + sin(time2*8.)*0.05 * power, 0., 1.), wrap3(stN.y + cos(quant(stN.x, numColumns)*5.+time2*2.)*0.22 * power, 0., 1.));
            }

            //slice the matrix up into rows and translate the individual rows in a moving wave
            vec2 rowWaves3(vec2 stN, float numColumns, float time2, float power){
                return vec2(wrap3(stN.x + sin(quant(stN.y, numColumns)*5.+time2*2.)*0.22 * power, 0., 1.), wrap3(stN.y + cos(time2*8.)*0.05 * power, 0., 1.));
            }


            //iteratively apply the rowWave and columnWave functions repeatedly to 
            //granularly warp the grid
            vec2 rowColWave(vec2 stN, float div, float time2, float power){
                for (int i = 0; i < 10; i++) {
                    stN = rowWaves3(stN, div, time2, power);
                    stN = columnWaves3(stN, div, time2, power);
                }
                return stN;
            }

            vec4 colormap_hsv2rgb(float h, float s, float v) {
                float r = v;
                float g = v;
                float b = v;
                if (s > 0.0) {
                    h *= 6.0;
                    int i = int(h);
                    float f = h - float(i);
                    if (i == 1) {
                        r *= 1.0 - s * f;
                        b *= 1.0 - s;
                    } else if (i == 2) {
                        r *= 1.0 - s;
                        b *= 1.0 - s * (1.0 - f);
                    } else if (i == 3) {
                        r *= 1.0 - s;
                        g *= 1.0 - s * f;
                    } else if (i == 4) {
                        r *= 1.0 - s * (1.0 - f);
                        g *= 1.0 - s;
                    } else if (i == 5) {
                        g *= 1.0 - s;
                        b *= 1.0 - s * f;
                    } else {
                        g *= 1.0 - s * (1.0 - f);
                        b *= 1.0 - s;
                    }
                }
                return vec4(r, g, b, 1.0);
            }

            vec4 colormap(float x) {
                float h = clamp(-7.44981265666511E-01 * x + 7.47965390904122E-01, 0.0, 1.0);
                float s = 1.0;
                float v = 1.0;
                return colormap_hsv2rgb(h, s, v);
            }

            float colourDistance(vec3 e1, vec3 e2) {
              float rmean = (e1.r + e2.r ) / 2.;
              float r = e1.r - e2.r;
              float g = e1.g - e2.g;
              float b = e1.b - e2.b;
              return sqrt((((512.+rmean)*r*r)/256.) + 4.*g*g + (((767.-rmean)*b*b)/256.));
            }

            vec3 coordWarp(vec2 stN, float t2){ 
                vec2 warp = stN;
                
                float rad = .5;
                
                for (float i = 0.0; i < 20.; i++) {
                    vec2 p = vec2(sinN(t2* rand(i+1.) * 1.3 + i), cosN(t2 * rand(i+1.) * 1.1 + i));
                    warp = length(p - stN) <= rad ? mix(warp, p, 1. - length(stN - p)/rad)  : warp;
                }
                
                return vec3(warp, distance(warp, stN));
            }

            vec2 multiBallCondition(vec2 stN, float t2){
                
                float rad = .08;
                bool cond = false;
                float ballInd = -1.;
                
                for (int i = 0; i < 20; i++) {
                    float i_f = float(i);
                    vec2 p = vec2(sinN(t2 * rand(vec2(i_f+1., 10.)) * 1.3 + i_f), cosN(t2 * rand(vec2(i_f+1., 10.)) * 1.1 + i_f));
                    cond = cond || distance(stN, p) < rad;
                    if(distance(stN, p) < rad) ballInd = float(i); 
                }
                
                return vec2(cond ? 1. :0., ballInd/20.);
            }

            float sigmoid(float x){
                return 1. / (1. + exp(-x));
            }

            // calculates the luminance value of a pixel
            // formula found here - https://stackoverflow.com/questions/596216/formula-to-determine-brightness-of-rgb-color 
            vec3 lum(vec3 color){
                vec3 weights = vec3(0.212, 0.7152, 0.0722);
                return vec3(dot(color, weights));
            }


            vec4 main2 () {
				float tswap = useBop == 0 ? time : sliderVals[0] * 300. + sliderVals[1] * 5.;
                float t2 = tswap + 1000.;

                vec2 stN = uvN();
                float numCells = 0.1 + pow((1.-sliderVals[2])*0.6 + 0.4, 5.)*100.;
                vec2 rotN = rotate(stN, vec2(0.5), PI2*100. *sinN(tswap+stN.x*PI));
                vec2 rowColN = rowColWave(rotN, 1000., tswap/4., 0.3);
                vec2 rowColN2 = rowColWave(stN, 1000., tswap/4., 0.03);
                vec2 hashN = stN + (hash(vec3(stN, t2)).xy + -0.5)/numCells/(10. + sinN(rowColN.x*PI+tswap/1.5)*100.);
                vec2 warpCoord = mix(stN, coordWarp(rowColN2, tswap/5.).xy, .8);

				vec3 cam = texture(image, (stN+vec2(sin(time), cos(time))*0.01)*resolution).rgb;
                
                vec3 cc;
                float decay = 0.999;
                float decay2 = sliderVals[6];
                float feedback;
                vec4 bb = texture(backbuffer, mix(mix(hashN, warpCoord, 0.1*sliderVals[3]), vec2(0.5), -sliderVals[7]*0.06 + 0.03)*resolution) ;
                float lastFeedback = bb.a;

                // vec2 multBall = multiBallCondition(stN, t2/2.);
                bool condition = distance(warpCoord, stN) > 0.2 * sliderVals[4] + 0.01; 

                //   implement the trailing effectm using the alpha channel to track the state of decay 
                if(condition){
                    if(lastFeedback < 1.1) {
                        feedback = 1. ;// * multBall.y;
                    } else {
                        // feedback = lastFeedback * decay;
                        feedback = lastFeedback - decay2;
                    }
                }
                else {
                    // feedback = lastFeedback * decay;
                    feedback = lastFeedback - decay2;
                }
                
                vec3 c = vec3(sinN(feedback*10.), sinN(feedback*14.), cosN(feedback*5.));
                
                vec3 col = mix(vec3(feedback), !condition ? cam : bb.rgb, sliderVals[9]);
                col = mix(bb.rgb, col, 0.2 * (1.-sliderVals[5])+0.01);
                
                return vec4(col, feedback);
            }

            void main(void) {
                outColor = main2();
            }
        ]]>
        </program>
    </language>
</jittershader>
