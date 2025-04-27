const innerBlocks = document.querySelectorAll(".inner-block");

innerBlocks.forEach(item => {
    item.addEventListener("mouseover", () => {
        item.style.borderWidth = "5px";
        item.style.margin = "7px";
        item.style.cursor = "pointer";
    })

    item.addEventListener("mouseout", () => {
        item.style.borderWidth = "2px";
        item.style.margin = "10px";
    })

});

const educationBlocks = document.querySelectorAll(".education-block");

educationBlocks.forEach(item => {
    item.addEventListener("mouseover", () => {
        item.style.borderWidth = "5px";
        item.style.margin = "7px";
    })

    item.addEventListener("mouseout", () => {
        item.style.borderWidth = "2px";
        item.style.margin = "10px";
    })

});


const exampleBlocks = document.querySelectorAll(".example-block");

exampleBlocks.forEach(item => {
    item.addEventListener("mouseover", () => {
        item.style.borderWidth = "5px";
        item.style.margin = "7px";
        item.style.cursor = "pointer";
    })

    item.addEventListener("mouseout", () => {
        item.style.borderWidth = "2px";
        item.style.margin = "10px";
    })

    item.addEventListener("click", function(e) {
        e.preventDefault();
        window.location.href = `info`;
    })
})
