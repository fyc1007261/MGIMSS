*Note:
    1. getWordlist.java is to require file path and build dictionary using class in readfile.java;
    2. readFile.java is a class that will build and return dictionary from the given file;
    3. inquireWords.java is to require 2 words from the user.
    4. buildLadder.java is a class that is used to build word ladder between given words;
    5. userInterface.java is the main class that uses above classes.

    This is the 3rd version, which executes in satisfactory speed with a more friendly interface and using Maven and Junit.

*Spring boot version:
        This is a springboot-based web application.

*Login:
    This is the second version that involves logging in/out function.
    Users are permitted to flip between friendly pages through buttons without bothering to input URLs.
    To access to
        1)index.html, which is the home page, needs no permission;
        2)login.html, where user can input username "sun" and password "moon" to log in as USER, needs no permission,
            if he/she gives the expected information, then he/she is granted the USER permission;
        3)wordladder.html and user.html, users must have been logged in, any trial to access to them before getting the
        USER permission will lead you back to login.html;

        p.s. header.html is a inner html inserted into all the htmls above based on Thymeleaf mechanism.

    After login, if the user doesn't act any motion, then sometime later he/she needs to login again.