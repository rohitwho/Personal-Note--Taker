

document.addEventListener('DOMContentLoaded', () => {
 



  async function getNotes() {
    try {
      const response = await fetch("/api/notes", {
        method: "GET",
        headers: { 'Content-Type': 'application/json' },
      });
      if (!response.ok) {
        throw new Error('Error in GET request: ' + response.status);
      }

      const data = await response.json();
      console.log("This is the fetched data:", data);

      const ul = document.querySelector(".Pendin-Notes");
      ul.innerHTML = '';

      data.forEach((note) => {
        const li = document.createElement("li");
        li.className = "Pending-Notes-Link";
        li.innerHTML = `${note.title}`;
        li.setAttribute("id", `${note.id}`);
        li.addEventListener("click", (e) => {showEntry(note.id,li)})

        const img = document.createElement("img");
        img.src = "./assets/images/trash.png";
        img.alt = "DELETE ICON";
        img.className = "Pending-Notes-Link-Delete";
        img.onclick = () => removeNote(note.id, li); // Pass the note ID and li element as arguments

        ul.appendChild(li);
        li.appendChild(img);
      });
    } catch (error) {
      console.error('Error in GET request:', error);
    }
  }




  function delEntry(id) {
    return fetch(`/api/notes/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
  async function showEntry(id) {
    try {
      const response = await fetch(`/api/notes`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (!response.ok) {
        throw new Error('Request failed with status ' + response.status);
      }
  
      const data = await response.json();
      
      const entry = data.find(entry => entry.id === id);
      
      if (entry) {
        const title = entry.title;
        const text = entry.text;
    
        console.log(title);
        console.log(text);


        let existingTitle = document.querySelector(".Add-Note-Form-Input");
        let existingText = document.querySelector(".Add-Note-Form-Input-Textarea");

    existingTitle.style.display="none";
    existingText.style.display="none";

    

let selectTitle = document.querySelector(".Notes-Title");
let selectText = document.querySelector(".Notes-Text");

selectTitle.innerHTML= title;
selectTitle.style.padding = "1rem"
selectTitle.style.borderBottom = "4px solid";
selectText.innerHTML= text;
selectText.style.padding = "1rem"
selectText.style.borderBottom = "10px inset";




// let idk = document.querySelector(".Add-Note-Form")
//     const h1 = document.createElement("h1");
//     h1.textContent = title;
//     h1.style.display="block";
//     h1.style.color="white";
//     h1.style.fontSize="30px";
//     h1.style.padding="10px";


// const p = document.createElement("p")
// p.textContent = text;
// p.style.display="block";
// p.style.color="white";
// p.style.fontSize="20px";
// p.style.padding="10px";



//     idk.appendChild(h1)
//     idk.appendChild(p);


        
  
      } else {
        console.log(`Entry with ID ${id} not found.`);
      }
    } catch (error) {
      console.error('Error in GET request:', error);
    }
  }
  
  // TODO: i wanna show the fetched data from show entry into the Text area. 




  function removeNote(id, liElement) {
    delEntry(id)
      .then(() => {
        // Delete the corresponding list item from the UI
        liElement.remove();
      })
      .catch((error) => {
        console.error('Error deleting note:', error);
      });












  }
  let clear = document.querySelector(".Primary-Nav-Link").addEventListener("click", createNote);

function createNote(e) {
  e.preventDefault();
  location.reload();
}



  function newNote() {
   
    var  newTitle = document.getElementById("title").value;
    var newDescription = document.getElementById("text").value;

    const data = {
      title: newTitle,
      text: newDescription
    };

    fetch("/api/notes", {

  
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((responseData) => {
        console.log('Successful POST request:', responseData);
        getNotes(); // Refresh the notes after successful POST
      })
      .catch((error) => {
        console.error('Error in POST request:', error);
      });
  }

  const save = document.querySelector(".Primary-Nav-Link-None");

  save.addEventListener("click", () => {
    newNote();
  });
  getNotes()
});


