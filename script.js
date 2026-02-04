const modal=document.getElementById("imageModal");const modalImage=document.getElementById("modalImage");const modalDescription=document.getElementById("modalDescription");const galleryImages=document.querySelectorAll(".gallery img");const closeBtn=document.querySelector(".close");galleryImages.forEach(img=>{img.onclick=function(){modal.style.display="flex";modalImage.src=this.src;modalDescription.innerHTML=this.title;modalImage.style.animation="zoomIn 0.3s ease";}});closeBtn.onclick=function(){closeModal();}
modal.onclick=function(event){if(event.target===modal){closeModal();}}
function closeModal(){modal.style.display="none";}
function disableRightClick(){document.addEventListener("contextmenu",function(e){e.preventDefault();});}
disableRightClick();
