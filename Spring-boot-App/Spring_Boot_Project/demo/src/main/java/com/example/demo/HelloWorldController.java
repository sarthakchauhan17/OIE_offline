package com.example.demo;
import java.util.List;
import java.util.concurrent.atomic.AtomicLong;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.bean.Note;
import com.example.demo.repository.NoteRepository;
import com.sun.mail.handlers.text_plain;

@RestController
@RequestMapping("/hello-world")
public class HelloWorldController {

	 @Autowired
	    NoteRepository noteRepository;
	 
    private static final String template = "Hello, %s!";
    private final AtomicLong counter = new AtomicLong();

    @GetMapping("/notes")
    public List<Note> getAllNotes() {
        return noteRepository.findAll();
    }
    
   // Create a new Note
    @PostMapping("/notes")
    public Note createNote(@Valid @RequestBody Note note) {
        return noteRepository.save(note);
    }
    
 // Get a Single Note
    @GetMapping("/notes/{id}")
    public ResponseEntity<Note> getNoteById(@PathVariable(value = "id") Long noteId) {
        Note note = noteRepository.findOne(noteId);
        if(note == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok().body(note);
    }
    
    @PutMapping("/notes/{id}")
    public ResponseEntity<Note> updateNote(@PathVariable(value = "id") Long noteId, 
                                           @Valid @RequestBody Note noteDetails) {
        Note note = noteRepository.findOne(noteId);
        if(note == null) {
            return ResponseEntity.notFound().build();
        }
        note.setTitle(noteDetails.getTitle());
        note.setContent(noteDetails.getContent());

        Note updatedNote = noteRepository.save(note);
        return ResponseEntity.ok(updatedNote);
    }
    
    @DeleteMapping("/notes/{id}")
    public ResponseEntity<Note> deleteNote(@PathVariable(value = "id") Long noteId) {
        Note note = noteRepository.findOne(noteId);
        if(note == null) {
            return ResponseEntity.notFound().build();
        }

        noteRepository.delete(note);
        return ResponseEntity.ok().build();
    }
    
    @RequestMapping(method=RequestMethod.GET)
    public @ResponseBody Greeting put(@RequestParam(value="name", required=false, defaultValue="Stranger") String name) {
        return new Greeting(counter.incrementAndGet(), String.format(template, name));
    }

}