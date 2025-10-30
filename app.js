// App logic (client-side demo)
(function(){
  // util
  function q(s, root=document){ return root.querySelector(s) }
  function qAll(s, root=document){ return Array.from(root.querySelectorAll(s)) }

  // Index page: show popular
  function renderPopular(){
    const el = q('#popularList');
    if(!el) return;
    el.innerHTML = '';
    FAKE_CARS.forEach(c=>{
      const div = document.createElement('div');
      div.className = 'car-card';
      div.innerHTML = `
        <img src="${c.img}" alt="${c.title}" />
        <h4>${c.title}</h4>
        <div class="small">${c.location} • ${c.seats} ghế</div>
        <div class="car-actions">
          <div><strong>${(c.pricePerDay).toLocaleString()}₫/ngày</strong></div>
          <div><a href="car.html?id=${c.id}" class="btn">Xem</a></div>
        </div>
      `;
      el.appendChild(div);
    })
  }

  // Listing page
  function renderListing(){
    const el = q('#carGrid');
    if(!el) return;
    function buildCard(c){
      const div = document.createElement('div');
      div.className='car-card';
      div.innerHTML = `
        <img src="${c.img}" alt="${c.title}" />
        <h4>${c.title}</h4>
        <div class="small">${c.location} • ${c.type==='self'?'Tự lái':'Có tài xế'}</div>
        <div class="small">${c.description}</div>
        <div class="car-actions">
          <div><strong>${(c.pricePerDay).toLocaleString()}₫/ngày</strong></div>
          <div><a href="car.html?id=${c.id}">Chi tiết</a></div>
        </div>
      `;
      return div;
    }
    el.innerHTML='';
    FAKE_CARS.forEach(c=> el.appendChild(buildCard(c)))
    // filter
    const btn = q('#btnFilter');
    if(btn){
      btn.onclick = ()=>{
        const type = q('#filterType').value;
        const loc = q('#filterLocation').value.trim().toLowerCase();
        const max = Number(q('#filterMaxPrice').value) || Infinity;
        const filtered = FAKE_CARS.filter(c=>{
          if(type && c.type!==type) return false;
          if(loc && !c.location.toLowerCase().includes(loc)) return false;
          if(c.pricePerDay>max) return false;
          return true;
        });
        el.innerHTML='';
        filtered.forEach(c=> el.appendChild(buildCard(c)));
      }
    }
  }

  // Car detail
  function renderCarDetail(){
    const el = q('#carDetail');
    if(!el) return;
    const params = new URLSearchParams(location.search);
    const id = params.get('id');
    const car = FAKE_CARS.find(x=>x.id===id) || FAKE_CARS[0];
    el.innerHTML = `
      <div>
        <img src="${car.img}" alt="${car.title}" />
        <h2>${car.title}</h2>
        <div class="small">${car.location} • ${car.seats} ghế • ${car.type==='self'?'Tự lái':'Có tài xế'}</div>
        <p>${car.description}</p>
      </div>
      <aside>
        <div class="contract">
          <h3>${(car.pricePerDay).toLocaleString()}₫ / ngày</h3>
          <label>Ngày bắt đầu <input id="rent_from" type="date" /></label><br/>
          <label>Ngày kết thúc <input id="rent_to" type="date" /></label><br/>
          <label>Hình thức
            <select id="rent_mode">
              <option value="self">Tự lái</option>
              <option value="driver">Có tài xế</option>
            </select>
          </label>
          <div style="margin-top:10px">
            <button id="btnToContract">Tạo hợp đồng</button>
          </div>
        </div>
      </aside>
    `;
    q('#rent_mode').value = car.type;
    q('#btnToContract').onclick = ()=>{
      const from = q('#rent_from').value;
      const to = q('#rent_to').value;
      if(!from||!to){ alert('Chọn ngày thuê và trả'); return; }
      const order = {
        id: 'o'+Date.now(),
        carId: car.id,
        title: car.title,
        from, to,
        pricePerDay: car.pricePerDay,
        status: 'pending'
      };
      localStorage.setItem('current_order', JSON.stringify(order));
      location.href = 'contract.html';
    }
  }

  // Contract page
  function renderContract(){
    const el = q('#contractArea');
    if(!el) return;
    const raw = localStorage.getItem('current_order');
    if(!raw){ el.innerHTML='<p>Không có hợp đồng hiện tại. Vui lòng chọn xe.</p>'; return; }
    const order = JSON.parse(raw);
    const car = FAKE_CARS.find(c=>c.id===order.carId);
    const days = (new Date(order.to) - new Date(order.from))/(1000*60*60*24) || 1;
    const total = days * order.pricePerDay;
    el.innerHTML = `
      <div class="contract">
        <h3>Hợp đồng thuê: ${order.title}</h3>
        <p>Thời gian: ${order.from} → ${order.to} (${days} ngày)</p>
        <p>Đơn giá: ${(order.pricePerDay).toLocaleString()}₫/ngày</p>
        <p><strong>Tổng (demo): ${total.toLocaleString()}₫</strong></p>
        <p class="small">Chủ xe: Nguyễn Văn A (demo)</p>
      </div>
    `;
    q('#btnSign').onclick = ()=>{
      if(!q('#agree').checked){ q('#contractMsg').textContent='Bạn cần đồng ý điều khoản.'; return; }
      // mark as signed and move to payment
      order.status = 'signed';
      localStorage.setItem('current_order', JSON.stringify(order));
      localStorage.setItem('last_payment_amount', String(total));
      location.href = 'payment.html';
    }
  }

  // Payment page
  function renderPayment(){
    const el = q('#paymentSummary');
    if(!el) return;
    const raw = localStorage.getItem('current_order');
    if(!raw){ el.innerHTML='<p>Không có đơn hàng.</p>'; return; }
    const order = JSON.parse(raw);
    const amount = Number(localStorage.getItem('last_payment_amount') || 0);
    el.innerHTML = `
      <div class="contract">
        <h3>Thanh toán đơn: ${order.title}</h3>
        <p>Số tiền (demo): <strong>${amount.toLocaleString()}₫</strong></p>
      </div>
    `;
    q('#payMomo').onclick = ()=> doPayment('Momo', amount);
    q('#payCard').onclick = ()=> doPayment('Card', amount);
    function doPayment(method, amount){
      // simulate success
      const orderList = JSON.parse(localStorage.getItem(FAKE_ORDERS_KEY) || '[]');
      order.status = 'paid';
      order.paidAt = new Date().toISOString();
      order.paymentMethod = method;
      order.amount = amount;
      orderList.push(order);
      localStorage.setItem(FAKE_ORDERS_KEY, JSON.stringify(orderList));
      localStorage.removeItem('current_order');
      q('#paymentMsg').textContent = 'Thanh toán thành công (demo). Đã lưu vào Quản lý.';
    }
  }

  // Dashboard
  function renderDashboard(){
    const el = q('#ordersList');
    if(!el) return;
    function refresh(){
      const list = JSON.parse(localStorage.getItem(FAKE_ORDERS_KEY) || '[]');
      if(list.length===0){ el.innerHTML='<p>Chưa có đơn thuê. Nhấn "Tạo dữ liệu demo".</p>'; return; }
      el.innerHTML = list.map(o=>`
        <div class="car-card">
          <h4>${o.title}</h4>
          <div class="small">${o.from} → ${o.to}</div>
          <div class="small">Trạng thái: ${o.status} • ${o.paymentMethod||'—'}</div>
        </div>
      `).join('');
    }
    q('#seedBtn').onclick = ()=>{
      const demo = [{
        id:'o_demo_1', carId:'c1', title:'Toyota Vios 2020', from:'2025-10-01', to:'2025-10-05', status:'paid', amount:2000000, paymentMethod:'Momo'
      }];
      localStorage.setItem(FAKE_ORDERS_KEY, JSON.stringify(demo));
      refresh();
    }
    q('#clearBtn').onclick = ()=>{
      localStorage.removeItem(FAKE_ORDERS_KEY);
      refresh();
    }
    refresh();
  }

  // Chat (simple demo using localStorage as backing store)
  function renderChat(){
    const convList = q('#convList');
    const messagesEl = q('#messages');
    if(!convList || !messagesEl) return;
    const owner = {id:'owner_demo', name:'Chủ xe A'};
    // preload some convs
    let convs = JSON.parse(localStorage.getItem('demo_convs') || '[]');
    if(convs.length===0){
      convs = [{id:'chat1', title:'Trao đổi về giao nhận', last:'Xin chào, khi nào giao xe?', messages:[
        {from:'them',text:'Xin chào, khi nào giao xe?',time:Date.now()-3600*1000},
        {from:'me',text:'Sáng mai 9h ok',time:Date.now()-3500*1000}
      ]}];
      localStorage.setItem('demo_convs', JSON.stringify(convs));
    }
    function refreshConvs(){
      convList.innerHTML = convs.map(c=>`<div class="conv-item" data-id="${c.id}">${c.title}<div class="small">${new Date(c.messages.slice(-1)[0].time).toLocaleString()}</div></div>`).join('');
    }
    function openConv(id){
      const conv = convs.find(c=>c.id===id);
      if(!conv) return;
      messagesEl.innerHTML = conv.messages.map(m=>`<div class="msg ${m.from==='me'?'me':'them'}">${m.text}<div class="small">${new Date(m.time).toLocaleTimeString()}</div></div>`).join('');
      messagesEl.scrollTop = messagesEl.scrollHeight;
      q('#sendBtn').onclick = ()=>{
        const text = q('#msgInput').value.trim();
        if(!text) return;
        const msg = {from:'me',text,time:Date.now()};
        conv.messages.push(msg);
        localStorage.setItem('demo_convs', JSON.stringify(convs));
        q('#msgInput').value='';
        openConv(id);
        // simulate reply after delay
        setTimeout(()=>{ conv.messages.push({from:'them',text:'Cám ơn, đã nhận.',time:Date.now()}); localStorage.setItem('demo_convs', JSON.stringify(convs)); openConv(id); }, 1200);
      }
    }
    refreshConvs();
    // attach click
    convList.onclick = (e)=>{
      const item = e.target.closest('.conv-item');
      if(!item) return;
      openConv(item.dataset.id);
    }
    // open first
    if(convs[0]) openConv(convs[0].id);
  }

  // Router: call all renderers on load
  document.addEventListener('DOMContentLoaded', ()=>{
    renderPopular(); renderListing(); renderCarDetail(); renderContract(); renderPayment(); renderDashboard(); renderChat();

    // small search redirect
    const sf = q('#searchForm');
    if(sf){
      sf.addEventListener('submit', e=>{
        e.preventDefault();
        const loc = q('#q_location').value;
        const type = q('#q_type').value;
        let url = 'listing.html';
        const params = new URLSearchParams();
        if(loc) params.set('location', loc);
        if(type) params.set('type', type);
        if([...params].length) url += '?'+params.toString();
        location.href = url;
      })
    }

    // listing filters from query
    const params = new URLSearchParams(location.search);
    const loc = params.get('location');
    const type = params.get('type');
    if(loc) {
      const inp = q('#filterLocation');
      if(inp) inp.value = loc;
      const btn = q('#btnFilter'); if(btn) btn.click();
    }
    if(type){
      const sel = q('#filterType'); if(sel) sel.value = type;
    }
  });

})();
