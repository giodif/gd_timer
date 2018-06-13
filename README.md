# GD Timer

Simple little timer. Much nice.

## Import

```
npm install gd_timer
```

## Import

```
import timer from "gd_timer"
```

## Use

GD Timer creates a basic loop that will execute callbacks in the order they are added to timer. GD Timer passes the elapsed milliseconds down to these callbacks.

### API

#### timer( frameRate = 60, ID = "TIMER_id_" )

timer() creates a new timer. This timer defaults to 60 fps and a timer id of "TIMER_id_". The framerate can be changed later and the timer id is up to you. Timer ids are used to identify the callback functions that get added to the timer. 

```
// New timer 60fps, "TIMER_id_"
const t = timer()

// New timer 30fps, "MY_TIMER_id_"
const t2 = timer( 30, "MY_TIMER_id_")
```

### start()

Start the timer.

```
const t = timer()
t.start()
```

### stop()

Stop the timer.

```
const t = timer()
t.start()
t.stop()
```

### setFrameRate( rate )

Stop the timer frameRate to something new. This will update on the next frame tick.

```
const t = timer( 30 )
t.setFrameRate( 60 )
// running at 60 fps
t.start()
```

### add( func() )

Add a callback to the update loop. Timers will accommodate more than one timer. The add function returns the Timer ID for the callback.

```
const t = timer()
timer.add( delta -> console.log( delta ) )
t.start()
```

### remove( id )

Remove a callback from the loop. This function requires the Timer ID created by add(). 

```
const t = timer()
const timerID = timer.add( delta -> console.log( delta ) )
t.start()
t.remove( timerID )
```
### running()

Is the timer currently running?

```
const t = timer()
timer.add( delta -> console.log( delta ) )
t.running() // false
t.start()
t.running() // true
```

### delta()

Returns the millisecond (theoretical) frame delta between each loop tick. This number is calculated using the framerate. 

```
const t = timer()
t.delta() // 16.6666667
```

