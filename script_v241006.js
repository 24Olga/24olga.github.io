function updateTime() {   
 const now = new Date();
 const beijingTime = new Date(now.getTime() + now.getTimezoneOffset() * 60000 + 480 * 60000)
 const hours = String(beijingTime.getHours()).padStart(2, '0')
 const minutes = String(beijingTime.getMinutes()).padStart(2, '0')
 const seconds = String(beijingTime.getSeconds()).padStart(2, '0')
 
 const timeString = `现在是北京时间 ${beijingTime.getFullYear()}年${String(beijingTime.getMonth() + 1).padStart(2, '0')}月${String(beijingTime.getDate()).padStart(2, '0')}日 ${hours}:${minutes}:${seconds}`;    
 document.getElementById('currentTime').innerText = timeString;
}

updateTime();    
setInterval(updateTime, 1000); 

document.addEventListener('DOMContentLoaded', () => {  
 const toggleIcons = document.querySelectorAll('.toggle-icon'); // 选择所有具有toggle-icon类的元素  
 const toggleContents = document.querySelectorAll('.toggle-content'); // 假设每个.toggle-icon对应一个.toggle-content  

toggleIcons.forEach((toggleIcon, index) => { // 对每个.toggle-icon元素执行以下操作  
     const toggleContent = toggleContents[index]; // 获取对应的.toggle-content元素（这里假设它们是按顺序对应的）  
     let isExpanded = false;  

     const toggleContentDisplay = () => {  
         if (isExpanded) {  
             toggleContent.classList.remove('expanded');  
             toggleIcon.textContent = '展开 v';  
         } else {  
             toggleContent.classList.add('expanded');  
             toggleIcon.textContent = '收起 ʌ';  
         }  
         isExpanded = !isExpanded;  
     };  

     toggleIcon.addEventListener('click', toggleContentDisplay);  
 });  
});
