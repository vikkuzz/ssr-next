(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[941],{3376:function(e,t,o){(window.__NEXT_P=window.__NEXT_P||[]).push(["/order",function(){return o(5319)}])},7170:function(e,t,o){"use strict";o.d(t,{Z:function(){return r}});var a=o(5893),l=o(1163),c=o(7294),n=o(3475),i=o(9635),s=o.n(i),_=(o(2573),null),r=function(){var e=(0,c.useRef)(null),t=((0,c.useRef)(null),(0,c.useState)({easy:!0,manual:!1})),o=t[0],i=t[1],r=(0,c.useState)(1),d=r[0],x=r[1],u=(0,l.useRouter)(),m={easy:{1:{title:n.m[u.locale].pageCoinsFill,text:n.m[u.locale].pageCoinsAfter},2:{title:n.m[u.locale].pageCoinsFillBackup,text:n.m[u.locale].pageCoinsToStart},3:{title:n.m[u.locale].pageCoinsWaitCompletion,text:n.m[u.locale].pageCoinsDoNotEnter},4:{title:n.m[u.locale].pageCoinsEnjoy,text:n.m[u.locale].pageCoinsFeedback}},manual:{1:{title:n.m[u.locale].pageCoinsBuyPlayer,text:n.m[u.locale].pageCoinsAfterSuccessfully},2:{title:n.m[u.locale].pageCoinsConfirmPlayer,text:n.m[u.locale].pageCoinsThenConfirm},3:{title:n.m[u.locale].pageCoinsRepeatUntil,text:n.m[u.locale].pageCoinsFirstPart},4:{title:n.m[u.locale].pageCoinsEnjoy,text:n.m[u.locale].pageCoinsFeedback}}};(0,c.useEffect)((function(){var e=function(){"undefined"!=typeof YT&&YT.Player&&(_=new YT.Player("player",{videoId:"tYVjCOjLlZQ",playerVars:{playsinline:1,autoplay:1}}))};if("undefined"!=typeof YT&&YT.Player)e();else var t=setInterval((function(){"undefined"!=typeof YT&&YT.Player&&clearInterval(t),e()}),300)}),[]),(0,c.useEffect)((function(){o.manual&&(null===_||void 0===_?void 0:_.seekTo)?1==d?_.seekTo(0,!0):2==d?_.seekTo(57,!0):3==d?_.seekTo(105,!0):4==d&&_.seekTo(114,!0):o.easy&&(null===_||void 0===_?void 0:_.seekTo)&&(1==d?_.seekTo(0,!0):2==d?_.seekTo(19,!0):3==d?_.seekTo(39,!0):4==d&&_.seekTo(42,!0))}),[d]),(0,c.useEffect)((function(){x(1),(null===_||void 0===_?void 0:_.loadVideoById)&&(o.manual?_.loadVideoById("5IxIFgx_src"):o.easy&&_.loadVideoById("tYVjCOjLlZQ"))}),[o]);var h=function(e){"easy"===e.target.id?i({easy:!0,manual:!1}):i({easy:!1,manual:!0})},w=function(e){var t="-"==e.target.id?d-1:d+1;5===t&&(t=1),0===t&&(t=4),x(t)};return(0,a.jsxs)("div",{id:"deliveryMain",className:"".concat(s().how_container),children:[(0,a.jsx)("div",{className:"".concat(s().how_title),children:n.m[u.locale].hwd}),(0,a.jsxs)("div",{className:"".concat(s().how_container_content),children:[(0,a.jsxs)("div",{className:"".concat(s().how_tabs_wrapper),children:[(0,a.jsx)("div",{className:"".concat(s().how_btn_wrapper),children:(0,a.jsx)("button",{onClick:h,id:"easy",type:"button",className:"".concat(s().how_tab," ").concat(o.easy&&s().how_is_active),children:n.m[u.locale].comfortMethodName})}),(0,a.jsx)("div",{className:"".concat(s().how_btn_wrapper),children:(0,a.jsx)("button",{onClick:h,id:"manual",type:"button",className:"".concat(s().how_tab," ").concat(!o.easy&&s().how_is_active),children:n.m[u.locale].marketMethodName})})]}),(0,a.jsxs)("div",{className:"".concat(s().how_container_text),children:[(0,a.jsx)("h2",{className:"".concat(s().how_subtitle),children:m[o.easy?"easy":"manual"][d].title}),(0,a.jsx)("div",{className:"".concat(s().how_step_text),children:m[o.easy?"easy":"manual"][d].text}),(0,a.jsxs)("div",{className:"".concat(s().how_btns_wrapper),children:[(0,a.jsx)("button",{className:"".concat(s().how_step_btn),id:"-",type:"button",onClick:w,children:(0,a.jsx)("img",{id:"-",className:"".concat(s().how_step_img),alt:"back",src:"/img/arrow-left.svg"})}),d+"/4",(0,a.jsx)("button",{className:"".concat(s().how_step_btn),id:"+",type:"button",onClick:w,children:(0,a.jsx)("img",{id:"+",className:"".concat(s().how_step_img),alt:"front",src:"/img/arrow-right-white.svg"})})]})]}),(0,a.jsx)("div",{id:"player",ref:e,className:"".concat(s().how_yt_wrapper),autoPlay:1})]})]})}},3259:function(e,t,o){"use strict";o.d(t,{Z:function(){return _}});var a=o(5893),l=o(1163),c=(o(7294),o(3475)),n=o(796),i=o.n(n),s=function(e){var t=e.img,o=e.title,l=e.text;return(0,a.jsxs)("div",{className:"".concat(i().textblock),children:[(0,a.jsx)("img",{className:"".concat(i().textblock_decor),src:t}),(0,a.jsx)("h3",{className:"".concat(i().textblock_title),children:o}),(0,a.jsx)("p",{className:"".concat(i().textblock_text),children:l})]})},_=function(){var e=(0,l.useRouter)(),t=c.m[e.locale];return(0,a.jsxs)("div",{className:"".concat(i().textblock_container),children:[(0,a.jsxs)("div",{className:"".concat(i().textblock_row),children:[(0,a.jsx)(s,{img:"/img/purple.svg",title:t.infoBlockTitle1,text:t.infoBlockText1}),(0,a.jsx)(s,{img:"/img/blue.svg",title:t.infoBlockTitle2,text:t.infoBlockText2})]}),(0,a.jsxs)("div",{className:"".concat(i().textblock_row),children:[(0,a.jsx)(s,{img:"/img/red.svg",title:t.infoBlockTitle3,text:t.infoBlockText3}),(0,a.jsx)(s,{img:"/img/yellow.svg",title:t.infoBlockTitle4,text:t.infoBlockText4})]})]})}},5319:function(e,t,o){"use strict";o.r(t);var a=o(5893),l=(o(7294),o(1664),o(6948)),c=o(1995),n=o.n(c),i=o(5269),s=o(7170),_=o(3259),r=o(1163),d=o(3475),x=o(8842);t.default=function(){var e=(0,r.useRouter)();return(0,a.jsxs)(l.Z,{children:[(0,a.jsxs)("div",{className:"".concat(n().app_main),children:[(0,a.jsxs)("h1",{className:"".concat(n().app_h1),children:[d.m[e.locale].h1_1," ",(0,a.jsx)("br",{}),d.m[e.locale].h1_2]}),(0,a.jsx)(i.Z,{}),(0,a.jsx)(s.Z,{}),(0,a.jsx)(_.Z,{})]}),(0,a.jsx)(x.Z,{})]})}},9635:function(e){e.exports={how_title:"Howdelivery_how_title__Tr0qX",how_container:"Howdelivery_how_container__JbREL",how_tab:"Howdelivery_how_tab__NCJY_",how_tabs_wrapper:"Howdelivery_how_tabs_wrapper__49nHW",how_is_active:"Howdelivery_how_is_active__84PnK",how_container_content:"Howdelivery_how_container_content__GZpa5",how_container_text:"Howdelivery_how_container_text__J1_QT",how_step_img:"Howdelivery_how_step_img__tFSal",how_step_btn:"Howdelivery_how_step_btn__0r_TN",how_subtitle:"Howdelivery_how_subtitle__i21f_",how_step_text:"Howdelivery_how_step_text__CL_Ul",how_btns_wrapper:"Howdelivery_how_btns_wrapper__tFbbl"}},796:function(e){e.exports={textblock:"TextBlock_textblock__zCI6k",textblock_decor:"TextBlock_textblock_decor__xH_v0",textblock_container:"TextBlock_textblock_container__YEqcP",textblock_text:"TextBlock_textblock_text__z9lcz",textblock_title:"TextBlock_textblock_title__cQuox",textblock_row:"TextBlock_textblock_row__J1IE_"}}},function(e){e.O(0,[303,573,948,269,774,888,179],(function(){return t=3376,e(e.s=t);var t}));var t=e.O();_N_E=t}]);