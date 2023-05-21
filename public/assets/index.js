

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
    
        const img = document.createElement("img");
        img.src = "./assets/images/trash.png";
        img.className = "Pending-Notes-Link-Delete";
        img.onclick = () => handleNoteDelete(note.id, li); // Pass the note ID and li element as arguments
    
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
  
  function handleNoteDelete(id, liElement) {
    delEntry(id)
      .then(() => {
        // Delete the corresponding list item from the UI
        liElement.remove();
      })
      .catch((error) => {
        console.error('Error deleting note:', error);
      });
  }
  
function newNote() {
  const newTitle = document.getElementById("title").value;
  const newDescription = document.getElementById("text").value;

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


