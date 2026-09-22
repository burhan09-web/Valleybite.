const menu = [
["appetizers","Simple Fries",300,"🍟"],["appetizers","Garlic Mayo Fries",400,"🍟"],["appetizers","Loaded Fries",450,"🍟"],["appetizers","Pizza Fries",550,"🍟"],["appetizers","Chicken Strips",500,"🍗"],["appetizers","Hot Wings (6 Pieces)",350,"🍗"],["appetizers","Honey Chilly Wings (6 Pieces)",450,"🍗"],["appetizers","BBQ Wings (6 Pieces)",450,"🍗"],["appetizers","Hot & Spicy Wings (6 Pieces)",450,"🌶️"],["appetizers","Nachos",450,"🧀"],["appetizers","Soup of the Day — Small",200,"🥣"],["appetizers","Soup of the Day — Large",700,"🥣"],
["pasta","Crunchy Chicken Pasta",450,"🍝"],["pasta","Alfredo VB Special Pasta",600,"🍝"],["pasta","Lasagna",600,"🧀"],["pasta","Chicken Chowmein",500,"🍜"],["pasta","Chicken Chilli Dry",650,"🍜"],
["wraps","Monte Carlo Sandwich",480,"🥪"],["wraps","Club Sandwich",500,"🥪"],["wraps","Grilled Chicken Sandwich",500,"🥪"],["wraps","Arabic Chicken Wrap",400,"🌯"],["wraps","Chicken Shawarma (L)",230,"🌯"],["wraps","Chicken Shawarma (S)",150,"🌯"],["wraps","Zinger Parata Roll",350,"🌯"],["wraps","Bihari Roll Single",300,"🌯"],["wraps","Bihari Rolls Double",500,"🌯"],["wraps","Pizza Parata",500,"🫓"],
["burgers","Valley Bites Special",750,"🍔"],["burgers","Chicken Crunch",320,"🍔"],["burgers","Chicken Star",320,"🍔"],["burgers","Bingo Beef",450,"🍔"],["burgers","Classic Smash",700,"🍔"],["burgers","AB 17",700,"🍔"],["burgers","Wanted",650,"🍔"],["burgers","Zinger Special",500,"🍔"],["burgers","D-Chef Special Burger",650,"🍔"],
["dips","Honey Mustard",50,"🥫"],["dips","Turkish Sauce",50,"🥫"],["dips","Creamy Chipotle",50,"🥫"],["dips","Garlic",50,"🥫"],["dips","Totor",50,"🥫"]
];
const pizzas = [
["Veggie Patch",450,850,1200],["Flaming Torch",699,1350,1699],["Chicken Tikka",699,1350,1699],["Cheese Lovers",699,1250,1550],["Arabic Pizza",699,1450,1799],["All the Meat",750,1450,1799],["Cheese Melt Down",750,1450,1850],["King Crust",750,1500,1850],["Calzone Chunks",750,1450,1850],["Valley Bites Special",750,1450,1850]
];
const deals = [
["Hit Deal",1280,["4 Crunch Burgers","1 Liter Drink"]],
["Beef Load",1050,["2 Bingo Beef Burgers","1 Simple Fries","1 Regular Drink"]],
["Wanted Feast",1380,["2 Wanted Grill Burgers","Simple Fries","1 Liter Drink"]],
["Zinger Solo",730,["1 Zinger Burger","1 Simple Fries","1 Regular Drink"]],
["The All Rounder",2999,["4 Chicken Star Burgers","Loaded Fries","Large Pizza","1 Liter Drink"]],
["Pizza Party",2999,["2 Large Pizza","1 Liter Drink"]],
["Twins Deal",1350,["1 Lasagna","2 Arabic Chicken Wrap","2 Regular Drinks"]],
["Star Duo",999,["2 Chicken Star Burgers","Simple Fries","2 Regular Drinks"]],
["The Power Play",2999,["2 Bingo Beef Burgers","2 Crunch Burgers","1 Large Pizza","1.5 Liter Drink"]],
["Kids Meal",null,["1 Chicken Star Burger","1 Simple Fries","1 Drink"]],
["Buddies Duo",null,["2 Crunch Burgers","1 Simple Fries","2 Drinks"]],
["Crunch on Wings",1699,["1 Crunchy Pasta","2 Crunch Burgers","10pc Crispy Wings","1 Liter Drink"]],
["MR.360 (THE FAMILIA)",null,["1 Large Pizza","4 Crunch Burgers","2 Single Bihari Rolls","1 Lasagna","1 Chow Mein","5pc Crispy Wings","1 Jumbo Drink"]]
];
let cart=[];
const money=n=>`Rs ${Number(n).toLocaleString('en-PK')}`;

