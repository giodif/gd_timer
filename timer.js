const abs = Math.abs
const floor = Math.floor
const random = Math.random
const raf = window.requestAnimationFrame
const ruid = () => floor( random() * 1000000000 )

const timer = ( frameRate = 60, ID = "TIMER_id_" ) => {
    //PRIVATE
    const listeners = {}
    let _initial = 0
    let frameDelta = 0
    let run = false
    let last = 0
    const update = time => {
        const delta = time - last;
        if( delta >= frameDelta ){
            last = time;
            
            if( run ){
                for( const el in listeners ){
                    listeners[ el ]( delta );
                }
            }
        }
        raf( update );
    }
    
    //PUBLIC
    const running = () => run
    const delta = () => frameDelta
    const stop = () => reset()
    const start = () => !( run = true )
    const remove = id => delete listeners[ id ]
    const add = ( func, uid = ruid() ) => {
        const id = ID + uid
        listeners[ id ] = func
        return id
    }
    const setFrameRate = ( rate = 60 ) => {
        const r = abs( rate )
        frameRate = r > 60 ? 60 : r === 0 ? 0.000000001 : r
        frameDelta = floor( 1000 / frameRate )
        return frameRate
    }
    const reset = () => {
        _initial = 0
        last = 0
        run = false
    }
    //get starting timestamp
    raf( update )
    _initial = last
    //calculate the framerate and frame delta, safety checks
    setFrameRate( frameRate )
    //pass along public functions
    return { start, stop, setFrameRate, add, remove, running, delta }
}

export default timer