import{D as ut,u as H,c as le,R as At,E as _,j as sr,w as ct,n as N,T as z,P as Ue,k as ht,M as L,o as pi,p as G,F as nr,a as ge,g as ae,S as xi,C as _e,m as mi,U as gi,q as _i,s as yi,t as bi,v as vi,e as ar,x as or,y as lr,G as Ti,z as wi,H as Si,i as Ci,J as ie,f as Gt,K as Pi,L as Mi,N as dt,Q as Dt,V as Ft,b as ur,l as Bi,W as ki}from"./CanvasTest-18dd6528.js";import{S as Ri,C as tt,u as rt}from"./CanvasSource-e2ba726f.js";import{g as Ui}from"./_commonjsHelpers-725317a4.js";function Ai(r,e,t){const i=t?e.maxSupportedFragmentPrecision:e.maxSupportedVertexPrecision;if(r.substring(0,9)!=="precision"){let s=t?e.requestedFragmentPrecision:e.requestedVertexPrecision;if(s==="highp"&&i!=="highp"&&(s="mediump"),r.substring(0,8)!=="#version")return`precision ${s} float;
${r}`;const n=r.indexOf(`
`);return`${r.substring(0,n+1)}precision ${s} float;
${r.substring(n+1)}`}else if(i!=="highp"&&r.substring(0,15)==="precision highp")return r.replace("precision highp","precision mediump");return r}const cr={};let Pe=cr;function Gi(){return(Pe===cr||Pe?.isContextLost())&&(Pe=ut.get().createCanvas().getContext("webgl2",{})),Pe}let Me;function Di(){if(!Me){Me="mediump";const r=Gi();r&&r.getShaderPrecisionFormat&&(Me=r.getShaderPrecisionFormat(r.FRAGMENT_SHADER,r.HIGH_FLOAT).precision?"highp":"mediump")}return Me}const Fi={},Ii={};function Ei(r,{name:e="pixi-program"},t=!0){e=e.replace(/\s+/g,"-"),e+=t?"-fragment":"-vertex";const i=t?Fi:Ii;if(i[e]?(i[e]++,e+=`-${i[e]}`):i[e]=1,r.indexOf("#define SHADER_NAME")!==-1)return r;const s=`#define SHADER_NAME ${e}`;if(r.substring(0,8)!=="#version")return`${s}
${r}`;const n=r.indexOf(`
`);return`${r.substring(0,n+1)}${s}
${r.substring(n+1)}`}function zi(r,{version:e="300 es"}){return r.substring(0,8)==="#version"?r:`#version ${e}
${r}`}const He={ensurePrecision:Ai,setProgramName:Ei,setProgramVersion:zi},Le=Object.create(null),it=class{constructor(r){r={...it.defaultOptions,...r};const e={ensurePrecision:{requestedFragmentPrecision:r.preferredFragmentPrecision,requestedVertexPrecision:r.preferredVertexPrecision,maxSupportedVertexPrecision:"highp",maxSupportedFragmentPrecision:Di()},setProgramName:{name:r.name},setProgramVersion:{version:"300 es"}};let t=r.fragment,i=r.vertex;Object.keys(He).forEach(s=>{const n=e[s]??{};t=He[s](t,n,!0),i=He[s](i,n,!1)}),this.fragment=t,this.vertex=i,this._key=`${this.vertex}:${this.fragment}`}destroy(){this.fragment=null,this.vertex=null,this._attributeData=null,this._uniformData=null,this._uniformBlockData=null,this.transformFeedbackVaryings=null}static from(r){const e=`${r.vertex}:${r.fragment}`;return Le[e]||(Le[e]=new it(r)),Le[e]}};let ft=it;ft.defaultOptions={preferredVertexPrecision:"highp",preferredFragmentPrecision:"mediump"};function Ve(r){const e=/(^|[^/])@(group|binding)\(\d+\)[^;]+;/g,t=/@group\((\d+)\)/,i=/@binding\((\d+)\)/,s=/var(<[^>]+>)? (\w+)/,n=/:\s*(\w+)/,a=/struct\s+(\w+)\s*{([^}]+)}/g,o=/(\w+)\s*:\s*([\w\<\>]+)/g,l=/struct\s+(\w+)/,u=r.match(e)?.map(h=>({group:parseInt(h.match(t)[1],10),binding:parseInt(h.match(i)[1],10),name:h.match(s)[2],isUniform:h.match(s)[1]==="<uniform>",type:h.match(n)[1]}));if(!u)return{groups:[],structs:[]};const c=r.match(a)?.map(h=>{const f=h.match(l)[1],d=h.match(o).reduce((p,y)=>{const[x,v]=y.split(":");return p[x.trim()]=v.trim(),p},{});return d?{name:f,members:d}:null}).filter(({name:h})=>u.some(f=>f.type===h))??[];return{groups:u,structs:c}}var me=(r=>(r[r.VERTEX=1]="VERTEX",r[r.FRAGMENT=2]="FRAGMENT",r[r.COMPUTE=4]="COMPUTE",r))(me||{});function Hi({groups:r}){const e=[];for(let t=0;t<r.length;t++){const i=r[t];e[i.group]||(e[i.group]=[]),i.isUniform?e[i.group].push({binding:i.binding,visibility:me.VERTEX|me.FRAGMENT,buffer:{type:"uniform"}}):i.type==="sampler"?e[i.group].push({binding:i.binding,visibility:me.FRAGMENT,sampler:{type:"filtering"}}):i.type==="texture_2d"&&e[i.group].push({binding:i.binding,visibility:me.FRAGMENT,texture:{sampleType:"float",viewDimension:"2d",multisampled:!1}})}return e}function Li({groups:r}){const e=[];for(let t=0;t<r.length;t++){const i=r[t];e[i.group]||(e[i.group]={}),e[i.group][i.name]=i.binding}return e}function Vi(r,e){const t=new Set,i=new Set,s=[...r.structs,...e.structs].filter(a=>t.has(a.name)?!1:(t.add(a.name),!0)),n=[...r.groups,...e.groups].filter(a=>{const o=`${a.name}-${a.binding}`;return i.has(o)?!1:(i.add(o),!0)});return{structs:s,groups:n}}const Oe=Object.create(null);class Ge{constructor(e){this._layoutKey=0;const{fragment:t,vertex:i,layout:s,gpuLayout:n,name:a}=e;if(this.name=a,this.fragment=t,this.vertex=i,t.source===i.source){const o=Ve(t.source);this.structsAndGroups=o}else{const o=Ve(i.source),l=Ve(t.source);this.structsAndGroups=Vi(o,l)}this.layout=s??Li(this.structsAndGroups),this.gpuLayout=n??Hi(this.structsAndGroups)}destroy(){this._gpuLayout=null,this.gpuLayout=null,this.layout=null,this.structsAndGroups=null,this.fragment=null,this.vertex=null}static from(e){const t=`${e.vertex.source}:${e.fragment.source}:${e.fragment.entryPoint}:${e.vertex.entryPoint}`;return Oe[t]||(Oe[t]=new Ge(e)),Oe[t]}}function Oi(r,e){switch(r){case"f32":return 0;case"vec2<f32>":return new Float32Array(2*e);case"vec3<f32>":return new Float32Array(3*e);case"vec4<f32>":return new Float32Array(4*e);case"mat2x2<f32>":return new Float32Array([1,0,0,1]);case"mat3x3<f32>":return new Float32Array([1,0,0,0,1,0,0,0,1]);case"mat4x4<f32>":return new Float32Array([1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1])}return null}const hr=class{constructor(r,e){this._touched=0,this.uid=H("uniform"),this._resourceType="uniformGroup",this._resourceId=this.uid,this.isUniformGroup=!0,this._dirtyId=0,e={...hr.defaultOptions,...e},this.uniformStructures=r;const t={};for(const i in r){const s=r[i];s.name=i,s.size=s.size??1,s.value??(s.value=Oi(s.type,s.size)),t[i]=s.value}this.uniforms=t,this._dirtyId=1,this.ubo=e.ubo,this.isStatic=e.isStatic,this._signature=Object.keys(t).map(i=>`${i}-${r[i].type}`).join("-")}update(){this._dirtyId++}};let j=hr;j.defaultOptions={ubo:!1,isStatic:!1};class oe{constructor(e){this.resources=Object.create(null),this._dirty=!0;let t=0;for(const i in e){const s=e[i];this.setResource(s,t++)}this._updateKey()}_updateKey(){if(!this._dirty)return;this._dirty=!1;const e=[];let t=0;for(const i in this.resources)e[t++]=this.resources[i]._resourceId;this._key=e.join("|")}setResource(e,t){const i=this.resources[t];e!==i&&(i&&e.off?.("change",this.onResourceChange,this),e.on?.("change",this.onResourceChange,this),this.resources[t]=e,this._dirty=!0)}getResource(e){return this.resources[e]}_touch(e){const t=this.resources;for(const i in t)t[i]._touched=e}destroy(){const e=this.resources;for(const t in e)e[t].off?.("change",this.onResourceChange,this);this.resources=null}onResourceChange(){this._dirty=!0,this._updateKey()}}class pt extends le{constructor({gpuProgram:e,glProgram:t,groups:i,resources:s,groupMap:n,compatibleRenderers:a}){super(),this._uniformBindMap=Object.create(null),this.gpuProgram=e,this.glProgram=t,a===void 0&&(a=0,e&&(a|=At.WEBGPU),t&&(a|=At.WEBGL)),this.compatibleRenderers=a;const o={};if(s&&i)throw new Error("[Shader] Cannot have both resources and groups");if(!s&&!i)throw new Error("[Shader] Must provide either resources or groups descriptor");if(!e&&i&&!n)throw new Error("[Shader] No group map or WebGPU shader provided - consider using resources instead.");if(!e&&i&&n)for(const l in n)for(const u in n[l]){const c=n[l][u];o[c]={group:l,binding:u,name:c}}else if(e&&i&&!n){const l=e.structsAndGroups.groups;n={},l.forEach(u=>{n[u.group]=n[u.group]||{},n[u.group][u.binding]=u.name,o[u.name]=u})}else if(s){if(e){const l=e.structsAndGroups.groups;n={},l.forEach(u=>{n[u.group]=n[u.group]||{},n[u.group][u.binding]=u.name,o[u.name]=u})}else{n={},i={99:new oe};let l=0;for(const u in s)o[u]={group:99,binding:l,name:u},n[99]=n[99]||{},n[99][l]=u,l++}i={};for(const l in s){const u=l;let c=s[l];!c.source&&!c._resourceType&&(c=new j(c));const h=o[u];h&&(i[h.group]=i[h.group]||new oe,i[h.group].setResource(c,h.binding))}}this.groups=i,this._uniformBindMap=n,this.resources=this._buildResourceAccessor(i,o)}addResource(e,t,i){var s,n;(s=this._uniformBindMap)[t]||(s[t]={}),(n=this._uniformBindMap[t])[i]||(n[i]=e)}_buildResourceAccessor(e,t){const i={};for(const s in t){const n=t[s];Object.defineProperty(i,n.name,{get(){return e[n.group].getResource(n.binding)},set(a){e[n.group].setResource(a,n.binding)}})}return i}destroy(e=!1){this.emit("destroy",this),e&&(this.gpuProgram?.destroy(),this.glProgram?.destroy()),this.gpuProgram=null,this.glProgram=null,this.groups=null,this.removeAllListeners(),this._uniformBindMap=null,this.resources=null}}const $i={normal:0,add:1,multiply:2,screen:3,overlay:4,erase:5,"normal-npm":6,"add-npm":7,"screen-npm":8},$e=0,We=1,Ne=2,je=3,Ke=4,Ye=5;class ue{constructor(){this.data=0,this.blendMode="normal",this.polygonOffset=0,this.blend=!0,this.depthMask=!0}get blend(){return!!(this.data&1<<$e)}set blend(e){!!(this.data&1<<$e)!==e&&(this.data^=1<<$e)}get offsets(){return!!(this.data&1<<We)}set offsets(e){!!(this.data&1<<We)!==e&&(this.data^=1<<We)}set cullMode(e){if(e==="none"){this.culling=!1;return}this.culling=!0,this.clockwiseFrontFace=e==="front"}get cullMode(){return this.culling?this.clockwiseFrontFace?"front":"back":"none"}get culling(){return!!(this.data&1<<Ne)}set culling(e){!!(this.data&1<<Ne)!==e&&(this.data^=1<<Ne)}get depthTest(){return!!(this.data&1<<je)}set depthTest(e){!!(this.data&1<<je)!==e&&(this.data^=1<<je)}get depthMask(){return!!(this.data&1<<Ye)}set depthMask(e){!!(this.data&1<<Ye)!==e&&(this.data^=1<<Ye)}get clockwiseFrontFace(){return!!(this.data&1<<Ke)}set clockwiseFrontFace(e){!!(this.data&1<<Ke)!==e&&(this.data^=1<<Ke)}get blendMode(){return this._blendMode}set blendMode(e){this.blend=e!=="none",this._blendMode=e,this._blendModeId=$i[e]||0}get polygonOffset(){return this._polygonOffset}set polygonOffset(e){this.offsets=!!e,this._polygonOffset=e}toString(){return`[pixi.js/core:State blendMode=${this.blendMode} clockwiseFrontFace=${this.clockwiseFrontFace} culling=${this.culling} depthMask=${this.depthMask} polygonOffset=${this.polygonOffset}]`}static for2d(){const e=new ue;return e.depthTest=!1,e.blend=!0,e}}const dr=class extends pt{constructor(r){r={...dr.defaultOptions,...r},super(r),this.enabled=!0,this._state=ue.for2d(),this.padding=r.padding,typeof r.antialias=="boolean"?this.antialias=r.antialias?"on":"off":this.antialias=r.antialias??"inherit",this.resolution=r.resolution,this.blendRequired=r.blendRequired,this.addResource("filterUniforms",0,0),this.addResource("uSampler",0,1)}apply(r,e,t,i){r.applyFilter(this,e,t,i)}get blendMode(){return this._state.blendMode}set blendMode(r){this._state.blendMode=r}};let fr=dr;fr.defaultOptions={blendMode:"normal",resolution:1,padding:0,antialias:"inherit",blendRequired:!1};class pr{constructor(e){this._renderer=e}push(e,t,i){this._renderer.renderPipes.batch.break(i),i.add({renderPipeId:"filter",canBundle:!1,action:"pushFilter",container:t,filterEffect:e})}pop(e,t,i){this._renderer.renderPipes.batch.break(i),i.add({renderPipeId:"filter",action:"popFilter",canBundle:!1})}execute(e){e.action==="pushFilter"?this._renderer.filter.push(e):e.action==="popFilter"&&this._renderer.filter.pop()}destroy(){this._renderer=null}}pr.extension={type:[_.WebGLPipes,_.WebGPUPipes,_.CanvasPipes],name:"filter"};var F=(r=>(r[r.MAP_READ=1]="MAP_READ",r[r.MAP_WRITE=2]="MAP_WRITE",r[r.COPY_SRC=4]="COPY_SRC",r[r.COPY_DST=8]="COPY_DST",r[r.INDEX=16]="INDEX",r[r.VERTEX=32]="VERTEX",r[r.UNIFORM=64]="UNIFORM",r[r.STORAGE=128]="STORAGE",r[r.INDIRECT=256]="INDIRECT",r[r.QUERY_RESOLVE=512]="QUERY_RESOLVE",r[r.STATIC=1024]="STATIC",r))(F||{});class Z extends le{constructor(e){let{data:t,size:i}=e;const{usage:s,label:n,shrinkToFit:a}=e;super(),this.uid=H("buffer"),this._resourceType="buffer",this._resourceId=H("bufferResource"),this._touched=0,this._updateID=1,this.shrinkToFit=!0,t instanceof Array&&(t=new Float32Array(t)),this._data=t,i=i??t?.byteLength;const o=!!t;this.descriptor={size:i,usage:s,mappedAtCreation:o,label:n},this.shrinkToFit=a??!0}get data(){return this._data}set data(e){this.setDataWithSize(e,e.length,!0)}get static(){return!!(this.descriptor.usage&F.STATIC)}set static(e){e?this.descriptor.usage|=F.STATIC:this.descriptor.usage&=~F.STATIC}setDataWithSize(e,t,i){if(this._updateID++,this._updateSize=t*e.BYTES_PER_ELEMENT,this._data===e){i&&this.emit("update",this);return}const s=this._data;if(this._data=e,s.length!==e.length){!this.shrinkToFit&&e.byteLength<s.byteLength?i&&this.emit("update",this):(this.descriptor.size=e.byteLength,this._resourceId=H("bufferResource"),this.emit("change",this));return}i&&this.emit("update",this)}update(e){this._updateSize=e??this._updateSize,this._updateID++,this.emit("update",this)}destroy(){this.emit("destroy",this),this._data=null,this.descriptor=null,this.removeAllListeners()}}function It(r,e){if(!(r instanceof Z)){let t=e?F.INDEX:F.VERTEX;r instanceof Array&&(e?(r=new Uint32Array(r),t=F.INDEX|F.COPY_DST):(r=new Float32Array(r),t=F.VERTEX|F.COPY_DST)),r=new Z({data:r,label:e?"index-mesh-buffer":"vertex-mesh-buffer",usage:t})}return r}class xt extends le{constructor(e){const{attributes:t,indexBuffer:i,topology:s}=e;super(),this.uid=H("geometry"),this._layoutKey=0,this.attributes=t,this.buffers=[];for(const n in t){const a=t[n];a.buffer=It(a.buffer,!1),this.buffers.indexOf(a.buffer)===-1&&(this.buffers.push(a.buffer),a.buffer.on("update",this.onBufferUpdate,this))}i&&(this.indexBuffer=It(i,!0),this.buffers.push(this.indexBuffer)),this.topology=s||"triangle-list"}onBufferUpdate(){this.emit("update",this)}getAttribute(e){return this.attributes[e]}getIndex(){return this.indexBuffer}getBuffer(e){return this.getAttribute(e).buffer}getSize(){for(const e in this.attributes){const t=this.attributes[e];return this.getBuffer(e).data.length/(t.stride/4||t.size)}return 0}destroy(e=!1){this.emit("destroy",this),this.removeAllListeners(),e&&this.buffers.forEach(t=>t.destroy()),this.attributes=null,this.buffers=null}}function Wi(r,e){e.clear();const t=e.matrix;for(let i=0;i<r.length;i++){const s=r[i];s.layerVisibleRenderable<3||(e.matrix=s.worldTransform,s.view.addBounds(e))}return e.matrix=t,e}const Ni=new xt({attributes:{aPosition:{buffer:new Float32Array([0,0,1,0,1,1,0,1]),shaderLocation:0,format:"float32x2",stride:2*4,offset:0}},indexBuffer:new Uint32Array([0,1,2,0,2,3])});class xr{constructor(e){this._filterStackIndex=0,this._filterStack=[],this._filterGlobalUniforms=new j({inputSize:{value:new Float32Array(4),type:"vec4<f32>"},inputPixel:{value:new Float32Array(4),type:"vec4<f32>"},inputClamp:{value:new Float32Array(4),type:"vec4<f32>"},outputFrame:{value:new Float32Array(4),type:"vec4<f32>"},globalFrame:{value:new Float32Array(4),type:"vec4<f32>"},outputTexture:{value:new Float32Array(4),type:"vec4<f32>"}}),this._globalFilterBindGroup=new oe({}),this.renderer=e}push(e){const t=this.renderer,i=e.filterEffect.filters;this._filterStack[this._filterStackIndex]||(this._filterStack[this._filterStackIndex]=this._getFilterData());const s=this._filterStack[this._filterStackIndex];this._filterStackIndex++;const n=s.bounds;if(e.renderables?Wi(e.renderables,n):e.filterEffect.filterArea?(n.addRect(e.filterEffect.filterArea),n.applyMatrix(e.container.worldTransform)):sr(e.container,!0,n),i.length===0){s.skip=!0;return}let a=t.renderTarget.rootRenderTarget.colorTexture.source._resolution,o=0,l=t.renderTarget.rootRenderTarget.colorTexture.source.antialias,u=!1,c=!1;for(let h=0;h<i.length;h++){const f=i[h];if(a=Math.min(a,f.resolution),o+=f.padding,f.antialias!=="inherit"&&(f.antialias==="on"?l=!0:l=!1),!!!(f.compatibleRenderers&t.type)){c=!1;break}if(f.blendRequired&&!(t.backBuffer?.useBackBuffer??!0)){ct("Blend filter requires backBuffer on WebGL renderer to be enabled. Set `useBackBuffer: true` in the renderer options."),c=!1;break}c=f.enabled||c,u=u||f.blendRequired}if(!c){s.skip=!0;return}if(n.scale(a).fit(t.renderTarget.rootViewPort).scale(1/a).pad(o).ceil(),!n.isPositive){s.skip=!0;return}s.skip=!1,s.bounds=n,s.blendRequired=u,s.container=e.container,s.filterEffect=e.filterEffect,s.previousRenderSurface=t.renderTarget.renderTarget,s.inputTexture=N.getOptimalTexture(n.width,n.height,a,l),t.renderTarget.bind(s.inputTexture,!0),t.globalUniforms.push({offset:n})}pop(){const e=this.renderer;this._filterStackIndex--;const t=this._filterStack[this._filterStackIndex];if(t.skip)return;this._activeFilterData=t;const i=t.inputTexture,s=t.bounds;let n=z.EMPTY;if(e.renderTarget.finishRenderPass(),t.blendRequired){const o=this._filterStackIndex>0?this._filterStack[this._filterStackIndex-1].bounds:null;n=this.getBackTexture(t.previousRenderSurface,s,o)}t.backTexture=n;const a=t.filterEffect.filters;if(this._globalFilterBindGroup.setResource(i.source.style,2),this._globalFilterBindGroup.setResource(n.source,3),e.globalUniforms.pop(),a.length===1)a[0].apply(this,i,t.previousRenderSurface,!1),N.returnTexture(i);else{let o=t.inputTexture,l=N.getOptimalTexture(s.width,s.height,o.source._resolution,!1),u=0;for(u=0;u<a.length-1;++u){a[u].apply(this,o,l,!0);const h=o;o=l,l=h}a[u].apply(this,o,t.previousRenderSurface,!1),N.returnTexture(o),N.returnTexture(l)}t.blendRequired&&N.returnTexture(n)}getBackTexture(e,t,i){const s=e.colorTexture.source._resolution,n=N.getOptimalTexture(t.width,t.height,s,!1);let a=t.minX,o=t.minY;i&&(a-=i.minX,o-=i.minY),a=Math.floor(a*s),o=Math.floor(o*s);const l=Math.ceil(t.width*s),u=Math.ceil(t.height*s);return this.renderer.renderTarget.copyToTexture(e,n,{x:a,y:o},{width:l,height:u}),n}applyFilter(e,t,i,s){const n=this.renderer,a=this._filterStack[this._filterStackIndex],o=a.bounds,l=Ue.shared,c=a.previousRenderSurface===this.renderer.renderTarget.getRenderTarget(i);let h=this.renderer.renderTarget.rootRenderTarget.colorTexture.source._resolution,f=this._filterStackIndex-1;for(;f>0&&this._filterStack[f].skip;)--f;f>0&&(h=this._filterStack[f].inputTexture.source._resolution);const d=this._filterGlobalUniforms,p=d.uniforms,y=p.outputFrame,x=p.inputSize,v=p.inputPixel,w=p.inputClamp,g=p.globalFrame,m=p.outputTexture;c?(this._filterStackIndex>0&&(l.x=this._filterStack[this._filterStackIndex-1].bounds.minX,l.y=this._filterStack[this._filterStackIndex-1].bounds.minY),y[0]=o.minX-l.x,y[1]=o.minY-l.y):(y[0]=0,y[1]=0),y[2]=t.frameWidth,y[3]=t.frameHeight,x[0]=t.source.width,x[1]=t.source.height,x[2]=1/x[0],x[3]=1/x[1],v[0]=t.source.pixelWidth,v[1]=t.source.pixelHeight,v[2]=1/v[0],v[3]=1/v[1],w[0]=.5*v[2],w[1]=.5*v[3],w[2]=t.frameWidth*x[2]-.5*v[2],w[3]=t.frameHeight*x[3]-.5*v[3];const k=this.renderer.renderTarget.rootRenderTarget.colorTexture;g[0]=l.x*h,g[1]=l.y*h,g[2]=k.source.width*h,g[3]=k.source.height*h;const A=this.renderer.renderTarget.getRenderTarget(i);if(n.renderTarget.bind(i,!!s),i instanceof z?(m[0]=i.frameWidth,m[1]=i.frameHeight):(m[0]=A.width,m[1]=A.height),m[2]=A.isRoot?-1:1,d.update(),n.renderPipes.uniformBatch){const R=n.renderPipes.uniformBatch.getUniformBufferResource(this._filterGlobalUniforms);this._globalFilterBindGroup.setResource(R,0)}else this._globalFilterBindGroup.setResource(d,0);this._globalFilterBindGroup.setResource(t.source,1),this._globalFilterBindGroup.setResource(t.source.style,2),e.groups[0]=this._globalFilterBindGroup,n.encoder.draw({geometry:Ni,shader:e,state:e._state,topology:"triangle-list"})}_getFilterData(){return{skip:!1,inputTexture:null,bounds:new ht,container:null,filterEffect:null,blendRequired:!1,previousRenderSurface:null}}calculateSpriteMatrix(e,t){const i=this._activeFilterData,s=e.set(i.inputTexture._source.width,0,0,i.inputTexture._source.height,i.bounds.minX,i.bounds.minY),n=t.worldTransform.copyTo(L.shared);return n.invert(),s.prepend(n),s.scale(1/t.texture.frameWidth,1/t.texture.frameHeight),s.translate(t.anchor.x,t.anchor.y),s}}xr.extension={type:[_.WebGLSystem,_.WebGPUSystem],name:"filter"};var ji=`in vec2 vMaskCoord;
in vec2 vTextureCoord;

uniform sampler2D uSampler;
uniform sampler2D mapTexture;

uniform float alpha;
uniform vec4 maskClamp;

out vec4 fragColor;

void main(void)
{
    float clip = step(3.5,
        step(maskClamp.x, vMaskCoord.x) +
        step(maskClamp.y, vMaskCoord.y) +
        step(vMaskCoord.x, maskClamp.z) +
        step(vMaskCoord.y, maskClamp.w));

    // TODO look into why this is needed
    float npmAlpha = alpha; 
    vec4 original = texture(uSampler, vTextureCoord);
    vec4 masky = texture(mapTexture, vMaskCoord);
    float alphaMul = 1.0 - npmAlpha * (1.0 - masky.a);

    original *= (alphaMul * masky.r * alpha * clip);

    fragColor = original;
}
`,Ki=`in vec2 aPosition;

out vec2 vTextureCoord;
out vec2 vMaskCoord;


uniform vec4 inputSize;
uniform vec4 outputFrame;
uniform vec4 outputTexture;
uniform mat3 filterMatrix;

vec4 filterVertexPosition(  vec2 aPosition )
{
    vec2 position = aPosition * outputFrame.zw + outputFrame.xy;
       
    position.x = position.x * (2.0 / outputTexture.x) - 1.0;
    position.y = position.y * (2.0*outputTexture.z / outputTexture.y) - outputTexture.z;

    return vec4(position, 0.0, 1.0);
}

vec2 filterTextureCoord(  vec2 aPosition )
{
    return aPosition * (outputFrame.zw * inputSize.zw);
}

vec2 getFilterCoord( vec2 aPosition )
{
    return  ( filterMatrix * vec3( filterTextureCoord(aPosition), 1.0)  ).xy;
}   

void main(void)
{
    gl_Position = filterVertexPosition(aPosition);
    vTextureCoord = filterTextureCoord(aPosition);
    vMaskCoord = getFilterCoord(aPosition);
}
`,Et=`struct GlobalFilterUniforms {
  inputSize:vec4<f32>,
  inputPixel:vec4<f32>,
  inputClamp:vec4<f32>,
  outputFrame:vec4<f32>,
  globalFrame:vec4<f32>,
  outputTexture:vec4<f32>,  
};

struct MaskUniforms {
  filterMatrix:mat3x3<f32>,
  maskClamp:vec4<f32>,
  alpha:f32,
};


@group(0) @binding(0) var<uniform> gfu: GlobalFilterUniforms;
@group(0) @binding(1) var uSampler: texture_2d<f32>;
@group(0) @binding(2) var mySampler : sampler;

@group(1) @binding(0) var<uniform> filterUniforms : MaskUniforms;
@group(1) @binding(1) var mapTexture: texture_2d<f32>;

struct VSOutput {
    @builtin(position) position: vec4<f32>,
    @location(0) uv : vec2<f32>,
    @location(1) filterUv : vec2<f32>,
  };

fn filterVertexPosition(aPosition:vec2<f32>) -> vec4<f32>
{
    var position = aPosition * gfu.outputFrame.zw + gfu.outputFrame.xy;

    position.x = position.x * (2.0 / gfu.outputTexture.x) - 1.0;
    position.y = position.y * (2.0*gfu.outputTexture.z / gfu.outputTexture.y) - gfu.outputTexture.z;

    return vec4(position, 0.0, 1.0);
}

fn filterTextureCoord( aPosition:vec2<f32> ) -> vec2<f32>
{
    return aPosition * (gfu.outputFrame.zw * gfu.inputSize.zw);
}

fn globalTextureCoord( aPosition:vec2<f32> ) -> vec2<f32>
{
  return  (aPosition.xy / gfu.globalFrame.zw) + (gfu.globalFrame.xy / gfu.globalFrame.zw);  
}

fn getFilterCoord(aPosition:vec2<f32> ) -> vec2<f32>
{
  return ( filterUniforms.filterMatrix * vec3( filterTextureCoord(aPosition), 1.0)  ).xy;
}

fn getSize() -> vec2<f32>
{

  
  return gfu.globalFrame.zw;
}
  
@vertex
fn mainVertex(
  @location(0) aPosition : vec2<f32>, 
) -> VSOutput {
  return VSOutput(
   filterVertexPosition(aPosition),
   filterTextureCoord(aPosition),
   getFilterCoord(aPosition)
  );
}

@fragment
fn mainFragment(
  @location(0) uv: vec2<f32>,
  @location(1) filterUv: vec2<f32>,
  @builtin(position) position: vec4<f32>
) -> @location(0) vec4<f32> {

    var maskClamp = filterUniforms.maskClamp;

     var clip = step(3.5,
        step(maskClamp.x, filterUv.x) +
        step(maskClamp.y, filterUv.y) +
        step(filterUv.x, maskClamp.z) +
        step(filterUv.y, maskClamp.w));

    var mask = textureSample(mapTexture, mySampler, filterUv);
    var source = textureSample(uSampler, mySampler, uv);
    
    var npmAlpha = 0.0;

    var alphaMul = 1.0 - npmAlpha * (1.0 - mask.a);

    var a = (alphaMul * mask.r) * clip;

    return vec4(source.rgb, source.a) * a;
}`;class Yi extends fr{constructor({sprite:e}){const t=new pi(e.texture),i=new j({filterMatrix:{value:new L,type:"mat3x3<f32>"},maskClamp:{value:t.uClampFrame,type:"vec4<f32>"},alpha:{value:1,type:"f32"}}),s=new Ge({vertex:{source:Et,entryPoint:"mainVertex"},fragment:{source:Et,entryPoint:"mainFragment"}}),n=ft.from({vertex:Ki,fragment:ji,name:"mask-filter"});super({gpuProgram:s,glProgram:n,resources:{filterUniforms:i,mapTexture:e.texture.source}}),this.sprite=e,this._textureMatrix=t}apply(e,t,i,s){this._textureMatrix.texture=this.sprite.texture,e.calculateSpriteMatrix(this.resources.filterUniforms.uniforms.filterMatrix,this.sprite).prepend(this._textureMatrix.mapCoord),this.resources.mapTexture=this.sprite.texture.source,e.applyFilter(this,t,i,s)}}function zt(r,e,t){if(r)for(const i in r){const s=i.toLocaleLowerCase(),n=e[s];if(n){let a=r[i];i==="header"&&(a=a.replace(/@in\s+[^;]+;\s*/g,"").replace(/@out\s+[^;]+;\s*/g,"")),t&&n.push(`//----${t}----//`),n.push(a)}else ct(`${i} placement hook does not exist in shader`)}}const Zi=/\{\{(.*?)\}\}/g;function Ht(r){const e={};return(r.match(Zi)?.map(i=>i.replace(/[{()}]/g,""))??[]).forEach(i=>{e[i]=[]}),e}function Lt(r,e){let t;const i=/@in\s+([^;]+);/g;for(;(t=i.exec(r))!==null;)e.push(t[1])}function Vt(r,e,t=!1){const i=[];Lt(e,i),r.forEach(o=>{o.header&&Lt(o.header,i)});const s=i;t&&s.sort();const n=s.map((o,l)=>`       @location(${l}) ${o},`).join(`
`);let a=e.replace(/@in\s+[^;]+;\s*/g,"");return a=a.replace("{{in}}",`
${n}
`),a}function Ot(r,e){let t;const i=/@out\s+([^;]+);/g;for(;(t=i.exec(r))!==null;)e.push(t[1])}function qi(r){const t=/\b(\w+)\s*:/g.exec(r);return t?t[1]:""}function Xi(r){const e=/@.*?\s+/g;return r.replace(e,"")}function Qi(r,e){const t=[];Ot(e,t),r.forEach(l=>{l.header&&Ot(l.header,t)});let i=0;const s=t.sort().map(l=>l.indexOf("builtin")>-1?l:`@location(${i++}) ${l}`).join(`,
`),n=t.sort().map(l=>`       var ${Xi(l)};`).join(`
`),a=`return VSOutput(
                ${t.sort().map(l=>` ${qi(l)}`).join(`,
`)});`;let o=e.replace(/@out\s+[^;]+;\s*/g,"");return o=o.replace("{{struct}}",`
${s}
`),o=o.replace("{{start}}",`
${n}
`),o=o.replace("{{return}}",`
${a}
`),o}function $t(r,e){let t=r;for(const i in e){const s=e[i];s.join(`
`).length?t=t.replace(`{{${i}}}`,`//-----${i} START-----//
${s.join(`
`)}
//----${i} FINISH----//`):t=t.replace(`{{${i}}}`,"")}return t}const Y=Object.create(null),Ze=new Map;let Ji=0;function es({template:r,bits:e}){const t=mr(r,e);if(Y[t])return Y[t];const{vertex:i,fragment:s}=rs(r,e);return Y[t]=gr(i,s,e),Y[t]}function ts({template:r,bits:e}){const t=mr(r,e);return Y[t]||(Y[t]=gr(r.vertex,r.fragment,e)),Y[t]}function rs(r,e){const t=e.map(a=>a.vertex).filter(a=>!!a),i=e.map(a=>a.fragment).filter(a=>!!a);let s=Vt(t,r.vertex);s=Qi(t,s);const n=Vt(i,r.fragment,!0);return{vertex:s,fragment:n}}function mr(r,e){return e.map(t=>(Ze.has(t)||Ze.set(t,Ji++),Ze.get(t))).sort((t,i)=>t-i).join("-")+r.vertex+r.fragment}function gr(r,e,t){const i=Ht(r),s=Ht(e);return t.forEach(n=>{zt(n.vertex,i,n.name),zt(n.fragment,s,n.name)}),{vertex:$t(r,i),fragment:$t(e,s)}}const is=`
    @in aPosition: vec2<f32>;
    @in aUV: vec2<f32>;

    @out @builtin(position) vPosition: vec4<f32>;
    @out vUV : vec2<f32>;
    @out vColor : vec4<f32>;

    {{header}}

    struct VSOutput {
        {{struct}}
    };

    @vertex
    fn main( {{in}} ) -> VSOutput {

        var worldTransformMatrix = globalUniforms.worldTransformMatrix;
        var modelMatrix = mat3x3<f32>(
            1.0, 0.0, 0.0,
            0.0, 1.0, 0.0,
            0.0, 0.0, 1.0
          );
        var position = aPosition;

        {{start}}
        
        vColor = vec4<f32>(1., 1., 1., 1.);
        vUV = aUV;

        {{main}}

        var modelViewProjectionMatrix = globalUniforms.projectionMatrix * worldTransformMatrix * modelMatrix;

        vPosition =  vec4<f32>((modelViewProjectionMatrix *  vec3<f32>(position, 1.0)).xy, 0.0, 1.0);
       
        vColor *= globalUniforms.worldColorAlpha;

        {{end}}

        {{return}}
    };
`,ss=`
    @in vUV : vec2<f32>;
    @in vColor : vec4<f32>;
   
    {{header}}

    @fragment
    fn main(
        {{in}}
      ) -> @location(0) vec4<f32> {
        
        {{start}}

        var outColor:vec4<f32>;
      
        {{main}}
        
        return outColor * vColor;
      };
`,ns=`
    in vec2 aPosition;
    in vec2 aUV;

    out vec4 vColor;
    out vec2 vUV;

    {{header}}

    void main(void){

        mat3 worldTransformMatrix = worldTransformMatrix;
        mat3 modelMatrix = mat3(
            1.0, 0.0, 0.0,
            0.0, 1.0, 0.0,
            0.0, 0.0, 1.0
          );
        vec2 position = aPosition;

        {{start}}
        
        vColor = vec4(1.);
        vUV = aUV;

        {{main}}

        mat3 modelViewProjectionMatrix = projectionMatrix * worldTransformMatrix * modelMatrix;

        gl_Position = vec4((modelViewProjectionMatrix * vec3(position, 1.0)).xy, 0.0, 1.0);

        vColor *= worldColorAlpha;

        {{end}}
    }
`,as=`
   
    in vec4 vColor;
    in vec2 vUV;

    out vec4 finalColor;

    {{header}}

    void main(void) {
        
        {{start}}

        vec4 outColor;
      
        {{main}}
        
        finalColor = outColor * vColor;
    }
`,os={name:"global-uniforms-bit",vertex:{header:`
        struct GlobalUniforms {
            projectionMatrix:mat3x3<f32>,
            worldTransformMatrix:mat3x3<f32>,
            worldColorAlpha: vec4<f32>,
            uResolution: vec2<f32>,
        }

        @group(0) @binding(0) var<uniform> globalUniforms : GlobalUniforms;
        `}},ls={name:"global-uniforms-bit",vertex:{header:`
          uniform globalUniforms {
            mat3 projectionMatrix;
            mat3 worldTransformMatrix;
            vec4 worldColorAlpha;
            vec2 uResolution;
          };
        `}};function _r({bits:r,name:e}){const t=es({template:{fragment:ss,vertex:is},bits:[os,...r]});return new Ge({name:e,vertex:{source:t.vertex,entryPoint:"main"},fragment:{source:t.fragment,entryPoint:"main"}})}function yr({bits:r,name:e}){return new ft({name:e,...ts({template:{vertex:ns,fragment:as},bits:[ls,...r]})})}const us={name:"color-bit",vertex:{header:`
            @in aColor: vec4<f32>;
        `,main:`
            vColor *= vec4<f32>(aColor.rgb * aColor.a, aColor.a);
        `}},cs={name:"color-bit",vertex:{header:`
            in vec4 aColor;
        `,main:`
            vColor *= vec4(aColor.rgb * aColor.a, aColor.a);
        `}},qe={};function hs(r){const e=[];if(r===1)e.push("@group(1) @binding(0) var textureSource1: texture_2d<f32>;"),e.push("@group(1) @binding(1) var textureSampler1: sampler;");else{let t=0;for(let i=0;i<r;i++)e.push(`@group(1) @binding(${t++}) var textureSource${i+1}: texture_2d<f32>;`),e.push(`@group(1) @binding(${t++}) var textureSampler${i+1}: sampler;`)}return e.join(`
`)}function ds(r){const e=[];if(r===1)e.push("outColor = textureSampleGrad(textureSource1, textureSampler1, vUV, uvDx, uvDy);");else{e.push("switch vTextureId {");for(let t=0;t<r;t++)t===r-1?e.push("  default:{"):e.push(`  case ${t}:{`),e.push(`      outColor = textureSampleGrad(textureSource${t+1}, textureSampler${t+1}, vUV, uvDx, uvDy);`),e.push("      break;}");e.push("}")}return e.join(`
`)}function fs(r){return qe[r]||(qe[r]={name:"texture-batch-bit",vertex:{header:`
                @in aTextureIdAndRound: vec2<u32>;
                @out @interpolate(flat) vTextureId : u32;
            `,main:`
                vTextureId = aTextureIdAndRound.y;
            `,end:`
                if(aTextureIdAndRound.x == 1)
                {
                    vPosition = vec4<f32>(roundPixels(vPosition.xy, globalUniforms.uResolution), vPosition.zw);
                }
            `},fragment:{header:`
                @in @interpolate(flat) vTextureId: u32;
    
                ${hs(16)}
            `,main:`
                var uvDx = dpdx(vUV);
                var uvDy = dpdy(vUV);
    
                ${ds(16)}
            `}}),qe[r]}const Xe={};function ps(r){const e=[];for(let t=0;t<r;t++)t>0&&e.push("else"),t<r-1&&e.push(`if(vTextureId < ${t}.5)`),e.push("{"),e.push(`	outColor = texture(uSamplers[${t}], vUV);`),e.push("}");return e.join(`
`)}function xs(r){return Xe[r]||(Xe[r]={name:"texture-batch-bit",vertex:{header:`
                in vec2 aTextureIdAndRound;
                out float vTextureId;
              
            `,main:`
                vTextureId = aTextureIdAndRound.y;
            `,end:`
                if(aTextureIdAndRound.x == 1.)
                {
                    gl_Position.xy = roundPixels(gl_Position.xy, uResolution);
                }
            `},fragment:{header:`
                in float vTextureId;
    
                uniform sampler2D uSamplers[${r}];
              
            `,main:`
    
                ${ps(16)}
            `}}),Xe[r]}const br={name:"round-pixels-bit",vertex:{header:`
            fn roundPixels(position: vec2<f32>, targetSize: vec2<f32>) -> vec2<f32> 
            {
                return (floor((position * 0.5 + 0.5) * targetSize) / targetSize) * 2.0 - 1.0;
            }
        `}},vr={name:"round-pixels-bit",vertex:{header:`   
            vec2 roundPixels(vec2 position, vec2 targetSize)
            {       
                return (floor((position * 0.5 + 0.5) * targetSize) / targetSize) * 2.0 - 1.0;
            }
        `}},te=16,Tr=new Int32Array(te);for(let r=0;r<te;r++)Tr[r]=r;const ms=new j({uSamplers:{value:Tr,type:"u32",size:te}},{isStatic:!0}),gs=new Float32Array(1),_s=new Uint32Array(1);class wr extends xt{constructor(){const t=new Z({data:gs,label:"attribute-batch-buffer",usage:F.VERTEX|F.COPY_DST,shrinkToFit:!1}),i=new Z({data:_s,label:"index-batch-buffer",usage:F.INDEX|F.COPY_DST,shrinkToFit:!1}),s=6*4;super({attributes:{aPosition:{buffer:t,shaderLocation:0,format:"float32x2",stride:s,offset:0},aUV:{buffer:t,shaderLocation:1,format:"float32x2",stride:s,offset:2*4},aColor:{buffer:t,shaderLocation:2,format:"unorm8x4",stride:s,offset:4*4},aTextureIdAndRound:{buffer:t,shaderLocation:3,format:"uint16x2",stride:s,offset:5*4}},indexBuffer:i})}}const Sr={};function ys(r,e){let t=0;for(let i=0;i<e;i++)t=t*31+r[i].uid>>>0;return Sr[t]||bs(r,t)}function bs(r,e){const t={};let i=0;for(let n=0;n<te;n++){const a=n<r.length?r[n]:z.EMPTY.source;t[i++]=a.source,t[i++]=a.style}const s=new oe(t);return Sr[e]=s,s}class Wt{constructor(e){typeof e=="number"?this.rawBinaryData=new ArrayBuffer(e):e instanceof Uint8Array?this.rawBinaryData=e.buffer:this.rawBinaryData=e,this.uint32View=new Uint32Array(this.rawBinaryData),this.float32View=new Float32Array(this.rawBinaryData),this.size=this.rawBinaryData.byteLength}get int8View(){return this._int8View||(this._int8View=new Int8Array(this.rawBinaryData)),this._int8View}get uint8View(){return this._uint8View||(this._uint8View=new Uint8Array(this.rawBinaryData)),this._uint8View}get int16View(){return this._int16View||(this._int16View=new Int16Array(this.rawBinaryData)),this._int16View}get int32View(){return this._int32View||(this._int32View=new Int32Array(this.rawBinaryData)),this._int32View}get float64View(){return this._float64Array||(this._float64Array=new Float64Array(this.rawBinaryData)),this._float64Array}get bigUint64View(){return this._bigUint64Array||(this._bigUint64Array=new BigUint64Array(this.rawBinaryData)),this._bigUint64Array}view(e){return this[`${e}View`]}destroy(){this.rawBinaryData=null,this._int8View=null,this._uint8View=null,this._int16View=null,this.uint16View=null,this._int32View=null,this.uint32View=null,this.float32View=null}static sizeOf(e){switch(e){case"int8":case"uint8":return 1;case"int16":case"uint16":return 2;case"int32":case"uint32":case"float32":return 4;default:throw new Error(`${e} isn't a valid view type`)}}}function Nt(r,e){const t=r.byteLength/8|0,i=new Float64Array(r,0,t),s=new Float64Array(e,0,t);for(let o=0;o<t;o++)s[o]=i[o];const n=new Uint8Array(r,t*8),a=new Uint8Array(e,t*8);for(let o=0;o<n.length;o++)a[o]=n[o]}const vs={normal:"normal-npm",add:"add-npm",screen:"screen-npm"};var V=(r=>(r[r.DISABLED=0]="DISABLED",r[r.RENDERING_MASK_ADD=1]="RENDERING_MASK_ADD",r[r.MASK_ACTIVE=2]="MASK_ACTIVE",r[r.RENDERING_MASK_REMOVE=3]="RENDERING_MASK_REMOVE",r[r.NONE=4]="NONE",r))(V||{});function jt(r,e){return e.alphaMode==="no-premultiply-alpha"&&vs[r]||r}class Kt{constructor(){this.ids=Object.create(null),this.textures=[],this.count=0}clear(){for(let e=0;e<this.count;e++){const t=this.textures[e];this.textures[e]=null,this.ids[t.uid]=null}this.count=0}}class Yt{constructor(){this.renderPipeId="batch",this.action="startBatch",this.start=0,this.size=0,this.blendMode="normal",this.canBundle=!0}destroy(){this.textures=null,this.gpuBindGroup=null,this.bindGroup=null,this.batcher=null}}let xe=0;const Cr=class{constructor(r={}){this.uid=H("batcher"),this.dirty=!0,this.batchIndex=0,this.batches=[],this._vertexSize=6,this._elements=[],this._batchPool=[],this._batchPoolIndex=0,this._textureBatchPool=[],this._textureBatchPoolIndex=0,r={...Cr.defaultOptions,...r};const{vertexSize:e,indexSize:t}=r;this.attributeBuffer=new Wt(e*this._vertexSize*4),this.indexBuffer=new Uint32Array(t)}begin(){this.batchIndex=0,this.elementSize=0,this.elementStart=0,this.indexSize=0,this.attributeSize=0,this._batchPoolIndex=0,this._textureBatchPoolIndex=0,this._batchIndexStart=0,this._batchIndexSize=0,this.dirty=!0}add(r){this._elements[this.elementSize++]=r,r.indexStart=this.indexSize,r.location=this.attributeSize,r.batcher=this,this.indexSize+=r.indexSize,this.attributeSize+=r.vertexSize*this._vertexSize}checkAndUpdateTexture(r,e){const t=r.batch.textures.ids[e._source.uid];return!t&&t!==0?!1:(r.textureId=t,r.texture=e,!0)}updateElement(r){this.dirty=!0,r.packAttributes(this.attributeBuffer.float32View,this.attributeBuffer.uint32View,r.location,r.textureId)}break(r){const e=this._elements;let t=this._textureBatchPool[this._textureBatchPoolIndex++]||new Kt;if(t.clear(),!e[this.elementStart])return;const i=e[this.elementStart];let s=jt(i.blendMode,i.texture._source);this.attributeSize*4>this.attributeBuffer.size&&this._resizeAttributeBuffer(this.attributeSize*4),this.indexSize>this.indexBuffer.length&&this._resizeIndexBuffer(this.indexSize);const n=this.attributeBuffer.float32View,a=this.attributeBuffer.uint32View,o=this.indexBuffer;let l=this._batchIndexSize,u=this._batchIndexStart,c="startBatch",h=this._batchPool[this._batchPoolIndex++]||new Yt;for(let f=this.elementStart;f<this.elementSize;++f){const d=e[f];e[f]=null;const y=d.texture._source,x=jt(d.blendMode,y),v=s!==x;if(y._batchTick===xe&&!v){d.textureId=y._textureBindLocation,l+=d.indexSize,d.packAttributes(n,a,d.location,d.textureId),d.packIndex(o,d.indexStart,d.location/this._vertexSize),d.batch=h;continue}y._batchTick=xe,(t.count>=te||v)&&(this._finishBatch(h,u,l-u,t,s,r,c),c="renderBatch",u=l,s=x,t=this._textureBatchPool[this._textureBatchPoolIndex++]||new Kt,t.clear(),h=this._batchPool[this._batchPoolIndex++]||new Yt,++xe),d.textureId=y._textureBindLocation=t.count,t.ids[y.uid]=t.count,t.textures[t.count++]=y,d.batch=h,l+=d.indexSize,d.packAttributes(n,a,d.location,d.textureId),d.packIndex(o,d.indexStart,d.location/this._vertexSize)}t.count>0&&(this._finishBatch(h,u,l-u,t,s,r,c),u=l,++xe),this.elementStart=this.elementSize,this._batchIndexStart=u,this._batchIndexSize=l}_finishBatch(r,e,t,i,s,n,a){r.gpuBindGroup=null,r.action=a,r.batcher=this,r.textures=i,r.blendMode=s,r.start=e,r.size=t,++xe,n.add(r)}finish(r){this.break(r)}ensureAttributeBuffer(r){r*4<=this.attributeBuffer.size||this._resizeAttributeBuffer(r*4)}ensureIndexBuffer(r){r<=this.indexBuffer.length||this._resizeIndexBuffer(r)}_resizeAttributeBuffer(r){const e=Math.max(r,this.attributeBuffer.size*2),t=new Wt(e);Nt(this.attributeBuffer.rawBinaryData,t.rawBinaryData),this.attributeBuffer=t}_resizeIndexBuffer(r){const e=this.indexBuffer,t=Math.max(r,e.length*2),i=new Uint32Array(t);Nt(e.buffer,i.buffer),this.indexBuffer=i}destroy(){for(let r=0;r<this.batches.length;r++)this.batches[r].destroy();this.batches=null;for(let r=0;r<this._elements.length;r++)this._elements[r].batch=null;this._elements=null,this.indexBuffer=null,this.attributeBuffer.destroy(),this.attributeBuffer=null}};let mt=Cr;mt.defaultOptions={vertexSize:4,indexSize:6};class Pr{constructor(e,t){this.state=ue.for2d(),this._batches=Object.create(null),this._geometries=Object.create(null),this.renderer=e,this._adaptor=t,this._adaptor.init()}buildStart(e){if(!this._batches[e.uid]){const t=new mt;this._batches[e.uid]=t,this._geometries[t.uid]=new wr}this._activeBatch=this._batches[e.uid],this._activeGeometry=this._geometries[this._activeBatch.uid],this._activeBatch.begin()}addToBatch(e){this._activeBatch.add(e)}break(e){this._activeBatch.break(e)}buildEnd(e){const t=this._activeBatch,i=this._activeGeometry;t.finish(e),i.indexBuffer.setDataWithSize(t.indexBuffer,t.indexSize,!0),i.buffers[0].setDataWithSize(t.attributeBuffer.float32View,t.attributeSize,!1)}upload(e){const t=this._batches[e.uid],i=this._geometries[t.uid];t.dirty&&(t.dirty=!1,i.buffers[0].update(t.attributeSize*4))}execute(e){if(e.action==="startBatch"){const t=e.batcher,i=this._geometries[t.uid];this._adaptor.start(this,i)}this._adaptor.execute(this,e)}destroy(){this.state=null,this.renderer=null,this._adaptor.destroy(),this._adaptor=null;for(const e in this._batches)this._batches[e].destroy();this._batches=null;for(const e in this._geometries)this._geometries[e].destroy();this._geometries=null}}Pr.extension={type:[_.WebGLPipes,_.WebGPUPipes,_.CanvasPipes],name:"batch"};const Re={name:"local-uniform-bit",vertex:{header:`

            struct LocalUniforms {
                uTransformMatrix:mat3x3<f32>,
                uColor:vec4<f32>,
                uRound:f32,
            }

            @group(1) @binding(0) var<uniform> localUniforms : LocalUniforms;
        `,main:`
            vColor *= localUniforms.uColor;
            modelMatrix *= localUniforms.uTransformMatrix;
        `,end:`
            if(localUniforms.uRound == 1)
            {
                vPosition = vec4(roundPixels(vPosition.xy, globalUniforms.uResolution), vPosition.zw);
            }
        `}},On={...Re,vertex:{...Re.vertex,header:Re.vertex.header.replace("group(1)","group(2)")}},Ts={name:"local-uniform-bit",vertex:{header:`

            uniform mat3 uTransformMatrix;
            uniform vec4 uColor;
            uniform float uRound;
        `,main:`
            vColor *= uColor;
            modelMatrix = uTransformMatrix;
        `,end:`
            if(uRound == 1.)
            {
                gl_Position.xy = roundPixels(gl_Position.xy, uResolution);
            }
        `}},$n={name:"texture-bit",fragment:{header:`
            @group(2) @binding(0) var uTexture: texture_2d<f32>;
            @group(2) @binding(1) var uSampler: sampler;

         
        `,main:`
            outColor = textureSample(uTexture, uSampler, vUV);
        `}},Wn={name:"texture-bit",fragment:{header:`
        uniform sampler2D uTexture;

         
        `,main:`
            outColor = texture(uTexture, vUV);
        `}};class ws extends le{constructor({original:e,view:t}){super(),this.uid=H("renderable"),this.layerColorAlpha=4294967295,this.layerColor=16777215,this.layerAlpha=1,this.view=t,this._original=e,this.layerTransform=new L,this.layerVisibleRenderable=3,this.view.owner=this}get layerBlendMode(){return this._original.layerBlendMode}onViewUpdate(){this.didViewUpdate=!0,this._original.layerGroup.onChildViewUpdate(this)}get isRenderable(){return this._original.isRenderable}}function Ss(r,e){const t=r.root,i=r.instructionSet;i.reset(),e.batch.buildStart(i),e.blendMode.buildStart(),e.colorMask.buildStart(),t.sortableChildren&&t.sortChildren(),Mr(t,i,e,!0),e.batch.buildEnd(i),e.blendMode.buildEnd(i)}function De(r,e,t){r.layerVisibleRenderable<3||!r.includeInBuild||(r.sortableChildren&&r.sortChildren(),r.isSimple?Cs(r,e,t):Mr(r,e,t,!1))}function Cs(r,e,t){const i=r.view;if(i&&(t.blendMode.setBlendMode(r,r.layerBlendMode,e),r.didViewUpdate=!1,t[i.renderPipeId].addRenderable(r,e)),!r.isLayerRoot){const s=r.children,n=s.length;for(let a=0;a<n;a++)De(s[a],e,t)}}function Mr(r,e,t,i){if(i){const s=r.layerGroup;if(s.root.view){const n=s.proxyRenderable??Ps(s);n&&(t.blendMode.setBlendMode(n,n.layerBlendMode,e),t[n.view.renderPipeId].addRenderable(n,e))}}else for(let s=0;s<r.effects.length;s++){const n=r.effects[s];t[n.pipe].push(n,r,e)}if(!i&&r.isLayerRoot)t.layer.addLayerGroup(r.layerGroup,e);else{const s=r.view;s&&(t.blendMode.setBlendMode(r,r.layerBlendMode,e),r.didViewUpdate=!1,t[s.renderPipeId].addRenderable(r,e));const n=r.children;if(n.length)for(let a=0;a<n.length;a++)De(n[a],e,t)}if(!i)for(let s=r.effects.length-1;s>=0;s--){const n=r.effects[s];t[n.pipe].pop(n,r,e)}}function Ps(r){const e=r.root;r.proxyRenderable=new ws({original:e,view:e.view})}const Ms=new ht;class Bs extends nr{constructor(){super({filters:[new Yi({sprite:new Ri(z.EMPTY)})]})}get sprite(){return this.filters[0].sprite}set sprite(e){this.filters[0].sprite=e}}class Br{constructor(e){this._activeMaskStage=[],this._renderer=e}push(e,t,i){const s=this._renderer;if(s.renderPipes.batch.break(i),i.add({renderPipeId:"alphaMask",action:"pushMaskBegin",mask:e,canBundle:!1,maskedContainer:t}),e.renderMaskToTexture){const n=e.mask;n.includeInBuild=!0,De(n,i,s.renderPipes),n.includeInBuild=!1}s.renderPipes.batch.break(i),i.add({renderPipeId:"alphaMask",action:"pushMaskEnd",mask:e,maskedContainer:t,canBundle:!1})}pop(e,t,i){this._renderer.renderPipes.batch.break(i),i.add({renderPipeId:"alphaMask",action:"popMaskEnd",mask:e,canBundle:!1})}execute(e){const t=this._renderer,i=e.mask.renderMaskToTexture;if(e.action==="pushMaskBegin"){const s=G.get(Bs);if(i){e.mask.mask.measurable=!0;const n=sr(e.mask.mask,!0,Ms);e.mask.mask.measurable=!1,n.ceil();const a=N.getOptimalTexture(n.width,n.height,1,!1);t.renderTarget.push(a,!0),t.globalUniforms.push({offset:n,worldColor:4294967295});const o=s.sprite;o.texture=a,o.worldTransform.tx=n.minX,o.worldTransform.ty=n.minY,this._activeMaskStage.push({filterEffect:s,maskedContainer:e.maskedContainer,filterTexture:a})}else s.sprite=e.mask.mask,this._activeMaskStage.push({filterEffect:s,maskedContainer:e.maskedContainer})}else if(e.action==="pushMaskEnd"){const s=this._activeMaskStage[this._activeMaskStage.length-1];i&&(t.renderTarget.pop(),t.globalUniforms.pop()),t.filter.push({renderPipeId:"filter",action:"pushFilter",container:s.maskedContainer,filterEffect:s.filterEffect,canBundle:!1})}else if(e.action==="popMaskEnd"){t.filter.pop();const s=this._activeMaskStage.pop();i&&N.returnTexture(s.filterTexture),G.return(s.filterEffect)}}destroy(){this._renderer=null,this._activeMaskStage=null}}Br.extension={type:[_.WebGLPipes,_.WebGPUPipes,_.CanvasPipes],name:"alphaMask"};class kr{constructor(e){this._colorStack=[],this._colorStackIndex=0,this._currentColor=0,this._renderer=e}buildStart(){this._colorStack[0]=15,this._colorStackIndex=1,this._currentColor=15}push(e,t,i){this._renderer.renderPipes.batch.break(i);const n=this._colorStack;n[this._colorStackIndex]=n[this._colorStackIndex-1]&e.mask;const a=this._colorStack[this._colorStackIndex];a!==this._currentColor&&(this._currentColor=a,i.add({renderPipeId:"colorMask",colorMask:a,canBundle:!1})),this._colorStackIndex++}pop(e,t,i){this._renderer.renderPipes.batch.break(i);const n=this._colorStack;this._colorStackIndex--;const a=n[this._colorStackIndex-1];a!==this._currentColor&&(this._currentColor=a,i.add({renderPipeId:"colorMask",colorMask:a,canBundle:!1}))}execute(e){this._renderer.colorMask.setMask(e.colorMask)}destroy(){this._colorStack=null}}kr.extension={type:[_.WebGLPipes,_.WebGPUPipes,_.CanvasPipes],name:"colorMask"};var Ae=(r=>(r[r.NONE=0]="NONE",r[r.COLOR=16384]="COLOR",r[r.STENCIL=1024]="STENCIL",r[r.DEPTH=256]="DEPTH",r[r.COLOR_DEPTH=16640]="COLOR_DEPTH",r[r.COLOR_STENCIL=17408]="COLOR_STENCIL",r[r.DEPTH_STENCIL=1280]="DEPTH_STENCIL",r[r.ALL=17664]="ALL",r))(Ae||{});class Rr{constructor(e){this._maskStackHash={},this._maskHash=new WeakMap,this._renderer=e}push(e,t,i){const s=e,n=this._renderer;n.renderPipes.batch.break(i),n.renderPipes.blendMode.setBlendMode(s.mask,"none",i),i.add({renderPipeId:"stencilMask",action:"pushMaskBegin",mask:e,canBundle:!1});const a=s.mask;a.includeInBuild=!0,this._maskHash.has(s)||this._maskHash.set(s,{instructionsStart:0,instructionsLength:0});const o=this._maskHash.get(s);o.instructionsStart=i.instructionSize,De(a,i,n.renderPipes),a.includeInBuild=!1,n.renderPipes.batch.break(i),i.add({renderPipeId:"stencilMask",action:"pushMaskEnd",mask:e,canBundle:!1});const l=i.instructionSize-o.instructionsStart-1;o.instructionsLength=l;const u=n.renderTarget.renderTarget.uid;this._maskStackHash[u]===void 0&&(this._maskStackHash[u]=0),this._maskStackHash[u]++}pop(e,t,i){const s=e,n=this._renderer,a=n.renderTarget.renderTarget.uid;this._maskStackHash[a]--,n.renderPipes.batch.break(i),n.renderPipes.blendMode.setBlendMode(s.mask,"none",i),i.add({renderPipeId:"stencilMask",action:"popMaskBegin",canBundle:!1});const o=this._maskHash.get(e);if(this._maskStackHash[a]!==0)for(let l=0;l<o.instructionsLength;l++)i.instructions[i.instructionSize++]=i.instructions[o.instructionsStart++];i.add({renderPipeId:"stencilMask",action:"popMaskEnd",canBundle:!1})}execute(e){const t=this._renderer,i=t.renderTarget.renderTarget.uid;let s=this._maskStackHash[i]??0;e.action==="pushMaskBegin"?(s++,t.stencil.setStencilMode(V.RENDERING_MASK_ADD,s),t.colorMask.setMask(0)):e.action==="pushMaskEnd"?(t.stencil.setStencilMode(V.MASK_ACTIVE,s),t.colorMask.setMask(15)):e.action==="popMaskBegin"?(s--,s!==0?(t.stencil.setStencilMode(V.RENDERING_MASK_REMOVE,s),t.colorMask.setMask(0)):t.renderTarget.clear(Ae.STENCIL)):e.action==="popMaskEnd"&&(s===0?t.stencil.setStencilMode(V.DISABLED,s):t.stencil.setStencilMode(V.MASK_ACTIVE,s),t.colorMask.setMask(15)),this._maskStackHash[i]=s}destroy(){this._renderer=null,this._maskStackHash=null,this._maskHash=null}}Rr.extension={type:[_.WebGLPipes,_.WebGPUPipes,_.CanvasPipes],name:"stencilMask"};function ks(r,e,t,i,s,n){const a=n?1:-1;return r.identity(),r.a=1/i*2,r.d=a*(1/s*2),r.tx=-1-e*r.a,r.ty=-a-t*r.d,r}const Qe=new Map;function Ur(r,e){if(!Qe.has(r)){const t=new z({source:new tt({resource:r,...e})});Qe.set(r,t)}return Qe.get(r)}function Rs(r){const e=r.colorTexture.source.resource;return e instanceof HTMLCanvasElement&&document.body.contains(e)}const Ar=class{constructor(r={}){if(this.uid=H("renderTarget"),this.colorTextures=[],this.dirtyId=0,this.isRoot=!1,this._size=new Float32Array(2),r={...Ar.defaultDescriptor,...r},this.stencil=r.stencil,typeof r.colorTextures=="number")for(let e=0;e<r.colorTextures;e++)this.colorTextures.push(new ge({width:r.width,height:r.height,resolution:r.resolution,antialias:r.antialias}));else{this.colorTextures=[...r.colorTextures.map(t=>t.source)];const e=this.colorTexture.source;this._resize(e.width,e.height,e._resolution)}this.colorTexture.source.on("resize",this.onSourceResize,this),r.depthTexture&&(r.depthTexture instanceof z||r.depthTexture instanceof ge?this.depthTexture=r.depthTexture.source:this.depthTexture=new ge({width:this.width,height:this.height,resolution:this.resolution,format:"stencil8"}))}get size(){const r=this._size;return r[0]=this.pixelWidth,r[1]=this.pixelHeight,r}get width(){return this.colorTexture.source.width}get height(){return this.colorTexture.source.height}get pixelWidth(){return this.colorTexture.source.pixelWidth}get pixelHeight(){return this.colorTexture.source.pixelHeight}get resolution(){return this.colorTexture.source._resolution}get colorTexture(){return this.colorTextures[0]}onSourceResize(r){this._resize(r.width,r.height,r._resolution,!0)}_resize(r,e,t=this.resolution,i=!1){this.dirtyId++,this.colorTextures.forEach((s,n)=>{i&&n===0||s.source.resize(r,e,t)}),this.depthTexture&&this.depthTexture.source.resize(r,e,t)}destroy(){this.colorTexture.source.off("resize",this.onSourceResize,this)}};let st=Ar;st.defaultDescriptor={width:0,height:0,resolution:1,colorTextures:1,stencil:!0,antialias:!1};const Us=new ae(0,0,1,1);class Nn{constructor(e){this.rootViewPort=new ae,this.viewport=new ae,this.onRenderTargetChange=new xi("onRenderTargetChange"),this.projectionMatrix=new L,this.defaultClearColor=[0,0,0,0],this._renderSurfaceToRenderTargetHash=new Map,this._gpuRenderTargetHash=Object.create(null),this._renderTargetStack=[],this._renderer=e}finishRenderPass(){this.adaptor.finishRenderPass(this.renderTarget)}renderStart({target:e,clear:t,clearColor:i,frame:s}){this._renderTargetStack.length=0,this.push(e,t,i??this._renderer.background.colorRgba,s),this.rootViewPort.copyFrom(this.viewport),this.rootRenderTarget=this.renderTarget,this.renderingToScreen=Rs(this.rootRenderTarget)}bind(e,t=!0,i,s){const n=this.getRenderTarget(e),a=this.renderTarget!==n;this.renderTarget=n,s||(s=e instanceof z?e.layout.frame:Us);const o=this.getGpuRenderTarget(n);(n.pixelWidth!==o.width||n.pixelHeight!==o.height)&&(this.adaptor.resizeGpuRenderTarget(n),o.width=n.pixelWidth,o.height=n.pixelHeight);const l=n.colorTexture,u=this.viewport,c=l.pixelWidth,h=l.pixelHeight;return u.x=s.x*c+.5|0,u.y=s.y*h+.5|0,u.width=s.width*c+.5|0,u.height=s.height*h+.5|0,ks(this.projectionMatrix,0,0,u.width/l.resolution,u.height/l.resolution,!n.isRoot),this.adaptor.startRenderPass(n,t,i,u),a&&this.onRenderTargetChange.emit(n),n}clear(e=Ae.ALL,t){e&&this.adaptor.clear(this.renderTarget,e,t,this.viewport)}push(e,t=Ae.ALL,i,s){const n=this.bind(e,t,i,s);return this._renderTargetStack.push({renderTarget:n,frame:s}),n}pop(){this._renderTargetStack.pop();const e=this._renderTargetStack[this._renderTargetStack.length-1];this.bind(e.renderTarget,!1,null,e.frame)}getRenderTarget(e){return e instanceof z&&(e=e.source),this._renderSurfaceToRenderTargetHash.get(e)??this._initRenderTarget(e)}copyToTexture(e,t,i,s){return this.adaptor.copyToTexture(e,t,i,s)}destroy(){this._renderer=null,this._renderSurfaceToRenderTargetHash.forEach((e,t)=>{e!==t&&e.destroy()}),this._renderSurfaceToRenderTargetHash.clear(),this._gpuRenderTargetHash=Object.create(null)}_initRenderTarget(e){let t=null;return tt.test(e)&&(e=Ur(e)),e instanceof st?t=e:e instanceof ge&&(t=new st({colorTextures:[e],depthTexture:e.source.depthStencil}),tt.test(e.source.resource)&&(t.isRoot=!0),e.on("destroy",()=>{t.destroy()})),this._renderSurfaceToRenderTargetHash.set(e,t),t}getGpuRenderTarget(e){return this._gpuRenderTargetHash[e.uid]||(this._gpuRenderTargetHash[e.uid]=this.adaptor.initGpuRenderTarget(e))}}const ce=[];ce[V.NONE]=void 0;ce[V.DISABLED]={format:"stencil8",depthCompare:"always",depthWriteEnabled:!1,stencilWriteMask:0,stencilReadMask:0,stencilBack:{compare:"always",passOp:"keep"}};ce[V.RENDERING_MASK_ADD]={format:"stencil8",depthCompare:"always",depthWriteEnabled:!1,stencilBack:{compare:"always",passOp:"increment-clamp"}};ce[V.RENDERING_MASK_ADD]={format:"stencil8",depthCompare:"always",depthWriteEnabled:!1,stencilBack:{compare:"always",passOp:"increment-clamp"}};ce[V.RENDERING_MASK_REMOVE]={format:"stencil8",depthCompare:"always",depthWriteEnabled:!1,stencilBack:{compare:"always",passOp:"decrement-clamp"}};ce[V.MASK_ACTIVE]={format:"stencil8",depthCompare:"always",depthWriteEnabled:!1,stencilWriteMask:0,stencilBack:{compare:"equal",passOp:"keep"}};class jn extends le{constructor({buffer:e,offset:t,size:i}){super(),this.uid=H("buffer"),this._resourceType="bufferResource",this._touched=0,this._resourceId=H("buffer"),this._bufferResource=!0,this.buffer=e,this.offset=t|0,this.size=i,this.buffer.on("change",this.onBufferChange,this)}onBufferChange(){this._resourceId=H("buffer"),this.emit("change",this)}destroy(e=!1){e&&this.buffer.destroy(),this.buffer=null}}function Gr(r,e){const t=r.instructionSet,i=t.instructions;for(let s=0;s<t.instructionSize;s++){const n=i[s];e[n.renderPipeId].execute(n)}}class Dr{constructor(e){this._renderer=e}addLayerGroup(e,t){this._renderer.renderPipes.batch.break(t),t.add(e)}execute(e){e.isRenderable&&(this._renderer.globalUniforms.push({worldTransformMatrix:e.worldTransform,worldColor:e.worldColorAlpha}),Gr(e,this._renderer.renderPipes),this._renderer.globalUniforms.pop())}destroy(){this._renderer=null}}Dr.extension={type:[_.WebGLPipes,_.WebGPUPipes,_.CanvasPipes],name:"layer"};function Fr(r,e=[]){e.push(r);for(let t=0;t<r.layerGroupChildren.length;t++)Fr(r.layerGroupChildren[t],e);return e}function As(r,e,t){const i=r>>16&255,s=r>>8&255,n=r&255,a=e>>16&255,o=e>>8&255,l=e&255,u=i+(a-i)*t,c=s+(o-s)*t,h=n+(l-n)*t;return(u<<16)+(c<<8)+h}const Gs=16777215+16777215;function gt(r,e){return r+(e<<32)!==Gs?r===16777215?e:e===16777215?r:As(r,e,.5):16777215}const Ds=new _e;function Ir(r,e=!1){Fs(r);const t=r.childrenToUpdate,i=r.updateTick;r.updateTick++;for(const s in t){const n=t[s],a=n.list,o=n.index;for(let l=0;l<o;l++)Er(a[l],i,0);n.index=0}if(e)for(let s=0;s<r.layerGroupChildren.length;s++)Ir(r.layerGroupChildren[s],e)}function Fs(r){const e=r.root;if(r.layerGroupParent){const t=r.layerGroupParent;r.worldTransform.appendFrom(e.layerTransform,t.worldTransform),r.worldColor=gt(e.layerColor,t.worldColor),r.worldAlpha=e.layerAlpha*t.worldAlpha,r.worldColorAlpha=r.worldColor+((r.worldAlpha*255|0)<<24)}else r.worldTransform.copyFrom(e.layerTransform),r.worldColor=e.localColor,r.worldAlpha=e.localAlpha,r.worldColorAlpha=r.worldColor+((r.worldAlpha*255|0)<<24)}function Er(r,e,t){if(e===r.updateTick)return;r.updateTick=e,r.didChange=!1;const i=r.localTransform;mi(i,r);const s=r.parent;if(s&&!s.isLayerRoot?(t=t|r._updateFlags,r.layerTransform.appendFrom(i,s.layerTransform),t&&Zt(r,s,t)):(t=r._updateFlags,r.layerTransform.copyFrom(i),t&&Zt(r,Ds,t)),!r.isLayerRoot){const n=r.children,a=n.length;for(let l=0;l<a;l++)Er(n[l],e,t);const o=r.layerGroup;r.view&&!o.structureDidChange&&o.updateRenderable(r)}}function Zt(r,e,t){t&gi&&(r.layerColor=gt(r.localColor,e.layerColor),r.layerAlpha=r.localAlpha*e.layerAlpha,r.layerColorAlpha=r.layerColor+((r.layerAlpha*255|0)<<24)),t&_i&&(r.layerBlendMode=r.localBlendMode==="inherit"?e.layerBlendMode:r.localBlendMode),t&yi&&(r.layerVisibleRenderable=r.localVisibleRenderable&e.layerVisibleRenderable),r._updateFlags=0}function Is(r,e){const{list:t,index:i}=r.childrenRenderablesToUpdate;let s=!1;for(let n=0;n<i;n++){const a=t[n],o=a.view;if(s=e[o.renderPipeId].validateRenderable(a),s)break}return r.structureDidChange=s,s}class zr{constructor(e){this._renderer=e}render({container:e,transform:t}){e.layer=!0;const i=this._renderer,s=Fr(e.layerGroup,[]),n=i.renderPipes;for(let a=0;a<s.length;a++){const o=s[a];o.runOnRender(),o.instructionSet.renderPipes=n,o.structureDidChange||Is(o,n),Ir(o),o.structureDidChange?(o.structureDidChange=!1,Ss(o,n)):Es(o),o.childrenRenderablesToUpdate.index=0,i.renderPipes.batch.upload(o.instructionSet)}t&&e.layerGroup.worldTransform.copyFrom(t),i.globalUniforms.start({worldTransformMatrix:e.layerGroup.worldTransform}),Gr(e.layerGroup,n),n.uniformBatch&&n.uniformBatch.renderEnd()}destroy(){this._renderer=null}}zr.extension={type:[_.WebGLSystem,_.WebGPUSystem,_.CanvasSystem],name:"layer"};function Es(r){const{list:e,index:t}=r.childrenRenderablesToUpdate;for(let i=0;i<t;i++){const s=e[i];s.didViewUpdate&&r.updateRenderable(s)}}function zs(r,e,t,i,s,n,a,o=null){let l=0;t*=e,s*=n;const u=o.a,c=o.b,h=o.c,f=o.d,d=o.tx,p=o.ty;for(;l<a;){const y=r[t],x=r[t+1];i[s]=u*y+h*x+d,i[s+1]=c*y+f*x+p,s+=n,t+=e,l++}}function Hs(r,e,t,i){let s=0;for(e*=t;s<i;)r[e]=0,r[e+1]=0,e+=t,s++}function Hr(r,e,t,i,s){const n=e.a,a=e.b,o=e.c,l=e.d,u=e.tx,c=e.ty;t=t||0,i=i||2,s=s||r.length/i-t;let h=t*i;for(let f=0;f<s;f++){const d=r[h],p=r[h+1];r[h]=n*d+o*p+u,r[h+1]=a*d+l*p+c,h+=i}}class _t{constructor(){this.batcher=null,this.batch=null,this.applyTransform=!0,this.roundPixels=0}get blendMode(){return this.applyTransform?this.renderable.layerBlendMode:"normal"}packIndex(e,t,i){const s=this.geometryData.indices;for(let n=0;n<this.indexSize;n++)e[t++]=s[n+this.indexOffset]+i-this.vertexOffset}packAttributes(e,t,i,s){const n=this.geometryData,a=this.renderable,o=n.vertices,l=n.uvs,u=this.vertexOffset*2,c=(this.vertexOffset+this.vertexSize)*2,h=this.color,f=h>>16|h&65280|(h&255)<<16;if(this.applyTransform){const d=gt(f,a.layerColor)+(this.alpha*a.layerAlpha*255<<24),p=a.layerTransform,y=s<<16|this.roundPixels&65535,x=p.a,v=p.b,w=p.c,g=p.d,m=p.tx,k=p.ty;for(let A=u;A<c;A+=2){const R=o[A],B=o[A+1];e[i]=x*R+w*B+m,e[i+1]=v*R+g*B+k,e[i+2]=l[A],e[i+3]=l[A+1],t[i+4]=d,t[i+5]=y,i+=6}}else{const d=f+(this.alpha*255<<24);for(let p=u;p<c;p+=2)e[i]=o[p],e[i+1]=o[p+1],e[i+2]=l[p],e[i+3]=l[p+1],t[i+4]=d,t[i+5]=s,i+=6}}get vertSize(){return this.vertexSize}copyTo(e){e.indexOffset=this.indexOffset,e.indexSize=this.indexSize,e.vertexOffset=this.vertexOffset,e.vertexSize=this.vertexSize,e.color=this.color,e.alpha=this.alpha,e.texture=this.texture,e.geometryData=this.geometryData}reset(){this.applyTransform=!0}}const Je={build(r,e){let t,i,s,n,a,o;if(r.type==="circle"){const m=r;t=m.x,i=m.y,a=o=m.radius,s=n=0}else if(r.type==="ellipse"){const m=r;t=m.x,i=m.y,a=m.halfWidth,o=m.halfHeight,s=n=0}else{const m=r,k=m.width/2,A=m.height/2;t=m.x+k,i=m.y+A,a=o=Math.max(0,Math.min(m.radius,Math.min(k,A))),s=k-a,n=A-o}if(!(a>=0&&o>=0&&s>=0&&n>=0))return e;const l=Math.ceil(2.3*Math.sqrt(a+o)),u=l*8+(s?4:0)+(n?4:0);if(u===0)return e;if(l===0)return e[0]=e[6]=t+s,e[1]=e[3]=i+n,e[2]=e[4]=t-s,e[5]=e[7]=i-n,e;let c=0,h=l*4+(s?2:0)+2,f=h,d=u,p=s+a,y=n,x=t+p,v=t-p,w=i+y;if(e[c++]=x,e[c++]=w,e[--h]=w,e[--h]=v,n){const m=i-y;e[f++]=v,e[f++]=m,e[--d]=m,e[--d]=x}for(let m=1;m<l;m++){const k=Math.PI/2*(m/l),A=s+Math.cos(k)*a,R=n+Math.sin(k)*o,B=t+A,T=t-A,b=i+R,O=i-R;e[c++]=B,e[c++]=b,e[--h]=b,e[--h]=T,e[f++]=T,e[f++]=O,e[--d]=O,e[--d]=B}p=s,y=n+o,x=t+p,v=t-p,w=i+y;const g=i-y;return e[c++]=x,e[c++]=w,e[--d]=g,e[--d]=x,s&&(e[c++]=v,e[c++]=w,e[--d]=g,e[--d]=v),e},triangulate(r,e,t,i,s,n){if(r.length===0)return;let a=0,o=0;const l=r.length/4;a+=r[0],o+=r[1],a+=r[l|0],o+=r[(l|0)+1],a+=r[l*2|0],o+=r[(l*2|0)+1],a+=r[l*3|0],o+=r[(l*3|0)+1],a/=4,o/=4;let u=i;e[u*t]=a,e[u*t+1]=o,u++;const c=i;e[u*t]=r[0],e[u*t+1]=r[1],u++;for(let h=2;h<r.length;h+=2)e[u*t]=r[h],e[u*t+1]=r[h+1],s[n++]=u,s[n++]=c,s[n++]=u-1,u++;s[n++]=u-1,s[n++]=c,s[n++]=c+1}},Ls=1e-4,qt=1e-4;function Vs(r){const e=r.length;if(e<6)return 1;let t=0;for(let i=0,s=r[e-2],n=r[e-1];i<e;i+=2){const a=r[i],o=r[i+1];t+=(a-s)*(o+n),s=a,n=o}return t<0?-1:1}function Xt(r,e,t,i,s,n,a,o){const l=r-t*s,u=e-i*s,c=r+t*n,h=e+i*n;let f,d;a?(f=i,d=-t):(f=-i,d=t);const p=l+f,y=u+d,x=c+f,v=h+d;return o.push(p,y),o.push(x,v),2}function ee(r,e,t,i,s,n,a,o){const l=t-r,u=i-e;let c=Math.atan2(l,u),h=Math.atan2(s-r,n-e);o&&c<h?c+=Math.PI*2:!o&&c>h&&(h+=Math.PI*2);let f=c;const d=h-c,p=Math.abs(d),y=Math.sqrt(l*l+u*u),x=(15*p*Math.sqrt(y)/Math.PI>>0)+1,v=d/x;if(f+=v,o){a.push(r,e),a.push(t,i);for(let w=1,g=f;w<x;w++,g+=v)a.push(r,e),a.push(r+Math.sin(g)*y,e+Math.cos(g)*y);a.push(r,e),a.push(s,n)}else{a.push(t,i),a.push(r,e);for(let w=1,g=f;w<x;w++,g+=v)a.push(r+Math.sin(g)*y,e+Math.cos(g)*y),a.push(r,e);a.push(s,n),a.push(r,e)}return x*2}function Os(r,e,t,i,s,n,a,o,l){const u=Ls;if(r.length===0)return;const c=e;let h=c.alignment;if(e.alignment!==.5){let U=Vs(r);t&&(U*=-1),h=(h-.5)*U+.5}const f=new Ue(r[0],r[1]),d=new Ue(r[r.length-2],r[r.length-1]),p=i,y=Math.abs(f.x-d.x)<u&&Math.abs(f.y-d.y)<u;if(p){r=r.slice(),y&&(r.pop(),r.pop(),d.set(r[r.length-2],r[r.length-1]));const U=(f.x+d.x)*.5,K=(d.y+f.y)*.5;r.unshift(U,K),r.push(U,K)}const x=s,v=r.length/2;let w=r.length;const g=x.length/2,m=c.width/2,k=m*m,A=c.miterLimit*c.miterLimit;let R=r[0],B=r[1],T=r[2],b=r[3],O=0,W=0,C=-(B-b),P=R-T,I=0,E=0,$=Math.sqrt(C*C+P*P);C/=$,P/=$,C*=m,P*=m;const Mt=h,S=(1-Mt)*2,M=Mt*2;p||(c.cap==="round"?w+=ee(R-C*(S-M)*.5,B-P*(S-M)*.5,R-C*S,B-P*S,R+C*M,B+P*M,x,!0)+2:c.cap==="square"&&(w+=Xt(R,B,C,P,S,M,!0,x))),x.push(R-C*S,B-P*S),x.push(R+C*M,B+P*M);for(let U=1;U<v-1;++U){R=r[(U-1)*2],B=r[(U-1)*2+1],T=r[U*2],b=r[U*2+1],O=r[(U+1)*2],W=r[(U+1)*2+1],C=-(B-b),P=R-T,$=Math.sqrt(C*C+P*P),C/=$,P/=$,C*=m,P*=m,I=-(b-W),E=T-O,$=Math.sqrt(I*I+E*E),I/=$,E/=$,I*=m,E*=m;const K=T-R,he=B-b,de=T-O,fe=W-b,Bt=K*de+he*fe,we=he*de-fe*K,pe=we<0;if(Math.abs(we)<.001*Math.abs(Bt)){x.push(T-C*S,b-P*S),x.push(T+C*M,b+P*M),Bt>=0&&(c.join==="round"?w+=ee(T,b,T-C*S,b-P*S,T-I*S,b-E*S,x,!1)+4:w+=2,x.push(T-I*M,b-E*M),x.push(T+I*S,b+E*S));continue}const kt=(-C+R)*(-P+b)-(-C+T)*(-P+B),Rt=(-I+O)*(-E+b)-(-I+T)*(-E+W),Se=(K*Rt-de*kt)/we,Ce=(fe*kt-he*Rt)/we,ze=(Se-T)*(Se-T)+(Ce-b)*(Ce-b),q=T+(Se-T)*S,X=b+(Ce-b)*S,Q=T-(Se-T)*M,J=b-(Ce-b)*M,di=Math.min(K*K+he*he,de*de+fe*fe),Ut=pe?S:M,fi=di+Ut*Ut*k;ze<=fi?c.join==="bevel"||ze/k>A?(pe?(x.push(q,X),x.push(T+C*M,b+P*M),x.push(q,X),x.push(T+I*M,b+E*M)):(x.push(T-C*S,b-P*S),x.push(Q,J),x.push(T-I*S,b-E*S),x.push(Q,J)),w+=2):c.join==="round"?pe?(x.push(q,X),x.push(T+C*M,b+P*M),w+=ee(T,b,T+C*M,b+P*M,T+I*M,b+E*M,x,!0)+4,x.push(q,X),x.push(T+I*M,b+E*M)):(x.push(T-C*S,b-P*S),x.push(Q,J),w+=ee(T,b,T-C*S,b-P*S,T-I*S,b-E*S,x,!1)+4,x.push(T-I*S,b-E*S),x.push(Q,J)):(x.push(q,X),x.push(Q,J)):(x.push(T-C*S,b-P*S),x.push(T+C*M,b+P*M),c.join==="round"?pe?w+=ee(T,b,T+C*M,b+P*M,T+I*M,b+E*M,x,!0)+2:w+=ee(T,b,T-C*S,b-P*S,T-I*S,b-E*S,x,!1)+2:c.join==="miter"&&ze/k<=A&&(pe?(x.push(Q,J),x.push(Q,J)):(x.push(q,X),x.push(q,X)),w+=2),x.push(T-I*S,b-E*S),x.push(T+I*M,b+E*M),w+=2)}R=r[(v-2)*2],B=r[(v-2)*2+1],T=r[(v-1)*2],b=r[(v-1)*2+1],C=-(B-b),P=R-T,$=Math.sqrt(C*C+P*P),C/=$,P/=$,C*=m,P*=m,x.push(T-C*S,b-P*S),x.push(T+C*M,b+P*M),p||(c.cap==="round"?w+=ee(T-C*(S-M)*.5,b-P*(S-M)*.5,T-C*S,b-P*S,T+C*M,b+P*M,x,!1)+2:c.cap==="square"&&(w+=Xt(T,b,C,P,S,M,!1,x)));const hi=qt*qt;for(let U=g;U<w+g-2;++U)R=x[U*2],B=x[U*2+1],T=x[(U+1)*2],b=x[(U+1)*2+1],O=x[(U+2)*2],W=x[(U+2)*2+1],!(Math.abs(R*(b-W)+T*(W-B)+O*(B-b))<hi)&&o.push(U,U+1,U+2)}var yt={exports:{}};yt.exports=Fe;yt.exports.default=Fe;function Fe(r,e,t){t=t||2;var i=e&&e.length,s=i?e[0]*t:r.length,n=Lr(r,0,s,t,!0),a=[];if(!n||n.next===n.prev)return a;var o,l,u,c,h,f,d;if(i&&(n=Ks(r,e,n,t)),r.length>80*t){o=u=r[0],l=c=r[1];for(var p=t;p<s;p+=t)h=r[p],f=r[p+1],h<o&&(o=h),f<l&&(l=f),h>u&&(u=h),f>c&&(c=f);d=Math.max(u-o,c-l),d=d!==0?32767/d:0}return be(n,a,t,o,l,d,0),a}function Lr(r,e,t,i,s){var n,a;if(s===ot(r,e,t,i)>0)for(n=e;n<t;n+=i)a=Qt(n,r[n],r[n+1],a);else for(n=t-i;n>=e;n-=i)a=Qt(n,r[n],r[n+1],a);return a&&Ie(a,a.next)&&(Te(a),a=a.next),a}function re(r,e){if(!r)return r;e||(e=r);var t=r,i;do if(i=!1,!t.steiner&&(Ie(t,t.next)||D(t.prev,t,t.next)===0)){if(Te(t),t=e=t.prev,t===t.next)break;i=!0}else t=t.next;while(i||t!==e);return e}function be(r,e,t,i,s,n,a){if(r){!a&&n&&Qs(r,i,s,n);for(var o=r,l,u;r.prev!==r.next;){if(l=r.prev,u=r.next,n?Ws(r,i,s,n):$s(r)){e.push(l.i/t|0),e.push(r.i/t|0),e.push(u.i/t|0),Te(r),r=u.next,o=u.next;continue}if(r=u,r===o){a?a===1?(r=Ns(re(r),e,t),be(r,e,t,i,s,n,2)):a===2&&js(r,e,t,i,s,n):be(re(r),e,t,i,s,n,1);break}}}}function $s(r){var e=r.prev,t=r,i=r.next;if(D(e,t,i)>=0)return!1;for(var s=e.x,n=t.x,a=i.x,o=e.y,l=t.y,u=i.y,c=s<n?s<a?s:a:n<a?n:a,h=o<l?o<u?o:u:l<u?l:u,f=s>n?s>a?s:a:n>a?n:a,d=o>l?o>u?o:u:l>u?l:u,p=i.next;p!==e;){if(p.x>=c&&p.x<=f&&p.y>=h&&p.y<=d&&ne(s,o,n,l,a,u,p.x,p.y)&&D(p.prev,p,p.next)>=0)return!1;p=p.next}return!0}function Ws(r,e,t,i){var s=r.prev,n=r,a=r.next;if(D(s,n,a)>=0)return!1;for(var o=s.x,l=n.x,u=a.x,c=s.y,h=n.y,f=a.y,d=o<l?o<u?o:u:l<u?l:u,p=c<h?c<f?c:f:h<f?h:f,y=o>l?o>u?o:u:l>u?l:u,x=c>h?c>f?c:f:h>f?h:f,v=nt(d,p,e,t,i),w=nt(y,x,e,t,i),g=r.prevZ,m=r.nextZ;g&&g.z>=v&&m&&m.z<=w;){if(g.x>=d&&g.x<=y&&g.y>=p&&g.y<=x&&g!==s&&g!==a&&ne(o,c,l,h,u,f,g.x,g.y)&&D(g.prev,g,g.next)>=0||(g=g.prevZ,m.x>=d&&m.x<=y&&m.y>=p&&m.y<=x&&m!==s&&m!==a&&ne(o,c,l,h,u,f,m.x,m.y)&&D(m.prev,m,m.next)>=0))return!1;m=m.nextZ}for(;g&&g.z>=v;){if(g.x>=d&&g.x<=y&&g.y>=p&&g.y<=x&&g!==s&&g!==a&&ne(o,c,l,h,u,f,g.x,g.y)&&D(g.prev,g,g.next)>=0)return!1;g=g.prevZ}for(;m&&m.z<=w;){if(m.x>=d&&m.x<=y&&m.y>=p&&m.y<=x&&m!==s&&m!==a&&ne(o,c,l,h,u,f,m.x,m.y)&&D(m.prev,m,m.next)>=0)return!1;m=m.nextZ}return!0}function Ns(r,e,t){var i=r;do{var s=i.prev,n=i.next.next;!Ie(s,n)&&Vr(s,i,i.next,n)&&ve(s,n)&&ve(n,s)&&(e.push(s.i/t|0),e.push(i.i/t|0),e.push(n.i/t|0),Te(i),Te(i.next),i=r=n),i=i.next}while(i!==r);return re(i)}function js(r,e,t,i,s,n){var a=r;do{for(var o=a.next.next;o!==a.prev;){if(a.i!==o.i&&tn(a,o)){var l=Or(a,o);a=re(a,a.next),l=re(l,l.next),be(a,e,t,i,s,n,0),be(l,e,t,i,s,n,0);return}o=o.next}a=a.next}while(a!==r)}function Ks(r,e,t,i){var s=[],n,a,o,l,u;for(n=0,a=e.length;n<a;n++)o=e[n]*i,l=n<a-1?e[n+1]*i:r.length,u=Lr(r,o,l,i,!1),u===u.next&&(u.steiner=!0),s.push(en(u));for(s.sort(Ys),n=0;n<s.length;n++)t=Zs(s[n],t);return t}function Ys(r,e){return r.x-e.x}function Zs(r,e){var t=qs(r,e);if(!t)return e;var i=Or(t,r);return re(i,i.next),re(t,t.next)}function qs(r,e){var t=e,i=r.x,s=r.y,n=-1/0,a;do{if(s<=t.y&&s>=t.next.y&&t.next.y!==t.y){var o=t.x+(s-t.y)*(t.next.x-t.x)/(t.next.y-t.y);if(o<=i&&o>n&&(n=o,a=t.x<t.next.x?t:t.next,o===i))return a}t=t.next}while(t!==e);if(!a)return null;var l=a,u=a.x,c=a.y,h=1/0,f;t=a;do i>=t.x&&t.x>=u&&i!==t.x&&ne(s<c?i:n,s,u,c,s<c?n:i,s,t.x,t.y)&&(f=Math.abs(s-t.y)/(i-t.x),ve(t,r)&&(f<h||f===h&&(t.x>a.x||t.x===a.x&&Xs(a,t)))&&(a=t,h=f)),t=t.next;while(t!==l);return a}function Xs(r,e){return D(r.prev,r,e.prev)<0&&D(e.next,r,r.next)<0}function Qs(r,e,t,i){var s=r;do s.z===0&&(s.z=nt(s.x,s.y,e,t,i)),s.prevZ=s.prev,s.nextZ=s.next,s=s.next;while(s!==r);s.prevZ.nextZ=null,s.prevZ=null,Js(s)}function Js(r){var e,t,i,s,n,a,o,l,u=1;do{for(t=r,r=null,n=null,a=0;t;){for(a++,i=t,o=0,e=0;e<u&&(o++,i=i.nextZ,!!i);e++);for(l=u;o>0||l>0&&i;)o!==0&&(l===0||!i||t.z<=i.z)?(s=t,t=t.nextZ,o--):(s=i,i=i.nextZ,l--),n?n.nextZ=s:r=s,s.prevZ=n,n=s;t=i}n.nextZ=null,u*=2}while(a>1);return r}function nt(r,e,t,i,s){return r=(r-t)*s|0,e=(e-i)*s|0,r=(r|r<<8)&16711935,r=(r|r<<4)&252645135,r=(r|r<<2)&858993459,r=(r|r<<1)&1431655765,e=(e|e<<8)&16711935,e=(e|e<<4)&252645135,e=(e|e<<2)&858993459,e=(e|e<<1)&1431655765,r|e<<1}function en(r){var e=r,t=r;do(e.x<t.x||e.x===t.x&&e.y<t.y)&&(t=e),e=e.next;while(e!==r);return t}function ne(r,e,t,i,s,n,a,o){return(s-a)*(e-o)>=(r-a)*(n-o)&&(r-a)*(i-o)>=(t-a)*(e-o)&&(t-a)*(n-o)>=(s-a)*(i-o)}function tn(r,e){return r.next.i!==e.i&&r.prev.i!==e.i&&!rn(r,e)&&(ve(r,e)&&ve(e,r)&&sn(r,e)&&(D(r.prev,r,e.prev)||D(r,e.prev,e))||Ie(r,e)&&D(r.prev,r,r.next)>0&&D(e.prev,e,e.next)>0)}function D(r,e,t){return(e.y-r.y)*(t.x-e.x)-(e.x-r.x)*(t.y-e.y)}function Ie(r,e){return r.x===e.x&&r.y===e.y}function Vr(r,e,t,i){var s=ke(D(r,e,t)),n=ke(D(r,e,i)),a=ke(D(t,i,r)),o=ke(D(t,i,e));return!!(s!==n&&a!==o||s===0&&Be(r,t,e)||n===0&&Be(r,i,e)||a===0&&Be(t,r,i)||o===0&&Be(t,e,i))}function Be(r,e,t){return e.x<=Math.max(r.x,t.x)&&e.x>=Math.min(r.x,t.x)&&e.y<=Math.max(r.y,t.y)&&e.y>=Math.min(r.y,t.y)}function ke(r){return r>0?1:r<0?-1:0}function rn(r,e){var t=r;do{if(t.i!==r.i&&t.next.i!==r.i&&t.i!==e.i&&t.next.i!==e.i&&Vr(t,t.next,r,e))return!0;t=t.next}while(t!==r);return!1}function ve(r,e){return D(r.prev,r,r.next)<0?D(r,e,r.next)>=0&&D(r,r.prev,e)>=0:D(r,e,r.prev)<0||D(r,r.next,e)<0}function sn(r,e){var t=r,i=!1,s=(r.x+e.x)/2,n=(r.y+e.y)/2;do t.y>n!=t.next.y>n&&t.next.y!==t.y&&s<(t.next.x-t.x)*(n-t.y)/(t.next.y-t.y)+t.x&&(i=!i),t=t.next;while(t!==r);return i}function Or(r,e){var t=new at(r.i,r.x,r.y),i=new at(e.i,e.x,e.y),s=r.next,n=e.prev;return r.next=e,e.prev=r,t.next=s,s.prev=t,i.next=t,t.prev=i,n.next=i,i.prev=n,i}function Qt(r,e,t,i){var s=new at(r,e,t);return i?(s.next=i.next,s.prev=i,i.next.prev=s,i.next=s):(s.prev=s,s.next=s),s}function Te(r){r.next.prev=r.prev,r.prev.next=r.next,r.prevZ&&(r.prevZ.nextZ=r.nextZ),r.nextZ&&(r.nextZ.prevZ=r.prevZ)}function at(r,e,t){this.i=r,this.x=e,this.y=t,this.prev=null,this.next=null,this.z=0,this.prevZ=null,this.nextZ=null,this.steiner=!1}Fe.deviation=function(r,e,t,i){var s=e&&e.length,n=s?e[0]*t:r.length,a=Math.abs(ot(r,0,n,t));if(s)for(var o=0,l=e.length;o<l;o++){var u=e[o]*t,c=o<l-1?e[o+1]*t:r.length;a-=Math.abs(ot(r,u,c,t))}var h=0;for(o=0;o<i.length;o+=3){var f=i[o]*t,d=i[o+1]*t,p=i[o+2]*t;h+=Math.abs((r[f]-r[p])*(r[d+1]-r[f+1])-(r[f]-r[d])*(r[p+1]-r[f+1]))}return a===0&&h===0?0:Math.abs((h-a)/a)};function ot(r,e,t,i){for(var s=0,n=e,a=t-i;n<t;n+=i)s+=(r[a]-r[n])*(r[n+1]+r[a+1]),a=n;return s}Fe.flatten=function(r){for(var e=r[0][0].length,t={vertices:[],holes:[],dimensions:e},i=0,s=0;s<r.length;s++){for(var n=0;n<r[s].length;n++)for(var a=0;a<e;a++)t.vertices.push(r[s][n][a]);s>0&&(i+=r[s-1].length,t.holes.push(i))}return t};var nn=yt.exports;const an=Ui(nn);function $r(r,e,t,i,s,n,a){const o=an(r,e,2);if(!o)return;for(let u=0;u<o.length;u+=3)n[a++]=o[u]+s,n[a++]=o[u+1]+s,n[a++]=o[u+2]+s;let l=s*i;for(let u=0;u<r.length;u+=2)t[l]=r[u],t[l+1]=r[u+1],l+=i}const on=[],ln={build(r,e){for(let t=0;t<r.points.length;t++)e[t]=r.points[t];return e},triangulate(r,e,t,i,s,n){$r(r,on,e,t,i,s,n)}},un={build(r,e){const t=r,i=t.x,s=t.y,n=t.width,a=t.height;return n>=0&&a>=0&&(e[0]=i,e[1]=s,e[2]=i+n,e[3]=s,e[4]=i+n,e[5]=s+a,e[6]=i,e[7]=s+a),e},triangulate(r,e,t,i,s,n){let a=0;i*=t,e[i+a]=r[0],e[i+a+1]=r[1],a+=t,e[i+a]=r[2],e[i+a+1]=r[3],a+=t,e[i+a]=r[6],e[i+a+1]=r[7],a+=t,e[i+a]=r[4],e[i+a+1]=r[5],a+=t;const o=i/t;s[n++]=o,s[n++]=o+1,s[n++]=o+2,s[n++]=o+1,s[n++]=o+3,s[n++]=o+2}},cn={build(r,e){return e[0]=r.x,e[1]=r.y,e[2]=r.x2,e[3]=r.y2,e[4]=r.x3,e[5]=r.y3,e},triangulate(r,e,t,i,s,n){let a=0;i*=t,e[i+a]=r[0],e[i+a+1]=r[1],a+=t,e[i+a]=r[2],e[i+a+1]=r[3],a+=t,e[i+a]=r[4],e[i+a+1]=r[5];const o=i/t;s[n++]=o,s[n++]=o+1,s[n++]=o+2}},bt={rectangle:un,polygon:ln,triangle:cn,circle:Je,ellipse:Je,roundedRectangle:Je},hn=new ae;function dn(r){const s={vertices:[],uvs:[],indices:[]},n=[];for(let a=0;a<r.instructions.length;a++){const o=r.instructions[a];if(o.action==="texture")fn(o.data,n,s);else if(o.action==="fill"||o.action==="stroke"){const l=o.action==="stroke",u=o.data.path.shapePath,c=o.data.style,h=o.data.hole;l&&h&&Jt(h.shapePath,c,null,!0,n,s),Jt(u,c,h,l,n,s)}}return n}function fn(r,e,t){const{vertices:i,uvs:s,indices:n}=t,a=n.length,o=i.length/2,l=[],u=bt.rectangle,c=hn,h=r.image;c.x=r.dx,c.y=r.dy,c.width=r.dw,c.height=r.dh;const f=r.transform;u.build(c,l),f&&Hr(l,f),u.triangulate(l,i,2,o,n,a);const d=h.layout.uvs;s.push(d.x0,d.y0,d.x1,d.y1,d.x3,d.y3,d.x2,d.y2);const p=G.get(_t);p.indexOffset=a,p.indexSize=n.length-a,p.vertexOffset=o,p.vertexSize=i.length/2-o,p.color=r.style,p.alpha=r.alpha,p.texture=h,p.geometryData=t,e.push(p)}function Jt(r,e,t,i,s,n){const{vertices:a,uvs:o,indices:l}=n,u=r.shapePrimitives.length-1;r.shapePrimitives.forEach(({shape:c,transform:h},f)=>{const d=l.length,p=a.length/2,y=[],x=bt[c.type];if(x.build(c,y),h&&Hr(y,h),i){const m=c.closePath??!0;Os(y,e,!1,m,a,2,p,l)}else if(t&&u===f){u!==0&&console.warn("[Pixi Graphics] only the last shape have be cut out");const m=[],k=y.slice();pn(t.shapePath).forEach(R=>{m.push(k.length/2),k.push(...R)}),$r(k,m,a,2,p,l,d)}else x.triangulate(y,a,2,p,l,d);const v=o.length/2,w=e.texture;if(w!==z.WHITE){const m=e.matrix;h&&m.append(h.clone().invert()),zs(a,2,p,o,v,2,a.length/2-p,m)}else Hs(o,v,2,a.length/2-p);const g=G.get(_t);g.indexOffset=d,g.indexSize=l.length-d,g.vertexOffset=p,g.vertexSize=a.length/2-p,g.color=e.color,g.alpha=e.alpha,g.texture=w,g.geometryData=n,s.push(g)})}function pn(r){if(!r)return[];const e=r.shapePrimitives,t=[];for(let i=0;i<e.length;i++){const s=e[i].shape,n=[];bt[s.type].build(s,n),t.push(n)}return t}class xn{}class mn{constructor(){this.geometry=new wr,this.instructions=new bi}init(){this.instructions.reset()}}class Wr{constructor(){this._activeBatchers=[],this._gpuContextHash={},this._graphicsDataContextHash=Object.create(null),this._needsContextNeedsRebuild=[]}prerender(){this._returnActiveBatchers()}getContextRenderData(e){return this._graphicsDataContextHash[e.uid]||this._initContextRenderData(e)}updateGpuContext(e){let t=this._gpuContextHash[e.uid]||this._initContext(e);if(e.dirty){t?this._cleanGraphicsContextData(e):t=this._initContext(e);const i=dn(e);let s=0;const n=e.batchMode;let a=!0;if(e.customShader||n==="no-batch")a=!1;else if(n==="auto"){for(let o=0;o<i.length;o++)if(s+=i[o].vertexSize,s>400){a=!1;break}}t=this._gpuContextHash[e.uid]={isBatchable:a,batches:i},e.dirty=!1}return t}getGpuContext(e){return this._gpuContextHash[e.uid]||this._initContext(e)}_returnActiveBatchers(){for(let e=0;e<this._activeBatchers.length;e++)G.return(this._activeBatchers[e]);this._activeBatchers.length=0}_initContextRenderData(e){const t=G.get(mn),i=this._gpuContextHash[e.uid].batches;let s=0,n=0;i.forEach(u=>{u.applyTransform=!1,s+=u.geometryData.vertices.length,n+=u.geometryData.indices.length});const a=G.get(mt);this._activeBatchers.push(a),a.ensureAttributeBuffer(s),a.ensureIndexBuffer(n),a.begin();for(let u=0;u<i.length;u++){const c=i[u];a.add(c)}a.finish(t.instructions);const o=t.geometry;o.indexBuffer.setDataWithSize(a.indexBuffer,a.indexSize,!0),o.buffers[0].setDataWithSize(a.attributeBuffer.float32View,a.attributeSize,!0);const l=a.batches;for(let u=0;u<l.length;u++){const c=l[u];c.bindGroup=ys(c.textures.textures,c.textures.count)}return this._graphicsDataContextHash[e.uid]=t,t}_initContext(e){const t=new xn;return this._gpuContextHash[e.uid]=t,e.on("update",this.onGraphicsContextUpdate,this),e.on("destroy",this.onGraphicsContextDestroy,this),this._gpuContextHash[e.uid]}onGraphicsContextUpdate(e){this._needsContextNeedsRebuild.push(e)}onGraphicsContextDestroy(e){this._cleanGraphicsContextData(e),this._gpuContextHash[e.uid]=null}_cleanGraphicsContextData(e){const t=this._gpuContextHash[e.uid];t.isBatchable||this._graphicsDataContextHash[e.uid]&&(G.return(this.getContextRenderData(e)),this._graphicsDataContextHash[e.uid]=null),t.batches&&t.batches.forEach(i=>{G.return(i)})}destroy(){for(const e of this._needsContextNeedsRebuild)this._cleanGraphicsContextData(e),this._gpuContextHash[e.uid]=null;this._needsContextNeedsRebuild.length=0}}Wr.extension={type:[_.WebGLSystem,_.WebGPUSystem,_.CanvasSystem],name:"graphicsContext"};function vt(r,e,t){e[t++]=(r&255)/255,e[t++]=(r>>8&255)/255,e[t++]=(r>>16&255)/255,e[t++]=(r>>24&255)/255}class Nr{constructor(e,t){this.state=ue.for2d(),this._renderableBatchesHash=Object.create(null),this.renderer=e,this._adaptor=t,this._adaptor.init()}validateRenderable(e){const t=e.view.context,i=!!this._renderableBatchesHash[e.uid],s=this.renderer.graphicsContext.updateGpuContext(t);return!!(s.isBatchable||i!==s.isBatchable)}addRenderable(e,t){const i=this.renderer.graphicsContext.updateGpuContext(e.view.context);e.view._didUpdate&&(e.view._didUpdate=!1,this._rebuild(e)),i.isBatchable?this._addToBatcher(e,t):(this.renderer.renderPipes.batch.break(t),t.add({renderPipeId:"graphics",renderable:e}))}updateRenderable(e){const t=this._renderableBatchesHash[e.uid];if(t)for(let i=0;i<t.length;i++){const s=t[i];s.batcher.updateElement(s)}}destroyRenderable(e){this._removeBatchForRenderable(e.uid)}execute({renderable:e}){if(!e.isRenderable)return;const t=this.renderer,i=e.view.context;if(!t.graphicsContext.getGpuContext(i).batches.length)return;const n=i.customShader||this._adaptor.shader;this.state.blendMode=e.layerBlendMode;const a=n.resources.localUniforms.uniforms;a.uTransformMatrix=e.layerTransform,a.uRound=t._roundPixels|e.view.roundPixels,vt(e.layerColorAlpha,a.uColor,0),this._adaptor.execute(this,e)}_rebuild(e){const t=!!this._renderableBatchesHash[e.uid],i=this.renderer.graphicsContext.updateGpuContext(e.view.context);t&&this._removeBatchForRenderable(e.uid),i.isBatchable&&this._initBatchesForRenderable(e),e.view.batched=i.isBatchable}_addToBatcher(e,t){const i=this.renderer.renderPipes.batch,s=this._getBatchesForRenderable(e);for(let n=0;n<s.length;n++){const a=s[n];i.addToBatch(a,t)}}_getBatchesForRenderable(e){return this._renderableBatchesHash[e.uid]||this._initBatchesForRenderable(e)}_initBatchesForRenderable(e){const t=e.view.context,i=this.renderer.graphicsContext.getGpuContext(t),s=this.renderer._roundPixels|e.view.roundPixels,n=i.batches.map(a=>{const o=G.get(_t);return a.copyTo(o),o.renderable=e,o.roundPixels=s,o});return this._renderableBatchesHash[e.uid]=n,e.on("destroyed",()=>{this.destroyRenderable(e)}),n}_removeBatchForRenderable(e){this._renderableBatchesHash[e].forEach(t=>{G.return(t)}),this._renderableBatchesHash[e]=null}destroy(){this.renderer=null,this._adaptor.destroy(),this._adaptor=null,this.state=null;for(const e in this._renderableBatchesHash)this._removeBatchForRenderable(e);this._renderableBatchesHash=null}}Nr.extension={type:[_.WebGLPipes,_.WebGPUPipes,_.CanvasPipes],name:"graphics"};class gn{constructor(){this.batcher=null,this.batch=null,this.roundPixels=0}get blendMode(){return this.renderable.layerBlendMode}reset(){this.renderable=null,this.texture=null,this.batcher=null,this.batch=null}packIndex(e,t,i){const s=this.renderable.view.geometry.indices;for(let n=0;n<s.length;n++)e[t++]=s[n]+i}packAttributes(e,t,i,s){const n=this.renderable,o=this.renderable.view.geometry,l=n.layerTransform,u=s<<16|this.roundPixels&65535,c=l.a,h=l.b,f=l.c,d=l.d,p=l.tx,y=l.ty,x=o.positions,v=o.uvs,w=n.layerColorAlpha;for(let g=0;g<x.length;g+=2){const m=x[g],k=x[g+1];e[i]=c*m+f*k+p,e[i+1]=h*m+d*k+y,e[i+2]=v[g],e[i+3]=v[g+1],t[i+4]=w,t[i+5]=u,i+=6}}get vertexSize(){return this.renderable.view.geometry.positions.length/2}get indexSize(){return this.renderable.view.geometry.indices.length}}class jr{constructor(e,t){this.localUniforms=new j({uTransformMatrix:{value:new L,type:"mat3x3<f32>"},uColor:{value:new Float32Array([1,1,1,1]),type:"vec4<f32>"},uRound:{value:0,type:"f32"}}),this.localUniformsBindGroup=new oe({0:this.localUniforms}),this._renderableHash=Object.create(null),this._gpuBatchableMeshHash=Object.create(null),this.renderer=e,this._adaptor=t,this._adaptor.init()}validateRenderable(e){const t=this._getRenderableData(e),i=t.batched,s=e.view.batched;if(t.batched=s,i!==s)return!0;if(s){const n=e.view._geometry;if(n.indices.length!==t.indexSize||n.positions.length!==t.vertexSize)return t.indexSize=n.indices.length,t.vertexSize=n.positions.length,!0;const a=this._getBatchableMesh(e),o=e.view.texture;if(a.texture._source!==o._source&&a.texture._source!==o._source)return a.batcher.checkAndUpdateTexture(a,o)}return!1}addRenderable(e,t){const i=this.renderer.renderPipes.batch,{batched:s}=this._getRenderableData(e);if(s){const n=this._getBatchableMesh(e);n.texture=e.view._texture,i.addToBatch(n)}else i.break(t),t.add({renderPipeId:"mesh",renderable:e})}updateRenderable(e){if(e.view.batched){const t=this._gpuBatchableMeshHash[e.uid];t.texture=e.view._texture,t.batcher.updateElement(t)}}destroyRenderable(e){this._renderableHash[e.uid]=null;const t=this._gpuBatchableMeshHash[e.uid];G.return(t),this._gpuBatchableMeshHash[e.uid]=null}execute({renderable:e}){if(!e.isRenderable)return;const t=e.view;t.state.blendMode=e.layerBlendMode;const i=this.localUniforms;i.uniforms.uTransformMatrix=e.layerTransform,i.uniforms.uRound=this.renderer._roundPixels|e.view.roundPixels,i.update(),vt(e.layerColorAlpha,i.uniforms.uColor,0),this._adaptor.execute(this,e)}_getRenderableData(e){return this._renderableHash[e.uid]||this._initRenderableData(e)}_initRenderableData(e){const t=e.view;return this._renderableHash[e.uid]={batched:t.batched,indexSize:t._geometry.indices.length,vertexSize:t._geometry.positions.length},e.on("destroyed",()=>{this.destroyRenderable(e)}),this._renderableHash[e.uid]}_getBatchableMesh(e){return this._gpuBatchableMeshHash[e.uid]||this._initBatchableMesh(e)}_initBatchableMesh(e){const t=G.get(gn);return t.renderable=e,t.texture=e.view._texture,t.roundPixels=this.renderer._roundPixels|e.view.roundPixels,this._gpuBatchableMeshHash[e.uid]=t,t.renderable=e,t}destroy(){for(const e in this._gpuBatchableMeshHash)this._gpuBatchableMeshHash[e]&&G.return(this._gpuBatchableMeshHash[e]);this._gpuBatchableMeshHash=null,this._renderableHash=null,this.localUniforms=null,this.localUniformsBindGroup=null,this._adaptor.destroy(),this._adaptor=null,this.renderer=null}}jr.extension={type:[_.WebGLPipes,_.WebGPUPipes,_.CanvasPipes],name:"mesh"};class Tt{constructor(){this.vertexSize=4,this.indexSize=6,this.location=0,this.batcher=null,this.batch=null,this.roundPixels=0}get blendMode(){return this.renderable.layerBlendMode}packAttributes(e,t,i,s){const n=this.renderable,a=this.texture,o=n.layerTransform,l=o.a,u=o.b,c=o.c,h=o.d,f=o.tx,d=o.ty,p=this.bounds,y=p[1],x=p[0],v=p[3],w=p[2],g=a._layout.uvs,m=n.layerColorAlpha,k=s<<16|this.roundPixels&65535;e[i+0]=l*x+c*w+f,e[i+1]=h*w+u*x+d,e[i+2]=g.x0,e[i+3]=g.y0,t[i+4]=m,t[i+5]=k,e[i+6]=l*y+c*w+f,e[i+7]=h*w+u*y+d,e[i+8]=g.x1,e[i+9]=g.y1,t[i+10]=m,t[i+11]=k,e[i+12]=l*y+c*v+f,e[i+13]=h*v+u*y+d,e[i+14]=g.x2,e[i+15]=g.y2,t[i+16]=m,t[i+17]=k,e[i+18]=l*x+c*v+f,e[i+19]=h*v+u*x+d,e[i+20]=g.x3,e[i+21]=g.y3,t[i+22]=m,t[i+23]=k}packIndex(e,t,i){e[t]=i+0,e[t+1]=i+1,e[t+2]=i+2,e[t+3]=i+0,e[t+4]=i+2,e[t+5]=i+3}reset(){this.renderable=null,this.texture=null,this.batcher=null,this.batch=null,this.bounds=null}}let se;class Kr{constructor(e){this._gpuSpriteHash=Object.create(null),this._renderer=e,se=this._gpuSpriteHash}addRenderable(e,t){const i=this._getGpuSprite(e);e.view._didUpdate&&this._updateBatchableSprite(e,i),this._renderer.renderPipes.batch.addToBatch(i)}updateRenderable(e){const t=se[e.uid];e.view._didUpdate&&this._updateBatchableSprite(e,t),t.batcher.updateElement(t)}validateRenderable(e){const t=e.view._texture,i=this._getGpuSprite(e);return i.texture._source!==t._source?!i.batcher.checkAndUpdateTexture(i,t):!1}destroyRenderable(e){const t=se[e.uid];G.return(t),se[e.uid]=null}_updateBatchableSprite(e,t){const i=e.view;i._didUpdate=!1,t.bounds=i.bounds,t.texture=i._texture}_getGpuSprite(e){return se[e.uid]||this._initGPUSprite(e)}_initGPUSprite(e){const t=G.get(Tt);t.renderable=e;const i=e.view;return t.texture=i._texture,t.bounds=i.bounds,t.roundPixels=this._renderer._roundPixels|i.roundPixels,se[e.uid]=t,e.view._didUpdate=!1,e.on("destroyed",()=>{this.destroyRenderable(e)}),t}destroy(){for(const e in this._gpuSpriteHash)G.return(this._gpuSpriteHash[e]);this._gpuSpriteHash=null,this._renderer=null}}Kr.extension={type:[_.WebGLPipes,_.WebGPUPipes,_.CanvasPipes],name:"sprite"};class lt extends le{constructor({original:e,view:t}){super(),this.uid=H("renderable"),this.didViewUpdate=!1,this.view=t,e&&this.init(e)}init(e){this._original=e,this.layerTransform=e.layerTransform}get layerColorAlpha(){return this._original.layerColorAlpha}get layerColor(){return this._original.layerColor}get layerAlpha(){return this._original.layerAlpha}get layerBlendMode(){return this._original.layerBlendMode}get layerVisibleRenderable(){return this._original.layerVisibleRenderable}get isRenderable(){return this._original.isRenderable}}const er=new vi;class tr{constructor(e){this.uid=H("meshView"),this.renderPipeId="mesh",this.canBundle=!0,this.owner=ar,this.state=ue.for2d(),this.roundPixels=0,this.shader=e.shader,this.texture=e.texture??this.shader?.texture??z.WHITE,this._geometry=e.geometry,this._geometry.on("update",this.onUpdate,this)}set shader(e){this._shader!==e&&(this._shader=e,this.onUpdate())}get shader(){return this._shader}set geometry(e){this._geometry!==e&&(this._geometry?.off("update",this.onUpdate,this),e.on("update",this.onUpdate,this),this._geometry=e,this.onUpdate())}get geometry(){return this._geometry}set texture(e){this._texture!==e&&(this.shader&&(this.shader.texture=e),this._texture=e,this.onUpdate())}get texture(){return this._texture}get batched(){return this._shader?!1:this._geometry.batchMode==="auto"?this._geometry.positions.length/2<=100:this._geometry.batchMode==="batch"}addBounds(e){e.addVertexData(this.geometry.positions,0,this.geometry.positions.length)}containsPoint(e){const{x:t,y:i}=e,s=this.geometry.getBuffer("aPosition").data,n=er.points,a=this.geometry.getIndex().data,o=a.length,l=this.geometry.topology==="triangle-strip"?3:1;for(let u=0;u+2<o;u+=l){const c=a[u]*2,h=a[u+1]*2,f=a[u+2]*2;if(n[0]=s[c],n[1]=s[c+1],n[2]=s[h],n[3]=s[h+1],n[4]=s[f],n[5]=s[f+1],er.contains(t,i))return!0}return!1}onUpdate(){this.owner.onViewUpdate()}destroy(e=!1){if(typeof e=="boolean"?e:e?.texture){const i=typeof e=="boolean"?e:e?.textureSource;this._texture.destroy(i)}this._geometry?.off("update",this.onUpdate,this),this._texture=null,this._geometry=null,this._shader=null}}const Yr=class extends xt{constructor(...r){let e=r[0]??{};e instanceof Float32Array&&(or(lr,"use new MeshGeometry({ positions, uvs, indices }) instead"),e={positions:e,uvs:r[1],indices:r[2]}),e={...Yr.defaultOptions,...e};const t=e.positions||new Float32Array([0,0,1,0,1,1,0,1]),i=e.uvs||new Float32Array([0,0,1,0,1,1,0,1]),s=e.indices||new Uint32Array([0,1,2,0,2,3]),n=e.shrinkBuffersToFit,a=new Z({data:t,label:"attribute-mesh-positions",shrinkToFit:n,usage:F.VERTEX|F.COPY_DST}),o=new Z({data:i,label:"attribute-mesh-uvs",shrinkToFit:n,usage:F.VERTEX|F.COPY_DST}),l=new Z({data:s,label:"index-mesh-buffer",shrinkToFit:n,usage:F.INDEX|F.COPY_DST});super({attributes:{aPosition:{buffer:a,shaderLocation:0,format:"float32x2",stride:2*4,offset:0},aUV:{buffer:o,shaderLocation:1,format:"float32x2",stride:2*4,offset:0}},indexBuffer:l,topology:e.topology}),this.batchMode="auto"}get positions(){return this.attributes.aPosition.buffer.data}set positions(r){this.attributes.aPosition.buffer.data=r}get uvs(){return this.attributes.aUV.buffer.data}set uvs(r){this.attributes.aUV.buffer.data=r}get indices(){return this.indexBuffer.data}set indices(r){this.indexBuffer.data=r}};let Zr=Yr;Zr.defaultOptions={topology:"triangle-list",shrinkBuffersToFit:!1};class qr extends Zr{constructor(){super({positions:new Float32Array([0,0,1,0,1,1,0,1]),uvs:new Float32Array([0,0,1,0,1,1,0,1]),indices:new Uint32Array([0,1,2,0,2,3])})}}const _n={name:"tiling-bit",vertex:{header:`
            struct TilingUniforms {
                uMapCoord:mat3x3<f32>,
                uClampFrame:vec4<f32>,
                uClampOffset:vec2<f32>,
                uTextureTransform:mat3x3<f32>,
                uSizeAnchor:vec4<f32>
            };

            @group(2) @binding(0) var<uniform> tilingUniforms: TilingUniforms;
            @group(2) @binding(1) var uTexture: texture_2d<f32>;
            @group(2) @binding(2) var uSampler: sampler;
        `,main:`
            vUV = (tilingUniforms.uTextureTransform * vec3(aUV, 1.0)).xy;

            position = (position - tilingUniforms.uSizeAnchor.zw) * tilingUniforms.uSizeAnchor.xy;
        `},fragment:{header:`
            struct TilingUniforms {
                uMapCoord:mat3x3<f32>,
                uClampFrame:vec4<f32>,
                uClampOffset:vec2<f32>,
                uTextureTransform:mat3x3<f32>,
                uSizeAnchor:vec4<f32>
            };

            @group(2) @binding(0) var<uniform> tilingUniforms: TilingUniforms;
            @group(2) @binding(1) var uTexture: texture_2d<f32>;
            @group(2) @binding(2) var uSampler: sampler;
        `,main:`

            var coord = vUV + ceil(tilingUniforms.uClampOffset - vUV);
            coord = (tilingUniforms.uMapCoord * vec3(coord, 1.0)).xy;
            var unclamped = coord;
            coord = clamp(coord, tilingUniforms.uClampFrame.xy, tilingUniforms.uClampFrame.zw);

            var bias = 0.;

            if(unclamped.x == coord.x && unclamped.y == coord.y)
            {
                bias = -32.;
            } 

            outColor = textureSampleBias(uTexture, uSampler, coord, bias);
        `}},yn={name:"tiling-bit",vertex:{header:`
            uniform mat3 uTextureTransform;
            uniform vec4 uSizeAnchor;
        
        `,main:`
            vUV = (uTextureTransform * vec3(aUV, 1.0)).xy;

            position = (position - uSizeAnchor.zw) * uSizeAnchor.xy;
        `},fragment:{header:`
            uniform sampler2D uTexture;
            uniform mat3 uMapCoord;
            uniform vec4 uClampFrame;
            uniform vec2 uClampOffset;
        `,main:`

        vec2 coord = vUV + ceil(uClampOffset - vUV);
        coord = (uMapCoord * vec3(coord, 1.0)).xy;
        vec2 unclamped = coord;
        coord = clamp(coord, uClampFrame.xy, uClampFrame.zw);
        
        outColor = texture(uTexture, coord, unclamped == coord ? 0.0f : -32.0f);// lod-bias very negative to force lod 0
    
        `}};class bn extends pt{constructor(e){const t=_r({name:"tiling-sprite-shader",bits:[Re,_n,br]}),i=yr({name:"tiling-sprite-shader",bits:[Ts,yn,vr]}),s=new j({uMapCoord:{value:new L,type:"mat3x3<f32>"},uClampFrame:{value:new Float32Array([0,0,1,1]),type:"vec4<f32>"},uClampOffset:{value:new Float32Array([0,0]),type:"vec2<f32>"},uTextureTransform:{value:new L,type:"mat3x3<f32>"},uSizeAnchor:{value:new Float32Array([100,200,.5,.5]),type:"vec4<f32>"}});super({glProgram:i,gpuProgram:t,resources:{tilingUniforms:s,uTexture:e.texture.source,uSampler:e.texture.source.style}})}get texture(){return this._texture}set texture(e){this._texture!==e&&(this._texture=e,this.resources.uTexture=e.source,this.resources.uSampler=e.source.style)}}const vn=new qr;class Xr{constructor(e){this._renderableHash=Object.create(null),this._renderer=e}validateRenderable(e){const t=e.view.texture.textureMatrix;let i=!1;const s=this._getRenderableData(e);return s.batched!==t.isSimple&&(s.batched=t.isSimple,i=!0),i}addRenderable(e,t){e.view._didUpdate&&(e.view._didUpdate=!1,this._rebuild(e));const{batched:i}=this._getRenderableData(e);if(i){const s=this._getBatchedTilingSprite(e);this._renderer.renderPipes.mesh.addRenderable(s,t)}else{const s=this._getGpuTilingSprite(e);this._renderer.renderPipes.mesh.addRenderable(s.meshRenderable,t)}}updateRenderable(e){e.view._didUpdate&&(e.view._didUpdate=!1,this._rebuild(e));const{batched:t}=this._getRenderableData(e);if(t){const i=this._getBatchedTilingSprite(e);this._renderer.renderPipes.mesh.updateRenderable(i)}else{const i=this._getGpuTilingSprite(e);this._renderer.renderPipes.mesh.updateRenderable(i.meshRenderable)}}destroyRenderable(e){const t=this._renderableHash[e.uid];t.batchedMesh?.view.destroy(),t.gpuTilingSprite?.meshRenderable.view.destroy(),this._renderableHash[e.uid]=null,e.off("destroyed",this.destroyRenderable,this)}_getRenderableData(e){return this._renderableHash[e.uid]||this._initRenderableData(e)}_initRenderableData(e){const t={batched:!0,renderable:e};return this._renderableHash[e.uid]=t,this.validateRenderable(e),e.on("destroyed",()=>{this.destroyRenderable(e)}),t}_rebuild(e){const t=this._getRenderableData(e),i=e.view,s=i.texture.textureMatrix;if(t.batched){const n=this._getBatchedTilingSprite(e);n.view.texture=i.texture;const a=i.texture.source.style;a.addressMode!=="repeat"&&(a.addressMode="repeat",a.update()),this._updateBatchPositions(e),this._updateBatchUvs(e)}else{const n=this._getGpuTilingSprite(e),{meshRenderable:a}=n,o=a.view;o.shader.texture=i.texture;const l=o.shader.resources.tilingUniforms,u=i.width,c=i.height,h=i.texture.width,f=i.texture.height,d=i._tileTransform.matrix,p=l.uniforms.uTextureTransform;p.set(d.a*h/u,d.b*h/c,d.c*f/u,d.d*f/c,d.tx/u,d.ty/c),p.invert(),l.uniforms.uMapCoord=s.mapCoord,l.uniforms.uClampFrame=s.uClampFrame,l.uniforms.uClampOffset=s.uClampOffset,l.uniforms.uTextureTransform=p,l.uniforms.uSizeAnchor[0]=u,l.uniforms.uSizeAnchor[1]=c,l.uniforms.uSizeAnchor[2]=e.view.anchor.x,l.uniforms.uSizeAnchor[3]=e.view.anchor.y,l.update()}}_getGpuTilingSprite(e){return this._renderableHash[e.uid].gpuTilingSprite||this._initGpuTilingSprite(e)}_initGpuTilingSprite(e){const t=e.view,i=t.texture.source.style;i.addressMode="repeat",i.update();const s=new tr({geometry:vn,shader:new bn({texture:t.texture})}),n=new lt({original:e,view:s}),a=new L,o={meshRenderable:n,textureMatrix:a};return this._renderableHash[e.uid].gpuTilingSprite=o,o}_getBatchedTilingSprite(e){return this._renderableHash[e.uid].batchedMesh||this._initBatchedTilingSprite(e)}_initBatchedTilingSprite(e){const t=new tr({geometry:new qr,texture:e.view.texture});t.roundPixels=this._renderer._roundPixels|e.view.roundPixels;const i=new lt({original:e,view:t});return this._renderableHash[e.uid].batchedMesh=i,i}_updateBatchPositions(e){const t=this._getBatchedTilingSprite(e),i=e.view,n=t.view.geometry.getBuffer("aPosition").data,a=i.anchor.x,o=i.anchor.y;n[0]=-a*i.width,n[1]=-o*i.height,n[2]=(1-a)*i.width,n[3]=-o*i.height,n[4]=(1-a)*i.width,n[5]=(1-o)*i.height,n[6]=-a*i.width,n[7]=(1-o)*i.height}_updateBatchUvs(e){const t=e.view,i=t.texture.frameWidth,s=t.texture.frameHeight,o=this._getBatchedTilingSprite(e).view.geometry.getBuffer("aUV").data;let l=0,u=0;t._applyAnchorToTexture&&(l=t.anchor.x,u=t.anchor.y),o[0]=o[6]=-l,o[2]=o[4]=1-l,o[1]=o[3]=-u,o[5]=o[7]=1-u;const c=L.shared;c.copyFrom(t._tileTransform.matrix),c.tx/=t.width,c.ty/=t.height,c.invert(),c.scale(t.width/i,t.height/s),Tn(o,2,0,c)}destroy(){for(const e in this._renderableHash)this.destroyRenderable(this._renderableHash[e].renderable);this._renderableHash=null,this._renderer=null}}Xr.extension={type:[_.WebGLPipes,_.WebGPUPipes,_.CanvasPipes],name:"tilingSprite"};function Tn(r,e,t,i){let s=0;const n=r.length/(e||2),a=i.a,o=i.b,l=i.c,u=i.d,c=i.tx,h=i.ty;for(t*=e;s<n;){const f=r[t],d=r[t+1];r[t]=a*f+l*d+c,r[t+1]=o*f+u*d+h,t+=e,s++}}class wn{constructor(e){this.uid=H("graphicsView"),this.canBundle=!0,this.owner=ar,this.renderPipeId="graphics",this.roundPixels=0,e?this._context=e:this._context=this._ownedContext=new Ti,this._context.on("update",this.onGraphicsContextUpdate,this)}set context(e){e!==this._context&&(this._context.off("update",this.onGraphicsContextUpdate,this),this._context=e,this._context.on("update",this.onGraphicsContextUpdate,this),this.onGraphicsContextUpdate())}get context(){return this._context}addBounds(e){e.addBounds(this._context.bounds)}containsPoint(e){return this._context.containsPoint(e)}onGraphicsContextUpdate(){this._didUpdate=!0,this.owner.onViewUpdate()}destroy(e){this.owner=null,this._ownedContext&&e===!1?this._ownedContext.destroy(e):(e===!0||e?.context===!0)&&this._context.destroy(e),this._ownedContext=null,this._context=null}}const Sn={name:"local-uniform-msdf-bit",vertex:{header:`
            struct LocalUniforms {
                uColor:vec4<f32>,
                uTransformMatrix:mat3x3<f32>,
                uDistance: f32,
                uRound:f32,
            }

            @group(2) @binding(0) var<uniform> localUniforms : LocalUniforms;
        `,main:`
            vColor *= localUniforms.uColor;
            modelMatrix *= localUniforms.uTransformMatrix;
        `,end:`
            if(localUniforms.uRound == 1)
            {
                vPosition = vec4(roundPixels(vPosition.xy, globalUniforms.uResolution), vPosition.zw);
            }
        `},fragment:{header:`
            struct LocalUniforms {
                uColor:vec4<f32>,
                uTransformMatrix:mat3x3<f32>,
                uDistance: f32
            }

            @group(2) @binding(0) var<uniform> localUniforms : LocalUniforms;
         `,main:` 
            outColor = vColor * calculateMSDFAlpha(outColor, localUniforms.uDistance);
        `}},Cn={name:"local-uniform-msdf-bit",vertex:{header:`
            uniform mat3 uTransformMatrix;
            uniform vec4 uColor;
            uniform float uRound;
        `,main:`
            vColor *= uColor;
            modelMatrix *= uTransformMatrix;
        `,end:`
            if(uRound == 1.)
            {
                gl_Position.xy = roundPixels(gl_Position.xy, uResolution);
            }
        `},fragment:{header:`
            uniform float uDistance;
         `,main:` 
            outColor = vColor * calculateMSDFAlpha(outColor, uDistance);
        `}},Pn={name:"msdf-bit",fragment:{header:`
            fn calculateMSDFAlpha(msdfColor:vec4<f32>, distance:f32) -> f32 {
                
                // MSDF
                var median = msdfColor.r + msdfColor.g + msdfColor.b -
                    min(msdfColor.r, min(msdfColor.g, msdfColor.b)) -
                    max(msdfColor.r, max(msdfColor.g, msdfColor.b));
            
                // SDF
                median = min(median, msdfColor.a);

                var screenPxDistance = distance * (median - 0.5);
                var alpha = clamp(screenPxDistance + 0.5, 0.0, 1.0);
                if (median < 0.01) {
                    alpha = 0.0;
                } else if (median > 0.99) {
                    alpha = 1.0;
                }

                return alpha;
            }
        `}},Mn={name:"msdf-bit",fragment:{header:`
            float calculateMSDFAlpha(vec4 msdfColor, float distance) {
                
                // MSDF
                float median = msdfColor.r + msdfColor.g + msdfColor.b -
                                min(msdfColor.r, min(msdfColor.g, msdfColor.b)) -
                                max(msdfColor.r, max(msdfColor.g, msdfColor.b));
               
                // SDF
                median = min(median, msdfColor.a);
            
                float screenPxDistance = distance * (median - 0.5);
                float alpha = clamp(screenPxDistance + 0.5, 0.0, 1.0);
           
                if (median < 0.01) {
                    alpha = 0.0;
                } else if (median > 0.99) {
                    alpha = 1.0;
                }

                return alpha;
            }
        `}};class Bn extends pt{constructor(){const e=new j({uColor:{value:new Float32Array([1,1,1,1]),type:"vec4<f32>"},uTransformMatrix:{value:new L,type:"mat3x3<f32>"},uDistance:{value:4,type:"f32"},uRound:{value:0,type:"f32"}}),t=_r({name:"sdf-shader",bits:[us,fs(te),Sn,Pn,br]}),i=yr({name:"sdf-shader",bits:[cs,xs(te),Cn,Mn,vr]});super({glProgram:i,gpuProgram:t,resources:{localUniforms:e,batchSamplers:ms}})}}class kn extends lt{constructor(){super({view:new wn})}}class Qr{constructor(e){this._gpuBitmapText={},this._renderer=e}validateRenderable(e){const t=this._getGpuBitmapText(e);return e.view._didUpdate&&(e.view._didUpdate=!1,this._updateContext(e,t.view.context)),this._renderer.renderPipes.graphics.validateRenderable(t)}addRenderable(e,t){const i=this._getGpuBitmapText(e);e.view._didUpdate&&(e.view._didUpdate=!1,this._updateContext(e,i.view.context)),this._renderer.renderPipes.graphics.addRenderable(i,t),i.view.context.customShader&&this._updateDistanceField(e)}destroyRenderable(e){this._destroyRenderableByUid(e.uid)}_destroyRenderableByUid(e){G.return(this._gpuBitmapText[e]),this._gpuBitmapText[e]=null}updateRenderable(e){const t=this._getGpuBitmapText(e);this._renderer.renderPipes.graphics.updateRenderable(t),t.view.context.customShader&&this._updateDistanceField(e)}_updateContext(e,t){const i=e.view,s=wi.getFont(i.text,i._style);t.clear(),s.distanceField.type!=="none"&&(t.customShader||(this._sdfShader||(this._sdfShader=new Bn),t.customShader=this._sdfShader));const n=Array.from(i.text),a=i._style;let o=(a._stroke?.width||0)/2;o+=s.baseLineOffset;const l=Si(n,a,s);let u=0;const c=a.padding,h=l.scale;t.translate(-i.anchor._x*l.width-c,-i.anchor._y*(l.height+l.offsetY)-c).scale(h,h);const f=a._fill.color;for(let d=0;d<l.lines.length;d++){const p=l.lines[d];for(let y=0;y<p.charPositions.length;y++){const x=n[u++],v=s.chars[x];v?.texture&&t.texture(v.texture,f,Math.round(p.charPositions[y]+v.xOffset),Math.round(o+v.yOffset))}o+=s.lineHeight}}_getGpuBitmapText(e){return this._gpuBitmapText[e.uid]||this._initGpuText(e)}_initGpuText(e){const t=G.get(kn,e);return this._gpuBitmapText[e.uid]=t,t.view.roundPixels=this._renderer._roundPixels|e.view.roundPixels,this._updateContext(e,t.view.context),e.on("destroyed",()=>{this.destroyRenderable(e)}),this._gpuBitmapText[e.uid]}_updateDistanceField(e){const t=this._getGpuBitmapText(e).view.context,i=e.view,s=i._style.fontFamily,n=Ci.get(`${s}-bitmap`),{a,b:o,c:l,d:u}=e.layerTransform,c=Math.sqrt(a*a+o*o),h=Math.sqrt(l*l+u*u),f=(Math.abs(c)+Math.abs(h))/2,d=n.baseRenderedFontSize/i._style.fontSize,p=i.resolution??this._renderer.resolution,y=f*n.distanceField.range*(1/d)*p;t.customShader.resources.localUniforms.uniforms.uDistance=y}destroy(){for(const e in this._gpuBitmapText)this._destroyRenderableByUid(e);this._gpuBitmapText=null,this._sdfShader?.destroy(!0),this._sdfShader=null,this._renderer=null}}Qr.extension={type:[_.WebGLPipes,_.WebGPUPipes,_.CanvasPipes],name:"bitmapText"};class Jr{constructor(e){this._gpuText=Object.create(null),this._renderer=e}validateRenderable(e){const t=this._getGpuText(e),i=e.view._getKey();if(t.currentKey!==i){const s=e.view,n=s.resolution??this._renderer.resolution,{width:a,height:o}=this._renderer.canvasText.getTextureSize(s.text,n,s._style);return!(this._renderer.canvasText.getReferenceCount(t.currentKey)===1&&a===t.texture._source.width&&o===t.texture._source.height)}return!1}addRenderable(e,t){const s=this._getGpuText(e).batchableSprite;e.view._didUpdate&&this._updateText(e),this._renderer.renderPipes.batch.addToBatch(s)}updateRenderable(e){const i=this._getGpuText(e).batchableSprite;e.view._didUpdate&&this._updateText(e),i.batcher.updateElement(i)}destroyRenderable(e){this._destroyRenderableById(e.uid)}_destroyRenderableById(e){const t=this._gpuText[e];this._renderer.canvasText.decreaseReferenceCount(t.currentKey),G.return(t.batchableSprite),this._gpuText[e]=null}_updateText(e){const t=e.view._getKey(),i=this._getGpuText(e),s=i.batchableSprite;i.currentKey!==t&&this._updateGpuText(e),e.view._didUpdate=!1;const n=e.view._style.padding;rt(s.bounds,e.view.anchor,s.texture,n)}_updateGpuText(e){const t=this._getGpuText(e),i=t.batchableSprite,s=e.view;t.texture&&this._renderer.canvasText.decreaseReferenceCount(t.currentKey);const n=s.resolution??this._renderer.resolution;t.texture=i.texture=this._renderer.canvasText.getTexture(s.text,n,s._style,s._getKey()),t.currentKey=s._getKey(),i.texture=t.texture}_getGpuText(e){return this._gpuText[e.uid]||this._initGpuText(e)}_initGpuText(e){const t={texture:null,currentKey:"--",batchableSprite:G.get(Tt)};return t.batchableSprite.renderable=e,t.batchableSprite.bounds=[0,1,0,0],t.batchableSprite.roundPixels=this._renderer._roundPixels|e.view.roundPixels,this._gpuText[e.uid]=t,this._updateText(e),e.on("destroyed",()=>{this.destroyRenderable(e)}),t}destroy(){for(const e in this._gpuText)this._destroyRenderableById(e);this._gpuText=null,this._renderer=null}}Jr.extension={type:[_.WebGLPipes,_.WebGPUPipes,_.CanvasPipes],name:"text"};class ei{constructor(){this._activeTextures={}}getTextureSize(e,t,i){const s=ie.measureText(e||" ",i);let n=Math.ceil(Math.ceil(Math.max(1,s.width)+i.padding*2)*t),a=Math.ceil(Math.ceil(Math.max(1,s.height)+i.padding*2)*t);return n=Math.ceil(n-1e-6),a=Math.ceil(a-1e-6),n=Ft(n),a=Ft(a),{width:n,height:a}}getTexture(e,t,i,s){if(this._activeTextures[s])return this._increaseReferenceCount(s),this._activeTextures[s].texture;const n=ie.measureText(e||" ",i),a=Math.ceil(Math.ceil(Math.max(1,n.width)+i.padding*2)*t),o=Math.ceil(Math.ceil(Math.max(1,n.height)+i.padding*2)*t),l=Gt.getOptimalCanvasAndContext(a,o),{canvas:u}=l;this.renderTextToCanvas(e,i,t,l);const c=Pi(u,a,o,t);return this._activeTextures[s]={canvasAndContext:l,texture:c,usageCount:1},c}_increaseReferenceCount(e){this._activeTextures[e].usageCount++}decreaseReferenceCount(e){const t=this._activeTextures[e];if(t.usageCount--,t.usageCount===0){Gt.returnCanvasAndContext(t.canvasAndContext),N.returnTexture(t.texture);const i=t.texture.source;i.resource=null,i.uploadMethodId="unknown",i.alphaMode="no-premultiply-alpha",this._activeTextures[e]=null}}getReferenceCount(e){return this._activeTextures[e].usageCount}renderTextToCanvas(e,t,i,s){const{canvas:n,context:a}=s,o=Mi(t),l=ie.measureText(e||" ",t),u=l.lines,c=l.lineHeight,h=l.lineWidths,f=l.maxLineWidth,d=l.fontProperties,p=n.height;if(a.resetTransform(),a.scale(i,i),a.clearRect(0,0,l.width+4,l.height+4),t._stroke?.width){const w=t._stroke;a.lineWidth=w.width,a.miterLimit=w.miterLimit,a.lineJoin=w.join,a.lineCap=w.cap}a.font=o;let y,x;const v=t.dropShadow?2:1;for(let w=0;w<v;++w){const g=t.dropShadow&&w===0,m=g?Math.ceil(Math.max(1,p)+t.padding*2):0,k=m*i;if(g){a.fillStyle="black",a.strokeStyle="black";const B=t.dropShadow,T=B.color,b=B.alpha;a.shadowColor=dt.shared.setValue(T).setAlpha(b).toRgbaString();const O=B.blur*i,W=B.distance*i;a.shadowBlur=O,a.shadowOffsetX=Math.cos(B.angle)*W,a.shadowOffsetY=Math.sin(B.angle)*W+k}else a.globalAlpha=t._fill?.alpha??1,a.fillStyle=t._fill?Dt(t._fill,a):null,t._stroke?.width&&(a.strokeStyle=Dt(t._stroke,a)),a.shadowColor="black";let A=(c-d.fontSize)/2;c-d.fontSize<0&&(A=0);const R=t._stroke?.width??0;for(let B=0;B<u.length;B++)y=R/2,x=R/2+B*c+d.ascent+A,t.align==="right"?y+=f-h[B]:t.align==="center"&&(y+=(f-h[B])/2),t._stroke&&this._drawLetterSpacing(u[B],t,s,y+t.padding,x+t.padding-m,!0),t._fill!==void 0&&this._drawLetterSpacing(u[B],t,s,y+t.padding,x+t.padding-m)}}_drawLetterSpacing(e,t,i,s,n,a=!1){const{context:o}=i,l=t.letterSpacing;let u=!1;if(ie.experimentalLetterSpacingSupported&&(ie.experimentalLetterSpacing?(o.letterSpacing=`${l}px`,o.textLetterSpacing=`${l}px`,u=!0):(o.letterSpacing="0px",o.textLetterSpacing="0px")),l===0||u){a?o.strokeText(e,s,n):o.fillText(e,s,n);return}let c=s;const h=ie.graphemeSegmenter(e);let f=o.measureText(e).width,d=0;for(let p=0;p<h.length;++p){const y=h[p];a?o.strokeText(y,c,n):o.fillText(y,c,n);let x="";for(let v=p+1;v<h.length;++v)x+=h[v];d=o.measureText(x).width,c+=f-d+l,f=d}}destroy(){this._activeTextures=null}}ei.extension={type:[_.WebGLSystem,_.WebGPUSystem,_.CanvasSystem],name:"canvasText"};class ti{constructor(e){this._gpuText=Object.create(null),this._renderer=e}validateRenderable(e){const t=this._getGpuText(e),i=e.view._getKey();return t.textureNeedsUploading?(t.textureNeedsUploading=!1,!0):t.currentKey!==i}addRenderable(e){const i=this._getGpuText(e).batchableSprite;e.view._didUpdate&&this._updateText(e),this._renderer.renderPipes.batch.addToBatch(i)}updateRenderable(e){const i=this._getGpuText(e).batchableSprite;e.view._didUpdate&&this._updateText(e),i.batcher.updateElement(i)}destroyRenderable(e){this._destroyRenderableById(e.uid)}_destroyRenderableById(e){const t=this._gpuText[e];this._renderer.htmlText.decreaseReferenceCount(t.currentKey),G.return(t.batchableSprite),this._gpuText[e]=null}_updateText(e){const t=e.view._getKey(),i=this._getGpuText(e),s=i.batchableSprite;i.currentKey!==t&&this._updateGpuText(e).catch(a=>{console.error(a)}),e.view._didUpdate=!1;const n=e.view._style.padding;rt(s.bounds,e.view.anchor,s.texture,n)}async _updateGpuText(e){e.view._didUpdate=!1;const t=this._getGpuText(e);if(t.generatingTexture)return;const i=e.view._getKey();this._renderer.htmlText.decreaseReferenceCount(t.currentKey),t.generatingTexture=!0,t.currentKey=i;const s=e.view,n=s.resolution??this._renderer.resolution,a=await this._renderer.htmlText.getManagedTexture(s.text,n,s._style,s._getKey()),o=t.batchableSprite;o.texture=t.texture=a,t.generatingTexture=!1,t.textureNeedsUploading=!0,e.view.onUpdate();const l=e.view._style.padding;rt(o.bounds,e.view.anchor,o.texture,l)}_getGpuText(e){return this._gpuText[e.uid]||this._initGpuText(e)}_initGpuText(e){const t={texture:z.EMPTY,currentKey:"--",batchableSprite:G.get(Tt),textureNeedsUploading:!1,generatingTexture:!1},i=t.batchableSprite;return i.renderable=e,i.texture=z.EMPTY,i.bounds=[0,1,0,0],i.roundPixels=this._renderer._roundPixels|e.view.roundPixels,this._gpuText[e.uid]=t,e.on("destroyed",()=>{this.destroyRenderable(e)}),t}destroy(){for(const e in this._gpuText)this._destroyRenderableById(e);this._gpuText=null,this._renderer=null}}ti.extension={type:[_.WebGLPipes,_.WebGPUPipes,_.CanvasPipes],name:"htmlText"};const ri=class{constructor(){this.clearBeforeRender=!0,this._backgroundColor=new dt(0),this.color=this._backgroundColor,this.alpha=1}init(r){r={...ri.defaultOptions,...r},this.clearBeforeRender=r.clearBeforeRender,this.color=r.background||r.backgroundColor||this._backgroundColor,this.alpha=r.backgroundAlpha,this._backgroundColor.setAlpha(r.backgroundAlpha)}get color(){return this._backgroundColor}set color(r){this._backgroundColor.setValue(r)}get alpha(){return this._backgroundColor.alpha}set alpha(r){this._backgroundColor.setAlpha(r)}get colorRgba(){return this._backgroundColor.toArray()}destroy(){}};let wt=ri;wt.extension={type:[_.WebGLSystem,_.WebGPUSystem,_.CanvasSystem],name:"background",priority:0};wt.defaultOptions={backgroundAlpha:1,backgroundColor:0,clearBeforeRender:!0};const ye={};ur.handle(_.BlendMode,r=>{if(!r.name)throw new Error("BlendMode extension must have a name property");ye[r.name]=r.ref},r=>{delete ye[r.name]});class ii{constructor(e){this._isAdvanced=!1,this._filterHash=Object.create(null),this._renderer=e}setBlendMode(e,t,i){if(this._activeBlendMode===t){this._isAdvanced&&this._renderableList.push(e);return}this._activeBlendMode=t,this._isAdvanced&&this._endAdvancedBlendMode(i),this._isAdvanced=!!ye[t],this._isAdvanced&&(this._beginAdvancedBlendMode(i),this._renderableList.push(e))}_beginAdvancedBlendMode(e){this._renderer.renderPipes.batch.break(e);const t=this._activeBlendMode;if(!ye[t]){ct(`Unable to assign 'BLEND_MODES.${t}' using the blend mode pipeline`);return}this._filterHash[t]||(this._filterHash[t]=new nr({filters:[new ye[t]]}));const i={renderPipeId:"filter",action:"pushFilter",renderables:[],filterEffect:this._filterHash[t],canBundle:!1};this._renderableList=i.renderables,e.add(i)}_endAdvancedBlendMode(e){this._renderableList=null,this._renderer.renderPipes.batch.break(e),e.add({renderPipeId:"filter",action:"popFilter",canBundle:!1})}buildStart(){this._isAdvanced=!1}buildEnd(e){this._isAdvanced&&this._endAdvancedBlendMode(e)}destroy(){this._renderer=null,this._renderableList=null;for(const e in this._filterHash)this._filterHash[e].destroy();this._filterHash=null}}ii.extension={type:[_.WebGLPipes,_.WebGPUPipes,_.CanvasPipes],name:"blendMode"};const si=class{constructor(r){this._renderer=r}_normalizeOptions(r,e={}){return r instanceof _e||r instanceof z?{target:r,...e}:{...e,...r}}async image(r){const e=new Image;return e.src=await this.base64(r),e}async base64(r){r=this._normalizeOptions(r,si.defaultImageOptions);const{format:e,quality:t}=r,i=this.canvas(r);if(i.toBlob!==void 0)return new Promise((s,n)=>{i.toBlob(a=>{if(!a){n(new Error("ICanvas.toBlob failed!"));return}const o=new FileReader;o.onload=()=>s(o.result),o.onerror=n,o.readAsDataURL(a)},e,t)});if(i.toDataURL!==void 0)return i.toDataURL(e,t);if(i.convertToBlob!==void 0){const s=await i.convertToBlob({type:e,quality:t});return new Promise((n,a)=>{const o=new FileReader;o.onload=()=>n(o.result),o.onerror=a,o.readAsDataURL(s)})}throw new Error("Extract.base64() requires ICanvas.toDataURL, ICanvas.toBlob, or ICanvas.convertToBlob to be implemented")}canvas(r){r=this._normalizeOptions(r);const e=r.target,t=this._renderer,i=e instanceof z?e:t.textureGenerator.generateTexture(r),s=t.texture.generateCanvas(i);return e instanceof _e&&i.destroy(),s}pixels(r){r=this._normalizeOptions(r);const e=r.target,t=this._renderer,i=e instanceof z?e:t.textureGenerator.generateTexture(r),s=t.texture.getPixels(i);return e instanceof _e&&i.destroy(),s}texture(r){return r=this._normalizeOptions(r),r.target instanceof z?r.target:this._renderer.textureGenerator.generateTexture(r)}download(r){r=this._normalizeOptions(r);const e=this.canvas(r),t=document.createElement("a");t.download=r.filename??"image.png",t.href=e.toDataURL("image/png"),document.body.appendChild(t),t.click(),document.body.removeChild(t)}log(r){const e=r.width??200;r=this._normalizeOptions(r);const t=this.canvas(r),i=t.toDataURL();console.log(`[Pixi Texture] ${t.width}px ${t.height}px`);const s=["font-size: 1px;",`padding: ${e}px 300px;`,`background: url(${i}) no-repeat;`,"background-size: contain;"].join(" ");console.log("%c ",s)}destroy(){this._renderer=null}};let St=si;St.extension={type:[_.WebGLSystem,_.WebGPUSystem],name:"extract"};St.defaultImageOptions={format:"png",quality:1};class Rn extends z{static create(e){return new z({source:new ge(e)})}resize(e,t,i){return this.source.resize(e,t,i),this}}const Un=new ae,An=new ht,Gn=[0,0,0,0];class ni{constructor(e){this._renderer=e}generateTexture(e){e instanceof _e&&(e={target:e,frame:void 0,textureSourceOptions:{},resolution:void 0});const t=e.resolution||this._renderer.resolution,i=e.target;let s=e.clearColor;s?s=Array.isArray(s)&&s.length===4?s:dt.shared.setValue(s).toArray():s=Gn;const n=e.frame?.copyTo(Un)||Bi(i,An).rectangle;n.width=Math.max(n.width,1/t)|0,n.height=Math.max(n.height,1/t)|0;const a=Rn.create({...e.textureSourceOptions,width:n.width,height:n.height,resolution:t}),o=L.shared.translate(-n.x,-n.y);return this._renderer.render({container:i,transform:o,target:a,clearColor:s}),a}destroy(){this._renderer=null}}ni.extension={type:[_.WebGLSystem,_.WebGPUSystem],name:"textureGenerator"};class ai{constructor(e){this._stackIndex=0,this._globalUniformDataStack=[],this._uniformsPool=[],this._activeUniforms=[],this._bindGroupPool=[],this._activeBindGroups=[],this._renderer=e}reset(){this._stackIndex=0;for(let e=0;e<this._activeUniforms.length;e++)this._uniformsPool.push(this._activeUniforms[e]);for(let e=0;e<this._activeBindGroups.length;e++)this._bindGroupPool.push(this._activeBindGroups[e]);this._activeUniforms.length=0,this._activeBindGroups.length=0}start(e){this.reset(),this.push(e)}bind({size:e,projectionMatrix:t,worldTransformMatrix:i,worldColor:s,offset:n}){const a=this._renderer.renderTarget.renderTarget,o=this._stackIndex?this._globalUniformDataStack[this._stackIndex-1]:{projectionData:a,worldTransformMatrix:new L,worldColor:4294967295,offset:new Ue},l={projectionMatrix:t||this._renderer.renderTarget.projectionMatrix,resolution:e||a.size,worldTransformMatrix:i||o.worldTransformMatrix,worldColor:s||o.worldColor,offset:n||o.offset,bindGroup:null},u=this._uniformsPool.pop()||this._createUniforms();this._activeUniforms.push(u);const c=u.uniforms;c.projectionMatrix=l.projectionMatrix,c.uResolution=l.resolution,c.worldTransformMatrix.copyFrom(l.worldTransformMatrix),c.worldTransformMatrix.tx-=l.offset.x,c.worldTransformMatrix.ty-=l.offset.y,vt(l.worldColor,c.worldColorAlpha,0),u.update();let h;this._renderer.renderPipes.uniformBatch?h=this._renderer.renderPipes.uniformBatch.getUniformBindGroup(u,!1):(this._renderer.uniformBuffer.updateUniformGroup(u),h=this._bindGroupPool.pop()||new oe,this._activeBindGroups.push(h),h.setResource(u,0)),l.bindGroup=h,this._currentGlobalUniformData=l}push(e){this.bind(e),this._globalUniformDataStack[this._stackIndex++]=this._currentGlobalUniformData}pop(){this._currentGlobalUniformData=this._globalUniformDataStack[--this._stackIndex-1]}get bindGroup(){return this._currentGlobalUniformData.bindGroup}get uniformGroup(){return this._currentGlobalUniformData.bindGroup.resources[0]}_createUniforms(){return new j({projectionMatrix:{value:new L,type:"mat3x3<f32>"},worldTransformMatrix:{value:new L,type:"mat3x3<f32>"},worldColorAlpha:{value:new Float32Array(4),type:"vec4<f32>"},uResolution:{value:[0,0],type:"vec2<f32>"}},{ubo:!0,isStatic:!0})}destroy(){this._renderer=null}}ai.extension={type:[_.WebGLSystem,_.WebGPUSystem,_.CanvasSystem],name:"globalUniforms"};const oi={f32:4,"vec2<f32>":8,"vec3<f32>":12,"vec4<f32>":16,"mat2x2<f32>":16*3,"mat3x3<f32>":16*3,"mat4x4<f32>":16*4};function Dn(r){const e=r.map(n=>({data:n,offset:0,size:0}));let t=0,i=0,s=0;for(let n=0;n<e.length;n++){const a=e[n];if(t=oi[a.data.type],!t)throw new Error(`Unknown type ${a.data.type}`);if(a.data.size>1&&(t=Math.max(t,16)*a.data.size),a.size=t,i%t!==0&&i<16){const o=i%t%16;i+=o,s+=o}i+t>16?(s=Math.ceil(s/16)*16,a.offset=s,s+=t,i=t):(a.offset=s,i+=t,s+=t)}return s=Math.ceil(s/16)*16,{uboElements:e,size:s}}const et=[{type:"mat3x3<f32>",test:r=>r.value.a!==void 0,code:r=>`
                var ${r}_matrix = uv.${r}.toArray(true);

                data[offset] = ${r}_matrix[0];
                data[offset+1] = ${r}_matrix[1];
                data[offset+2] = ${r}_matrix[2];

                data[offset + 4] = ${r}_matrix[3];
                data[offset + 5] = ${r}_matrix[4];
                data[offset + 6] = ${r}_matrix[5];

                data[offset + 8] = ${r}_matrix[6];
                data[offset + 9] = ${r}_matrix[7];
                data[offset + 10] = ${r}_matrix[8];
            `},{type:"vec4<f32>",test:r=>r.type==="vec4<f32>"&&r.size===1&&r.value.width!==void 0,code:r=>`
                        v = uv.${r};

                        data[offset] = v.x;
                        data[offset+1] = v.y;
                        data[offset+2] = v.width;
                        data[offset+3] = v.height;
                    `},{type:"vec2<f32>",test:r=>r.type==="vec2<f32>"&&r.size===1&&r.value.x!==void 0,code:r=>`
                    v = uv.${r};

                    data[offset] = v.x;
                    data[offset+1] = v.y;
                `}],Fn={f32:`
        data[offset] = v;
    `,"vec2<f32>":`
        data[offset] = v[0];
        data[offset+1] = v[1];
    `,"vec3<f32>":`
        data[offset] = v[0];
        data[offset+1] = v[1];
        data[offset+2] = v[2];

    `,"vec4<f32>":`
        data[offset] = v[0];
        data[offset+1] = v[1];
        data[offset+2] = v[2];
        data[offset+3] = v[3];
    `,"mat2x2<f32>":`
        data[offset] = v[0];
        data[offset+1] = v[1];

        data[offset+4] = v[2];
        data[offset+5] = v[3];
    `,"mat3x3<f32>":`
        data[offset] = v[0];
        data[offset+1] = v[1];
        data[offset+2] = v[2];

        data[offset + 4] = v[3];
        data[offset + 5] = v[4];
        data[offset + 6] = v[5];

        data[offset + 8] = v[6];
        data[offset + 9] = v[7];
        data[offset + 10] = v[8];
    `,"mat4x4<f32>":`
        for(var i = 0; i < 16; i++)
        {
            data[offset + i] = v[i];
        }
    `};function In(r){const e=[`
        var v = null;
        var v2 = null;
        var t = 0;
        var index = 0;
    `];let t=0;for(let s=0;s<r.length;s++){const n=r[s],a=n.data.name;let o=!1,l=0;for(let u=0;u<et.length;u++)if(et[u].test(n.data)){l=n.offset/4,e.push(`offset += ${l-t};`,et[u].code(a)),o=!0;break}if(!o)if(n.data.size>1){const u=Math.max(oi[n.data.type]/16,1),c=n.data.value.length/n.data.size,h=(4-c%4)%4;l=n.offset/4,e.push(`
                    v = uv.${a};
                    offset += ${l-t};

                    let arrayOffset = offset;
                    
                    t = 0;

                    for(var i=0; i < ${n.data.size*u}; i++)
                    {
                        for(var j = 0; j < ${c}; j++)
                        {
                            data[arrayOffset++] = v[t++];
                        }
                        ${h!==0?"arrayOffset += ${remainder};":""}
                    }
                `)}else{const u=Fn[n.data.type];l=n.offset/4,e.push(`
                    v = uv.${a};
                    offset += ${l-t};
                    ${u};
                `)}t=l}const i=e.join(`
`);return new Function("uv","data","offset",i)}class li{constructor(){this._syncFunctionHash=Object.create(null)}ensureUniformGroup(e){e._syncFunction||this._initUniformGroup(e)}_initUniformGroup(e){const t=e._signature;let i=this._syncFunctionHash[t];if(!i){const s=Object.keys(e.uniformStructures).map(o=>e.uniformStructures[o]),n=Dn(s),a=In(n.uboElements);i=this._syncFunctionHash[t]={layout:n,syncFunction:a}}return e._syncFunction=i.syncFunction,e.buffer=new Z({data:new Float32Array(i.layout.size/4),usage:F.UNIFORM|F.COPY_DST}),e._syncFunction}syncUniformGroup(e,t,i){const s=e._syncFunction||this._initUniformGroup(e);return t||(t=e.buffer.data),i||(i=0),s(e.uniforms,t,i),!0}updateUniformGroup(e){if(e.isStatic&&!e._dirtyId)return!1;e._dirtyId=0;const t=this.syncUniformGroup(e);return e.buffer.update(),t}destroy(){this._syncFunctionHash=null}}li.extension={type:[_.WebGLSystem,_.WebGPUSystem,_.CanvasSystem],name:"uniformBuffer"};let rr=!1;const ir="8.0.0-beta.11";function En(r){if(!rr){if(ut.get().getNavigator().userAgent.toLowerCase().indexOf("chrome")>-1){const e=[`%c  %c  %c  %c  %c PixiJS %c v${ir} (${r}) http://www.pixijs.com/

`,"background: #E72264; padding:5px 0;","background: #6CA2EA; padding:5px 0;","background: #B5D33D; padding:5px 0;","background: #FED23F; padding:5px 0;","color: #FFFFFF; background: #E72264; padding:5px 0;","color: #E72264; background: #FFFFFF; padding:5px 0;"];globalThis.console.log(...e)}else globalThis.console&&globalThis.console.log(`PixiJS ${ir} - ${r} - http://www.pixijs.com/`);rr=!0}}class Ct{constructor(e){this._renderer=e}init(e){e.hello&&En(this._renderer.name)}}Ct.extension={type:[_.WebGLSystem,_.WebGPUSystem,_.CanvasSystem],name:"hello",priority:0};Ct.defaultOptions={hello:!1};const ui=class{constructor(r){this._renderer=r,this.count=0,this.checkCount=0}init(r){r={...ui.defaultOptions,...r},this.checkCountMax=r.textureGCCheckCountMax,this.maxIdle=r.textureGCAMaxIdle,this.active=r.textureGCActive}postrender(){this._renderer.renderingToScreen&&(this.count++,this.active&&(this.checkCount++,this.checkCount>this.checkCountMax&&(this.checkCount=0,this.run())))}run(){const r=this._renderer.texture.managedTextures;for(let e=0;e<r.length;e++){const t=r[e];t.resource&&t._touched>-1&&this.count-t._touched>this.maxIdle&&(t._touched=-1,t.unload())}}destroy(){this._renderer=null}};let Ee=ui;Ee.extension={type:[_.WebGLSystem,_.WebGPUSystem],name:"textureGC"};Ee.defaultOptions={textureGCActive:!0,textureGCAMaxIdle:60*60,textureGCCheckCountMax:600};ur.add(Ee);const ci=class{get resolution(){return this.texture.source._resolution}set resolution(r){this.texture.source.resize(this.texture.source.width,this.texture.source.height,r)}init(r){r={...ci.defaultOptions,...r},r.element&&(or(lr,"ViewSystem.element has been renamed to ViewSystem.canvas"),r.canvas=r.element),this.screen=new ae(0,0,r.width,r.height),this.canvas=r.canvas||ut.get().createCanvas(),this.antialias=!!r.antialias,this.texture=Ur(this.canvas,r),this.multiView=!!r.multiView,this.autoDensity&&(this.canvas.style.width=`${this.texture.width}px`,this.canvas.style.height=`${this.texture.height}px`),this.resolution=r.resolution}resize(r,e,t){this.texture.source.resize(r,e,t),this.screen.width=this.texture.frameWidth,this.screen.height=this.texture.frameHeight,this.autoDensity&&(this.canvas.style.width=`${r}px`,this.canvas.style.height=`${e}px`)}destroy(r=!1){(typeof r=="boolean"?r:!!r?.removeView)&&this.canvas.parentNode&&this.canvas.parentNode.removeChild(this.canvas)}};let Pt=ci;Pt.extension={type:[_.WebGLSystem,_.WebGPUSystem,_.CanvasSystem],name:"view",priority:0};Pt.defaultOptions={width:800,height:600,autoDensity:!1,antialias:!1};const Kn=[wt,xr,Wr,ai,Ct,Pt,ei,ki,zr,li,Ee,ni,St],Yn=[ii,Pr,Kr,Dr,jr,Nr,Jr,ti,Qr,Xr,pr,Br,Rr,kr];export{F as B,Ae as C,ce as G,te as M,Nn as R,ue as S,j as U,us as a,pt as b,_r as c,ys as d,V as e,Nt as f,fs as g,Z as h,jn as i,oe as j,Re as k,On as l,Kn as m,Yn as n,yr as o,cs as p,xs as q,br as r,vr as s,$n as t,ms as u,ft as v,Ts as w,Wn as x};