function renderMenu(cat="all"){
 const grid=document.getElementById("menuGrid");
 const items=cat==="all"?menu:menu.filter(x=>x[0]===cat);
 grid.innerHTML=items.map((x,i)=>`<div class="menu-card"><div class="menu-info"><h3>${x[1]}</h3><p>${x[0]==="dips"?"Dip / sauce":"Freshly prepared"}</p></div><strong class="price">${money(x[2])}</strong><button class="add" aria-label="Add ${x[1]}" onclick="addItem(${menu.indexOf(x)})">+</button></div>`).join("");
}
function renderDeals(){
 document.getElementById("dealGrid").innerHTML=deals.map((d,i)=>`<article class="deal-card"><div class="deal-top"><h3>${d[0]}</h3><div class="deal-price">${d[1]?money(d[1]):"Contact"}</div></div><ul>${d[2].map(v=>`<li>${v}</li>`).join("")}</ul>${d[1]?`<button class="deal-btn" onclick="addDeal(${i})">Add deal to order</button>`:`<button class="deal-btn" onclick="location.href='#contact'">Contact for price</button>`}</article>`).join("");
}
function addItem(i){cart.push({name:menu[i][1],price:menu[i][2]});renderCart();document.getElementById("orderPanel").scrollIntoView({behavior:"smooth",block:"nearest"});}
function addPizza(name,price,size){
 cart.push({name:`${name} Pizza — ${size}`,price:Number(price)});
 renderCart();
 const panel=document.getElementById("orderPanel");
 panel.scrollIntoView({behavior:"smooth",block:"nearest"});
}
function addDeal(i){if(!deals[i][1])return;cart.push({name:deals[i][0],price:deals[i][1]});renderCart();document.getElementById("menu").scrollIntoView({behavior:"smooth"});}
function removeItem(i){cart.splice(i,1);renderCart();}
function renderCart(){
 const box=document.getElementById("cartItems"),count=document.getElementById("cartCount"),total=document.getElementById("cartTotal");
 count.textContent=`${cart.length} item${cart.length===1?"":"s"}`;
 if(!cart.length){box.innerHTML='<div class="empty-cart">Your basket is empty.<br><small>Add something delicious from the menu.</small></div>';total.textContent="Rs 0";return;}
 box.innerHTML=cart.map((x,i)=>`<div class="cart-line"><div><b>${x.name}</b><br><small>${money(x.price)}</small></div><button class="cart-remove" onclick="removeItem(${i})">Remove</button></div>`).join("");
 total.textContent=money(cart.reduce((s,x)=>s+x.price,0));
}
document.getElementById("categoryTabs").addEventListener("click",e=>{
 if(e.target.tagName!=="BUTTON")return;
 document.querySelectorAll("#categoryTabs button").forEach(b=>b.classList.remove("active"));e.target.classList.add("active");renderMenu(e.target.dataset.cat);
});
// ---------------- SUPABASE ORDER STORAGE ----------------
// IMPORTANT: Use ONLY the Supabase PUBLISHABLE key here.
// NEVER put the Supabase secret/service-role key in browser code.
const SUPABASE_URL = "https://rrhjmvvhzltrewlxyazk.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "sb_publishable_eCcGyxa_O_3fdjD-9rNcEg_vKfS4sFD";

function getOrderTotal(){
  return cart.reduce((sum,item)=>sum + Number(item.price || 0),0);
}

function getOrderItemsText(){
  return cart.map((item,index)=>`${index+1}. ${item.name} — Rs ${Number(item.price).toLocaleString('en-PK')}`).join("\n");
}

async function saveOrderToSupabase({orderType="WhatsApp", address=""}={}){
  if (!cart.length) return {ok:false, skipped:true};

  if (!SUPABASE_PUBLISHABLE_KEY || SUPABASE_PUBLISHABLE_KEY.includes("PASTE_YOUR")) {
    console.warn("Supabase publishable key has not been added yet. The order will still open WhatsApp.");
    return {ok:false, skipped:true};
  }

  // Your current Supabase table contains these columns:
  // id, created_at, customer_name, phone, order_type, address, total_amount
  const payload = {
    customer_name: "Online Customer",
    phone: "",
    order_type: orderType,
    address: `Order items:\n${getOrderItemsText()}${address ? `\n\n${address}` : ""}`,
    total_amount: getOrderTotal()
  };

  try {
    const response = await fetch(`${SUPABASE_URL}/rest/v1/orders`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "apikey": SUPABASE_PUBLISHABLE_KEY,
        "Authorization": `Bearer ${SUPABASE_PUBLISHABLE_KEY}`,
        "Prefer": "return=minimal"
      },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Supabase order save failed:", response.status, errorText);
      return {ok:false, error:errorText};
    }
    return {ok:true};
  } catch (error) {
    console.error("Supabase order save error:", error);
    return {ok:false, error:String(error)};
  }
}

function buildWhatsAppOrderMessage(locationText=""){
  const total = getOrderTotal();
  const lines = getOrderItemsText();
  let msg = `Assalam-o-Alaikum Valley Bites!\n\nI would like to order:\n${lines}\n\nTotal: Rs ${total.toLocaleString('en-PK')}\n\nName:\nDelivery/Pickup:`;
  if (locationText) msg += `\n\n📍 Customer Location:\n${locationText}`;
  return msg;
}

