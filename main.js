/* get inputs values*/
var courseName=document.getElementById('courseName')
var courseCategory=document.getElementById('courseCategory')
var coursePrice=document.getElementById('coursePrice')
var courseDescription=document.getElementById('courseDescription')
var courseCapacity=document.getElementById('courseCapacity')
var addbtn=document.getElementById('click');
var table=document.querySelector('.data')
var deleteBtn=document.querySelector('.btn')
var search=document.getElementById('search');
var currentIndex=0;

var courses;//مشان اول ما اعمل ريفريش وانا من الاصل مدخل عناصر يرجع يعرضهن  وما ينحذفن
if(JSON.parse(localStorage.getItem('courses'))==null){
  courses=[];
}
else{
  courses=JSON.parse(localStorage.getItem('courses'));
  displayData();  
}


addbtn.onclick=(e)=>{
   e.preventDefault();
   if(addbtn.innerHTML=='add course'){
    addCourse();
   }
   else if(addbtn.innerHTML=='update course'){
   updateCourse();
   }

   courseName.classList.remove('is-valid');
   courseCategory.classList.remove('is-valid');
   coursePrice.classList.remove('is-valid');
   courseDescription.classList.remove('is-valid');
   courseCapacity.classList.remove('is-valid');
   
 
}

//add course 
function addCourse(){
  var course={
    courseName:courseName.value,
    courseCategory:courseCategory.value,
    coursePrice:coursePrice.value,
    courseDescription:courseDescription.value,
    courseCapacity:courseCapacity.value
   }
   
   courses.push(course);
   localStorage.setItem('courses',JSON.stringify(courses))
   Swal.fire({
    position: "center",
    icon: "success",
    title: "Course added successfully",
    showConfirmButton: false,
    timer: 1500
  });
   clearInputs();
   displayData(courses);

}
//clear Inputs
function clearInputs(){
    courseName.value='';
    courseCategory.value='';
    coursePrice.value='';
    courseDescription.value='';
    courseCapacity.value='';
}

//read =>display data in table
function displayData(result=courses){
    
  
    table.innerHTML='';
    var result  =courses.map((e,index)=>{  
      return `
       <tr class='info'>
        <td>${index+1}</td>
        <td>${e.courseName}</td>
        <td>${e.courseCategory}</td>
        <td>${e.coursePrice}</td>
        <td>${e.courseDescription}</td>
        <td>${e.courseCapacity}</td>
        <td><button class='editBtn '  onclick=getCourse(${index})>update</button></td>
        <td ><button class='deleteBtn ' onclick=deletCourse(${index})>Delete</button></td>
       </tr>
        `
        
    }).join('')
    
    table.innerHTML=result;

}

//delete course
function deletCourse(index){
   
    Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!"
      }).then((result) => {
        if (result.isConfirmed) {
            courses.splice(index,1)
            localStorage.setItem('courses',JSON.stringify(courses))
            displayData(courses);
          Swal.fire({
            title: "Deleted!",
            text: "Your file has been deleted.",
            icon: "success"
            
          });
        }
      });
    
}

//update course
function getCourse(index){
    var course=courses[index];
    courseName.value=course.courseName;
    courseCategory.value=course.courseCategory;
    coursePrice.value=course.coursePrice;
    courseDescription.value=course.courseDescription;
    courseCapacity.value=course.courseCapacity;
    addbtn.innerHTML = "update course";
    currentIndex=index;
    
}

function updateCourse(){
  var course={
    courseName:courseName.value,
    courseCategory:courseCategory.value,
    coursePrice:coursePrice.value,
    courseDescription:courseDescription.value,
    courseCapacity:courseCapacity.value
   };
   
   var name=courses[currentIndex].courseName
   courses[currentIndex].courseName=course.courseName;
   courses[currentIndex].courseCategory=course.courseCategory;
   courses[currentIndex].coursePrice=course.coursePrice;
   courses[currentIndex].courseDescription=course.courseDescription;
   courses[currentIndex].courseCapacity=course.courseCapacity;
   localStorage.setItem('courses',JSON.stringify(courses))
   addbtn.innerHTML = "Add course";
   Swal.fire({
    position: "center",
    icon: "success",
    title: `${name} updated successfully`,
    showConfirmButton: false,
    timer: 1500
  });
   displayData();
   clearInputs();
   
   
   
  }

   
    




//delete all
deleteBtn.onclick=(e)=>{
    e.preventDefault();

    Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!"
      }).then((result) => {
        if (result.isConfirmed) {
            courses=[];
            localStorage.setItem('courses',JSON.stringify(courses))
           //displayData(courses); 
            table.innerHTML=''; //هاي والسطر الي قبله نفس الاشي بعملن 
          Swal.fire({
            title: "Deleted!",
            text: "all data has been deleted!",
            icon: "success"
          });
        }
      });
    
}

//search 

/*
onkeydown
onkeypressما بشتغل على كل الكبسات زي الشفت والكونترول 
onkeyup
*/

