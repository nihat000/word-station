let data;
let el;
let words = [];
let p = 1;


getData();

function getData() {
   fetch(`https://sozluk.obastan.com/sozler/siyahi?p=${p}`)
      .then(res => res.text())
      .then(res => { data = res; parseHTML() })
}


function parseHTML() {
   el = document.createElement('html')
   el.innerHTML += data;
   console.log(data, el, p);
   el.querySelectorAll('.word-list li a').forEach(q => {
      if (q.innerText.length > 3)
         words.push(q.innerText);
   })
   p++;
   if (p <= 400) {
      getData();
   }
}



