(this.webpackJsonppart2=this.webpackJsonppart2||[]).push([[0],{15:function(t,e,n){t.exports=n(38)},37:function(t,e,n){},38:function(t,e,n){"use strict";n.r(e);var a=n(0),r=n.n(a),o=n(14),c=n.n(o),u=n(4),i=n(2),l=function(t){var e=t.note,n=t.toggleImportance,a=e.important?"make not important":"make important";return r.a.createElement("li",{className:"note"},e.content,r.a.createElement("button",{onClick:n},a))},m=function(t){var e=t.message;return null===e?null:r.a.createElement("div",{className:"error"},e)},s=n(3),f=n.n(s),p=function(){var t=f.a.get("/api/notes"),e={id:1e4,content:"This note is not saved to server",date:"2019-05-30T17:30:31.098Z",important:!0};return t.then((function(t){return t.data.concat(e)}))},d=function(t){return f.a.post("/api/notes",t).then((function(t){return t.data}))},v=function(t,e){return f.a.put("".concat("/api/notes","/").concat(t),e).then((function(t){return t.data}))},b=function(){var t=Object(a.useState)([]),e=Object(i.a)(t,2),n=e[0],o=e[1],c=Object(a.useState)("a new note"),s=Object(i.a)(c,2),f=s[0],b=s[1],h=Object(a.useState)(!0),E=Object(i.a)(h,2),g=E[0],O=E[1],j=Object(a.useState)(null),k=Object(i.a)(j,2),S=k[0],w=k[1];Object(a.useEffect)((function(){p().then((function(t){o(t)}))}),[]);var y=g?n:n.filter((function(t){return!0===t.important}));return r.a.createElement("div",null,r.a.createElement("h1",null,"Notes"),r.a.createElement(m,{message:S}),r.a.createElement("div",null,r.a.createElement("button",{onClick:function(){return O(!g)}},"show ",g?"important":"all")),r.a.createElement("ul",null,y.map((function(t,e){return r.a.createElement(l,{key:e,note:t,toggleImportance:function(){return function(t){var e=n.find((function(e){return e.id===t})),a=Object(u.a)(Object(u.a)({},e),{},{important:!e.important});v(t,a).then((function(e){o(n.map((function(n){return n.id!==t?n:e})))})).catch((function(a){w("the note '".concat(e.content,"' was already deleted from server")),setTimeout((function(){w(null)}),5e3),o(n.filter((function(e){return e.id!==t})))}))}(t.id)}})}))),r.a.createElement("form",{onSubmit:function(t){t.preventDefault();var e={content:f,date:(new Date).toISOString(),important:Math.random()>.5};d(e).then((function(t){o(n.concat(t)),b("")}))}},r.a.createElement("input",{value:f,onChange:function(t){console.log(t.target.value),b(t.target.value)}}),r.a.createElement("button",{type:"submit"},"save")))};n(37);c.a.render(r.a.createElement(b,null),document.getElementById("root"))}},[[15,1,2]]]);
//# sourceMappingURL=main.e2d16647.chunk.js.map