package com.project.myRNM.Controller;

import org.springframework.web.bind.annotation.RequestMapping;

public class SpaController {

    @RequestMapping(value = "/**/{[path:[^\\.]*}")
    public String redirect() {
        // Return the index.html for all requests that are not pointing to a static file (like .js, .css)
        return "forward:/index.html";
    }
}
