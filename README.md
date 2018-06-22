# DDR Arcade game

Game project voor programmeren OP4, CMTTHE01-4 in Typescript

## Gamelink
 
https://timborowy.github.io/typescript_game/

## Checklist

- [X] De game heeft een startscherm en een eindscherm.
- [X] Er zijn geen bugs.

## Toelichting OOP 

**Classes**
Voor alle onderdelen in mijn game heb ik een class aangemaakt. Dit zijn onderdelen die opzichzelf staan en verantwoordelijk zijn voor alles wat met dat object te maken heeft. 

Een aantal voorbeelden van classes

![gamescreen](https://upload.borowy.nl/i/XqoB2Pal.png)

![feedback](https://upload.borowy.nl/i/u1Jo8mzd.png)


**Encapsulation**
Alleen de properties die beschikbaar voor andere classes moeten zijn heb ik daarvoor beschikbaar gemaakt middels een getter of setter. Doormiddel van encapsulation kun je er voor zorgen niet alle properties of methodes van beschikbaar zijn voor de rest van de applicatie. Hiermee maak je het ook makkelijk om bugs of raar gedrag te voorkomen.

De properties song en songTimeCodes zijn alleen binnen deze class nodig dus zijn ze private.
Omdat ik een referentie meegeef aan classes die in in deze class aanroep naar het huidige object heb ik de property game public gemaakt.

![gamescreen](https://upload.borowy.nl/i/gWGCx6AN.png)

**Composition**
Met composition bepaal je welke classes onder welke class horen. In mijn voorbeeld: class game has (*)Screen. In het TitleScreen is dan een referentie naar het game object.

![game class](https://upload.borowy.nl/i/ncJjDnj0.png)

titleScreen

![title screen](https://upload.borowy.nl/i/uz0KJIuH.png)

**Inheritance**

Class key erft een aantal properties en methods over van gameElement. Dit gebeurt omdat de methodes die key overerft, eigenlijk ook hetzelfde zijn als bij note. Daarom extend note ook net als key, gameElement.

![key](https://upload.borowy.nl/i/GcgNUxup.png)

![note](https://upload.borowy.nl/i/8TiaJswZ.png)


## Klassendiagram

![klasseDiagram](https://upload.borowy.nl/i/VobbxsDM.jpeg)

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
