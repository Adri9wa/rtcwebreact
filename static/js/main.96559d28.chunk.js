(this.webpackJsonprtcwebreact=this.webpackJsonprtcwebreact||[]).push([[0],{12:function(t,e,n){},13:function(t,e,n){},15:function(t,e,n){"use strict";n.r(e);var l,c,r=n(1),o=n.n(r),a=n(3),i=n.n(a),h=(n(12),n(4)),u=n(5),s=n(7),d=n(6),y=(n(13),n(0)),f=[];function x(){return Object(y.jsx)("div",{className:"WorkTable",children:Object(y.jsx)("canvas",{id:"map",height:"200",width:"200"})})}function b(){"black"===document.body.style.backgroundColor?document.body.style.backgroundColor="white":document.body.style.backgroundColor="black"}function w(){l=document.getElementById("map"),c=l.getContext("2d"),f=[];if(c.font="20px Arial",f.length>0){if(window.confirm("Are you sure you want to regenerate the room?")){var t=j(300,1200),e=j(300,1200);console.log(t,e),l.width=t,l.height=e,f=[]}}else t=j(300,1200),e=j(300,1200),l.width=t,l.height=e}function v(){f=[],window.confirm("Are you sure you want to reset?")&&(c.clearRect(0,0,l.width,l.height),l.width=200,l.height=200,f.length=0)}function j(t,e){return t=Math.ceil(t),e=Math.floor(e),Math.floor(Math.random()*(e-t+1))+t}function g(t){c.fillRect(t.x,t.y,t.w,t.h)}function m(t){c.clearRect(t.x,t.y,t.w,t.h)}function p(){c.clearRect(0,0,l.width,l.height)}function C(t,e){return!(t.x1>=e.x2||e.x1>=t.x2)&&!(t.y1>=e.y2||e.y1>=t.y2)}function I(t,e,n,c,r,o){for(var a=!0;a&&!(++r>20);)for(var i=0;i<o.length;i++){var h={};h.x1=o[i].x,h.y1=o[i].y,h.x2=o[i].x+o[i].w,h.y2=o[i].y+o[i].h;var u={};if(u.x1=n,u.y1=c,u.x2=n+t,u.y2=c+e,C(h,u)){n=j(0,l.width-t),c=j(0,l.height-e),u.x1=n,u.y1=c,u.x2=n+t,u.y2=c+e,a=!0;break}a=!1}return[u,r]}var k,O=[],S={},B={};function N(){var t=document.getElementById("map"),e=t.getContext("2d");O=[],e.fillStyle="red",e.clearRect(0,0,t.width,t.height),e.lineWidth=2;for(var n=t.width,l=t.height,c=j(4,10),r=0;r<c;r++){var o=j(30,80),a=j(30,80),i=j(0,n-o),h=j(0,l-a);if(O.length>0){var u=I(o,a,i,h,0,O),s=u[0];if(!(u[1]<=20))break;O.push({w:s.x2-s.x1,h:s.y2-s.y1,x:s.x1,y:s.y1})}else O.push({w:o,h:a,x:i,y:h});e.fillStyle="red",g(O[r])}}function D(){var t=document.getElementById("map"),e=t.getContext("2d"),n=0,l=t.width,c=t.height,r=40,o=40,a=90,i=90;S.w=j(r,a),S.h=j(o,i),S.x=j(0,l-S.w),S.y=j(0,c-S.h);var h=I(S.w,S.h,S.x,S.y,n,O),u=h[0];h[1]<=20?(O.push(S),S.w=u.x2-u.x1,S.h=u.y2-u.y1,S.x=u.x1,S.y=u.y1,e.fillStyle="#0d880d",g(S),e.fillStyle="black",e.fillText("R",S.x+S.w/2-3,S.y+S.h/2+3)):(alert("Can't place robot! Clearing canvas.."),p(),O=[]),r=50,o=50,a=S.w,i=S.h,B.w=j(r,a),B.h=j(o,i),B.x=j(0,l-B.w),B.y=j(0,c-B.h),n=0,u=(h=I(S.w,S.h,S.x,S.y,n,O))[0],h[1]<=20?(B.w=u.x2-u.x1,B.h=u.y2-u.y1,B.x=u.x1,B.y=u.y1,e.fillStyle="#00c600",g(B),e.fillStyle="black",e.fillText("D",B.x+B.w/2-3,B.y+B.h/2+3),O.pop()):(alert("Can't place docking station! Clearing canvas.."),p(),O=[])}function R(t){c.fillStyle="#D7FCD9",t?g(S):m(S),S.x+=S.w,c.fillStyle="#0d880d",g(S)}function M(t){c.fillStyle="#D7FCD9",t?g(S):m(S),S.x-=S.w,c.fillStyle="#0d880d",g(S)}function T(t){c.fillStyle="#D7FCD9",t?g(S):m(S),S.y-=S.h,c.fillStyle="#0d880d",g(S)}function A(t){c.fillStyle="#D7FCD9",t?g(S):m(S),S.y+=S.h,c.fillStyle="#0d880d",g(S)}function F(){m(S),S.y-=S.y-B.y-B.h,c.fillStyle="#0d880d",g(S)}function E(){m(S),S.y+=B.y+B.h-S.y-S.h,c.fillStyle="#0d880d",g(S)}function G(t){switch(t){case"right":return S.x+2*S.w<B.x;case"left":return S.x-S.w>B.x+B.w;case"up":return S.y-S.h>B.y+B.h;case"down":return S.y+S.h<B.y;default:return!0}}var J=500;function W(t){var e;k=!1,e=G("right")?setInterval((function(){G("right")?R(k):(m(S),S.x+=B.x-S.x-S.w,c.fillStyle="#0d880d",g(S),clearInterval(e),e=G("up")?setInterval((function(){G("up")?T(k):(F(),clearInterval(e),t())}),J):setInterval((function(){G("down")?A(k):(E(),clearInterval(e),t())}),J))}),J):setInterval((function(){G("left")?M(k):(m(S),S.x-=S.x-B.x-B.w,c.fillStyle="#0d880d",g(S),clearInterval(e),e=G("up")?setInterval((function(){G("up")?T(k):(F(),clearInterval(e),t())}),J):setInterval((function(){G("down")?A(k):(E(),clearInterval(e),t())}),J))}),J)}function L(){var t;k=!0,t=setInterval((function(){S.y<l.height+S.h?S.x<l.width-S.w?R(k):(A(k),clearInterval(t),t=setInterval((function(){S.x>0?M(k):(A(k),clearInterval(t),L())}),J)):(clearInterval(t),console.log("Finished cleaning"))}),J)}function q(){!function(t){var e;k=!0,e=setInterval((function(){S.x>0?M(k):(clearInterval(e),e=setInterval((function(){S.y>0?T(k):(clearInterval(e),console.log("On start"),t())}),J))}),J)}(L)}function z(){l.style.backgroundColor="#FEC3C3",W(q)}var H=function(t){Object(s.a)(n,t);var e=Object(d.a)(n);function n(){return Object(h.a)(this,n),e.apply(this,arguments)}return Object(u.a)(n,[{key:"render",value:function(){return Object(y.jsxs)("div",{className:"App",children:[Object(y.jsxs)("header",{children:[Object(y.jsx)("button",{className:"ModeButton",onClick:b,children:"Dark/Light mode"}),Object(y.jsx)("h1",{className:"mainTitle",children:"RTC Simulation"})]}),Object(y.jsxs)("div",{className:"controlButtonsBlock",children:[Object(y.jsx)("button",{className:"controlButton",onClick:w,children:"Generate room"}),Object(y.jsx)("button",{className:"controlButton",onClick:v,children:"Reset room"}),Object(y.jsx)("button",{className:"controlButton",onClick:N,children:"Generate obstacles"}),Object(y.jsx)("button",{className:"controlButton",onClick:D,children:"Generate RTC and DS"}),Object(y.jsx)("button",{className:"controlButton",onClick:p,children:"Clear canvas"}),Object(y.jsx)("button",{className:"controlButton",id:"controlBut",onClick:z,children:"Start Cleaning"})]}),Object(y.jsx)(x,{}),Object(y.jsx)("footer",{children:Object(y.jsx)("p",{className:"footerText",children:"\xa9 Made by Adri9wa, inspired by Anatolii"})})]})}}]),n}(r.Component);i.a.render(Object(y.jsx)(o.a.StrictMode,{children:Object(y.jsx)(H,{})}),document.getElementById("root"))}},[[15,1,2]]]);
//# sourceMappingURL=main.96559d28.chunk.js.map