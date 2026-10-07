const demoJobs=[
 {title:"Junior Café Team Member",business:"Sunny Café",category:"Hospitality",location:"Cockburn, WA",desc:"Help with customers, food prep and keeping the café tidy. Training provided.",apply:"Demo listing — contact the business directly."},
 {title:"Retail Team Member",business:"Local Retail Store",category:"Retail",location:"Perth, WA",desc:"Customer service, stock and keeping the store looking great. Great starter role.",apply:"Demo listing — contact the business directly."},
 {title:"Junior Fast Food Crew",business:"Local Food Store",category:"Fast Food",location:"Fremantle, WA",desc:"A beginner-friendly team role with flexible shifts and training.",apply:"Demo listing — contact the business directly."}
];
const list=document.getElementById("jobList"), noJobs=document.getElementById("noJobs");
function getJobs(){return [...demoJobs,...JSON.parse(localStorage.getItem("firstjobJobs")||"[]")]}
function render(){
 const q=document.getElementById("search").value.toLowerCase(), c=document.getElementById("category").value;
 const jobs=getJobs().filter(j=>(!q||JSON.stringify(j).toLowerCase().includes(q))&&(!c||j.category===c));
 list.innerHTML=jobs.map(j=>`<article class="job"><span class="job-tag">${j.category}</span><h3>${j.title}</h3><p><b>${j.business}</b></p><p>📍 ${j.location}</p><p>${j.desc}</p><a class="btn apply" href="#post">View / Apply</a></article>`).join("");
 noJobs.classList.toggle("hidden",jobs.length>0);
}
document.getElementById("searchBtn").onclick=render;
document.getElementById("search").oninput=render;
document.getElementById("category").onchange=render;
document.getElementById("postForm").onsubmit=e=>{
 e.preventDefault(); const f=new FormData(e.target);
 const job=Object.fromEntries(f.entries());
 const jobs=JSON.parse(localStorage.getItem("firstjobJobs")||"[]"); jobs.push(job);
 localStorage.setItem("firstjobJobs",JSON.stringify(jobs));
 document.getElementById("formMsg").textContent="Job added to this device. For a public live marketplace, connect this form to a database/backend.";
 document.getElementById("formMsg").classList.remove("hidden"); e.target.reset(); render();
};
render();