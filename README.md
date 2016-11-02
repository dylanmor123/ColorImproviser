# ColorImproviser

## Overall Project
The overall goal of this project is to utilize color as a tool to teach students how to play the blues with an intuitive interface.
We intend to teach beginning theory students how the 12-bar blues form is constructed using a colorful display, a backing track for
improvisation, as well as a trumpet .wav files to improvise with.

It is hosted at http://colorimproviser.firebaseapp.com

## How to use it
Each row is mapped to a specific row on the keyboard. The C7, F7, and G7 rows are the rows with letters on the keyboard, in order of bottom to top. The C Blues Scale row is mapped to the number rows of the keyboard, which can be played over any harmony, if switching from C7, F7, and G7 is too complicated. The chords on the left will highlight when the user is supposed to play notes from that specific row. The keys will get highlighted on the screen in the appropriate row when they press the corresponding key.

## Demo
View the demo in demo.mov for a screencap of using the app! The quality is not perfect,
but gets the idea of the app across. If the correct row/scale is being played, almost
any combination of that scale will sound good over the harmony!

## How it works/the details
On the display, the key that the backing track is being played in is shown on the bottom-left corner. On the left-hand side of the screen
are the I7, IV7, V7 chords and blues scale labels which construct the basic blues form.
The 12-bar blues form consists of 4 bars of I7, 2 bars of IV7, then 2 bars of I7. The
final four bars is V7, IV7, I7, then V7 to restart the 12-bar cycle. In our app, we only
use blues in C, so I7 is C7, IV7 is F7, and V7 is G7.
All the dominant7 chords contain the notes in the mixolydian scale to the right of them, whereas the blues scale is present to the right of its label. As the music plays, each dominant7 chord lights up when it is being played in the backing track. The blues scale can be played at any time. Each row is mapped to a specific row on the keyboard, and thus students can play each note mapped to its respective keyID. When a note is played, it also becomes highlighted.

## Project Goals
We hope that by using this colorful interface, students will build stronger connections in their brains when seeing which notes belong to
which chords, and which notes are common amongst different chords in the blues form. Also, this would be a useful for building 
an aural and rhythmic relationship with the blues form.

## Future considerations
We realize that the user interaction is not perfect; the process of using ColorImproviser is only intuitive after a careful reading of the instructions.
We hope to make it so that users can figure out the app even without using the instructions.

## When, Where?
April 9th, 2016  
Music Hack 2016 hosted by The People's Music School - 1st Place  
2112 at Fort Knox Studios    

## Team Members
Alex Fang   
Eric Hao  
Dylan Ong  
Yuki Zou  
