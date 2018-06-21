# DDR Arcade game

Game project voor programmeren OP4, CMTTHE01-4 in Typescript

## Gamelink
 
https://timborowy.github.io/typescript_game/

## Checklist

- [X] De game heeft een startscherm en een eindscherm.
- [X] Er zijn geen bugs.

## Toelichting OOP 

Licht toe waar en waarom je deze OOP principes hebt toegepast

**Classes**
Voor alle onderdelen in mijn game heb ik een klasse aangemaakt. 

**Encapsulation**
Alleen de properties die beschikbaar voor andere klassen moeten zijn heb ik daarvoor beschikbaar gemaakt middels een getter of setter
**Composition**

**Inheritance**


## Klassendiagram

Een klassendiagram van de game.

## Peer review

Mijn Feedback peer review op:
https://github.com/JuliaMarleen/Game

### Eerste indruk
cool spel met een start sceen en eind screen. Dat geeft het een afgeronde indruk.
multiplayer is grappig en je moet echt samenwerken om het afval op te vangen.

### Wat kan beter aan gameplay
De controlls lopen niet echt lekker, als je van links naar rechts wilt gaan hapert hij soms.

### Code review
Verander je classe en bestandsnamen naar een logische naam binnen jouw project. Zo voorkom je dat je twisted moet gaan nadenken (ik ben met garbage bezig dus ik moet naar ball.ts)

De berg van timeouts die je maakt in je loop kunnen anders. de loop die je hebt die allemaal balls met een timeout maakt in het begin kan je vervangen door een methode die zichzelf na een aantal seconden weer aanroept.

## Extra uitdaging

Ik heb een highscore list gemaakt dit word opgeslagen in de browser
