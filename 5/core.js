/* Hondu Truck · catálogo, búsqueda, carrito y pedido por WhatsApp.
   Cada estilo de página define window.HT (plantillas) antes de cargar este archivo. */
(function(){
"use strict";
/* ============ Configuración ============ */
var WHATSAPP = "50497757535";   // número con código de país, sin + ni guiones
var PRICE_FACTOR = 1.5;          // precio mostrado = costo × factor (igual que el sitio anterior)
var T = window.HT || {};
var PAGE = T.page || 12;

var CATS = [
  {k:"TAPAS",n:"Tapas de tuerca",t:"tapa-tuerca-33mm-octagonal-5in-rosca"},
  {k:"CROMADOS",n:"Cromados y cabina",t:"cobra-cromada-metalica-13-15-18"},
  {k:"MANOS LIBRES",n:"Manos libres",t:"mano-libre-tambor"},
  {k:"PALANCAS",n:"Palancas",t:"perilla-palanca-cromada"},
  {k:"LODERAS",n:"Loderas",t:"lodera-24x30-rojo-lisa"},
  {k:"LUCES",n:"Luces y vías LED",t:"stop-4in-16-led-rojo-12v"},
  {k:"ANTENAS",n:"Antenas y bases",t:"antena-latigo-espiral-azul"},
  {k:"PORTA PLACAS",n:"Porta placas",t:"porta-placa-a-a-39743"},
  {k:"PULIDO",n:"Pastas y piedras",t:"pasta-alubrayther-blanca-350grm"}
];
/* [categoría, nombre, no. de parte, costo, existencia, imagen] */
var RAW = [
["TAPAS","Tapa tuerca 33 mm octagonal 5\" rosca","19216",55,60,"tapa-tuerca-33mm-octagonal-5in-rosca"],
["TAPAS","Tapa tuerca 33 mm octagonal 5\" presión","19217",55,60,"tapa-tuerca-33mm-octagonal-5in-presion"],
["TAPAS","Tapa tuerca 3.5\" hexagonal 33 mm","3015P",40,50,"tapa-tuerca-33mm-hexagonal-3-5in"],
["TAPAS","Tapa tuerca cilindro 3.5\" 33 mm rosca","3019R",35,50,"tapa-tuerca-33mm-cilindro-3-5in-rosca"],
["TAPAS","Tapa tuerca cilindro 3.5\" 33 mm presión","3019P",35,50,"tapa-tuerca-33mm-cilindro-3-5in-presion"],
["TAPAS","Tapa tuerca #10/12","70088",85,5,"tapa-tuerca-10-12-70088"],
["TAPAS","Tapa tornillo #14","70251",90,5,"tapa-tornillo-14"],
["TAPAS","Tapa tornillo #6/8","70086",85,5,"tapa-tornillo-6-8-70086"],
["TAPAS","Tapa cobra acero","70176-2",120,4,"tapa-cobra-acero-70176-2"],
["CROMADOS","Cobra cromada metálica 13/15/18","70176",1050,2,"cobra-cromada-metalica-13-15-18"],
["CROMADOS","Copa delantera punta 4 aberturas","10146",140,20,"copa-delantera-punta-4-aberturas"],
["CROMADOS","Spinner calavera","70113",420,1,"spinner-calavera"],
["CROMADOS","Manesilla FL roja derecha","42494",550,1,"manesilla-fl-roja-derecha"],
["CROMADOS","Manesilla roja izquierda","42493",550,1,"manesilla-roja-izquierda"],
["CROMADOS","Tapón de tanque FL para diésel","16263",550,2,"tapon-tanque-fl-diesel-16263"],
["MANOS LIBRES","Mano libre madera","70159",230,1,"mano-libre-madera"],
["MANOS LIBRES","Mano libre azul","70362",300,1,"mano-libre-azul"],
["MANOS LIBRES","Mano libre verde","70363",320,1,"mano-libre-verde"],
["MANOS LIBRES","Mano libre rojo","70365",300,1,"mano-libre-rojo"],
["MANOS LIBRES","Mano libre timón blanco","70367",300,1,"mano-libre-timon-blanco"],
["MANOS LIBRES","Mano libre amarillo","70368",350,1,"mano-libre-amarillo"],
["MANOS LIBRES","Mano libre anaranjado","70364",300,1,"mano-libre-anaranjado"],
["MANOS LIBRES","Mano libre tambor","70106",1000,1,"mano-libre-tambor"],
["MANOS LIBRES","Mano libre de timón tipo revólver","310-CAB-039",940,1,"mano-libre-timon-tipo-revolver"],
["PALANCAS","Perilla de palanca cromada","70584",500,2,"perilla-palanca-cromada"],
["PALANCAS","Base palanca plástica cromada","41021",170,4,"base-palanca-plastica-cromada"],
["PALANCAS","Uña de palanca cromada","70273",100,4,"una-palanca-cromada"],
["PALANCAS","Uña de palanca 13 cromada","310-CAB-067",130,4,"una-palanca-13-cromada"],
["PALANCAS","Extensión para palanca 6\" cromada","310-CAB-064-6",220,2,"extension-palanca-6in-cromada"],
["PALANCAS","Extensión para palanca 9\" cromada","310-CAB-064-9",300,2,"extension-palanca-9in-cromada"],
["PALANCAS","Extensión de palanca 12\" cromada","310-CAB-064-12",330,2,"extension-palanca-12in-cromada"],
["LODERAS","Lodera 24x30 roja lisa","18368",350,4,"lodera-24x30-rojo-lisa"],
["LODERAS","Lodera 24x30 rojo escarlata lisa","18374",350,4,"lodera-24x30-rojo-escarlata"],
["LODERAS","Lodera 24x30 blanca lisa","18400",350,4,"lodera-24x30-blanca-lisa"],
["LODERAS","Lodera 24x30 negra lisa","18362",350,4,"lodera-24x30-negra-lisa"],
["LODERAS","Lodera 24x30 anaranjada lisa","18420",350,4,"lodera-24x30-anaranjada-lisa"],
["LUCES","Stop 4\" 16 LED rojo 12V","320-5595R-12V-E",100,6,"stop-4in-16-led-rojo-12v"],
["LUCES","Aro de seguridad metálico para stop 4\"","320-52226",90,6,"aro-seguridad-metalico-stop-4in"],
["LUCES","Vía 2 caras luz de color 56 LED","S302PC",630,2,"via-2-caras-56led-s302pc"],
["LUCES","Vía doble cara 3\" ámbar/rojo 12V","320-245001-12V",300,2,"via-doble-cara-3in-ambar-rojo"],
["LUCES","Vía doble cara 42 LED 12V ámbar/rojo GPM","320-2322-E",400,2,"via-doble-cara-42led-ambar-rojo"],
["ANTENAS","Base de antena 2 tornillos (1 par)","303-009",100,2,"base-antena-2-tornillos"],
["ANTENAS","Base de antena 4 tornillos con fitting","303-008-K",180,4,"base-antena-4-tornillos-fitting"],
["ANTENAS","Resorte SS para antena","303-SP001",120,4,"resorte-ss-antena"],
["ANTENAS","Antena látigo espiral azul kit 100 cm","TR-001AZUL",1100,1,"antena-latigo-espiral-azul"],
["ANTENAS","Antena látigo espiral negro kit 100 cm","TR-001NEGRO",1100,1,"antena-latigo-espiral-negro"],
["ANTENAS","Antena látigo blanco con capucho rojo","303-T002",230,4,"antena-latigo-blanco-capucho-rojo"],
["PORTA PLACAS","Porta placa A/A","39743",780,2,"porta-placa-a-a-39743"],
["PORTA PLACAS","Portaplaca sencillo","50099B",135,2,"portaplaca-sencillo-50099b"],
["PORTA PLACAS","Marco de placa tipo diamante","50135",200,2,"marco-placa-diamante-50135"],
["PULIDO","Pasta Alubrayther blanca 350 g","7503021132468",185,60,"pasta-alubrayther-blanca-350grm"],
["PULIDO","Piedra verde 104 rendimiento alto","PSV104",250,24,"piedra-verde-104-psv104"]
];

/* ============ Utilidades ============ */
var $ = function(s,r){return (r||document).querySelector(s)};
var $$ = function(s,r){return Array.prototype.slice.call((r||document).querySelectorAll(s))};
var norm = function(s){return String(s).toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g,"").replace(/["”]/g,"")};
var img = function(n){return "img/productos/"+n+".jpg"};
var money = function(n){return "L "+n.toLocaleString("en-US")};
var esc = function(s){return String(s).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/"/g,"&quot;")};
var stockLabel = function(p){return p.stock===1?"Última unidad":p.stock<=2?"Quedan "+p.stock:""};
var H = {money:money,esc:esc,img:img,stock:stockLabel};
var catName = {}; CATS.forEach(function(c){catName[c.k]=c.n});

var ALL = RAW.map(function(r,i){
  return {id:i+1,k:r[0],cat:catName[r[0]],name:r[1],sku:r[2],price:Math.round(r[3]*PRICE_FACTOR),stock:r[4],img:img(r[5]),
          hay:norm(r[1]+" "+r[2]+" "+catName[r[0]]),nameN:norm(r[1]),skuN:norm(r[2])};
});
var FEATURED = (function(){
  var g={},o=[],out=[];
  ALL.forEach(function(p){if(!g[p.k]){g[p.k]=[];o.push(p.k)}g[p.k].push(p)});
  for(var i=0;out.length<ALL.length;i++)o.forEach(function(k){if(g[k][i])out.push(g[k][i])});
  return out;
})();
var byId = function(id){return ALL.find(function(p){return p.id===id})};
var count={}; ALL.forEach(function(p){count[p.k]=(count[p.k]||0)+1});

function find(q){
  var raw=norm(q).trim(), t=raw.split(/\s+/).filter(Boolean);
  if(!t.length) return [];
  return FEATURED.filter(function(p){return t.every(function(x){return p.hay.indexOf(x)>-1})})
    .map(function(p,i){return {p:p,i:i,s:p.skuN===raw?0:p.skuN.indexOf(raw)===0?1:p.nameN.indexOf(raw)>-1?2:3}})
    .sort(function(a,b){return a.s-b.s||a.i-b.i}).map(function(x){return x.p});
}
function wa(msg){return "https://wa.me/"+WHATSAPP+(msg?"?text="+encodeURIComponent(msg):"")}

/* ============ Plantillas por defecto (cada estilo las reemplaza) ============ */
var tpl = {
  card: T.card || function(p,h){return '<article class="card"><button class="ph" type="button" data-open="'+p.id+'"><img src="'+p.img+'" alt="" loading="lazy"></button><h3>'+h.esc(p.name)+'</h3><span>'+h.money(p.price)+'</span><button type="button" data-add="'+p.id+'">Agregar</button></article>'},
  cat: T.cat || function(c,n,h){return '<button type="button" data-cat="'+c.k+'">'+c.n+' ('+n+')</button>'},
  chip: T.chip || function(c,active){return '<button class="chip" type="button" data-cat="'+(c?c.k:"")+'" aria-pressed="'+active+'">'+(c?c.n:"Todo")+'</button>'},
  line: T.line || function(p,l,h){return '<div class="line"><div class="t"><img src="'+p.img+'" alt=""></div><div><h3>'+h.esc(p.name)+'</h3><small>No. '+h.esc(p.sku)+', '+h.money(p.price)+' c/u</small><div class="qty"><button type="button" data-dec="'+p.id+'" aria-label="Quitar uno">−</button><output>'+l.qty+'</output><button type="button" data-inc="'+p.id+'" aria-label="Agregar uno">+</button></div></div><div class="r"><strong>'+h.money(p.price*l.qty)+'</strong><button class="del" type="button" data-del="'+p.id+'">Quitar</button></div></div>'},
  empty: T.cartEmpty || '<div class="cart-empty"><strong>Tu pedido está vacío</strong>Agrega piezas del catálogo y envíanos el pedido por WhatsApp.</div>'
};

/* ============ Estado ============ */
var S={q:"",cat:null,sort:"rel",visible:PAGE,cart:[],open:null,qty:1};
try{var saved=JSON.parse(localStorage.getItem("ht-cart")||"[]");if(Array.isArray(saved))S.cart=saved.filter(function(l){return byId(l.id)})}catch(e){}
function saveCart(){try{localStorage.setItem("ht-cart",JSON.stringify(S.cart))}catch(e){}}

$$("[data-wa]").forEach(function(a){a.href=wa(a.getAttribute("data-wa-msg")||"Hola Hondu Truck, quiero cotizar unas piezas.")});
$$("[data-cats]").forEach(function(el){el.innerHTML=CATS.map(function(c){return tpl.cat(c,count[c.k],H)}).join("")});
$$("[data-foot-cats]").forEach(function(el){el.innerHTML=CATS.map(function(c){return '<li><button class="f" type="button" data-cat="'+c.k+'">'+c.n+'</button></li>'}).join("")});
$$("[data-total-count]").forEach(function(el){el.textContent=ALL.length});

/* ============ Catálogo ============ */
function list(){
  var l = S.q ? find(S.q) : (S.cat ? FEATURED.filter(function(p){return p.k===S.cat}) : FEATURED.slice());
  if(S.sort==="asc") l=l.slice().sort(function(a,b){return a.price-b.price});
  if(S.sort==="desc") l=l.slice().sort(function(a,b){return b.price-a.price});
  return l;
}
function renderGrid(){
  var l=list(), n=l.length, set=function(sel,fn){var el=$(sel);if(el)fn(el)};
  set("[data-heading]",function(el){el.textContent = S.q ? "Resultados para “"+S.q+"”" : (S.cat ? catName[S.cat] : (el.getAttribute("data-default")||"Catálogo"))});
  set("[data-count]",function(el){el.textContent = n===1 ? "1 producto" : n+" productos"});
  set("[data-clear]",function(el){el.hidden=!S.q});
  set("[data-empty]",function(el){el.hidden=n>0;var a=$("[data-wa]",el);if(a&&!n)a.href=wa("Hola Hondu Truck, estoy buscando: "+S.q)});
  $("[data-grid]").innerHTML = l.slice(0,S.visible).map(function(p){return tpl.card(p,H)}).join("");
  set("[data-more]",function(el){el.hidden=n<=S.visible;el.textContent="Mostrar más productos ("+(n-S.visible)+")"});
  set("[data-chips]",function(el){el.innerHTML=tpl.chip(null,!S.cat&&!S.q)+CATS.map(function(c){return tpl.chip(c,S.cat===c.k,count[c.k])}).join("")});
  $$("[data-cats] [data-cat]").forEach(function(b){b.setAttribute("aria-pressed",String(S.cat===b.getAttribute("data-cat")))});
  if(T.afterGrid) T.afterGrid(S);
}
function goCatalog(){var el=$("#catalogo");if(el)window.scrollTo({top:el.getBoundingClientRect().top+window.scrollY-(T.offset||76),behavior:"smooth"})}
function search(q){S.q=String(q||"").trim();S.cat=null;S.visible=PAGE;$$("[data-search] input").forEach(function(i){i.value=S.q});renderGrid();goCatalog()}
function pickCat(k,scroll){S.cat=k||null;S.q="";S.visible=PAGE;$$("[data-search] input").forEach(function(i){i.value=""});renderGrid();if(scroll)goCatalog()}

/* ============ Ficha de producto ============ */
var lastFocus=null;
function openProduct(id){
  var p=byId(id); if(!p) return;
  S.open=id; S.qty=1; lastFocus=document.activeElement;
  $("[data-m-img]").src=p.img; $("[data-m-img]").alt=p.name;
  $("[data-m-cat]").textContent=p.cat;
  $("[data-m-name]").textContent=p.name;
  $("[data-m-price]").textContent=money(p.price);
  $("[data-m-qty]").textContent="1";
  $("[data-m-specs]").innerHTML=[["Número de parte",p.sku],["Categoría",p.cat],["Existencia",p.stock===1?"1 unidad":p.stock+" unidades"],["Garantía","6 meses por defecto de fábrica"],["Envío","24–48 h a todo Honduras"]]
    .map(function(r){return '<div><dt>'+r[0]+'</dt><dd>'+esc(r[1])+'</dd></div>'}).join("");
  $("[data-m-wa]").href=wa("Hola Hondu Truck, me interesa: "+p.name+" (No. de parte "+p.sku+"). ¿Lo tienen disponible?");
  show("[data-modal]"); setTimeout(function(){var x=$("[data-modal] [data-close]");if(x)x.focus()},50);
}

/* ============ Carrito ============ */
function cartCount(){return S.cart.reduce(function(a,l){return a+l.qty},0)}
function add(id,n){
  var l=S.cart.find(function(x){return x.id===id});
  if(l) l.qty+=n; else S.cart.push({id:id,qty:n});
  saveCart(); renderCart();
  $$("[data-cart-n]").forEach(function(b){b.classList.remove("bump");void b.offsetWidth;b.classList.add("bump")});
  toast("Agregado: "+byId(id).name);
}
function renderCart(){
  var n=cartCount(), sub=0;
  $$("[data-cart-n]").forEach(function(b){b.textContent=n;b.hidden=!n});
  if(!S.cart.length){$("[data-lines]").innerHTML=tpl.empty;$("[data-cart-foot]").hidden=true;if(T.afterCart)T.afterCart(0,0);return}
  $("[data-cart-foot]").hidden=false;
  $("[data-lines]").innerHTML=S.cart.map(function(l){var p=byId(l.id);sub+=p.price*l.qty;return tpl.line(p,l,H)}).join("");
  $("[data-sub]").textContent=money(sub); $("[data-total]").textContent=money(sub);
  var msg="Hola Hondu Truck, quiero hacer este pedido:\n\n"+S.cart.map(function(l){var p=byId(l.id);return "• "+l.qty+" × "+p.name+" (No. "+p.sku+") – "+money(p.price*l.qty)}).join("\n")+
    "\n\nTotal: "+money(sub)+"\n\nNombre:\nCiudad de envío:";
  $("[data-order]").href=wa(msg);
  if(T.afterCart)T.afterCart(n,sub);
}

/* ============ Capas ============ */
function show(sel){$("[data-scrim]").classList.add("on");$(sel).classList.add("on");document.body.style.overflow="hidden"}
function closeAll(){
  ["[data-scrim]","[data-modal]","[data-drawer]"].forEach(function(s){$(s).classList.remove("on")});
  document.body.style.overflow=""; S.open=null;
  if(lastFocus&&lastFocus.focus){lastFocus.focus();lastFocus=null}
}
function openCart(){if(T.inlineCart&&T.inlineCart()){renderCart();hideToast();return}closeAll();lastFocus=document.activeElement;renderCart();show("[data-drawer]");hideToast();setTimeout(function(){var x=$("[data-drawer] [data-close]");if(x)x.focus()},50)}
var tt;
function toast(t){$("[data-toast-t]").textContent=t;$("[data-toast]").classList.add("on");clearTimeout(tt);tt=setTimeout(hideToast,3200)}
function hideToast(){$("[data-toast]").classList.remove("on")}

/* ============ Eventos ============ */
document.addEventListener("click",function(e){
  var t=e.target.closest("button,[data-open],[data-scrim]"); if(!t) return;
  var d=t.dataset;
  if(d.open){openProduct(+d.open)}
  else if(d.add){add(+d.add,1);t.classList.add("ok");setTimeout(function(){t.classList.remove("ok")},900)}
  else if(d.cat!==undefined){pickCat(d.cat,!t.classList.contains("chip"))}
  else if(d.q){search(d.q)}
  else if(t.hasAttribute("data-clear")){pickCat(null)}
  else if(t.hasAttribute("data-more")){S.visible+=PAGE;renderGrid()}
  else if(t.hasAttribute("data-open-cart")){openCart()}
  else if(t.hasAttribute("data-close")||t.hasAttribute("data-scrim")){closeAll()}
  else if(t.hasAttribute("data-m-inc")){S.qty++;$("[data-m-qty]").textContent=S.qty}
  else if(t.hasAttribute("data-m-dec")){S.qty=Math.max(1,S.qty-1);$("[data-m-qty]").textContent=S.qty}
  else if(t.hasAttribute("data-m-add")){var id=S.open,q=S.qty;closeAll();add(id,q)}
  else if(d.inc||d.dec){var id2=+(d.inc||d.dec),l=S.cart.find(function(x){return x.id===id2});if(l){l.qty=Math.max(1,l.qty+(d.inc?1:-1));saveCart();renderCart()}}
  else if(d.del){S.cart=S.cart.filter(function(x){return x.id!==+d.del});saveCart();renderCart()}
});
$$("[data-search]").forEach(function(f){f.addEventListener("submit",function(e){e.preventDefault();search(f.querySelector("input").value);f.querySelector("input").blur()})});
$$("[data-sort]").forEach(function(s){s.addEventListener("change",function(e){S.sort=e.target.value;S.visible=PAGE;renderGrid()})});
document.addEventListener("keydown",function(e){
  if(e.key==="Escape") closeAll();
  var typing=/INPUT|TEXTAREA|SELECT/.test((e.target||{}).tagName||"");
  if(e.key==="/"&&!typing){var i=$("[data-search] input");if(i){e.preventDefault();i.focus()}}
});
var bar=$("[data-top]");
if(bar){var onScroll=function(){bar.classList.toggle("is-scrolled",window.scrollY>(T.scrollAt||360))};window.addEventListener("scroll",onScroll,{passive:true});onScroll()}
$$("[data-year]").forEach(function(el){el.textContent=new Date().getFullYear()});

window.HTcore={all:ALL,cats:CATS,count:count,h:H,byId:byId,open:openProduct,add:add,search:search,pickCat:pickCat,wa:wa};
renderGrid(); renderCart();
if(T.ready) T.ready(window.HTcore);
})();
