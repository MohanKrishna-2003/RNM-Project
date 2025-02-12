package com.project.myRNM.Controller;

import com.project.myRNM.Models.Entity.Contact;
import com.project.myRNM.Service.ContactService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import java.util.List;

import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

class ContactControllerTest {

    @Mock
    private ContactService contactService;

    @InjectMocks
    private ContactController contactController;

    private MockMvc mockMvc;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
        mockMvc = MockMvcBuilders.standaloneSetup(contactController).build();
    }

    @Test
    void postData_Success() throws Exception {
        // Arrange
        Contact contact = new Contact(null, "John Doe", "john@example.com", "Hello!", false);
        Contact savedContact = new Contact(1, "John Doe", "john@example.com", "Hello!", false);

        when(contactService.post(contact)).thenReturn(savedContact);

        // Act & Assert
        mockMvc.perform(post("/contact/postcontact")
                        .contentType("application/json")
                        .content("{\"name\":\"John Doe\",\"email\":\"john@example.com\",\"message\":\"Hello!\",\"status\":false}"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.messageid").value(1))
                .andExpect(jsonPath("$.name").value("John Doe"));

        verify(contactService, times(1)).post(contact);
    }

    @Test
    void getcontact_Success() throws Exception {
        // Arrange
        Contact contact1 = new Contact(1, "John Doe", "john@example.com", "Hello!", false);
        Contact contact2 = new Contact(2, "Jane Smith", "jane@example.com", "Good service", true);
        when(contactService.getcontact()).thenReturn(List.of(contact1, contact2));

        // Act & Assert
        mockMvc.perform(get("/contact/contact"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].name").value("John Doe"))
                .andExpect(jsonPath("$[1].name").value("Jane Smith"));

        verify(contactService, times(1)).getcontact();
    }

    @Test
    void updateStatus_Success() throws Exception {
        // Arrange
        Contact contact = new Contact(1, "John Doe", "john@example.com", "Hello!", true);
        when(contactService.updateStatus(1)).thenReturn(contact);

        // Act & Assert
        mockMvc.perform(post("/contact/changestatus")
                        .contentType("application/json")
                        .content("1"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.status").value(true));

        verify(contactService, times(1)).updateStatus(1);
    }

}
