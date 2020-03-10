---
layout: presentation
sections:
    - |-
        ### Game I/O
        <img src="/game-io-workshops/img/game-io-logo.png" width="200px"/>
        #### Game development workshops
    - |-
        #### What?
        * Game development workshops
        * Focusing on different aspects of game development
        * Fully web-based
    -  |-
        #### Who?
        <img src="/game-io-workshops/img/theo.png" width="200px"/>
        * Theo Dedeken
        * Master Computer Science
        * Making games for 6 years
        * Volunteer in the European Solidarity Corps
    - sections:
        - |-
            #### When?
            <table class="table">
                <tr>
                    <th>Date</th>
                    <th>Subject</th>
                </tr>
                <tr>
                    <td>20 February</td>
                    <td>Basics</td>
                </tr>
                <tr>
                    <td>12 March</td>
                    <td>Phaser Systems</td>
                </tr>
                <tr>
                    <td>2 April</td>
                    <td>Pixel Art</td>
                </tr>
                <tr>
                    <td>16 April</td>
                    <td>Sound Effects and Music</td>
                </tr>
                <tr>
                    <td>18-20 April</td>
                    <td>Ludum Dare Game Jam</td>
                </tr>
            </table>
        - |-
            <img height='150px' src='https://res.cloudinary.com/practicaldev/image/fetch/s--Mr-QsJkf--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://thepracticaldev.s3.amazonaws.com/i/5viow2pa4e8fjn83ain4.png'>
            * Global Game Jam
            * Make a game in 48 hours
            * Over 2000 participants
            * 18/04 - 03:00 -> 20/04 - 03:00
            * Location, Internet, Electricity, Drinks, Snacks
    - sections:
        - |-
            #### How?
            <img src="/game-io-workshops/img/js.png" width="150px"/>
            +
            <img src="/game-io-workshops/img/phaser.png" width="150px"/>
        - |-
            ##### Javascript
            * The (one and only) programming language for the web
            * Easy to run, just need a browser
            * Easy to learn
        - |-
            ##### Phaser
            * Game engine for the web
            * Lightweight, mostly 2D support
            * Graphics, Physics, Sounds, Input
    - |-
        ### Javascript overview
    - sections:
        - |- 
            #### Comments
            <q>Always code as if the guy who ends up maintaining your code will be a violent psychopath who knows where you live.</q>
        - |-
            ```javascript
            // Single line comment

            /*
            Multiline
            comment
            */
            ```
        - <img src="/game-io-workshops/img/w1_comments.jpg"/>
    - sections:
        - |- 
            #### Variables
            <img width='500px' src="/game-io-workshops/img/variable_box.png"/>
        - |- 
            ```javascript
            // Declaring a variable
            let cardboardBox;
            // Assigning a value to a variable
            cardboardBox = 'cat';
            // Declaring and assigning
            let answerToUniverseAndEverything = 42;
            // Using a variable
            cardboardBox;
            ```
        - |- 
            ##### Naming variables
            * Can be (almost) anything
            * But be clear and consistent
            * camelCase
        - |-
            ##### Data types
            <table style='font-size: 18pt'>
                <tr>
                    <th>Data type</th>
                    <th>Explanation</th>
                    <th>Example</th>
                </tr>
                <tr>
                    <td>String</td>
                    <td>Text in quotation marks</td>
                    <td><code>let workshopLeader = 'Theo'</code></td>
                </tr>
                <tr>
                    <td>Number</td>
                    <td>Any number</td>
                    <td><code>let one = 1;</code><br><code>let pi = 3.14;</code></td>
                </tr>
                <tr>
                    <td>Boolean</td>
                    <td>True or False, <br>Yes or No, 1 or 0</td>
                    <td><code>let awesome = true;</code></td>
                </tr>
                <tr>
                    <td>Array</td>
                    <td>A collection of data</td>
                    <td><code>let dataTypes = ['string', 1, false];</code></td>
                </tr>
                <tr>
                    <td>Object</td>
                    <td>Everything else</td>
                    <td><code>let game = new  Phaser.Game();</code></td>
                </tr>
            </table>
        - |-
            ##### Exercise
            <script async src="//jsfiddle.net/theodedeken/cbd3t8Le/10/embed/js/"></script>
    - sections:
        - |- 
            #### Operators
            <img src='https://media.giphy.com/media/DHqth0hVQoIzS/giphy.gif'/>
        - |-
            <table style='font-size: 16pt'>
                <tr>
                    <th>Operator group</th>
                    <th>Symbols</th>
                    <th>Explanation</th>
                    <th>Example</th>
                </tr>
                <tr>
                    <td>Arithmetic</td>
                    <td><code>+, -, *, /</code></td>
                    <td>Calculations</td>
                    <td><code>2 * 5 + 4;</code></td>
                </tr>
                <tr>
                    <td>Comparison</td>
                    <td><code>===, !==, <, >, <=, >= </code></td>
                    <td>Comparing numbers and objects</td>
                    <td><code>one < 2;</code></td>
                </tr>
                <tr>
                    <td>Logical</td>
                    <td><code>!, &&, ||</code></td>
                    <td>not, and, or</td>
                    <td><code>!true;</code></td>
                </tr>
                <tr>
                    <td>Assignment</td>
                    <td><code>=</code></td>
                    <td>Assigning to a variable</td>
                    <td><code>let answer = 5;</code></td>
                </tr>
            </table>
        - |-
            ##### True or False?
            <p><code class='fragment'>!false</code>  <span class='fragment'>← True</span><p>
            <p><code class='fragment'>4 < 3</code>  <span class='fragment'>← False</span><p>
            <p><code class='fragment'>0 <= 0</code>  <span class='fragment'>← True</span><p>
            <p><code class='fragment'>1 > 2 - 3 || false && 2 !== 'two'</code>  <span class='fragment'>← True</span><p>
    - sections:
        - |-
            #### Conditionals
        - |-
            ```javascript
            let result = 2;
            if(result < 0) {
                // If the expression is true go in this codeblock
                alert('The result is negative');
            } else if (result > 0) {
                // If statements can be chained
                alert('The result is positive');    
            } else {
                // If previous expressions are false, go to this codeblock
                alert('The result is zero');
            }
            ```
        - <img src="/game-io-workshops/img/w1_cond_meme.png"/>
    - sections:
        - |- 
            #### Loops
            <img src='https://imgs.xkcd.com/comics/delicious.png' />
        - |-
            ```javascript
            // A loop expression contains three parts
            // initialization; end condition; step action
            for (let i = 0; i < 5; i++){
                console.log(i);
            }
            ```
        - |-
            ##### Can you predict the output of these loops?
        - <script async src="//jsfiddle.net/theodedeken/do2m5xuh/3/embed/js,result/"></script>
        - <script async src="//jsfiddle.net/theodedeken/1weazfLt/2/embed/js,result/"></script>
        - <script async src="//jsfiddle.net/theodedeken/7jy1h6ce/embed/js,result/"></script>
    - sections:
        - |- 
            #### Functions
        - |-
            ```javascript
            // Function declaration
            function multiply(num1, num2) {
                let result = num1 * num2;
                // This function returns a result
                return result;
            }

            // Calling a function
            multiply(2, 5);
            ```
    - <img src='https://www.explainxkcd.com/wiki/images/c/c6/code_quality.png' />
    - |-
        ### Phaser Introduction
        <iframe src="/game-io-workshops/workshops/w1/bouncy-ball" height="450" width="800"></iframe> 
---