async function sendWhatsAppOrder(locationText=""){
  if (!cart.length) {
    alert("Please add at least one item to your order.");
    return;
  }

  // Prepare the URL before the async database request so it is ready immediately.
  const phone = "923011070707";
  const message = buildWhatsAppOrderMessage(locationText);
  const waUrl = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;

  const saved = await saveOrderToSupabase({
    orderType: locationText ? "WhatsApp + Location" : "WhatsApp",
    address: locationText ? `Customer location: ${locationText}` : ""
  });

  // Do not block the customer's order if Supabase has a temporary problem.
  if (!saved.ok && !saved.skipped) {
    console.warn("Order could not be saved to Supabase, but WhatsApp will still open.");
  }

  window.open(waUrl, "_blank", "noopener,noreferrer");
}

document.getElementById("whatsappOrder").addEventListener("click", async ()=>{
  await sendWhatsAppOrder();
});

document.querySelector(".menu-toggle").addEventListener("click",()=>{const nav=document.getElementById("navLinks");nav.style.display=nav.style.display==="flex"?"none":"flex";nav.style.position="absolute";nav.style.top="68px";nav.style.left="0";nav.style.right="0";nav.style.background="#071b2b";nav.style.padding="15px 4%";nav.style.flexDirection="column";nav.style.gap="15px";nav.querySelectorAll("a").forEach(a=>a.style.margin="0");});
document.getElementById("reviewForm").addEventListener("submit", async (e)=>{
 e.preventDefault();
 const name=document.getElementById("reviewName").value.trim();
 const rating=document.getElementById("reviewRating").value;
 const review=document.getElementById("reviewText").value.trim();
 if(!name || !review){alert("Please enter your name and review.");return;}
 const message=`Valley Bites Review\nName: ${name}\nRating: ${rating}\nReview: ${review}`;
 try{
  await navigator.clipboard.writeText(message);
 }catch(err){
  // Fallback for browsers that don't support the Clipboard API.
  const temp=document.createElement("textarea");
  temp.value=message;
  temp.setAttribute("readonly","");
  temp.style.position="fixed";
  temp.style.opacity="0";
  document.body.appendChild(temp);
  temp.select();
  document.execCommand("copy");
  temp.remove();
 }
 // Open Instagram after the review text has been copied.
 window.open("https://ig.me/m/valley_bites_bakers","_blank");
});

document.getElementById("pizzaRows").innerHTML=pizzas.map(p=>`<tr><td>${p[0]}</td><td><span class="pizza-order">${money(p[1])}<button class="pizza-add" aria-label="Add ${p[0]} Small pizza" type="button" data-pizza="${encodeURIComponent(p[0])}" data-price="${p[1]}" data-size="Small">+</button></span></td><td><span class="pizza-order">${money(p[2])}<button class="pizza-add" aria-label="Add ${p[0]} Medium pizza" type="button" data-pizza="${encodeURIComponent(p[0])}" data-price="${p[2]}" data-size="Medium">+</button></span></td><td><span class="pizza-order">${money(p[3])}<button class="pizza-add" aria-label="Add ${p[0]} Large pizza" type="button" data-pizza="${encodeURIComponent(p[0])}" data-price="${p[3]}" data-size="Large">+</button></span></td></tr>`).join("");

document.getElementById("pizzaRows").addEventListener("click",e=>{
 const btn=e.target.closest(".pizza-add");
 if(!btn)return;
 e.preventDefault();
 e.stopPropagation();
 const name=decodeURIComponent(btn.dataset.pizza);
 const price=Number(btn.dataset.price);
 const size=btn.dataset.size;
 addPizza(name,price,size);
});
renderMenu();renderDeals();renderCart();


/* Order on WhatsApp + customer's device location */
async function orderOnWhatsAppWithLocation() {
  const button = document.querySelector('.location-order-btn');
  if (!cart.length) {
    alert('Please add at least one item to your order.');
    return;
  }

  if (button) {
    button.disabled = true;
    button.dataset.originalText = button.textContent;
    button.textContent = 'Requesting location permission…';
  }

  if (!navigator.geolocation) {
    alert('Location is not supported by this browser. You can use the normal WhatsApp order button instead.');
    if (button) {
      button.disabled = false;
      button.textContent = button.dataset.originalText || '📍 Order on WhatsApp + Location';
    }
    return;
  }

  navigator.geolocation.getCurrentPosition(
    async function(position) {
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;
      const mapsLink = 'https://www.google.com/maps?q=' + encodeURIComponent(`${latitude},${longitude}`);

      await sendWhatsAppOrder(mapsLink);

      if (button) {
        button.disabled = false;
        button.textContent = button.dataset.originalText || '📍 Order on WhatsApp + Location';
      }
    },
    function(error) {
      let message = 'Location permission was not granted.';
      if (error && error.code === 1) message = 'You denied location permission. Please allow location access if you want to send your location with the order.';
      else if (error && error.code === 2) message = 'Your location could not be determined. Please try again or use the normal WhatsApp order button.';
      else if (error && error.code === 3) message = 'Location request timed out. Please try again or use the normal WhatsApp order button.';

      alert(message);

      if (button) {
        button.disabled = false;
        button.textContent = button.dataset.originalText || '📍 Order on WhatsApp + Location';
      }
    },
    {
      enableHighAccuracy: true,
      timeout: 15000,
      maximumAge: 0
    }
  );
}
