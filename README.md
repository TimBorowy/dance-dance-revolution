# DDR Arcade game

Game project voor programmeren OP4 in Typescript

https://timborowy.github.io/typescript_game/

## Feedback op mijn game

## Mijn Feedback peer review op:
https://github.com/JuliaMarleen/Game

### Eerste indruk
cool spel met een start sceen en eind screen. Dat geeft het een afgeronde indruk.
multiplayer is grappig en je moet echt samenwerken om het afval op te vangen.

### Wat kan beter aan gameplay
De controlls lopen niet echt lekker, als je van links naar rechts wilt gaan hapert hij soms.

### Code review
Verander je classe en bestandsnamen naar een logische naam binnen jouw project. Zo voorkom je dat je twisted moet gaan nadenken (ik ben met garbage bezig dus ik moet naar ball.ts)

De berg van timeouts die je maakt in je loop kunnen anders. de loop die je hebt die allemaal balls met een timeout maakt in het begin kan je vervangen door een methode die zichzelf na een aantal seconden weer aanroept.
