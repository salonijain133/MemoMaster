const close = document.querySelector("#closebtn");
const overlay = document.querySelector("#overlay");
const addbtn = document.querySelector("#addbtn");
const makebtn = document.querySelector(".makebtn");
const card = document.querySelector(".cards")
if (localStorage.getItem("tasks") === null) {
    localStorage.setItem("tasks", JSON.stringify([]))
}

close.addEventListener("click", function () {
    overlay.style.display = "none";
});

addbtn.addEventListener("click", function () {
    overlay.style.display = "initial";
});

makebtn.addEventListener("click", function () {
    const valueofTitle = document.querySelector(".title").value;
    const valueofData = document.querySelector(".data").value;
    if(valueofTitle==="" || valueofData===""){
        overlay.style.display = "none";
        alert("Input Cannot be empty")
        return
    }
    else{
        var obj = {
            title: valueofTitle,
            data: valueofData
        }
        var allprevioustasks = localStorage.getItem("tasks");
        var allparsedtasks = JSON.parse(allprevioustasks);
        for (var i = 0; i < allparsedtasks.length; i++) {
            if (allparsedtasks[i].title === valueofTitle) {
                overlay.style.display = "none";
                document.querySelector(".title").value="";
    document.querySelector(".data").value="";
                alert("Title Cannot be Same");
                return;
            }
        }
        allparsedtasks.push(obj);
        var newtasks = JSON.stringify(allparsedtasks);
        localStorage.setItem("tasks", newtasks);
        overlay.style.display = "none";
        printer();
    }

    document.querySelector(".title").value="";
    document.querySelector(".data").value="";
})

function printer() {
    var finaldata = JSON.parse(localStorage.getItem("tasks"))
    var clutter = "";
    for (var i = 0; i < finaldata.length; i++) {
        if ((finaldata[i].title) === heading) {
            finaldata.splice(i, 1);
        }
    }
    finaldata.forEach(function (elem) {
        clutter += `<div class="card w-48 p-4 bg-zinc-700/90 rounded-lg  ">
        <i class="ri-delete-bin-6-line flex justify-end mb-[-15px] pointer-events-auto"></i>
                  <h1 class="text-lg tracking-wider pointer-events-none break-normal">${elem.title}</h1>
                  <p class="text-xs pt-2 pointer-events-none">${elem.data}</p>
                  </div>`
    })
    document.querySelector(".cards").innerHTML = clutter;
    if (finaldata.length > 0) {
        document.querySelector(".vacant").style.display = "none";
    }
    else {
        document.querySelector(".vacant").style.display = "initital";
    }
}
var heading = "";
card.addEventListener("click", function (dets) {
    const details = dets.target.parentElement;
    heading = details.querySelector("h1").textContent;
    var finaldata = JSON.parse(localStorage.getItem("tasks"));
    for (var i = 0; i < finaldata.length; i++) {
        if ((finaldata[i].title) === heading) {
            finaldata.splice(i, 1);
        }
    }
    localStorage.setItem("tasks", JSON.stringify(finaldata))
    printer();
})


printer();