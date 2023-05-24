


//---------- Modal Content----------//
  const show = document.querySelector(".Confused-Guy");
  const modal = document.querySelector(".modal")
  const closeModal = document.querySelector(".Got-it")

  show.addEventListener("click", function () {

    modal.showModal()
  }
  )

  closeModal.addEventListener("click", function () {
    modal.close();
  })


//--Getting Notes from db and displaying as a li element----------//
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
        li.addEventListener("click", (e) => { showEntry(note.id, li) })

        const img = document.createElement("img");
        img.src = "./assets/images/trash.png";
        img.alt = "DELETE ICON";
        img.className = "Pending-Notes-Link-Delete";
        img.onclick = () => removeNote(note.id, li);

        ul.appendChild(li);
        li.appendChild(img);
      });
    } catch (error) {
      console.error('Error in GET request:', error);
    }
  }



//------- Pulling the note id and deleating the notes on request---------//
  function delEntry(id) {
    return fetch(`/api/notes/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }



  
  function removeNote(id, liElement) {
    delEntry(id)
      .then(() => {
        // Delete the corresponding list item from the UI
        liElement.remove();
        document.location.reload();
      })
      .catch((error) => {
        console.error('Error deleting note:', error);
      });




  }



//------Getting the note with the unique id and displaying them on the right side. --------//

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

        existingTitle.style.display = "none";
        existingText.style.display = "none";



        let selectTitle = document.querySelector(".Notes-Title");
        let selectText = document.querySelector(".Notes-Text");

        selectTitle.innerHTML = title;
        selectTitle.style.padding = "1rem"
        selectTitle.style.margin = "4rem"
        selectTitle.style.border = "2px solid";
        selectTitle.style.borderRadius = "10px 10px 90px";




        selectText.innerHTML = text;
        selectText.style.padding = "1rem"
        selectText.style.fontSize = "1.5rem"
        selectText.style.border = "2px solid";
        selectText.style.borderRadius = "10px 10px 90px";

      


      } else {
        console.log(`Entry with ID ${id} not found.`);
      }
    } catch (error) {
      console.error('Error in GET request:', error);
    }
  }




//----------Clearing the note section -------------//


  let clear = document.querySelector(".Primary-Nav-Link").addEventListener("click", createNote);

  function createNote(e) {
    e.preventDefault();
    location.reload();
  }





//----------take user input and post it to db.-----------------------//

  function newNote() {

    var newTitle = document.getElementById("title").value;
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
        getNotes();
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



