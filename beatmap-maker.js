const arr = []
const firstBeat = 6.061
const amountOfBeatsInSong = 215
let current = firstBeat

for(let i = 0; i < amountOfBeatsInSong; i++){
  current += 0.5125
  arr.push(current)
}
console.log(arr)