search.onkeyup=()=>{
   let result= courses.map((e,index)=>{
    if(e.courseName.toLowerCase().includes(search.value.toLowerCase() ) ){
        return`
       <tr class='info'>
        <td>${index+1}</td>
        <td>${e.courseName}</td>
        <td>${e.courseCategory}</td>
        <td>${e.coursePrice}</td>
        <td>${e.courseDescription}</td>
        <td>${e.courseCapacity}</td>
        <td><button class='editBtn ' onclick=updateCourse(${index})>update</button></td>
        <td ><button class='deleteBtn ' onclick=deletCourse(${index})>Delete</button></td>
       </tr>
        
        `

    }
   }).join('')
   table.innerHTML=result;
    
}

//validation
/**
 * regex
 *  مشان اعمل فالديشن لازم امسك كل 
 * انبوت لحال واشوف  الفاليو الي بدخلها اليوزر 
 * وافحصها بناء على بترن معين وه ));ا البترن  بكون
 *  معرفة وبفحصة اذا كان مطابق للاشي الي دخله 
 * اليوزر معناها اقبل هاي الداتا 
 * 
 * بدي اقارن كل حرف بكتبه اليوزر لذلك بلزمني onkeyup 
 */

/**
 * first letter capital
 * 3-10 letter
 * no numbers
 * test ميثود بتشوف اذا الاشي الي دخلته مطابق 
 * contains  بفحص اذا في كلاس موجوده بالل Listclass  
 */
//course name validation
let error =document.querySelector('.text-danger');
courseName.onkeyup=()=>{
  let regex=/^[A-Z][a-z]{2,10}$/;
  if(regex.test(courseName.value)){
    if((courseName.classList.contains('is-invalid')) && 
  error.classList.contains('d-block')){
      courseName.classList.replace('is-invalid','is-valid');
      error.classList.replace('d-block','d-none')
    }else
    courseName.classList.add('is-valid');
    addbtn.removeAttribute('disabled')
    
  }
  

  else{
    
    if((courseName.classList.contains('is-valid')) 
    &&error.classList.contains('d-none')){
     error.classList.replace('d-none','d-block')
      courseName.classList.replace('is-valid','is-invalid');
    }
    else
    courseName.classList.add('is-invalid');
    error.classList.replace('d-none','d-block')
     
    addbtn.setAttribute('disabled','disabled');
    
  }
}
//Category
/**
 * first letter capital
 * name 3-20
 * no numbers
 * regex=/^[A-Z][a-z]{2,20}$/
 */

courseCategory.onkeyup=()=>{
  let regex=/^[A-Z][a-z]{2,10}$/;
  if(regex.test(courseCategory.value)){
    if(courseCategory.classList.contains('is-invalid')){
      courseCategory.classList.replace('is-invalid','is-valid');
    }else
    courseCategory.classList.add('is-valid');
    addbtn.removeAttribute('disabled')
    
  }
  

  else{
    if(courseCategory.classList.contains('is-valid')){
      courseCategory.classList.replace('is-valid','is-invalid');
    }
    else
    courseCategory.classList.add('is-invalid');
    addbtn.setAttribute('disabled','disabled');
    
  }
}

//Price
/**
 * numbers
 * 3 digits
 * 
 * regex=/^[0-9]{3,4}$/
 */

coursePrice.onkeyup=()=>{
  let regex=/^[0-9]{3,4}$/;
  if(regex.test(coursePrice.value)){
    if(coursePrice.classList.contains('is-invalid')){
      coursePrice.classList.replace('is-invalid','is-valid');
    }else
    coursePrice.classList.add('is-valid');
    addbtn.removeAttribute('disabled')
    
  }
  

  else{
    if(coursePrice.classList.contains('is-valid')){
      coursePrice.classList.replace('is-valid','is-invalid');
    }
    else
    coursePrice.classList.add('is-invalid');
    addbtn.setAttribute('disabled','disabled');
    
  }
}

//description
/**
 *first letter capital
 * numbers
 * num of chars 120
 * 
 */

courseDescription.onkeyup=()=>{
  let regex=/^[A-Z][A-Za-z0-9\s]{3,120}$/;
  if(regex.test(courseDescription.value)){
    if(courseDescription.classList.contains('is-invalid')){
      courseDescription.classList.replace('is-invalid','is-valid');
    }else
    courseDescription.classList.add('is-valid');
    addbtn.removeAttribute('disabled')
    
  }
  

  else{
    if(courseDescription.classList.contains('is-valid')){
      courseDescription.classList.replace('is-valid','is-invalid');
    }
    else
    courseDescription.classList.add('is-invalid');
    addbtn.setAttribute('disabled','disabled');
    
  }
}

//Capacity
/**
 * numbers
 * 2-3 digits
 * 
 * regex=/^[0-9]{3,4}$/
 */

courseCapacity.onkeyup=()=>{
  let regex=/^[0-9]{3,4}$/;
  if(regex.test(courseCapacity.value)){
    if(courseCapacity.classList.contains('is-invalid')){
      courseCapacity.classList.replace('is-invalid','is-valid');
    }else
    courseCapacity.classList.add('is-valid');
    addbtn.removeAttribute('disabled')
    
  }
  

  else{
    if(courseCapacity.classList.contains('is-valid')){
      courseCapacity.classList.replace('is-valid','is-invalid');
    }
    else
    courseCapacity.classList.add('is-invalid');
    addbtn.setAttribute('disabled','disabled');
    
  }
}






