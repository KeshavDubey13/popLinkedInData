const fetchDataShow = document.getElementById("Data")

const fun = () => {
    var clas = document.getElementsByClassName("artdeco-card ember-view relative break-words pb3 mt2")
    var tagName = document.getElementsByClassName("artdeco-card ember-view pv-top-card")
    //exexperience
    var exp = document.getElementById("experience")
    var ExperienceIndex = 0;
    //Education
    var education = document.getElementById("education")
    var educationIndex = 0;

    //loop for find ExperienceIndex
    for (i in clas) {
        if (clas[i].firstElementChild === exp) {
            ExperienceIndex = i;
        }
    }
    //remove duplicates from array
    var Experience_Data_Duplicate = [];
    var Experience_Remove_Dupliicate = [];
    try {
        if (ExperienceIndex === 0) {
        }
        else {
            var Experience_Data = clas[ExperienceIndex].children[2].children[0].children;
            //remove "\n" from array
            // this loop will be travers trough all the children of Experience_Data and remove extra \n 
            for (let index = 0; index < Experience_Data.length; index++) {
                Experience_Data_Duplicate.push(Experience_Data[index].innerText.split("\n"))
            }

            // this loop will be remove all the duplicates and then convert the array to string 
            for (let index = 0; index < Experience_Data_Duplicate.length; index++) {
                Experience_Remove_Dupliicate.push([...new Set(Experience_Data_Duplicate[index])].slice(0, 3))
            }
        }
    } catch (error) {
        console.log(error);
    }



    // loop for find EductionIndex 
    for (i in clas) {
        if (clas[i].firstElementChild === education) {
            educationIndex = i;
        }
    }

    var education_Data_Duplicates = [];
    var education_Data_Duplicates_Remove = [];

    try {
        if (educationIndex === 0) {

        }
        else {
            var education_Data = clas[educationIndex].children[2].children[0].children;
            //remove "\n" from array
            // this loop will be travers trough all the children of Experience_Data and remove extra \n 
            for (let index = 0; index < education_Data.length; index++) {
                education_Data_Duplicates.push(education_Data[index].innerText.split("\n"))
            }
            // this loop will be remove all the duplicates and then convert the array to string 
            for (let index = 0; index < education_Data_Duplicates.length; index++) {
                education_Data_Duplicates_Remove.push([...new Set(education_Data_Duplicates[index])].toString())

            }
        }
    } catch (error) {
        console.log(error);
    }
    console.log(tagName);
    // find TagName 
    var getTagName = tagName[0].children[1].children[1].children[0].innerText;
    // find name
    var Name = tagName[0].children[1].children[1].children[0].children[0].children[0].innerText;

    var getTagName_Duplicates = [];
    var getTagName_Duplicates_Remove = [];

    getTagName_Duplicates.push(getTagName.split("\n"))

    for (let index = 0; index < getTagName_Duplicates.length; index++) {
        getTagName_Duplicates_Remove.push([...new Set(getTagName_Duplicates[index])])
    }
    var TagName = getTagName_Duplicates_Remove.toString()

    var newArray = [];

    for (let index = 0; index < Experience_Remove_Dupliicate.length; index++) {
        newArray.push({ Role: Experience_Remove_Dupliicate[index][0], Company: Experience_Remove_Dupliicate[index][1], Duraion: Experience_Remove_Dupliicate[index][2] })
    }

    var pepoleJson = {
        Name: Name,
        TagLine: TagName,
        Experience: newArray,
        Eduction: education_Data_Duplicates_Remove.length > 0 ? education_Data_Duplicates_Remove : "Sorry No Data Found",
    }

    var stringiFy = JSON.stringify(pepoleJson, null, 2)
   return stringiFy;
    
}   



setTimeout( async()=>{
    let [tab] = await chrome.tabs.query({active:true,currentWindow:true});
    chrome.scripting.executeScript({
        target:{tabId:tab.id},
        function:fun
    },
    async(injectionResults)=>{
        const [data] = injectionResults
        fetchDataShow.innerText=data.result

    }
    
    )


},1000)










