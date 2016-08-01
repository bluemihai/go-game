## Description

![](https://upload.wikimedia.org/wikipedia/commons/thumb/f/f3/Go-board-animated.gif/120px-Go-board-animated.gif)

Two people can play [Go](https://en.wikipedia.org/wiki/Go_(game)) on the same webpage.

AND/OR 

One person can play [Go](https://en.wikipedia.org/wiki/Go_(game)) against an AI player. 

## Context

[Go](https://en.wikipedia.org/wiki/Go_(game)) is an existing, fixed feature set. 

A [Go](https://en.wikipedia.org/wiki/Go_(game)) game can be implemented in almost any web technologies. 

The team can scale the difficulty of the specs along a large range of complexity

```
[no game logic]<----------->[working game logic with an AI opponent]
```

## Specifications

- [ ] reverse engineer [Go](https://en.wikipedia.org/wiki/Go_(game)) into a complete set of users stories
- [ ] players can decide between 9x9, 13x13 or 17x17 board size
- [ ] Make the board scale to the window size

## Optional Specifications

- [ ] two player games work on
- [ ] persist the state of the game so reloading the page resumes where you left off
- [ ] each game has a unique, individual url (like bit.ly)
- [ ] allow users to provide their email address and then display their Gravatar


### Required

- [ ] The artifact produced is properly licensed, preferably with the [MIT license][mit-license].


### Quality

- [ ] clear separation of game logic code from view/rendering code

---

<!-- LICENSE -->

<a rel="license" href="http://creativecommons.org/licenses/by-nc-sa/4.0/"><img alt="Creative Commons License" style="border-width:0" src="https://i.creativecommons.org/l/by-nc-sa/4.0/80x15.png" /></a>
<br />This work is licensed under a <a rel="license" href="http://creativecommons.org/licenses/by-nc-sa/4.0/">Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International License</a>.

[mit-license]: https://opensource.org/licenses/MIT
