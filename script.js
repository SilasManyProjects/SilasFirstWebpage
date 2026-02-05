const modal=document.getElementById("imageModal");const modalImage=document.getElementById("modalImage");const modalDescription=document.getElementById("modalDescription");const galleryImages=document.querySelectorAll(".gallery img");const closeBtn=document.querySelector(".close");galleryImages.forEach(img=>{img.onclick=function(){modal.style.display="flex";modalImage.src=this.src;modalDescription.innerHTML=this.title;modalImage.style.animation="zoomIn 0.3s ease";}});closeBtn.onclick=function(){closeModal();}
modal.onclick=function(event){if(event.target===modal){closeModal();}}
function closeModal(){modal.style.display="none";}
const musicBtn=document.getElementById('musicBtn');let audio=null;let isPlaying=false;musicBtn.onclick=function(){if(!audio){audio=new Audio('music.mp3');audio.loop=true;audio.volume=0.5;}
if(isPlaying){audio.pause();musicBtn.innerHTML="► Play Music";musicBtn.style.background="linear-gradient(to right, #380052, #1f003b)";}else{audio.play();musicBtn.innerHTML="❚❚ Pause Music";musicBtn.style.background="#5e008a";}
isPlaying=!isPlaying;};function disableRightClick(){document.addEventListener("contextmenu",function(e){e.preventDefault();});}
disableRightClick();
