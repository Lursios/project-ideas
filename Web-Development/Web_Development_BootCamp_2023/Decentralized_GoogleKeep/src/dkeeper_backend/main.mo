import List "mo:base/List";
import Debug "mo:base/Debug";

actor Dkeeper {

  public type Note = {
    title : Text;
    content : Text;
  };

  stable var notes: List.List<Note> = List.nil<Note>();
  // how to read this 
  public func createNote(titleText:Text, contentText:Text) {

    let newNote : Note = { //how does this works and the data ouput
        title = titleText;
        content = contentText;
    };

    notes:= List.push(newNote,notes); // How to read it assign the notes with a new note, by pushing the new note inside the notes list 
    Debug.print(debug_show(newNote));

  };
  
  public query func getNotes(): async [Note] { //Return an array of notes
  return List.toArray<Note>(notes);
  };

  public func deleteNote(Id :Nat) {
    //1. delete the submitted note based on selected note
    let listFront = List.take(notes,Id);
    let listEnd = List.drop(notes,Id+1);
    notes := List.append(listFront,listEnd);
  }

  };

