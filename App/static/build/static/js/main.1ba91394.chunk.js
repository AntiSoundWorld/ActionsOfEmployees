(this["webpackJsonphello-world"]=this["webpackJsonphello-world"]||[]).push([[0],[,,,,,,,,,,,,,,function(e,t,n){},,,,,,,,,,,,,,,,,,,,,,function(e,t,n){},function(e,t,n){},function(e,t,n){},function(e,t,n){},function(e,t,n){},function(e,t,n){},function(e,t,n){},function(e,t,n){},function(e,t,n){},function(e,t,n){},function(e,t,n){},function(e,t,n){"use strict";n.r(t);var c=n(1),s=n.n(c),a=n(15),r=n.n(a),u=(n(21),n(2)),o=n(6),i=(n(14),n(0));var l=function(){return Object(i.jsx)("div",{class:"loader-mask",children:Object(i.jsx)("div",{class:"loader"})})},j=n(3),d=n.n(j),b=n(5);n(36);var f=function(e){var t=function(){var t=Object(b.a)(d.a.mark((function t(){var n;return d.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:n={accessToken:e.accessToken,dates:{start:document.getElementById("start").value,end:document.getElementById("end").value}},Object(o.invoke)("GetInfo",n).then((function(t){e.setUsersInfo(t)}));case 2:case"end":return t.stop()}}),t)})));return function(){return t.apply(this,arguments)}}();return Object(i.jsxs)("form",{id:"rangeForm",onSubmit:function(e){e.preventDefault(),document.querySelectorAll(".body").forEach((function(e){e.classList.add("hide")}));var t=document.getElementById("head"),n=document.createElement("div");n.setAttribute("class","loader"),t.appendChild(n),setTimeout((function(){t.removeChild(n),document.querySelectorAll(".body").forEach((function(e){console.log(e),e.classList.remove("hide")}))}),6e3)},children:[Object(i.jsx)("input",{id:"start",type:"date",name:"start",label:"Start Date",defaultValue:e.dates.start,onChange:function(t){return e.setDates(t.target.value)}}),Object(i.jsx)("p",{}),Object(i.jsx)("input",{id:"end",type:"date",name:"end",label:"End Date",defaultValue:e.dates.end,onChange:function(t){return e.setDates(t.target.value)}}),Object(i.jsx)("p",{}),Object(i.jsx)("button",{id:"range-button",onClick:t,children:"range"})]})};function m(e,t){var n=O(t.toLowerCase()),c=[],s=!1;return e.map((function(e){var a=O(e.accountName.toLowerCase());if(!0===s)return null;if(e.accountName===t&&!1===s)return c.push(e),s=!0,null;for(var r="",u=0;u!==e.accountName.length;){for(var o=0;o<=t.length;)a[u]===n[o]&&u===o&&(r+=a[u]),a[u]===n[o]&&u!==o&&a[u],o++;u++}r.length===t.length&&c.push(e)})),c}function O(e){if(0===e.length)return e;for(var t=0,n="";t<=e.length;)" "!==e[t]&&void 0!==e[t]&&(n+=e[t]),t++;return n}n(37);var h=function(e){function t(){return(t=Object(b.a)(d.a.mark((function t(){var n;return d.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(0!==(n=document.getElementById("searchEmployee").value).length){t.next=4;break}return e.setListOfUsers(e.usersInfo),t.abrupt("return");case 4:e.setListOfUsers(m(e.usersInfo,n));case 5:case"end":return t.stop()}}),t)})))).apply(this,arguments)}return Object(i.jsx)("input",{id:"searchEmployee",label:"Search Employee",name:"name",placeholder:"Search",onInput:function(){return t.apply(this,arguments)}})};n(38);function x(e){return Object(i.jsxs)("tr",{className:"body",children:[Object(i.jsx)("td",{children:Object(i.jsx)("img",{className:"image",src:e.macket.accountAvatar})}),Object(i.jsx)("td",{className:"accountName",children:e.macket.accountName}),Object(i.jsx)("td",{className:"numOfComments",children:e.macket.numOfComments}),Object(i.jsx)("td",{className:"numOfCommits",children:e.macket.numOfCommits}),Object(i.jsx)("td",{className:"numOfpullRequests",children:e.macket.numOfpullRequests})]})}n(39);function p(){return Object(i.jsxs)("tr",{id:"head",children:[Object(i.jsx)("th",{className:"ico"}),Object(i.jsx)("th",{className:"name",children:Object(i.jsx)("text",{children:"Name"})}),Object(i.jsx)("th",{className:"jira_comments",children:"Jira comments"}),Object(i.jsx)("th",{className:"bitBucket_Commits",children:"BitBucket Commits"}),Object(i.jsx)("th",{className:"bitBucket_PullRequests",children:"BitBucket PullRequests"})]})}n(40);function v(e){var t=Object(c.useState)(Object(i.jsx)(l,{})),n=Object(u.a)(t,2),s=n[0],a=n[1];return setTimeout((function(){a(null)}),6e3),Object(i.jsxs)("table",{className:"table",children:[Object(i.jsx)(p,{}),e.macket.map((function(e,t){return Object(i.jsx)(x,{macket:e,index:t})})),s]})}n(41);var k=function(e){var t=Object(c.useState)([]),n=Object(u.a)(t,2),s=n[0],a=n[1],r=Object(c.useState)([]),j=Object(u.a)(r,2),d=j[0],b=j[1],m=Object(c.useState)(null),O=Object(u.a)(m,2),x=O[0],p=O[1],k=Object(c.useState)(function(){var e=new Date,t=e.getFullYear(),n=e.getMonth();return n<10&&(n="0"+(n+=1)),{start:t+"-"+n+"-01",end:t+"-"+n+"-"+("02"===n||"04"===n||"06"===n||"09"===n||"11"===n?"30":"31")}}()),g=Object(u.a)(k,2),y=g[0],S=g[1],B=Object(c.useState)(Object(i.jsx)(l,{})),N=Object(u.a)(B,2),w=(N[0],N[1],Object(c.useState)(Object(i.jsx)(l,{}))),E=Object(u.a)(w,2),I=E[0];return E[1],Object(c.useEffect)((function(){if(0==s.length){var t={accessToken:e.accessToken,dates:y};Object(o.invoke)("GetInfo",t).then((function(e){a(e)}))}})),Object(c.useEffect)((function(){b(s)}),[s]),Object(i.jsxs)("div",{className:"infoPage",children:[Object(i.jsx)(f,{dates:y,setDates:S,search:x,accessToken:e.accessToken,setUsersInfo:a}),Object(i.jsx)(h,{usersInfo:s,setSearch:p,listOfUsers:d,setListOfUsers:b}),Object(i.jsx)(v,{macket:d,body:I})]})},g=n(16);n(42);var y=function(e){var t=function(){var t=Object(b.a)(d.a.mark((function t(){var n,c,s;return d.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:n=document.getElementById("email").value,c=document.getElementById("password").value,s="Basic "+g.a.btoa(n+":"+c),e.setUserBasicToken(s);case 4:case"end":return t.stop()}}),t)})));return function(){return t.apply(this,arguments)}}();return Object(i.jsxs)("div",{class:"main-form",children:[Object(i.jsxs)("div",{class:"label",children:[Object(i.jsx)("h1",{children:"Actions Of Emplyees"}),Object(i.jsx)("text",{children:"Login"})]}),Object(i.jsxs)("form",{class:"box",children:[Object(i.jsxs)("div",{class:"inputs",children:[Object(i.jsx)("i",{class:"fas fa-user"}),Object(i.jsx)("input",{id:"email",type:"email",name:"",placeholder:"email"})]}),Object(i.jsxs)("div",{class:"inputs",children:[Object(i.jsx)("i",{class:"fas fa-lock"}),Object(i.jsx)("input",{id:"password",type:"password",name:"",placeholder:"Password"})]}),Object(i.jsx)("button",{class:"reg-button",onClick:t,children:"submit"})]})]})};n(43);var S=function(e){return Object(i.jsx)("form",{id:"mainLabel",children:Object(i.jsx)(y,{setUserBasicToken:e.setUserBasicToken})})};n(44);n(45);n(46);var B=function(e){var t=function(){var t=Object(b.a)(d.a.mark((function t(){return d.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:e.setLabel(Object(i.jsx)(S,{setUserBasicToken:e.setUserBasicToken}));case 1:case"end":return t.stop()}}),t)})));return function(){return t.apply(this,arguments)}}();return Object(i.jsxs)("form",{id:"message",children:[Object(i.jsx)("text",{children:Object(i.jsx)("h1",{id:"NotAuthorized",children:"Not Authorized"})}),Object(i.jsx)("p",{}),Object(i.jsx)("button",{id:"button",onClick:t,children:"try again"})]})};var N=function(){var e=Object(c.useState)(localStorage.getItem("token")),t=Object(u.a)(e,2),n=t[0],s=t[1],a=Object(c.useState)(Object(i.jsx)("h1",{children:"await"})),r=Object(u.a)(a,2),j=r[0],d=r[1],b=Object(c.useState)(null),f=Object(u.a)(b,2),m=f[0],O=f[1],h=Object(c.useState)(null),x=Object(u.a)(h,2),p=x[0],v=x[1];return Object(c.useEffect)((function(){null!=p&&d(Object(i.jsx)(k,{accessToken:p}))}),[p]),Object(c.useEffect)((function(){null!==n?(Object(o.invoke)("checkIsAuthorized",n).then((function(e){v(e.code),O(e.status)})),d(Object(i.jsx)(l,{}))):d(Object(i.jsx)(S,{setUserBasicToken:s}))}),[n]),Object(c.useEffect)((function(){200===m&&null===localStorage.getItem("token")&&localStorage.setItem("token",n),401===m&&d(Object(i.jsx)(B,{setLabel:d,userBasicToken:n}))}),[m]),j};r.a.render(Object(i.jsx)(s.a.StrictMode,{children:Object(i.jsx)(N,{})}),document.getElementById("root"))}],[[47,1,2]]]);
//# sourceMappingURL=main.1ba91394.chunk.js.map