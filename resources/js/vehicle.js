class Vehicle {

    constructor(name, picture,w,h,segments, text=null){
        this.name=name;
        this.picture=picture;
        this.w=w;
        this.h=h;

        if (this.finaly==null){
            this.finaly=this.y;
        }
        //this.currentSegment=0;
        //this.segments=segments;
        this.moving=false;
        this.text=text;
        //this.currentSegmentFlip=1;
        //this.currentSegmentRotation=0;
        this.actions=[];
    }
    actions;
    currentAction;
    name;
    picture;
    w=80;
    h=50;
    x;
    y;
    speed;
    finalx;
    finaly;
    moving;
    button;
/*
    currentSegment;
    segments;

    currentSegmentRotation;
    currentSegmentRotationId;
    */
    currentSegmentFlip;
    currentSegmentFlipId;
    
    geNextMoveAction(){
        var nextX;
            let actionId = this.currentAction;
            while (actionId<this.actions.length && nextX == null){
                nextX=this.actions[actionId].x;
                actionId++;
            }
        return nextX;
    }
    getDirection(){
        var flip = this.currentSegmentFlip;
        try{
        if (this.currentAction>=0 &&
            this.actions[this.currentAction].type == "move" &&
            this.currentAction!=this.currentSegmentFlipId){
            if (this.currentAction<this.actions.length){
               // var deltaX = this.segments[this.currentSegment+1].x - this.segments[this.currentSegment].x;//x2 - x1;
               var deltaX = this.geNextMoveAction()-this.x  ;//x2 - x1;
                if (deltaX>=0){
                    flip=1;
                }
                else{
                    flip=-1;
                }
            }
            this.currentSegmentFlip = flip;
            this.currentSegmentFlipId=this.currentAction;
            console.log("dirección:" + flip);
        }
    }
        catch(e){
            console.log(e)
        };
        return flip;
    };
    /*
    getRotation(){
                
        if (this.currentSegment!=this.currentSegmentRotationId){
            var rad = 0;
            if (this.currentSegment+2<this.segments.length){
                var deltaX = this.segments[this.currentSegment+1].x - this.segments[this.currentSegment].x;//x2 - x1;
                var deltaY = this.segments[this.currentSegment+1].y - this.segments[this.currentSegment].y;
                var rad = Math.atan2(deltaY, Math.abs(deltaX)); // In radians
            }
            this.currentSegmentRotation = rad*this.getDirection();
            this.currentSegmentRotationId = this.currentSegment;
        }
        return this.currentSegmentRotation;
    }
        ç*/
}

class Action{
    type;
    speak;
    text;
    x;
    y;
    time;
}
/*class Segment{
    constructor(x,y,stop=null){
        this.x=x;
        this.y=y;
        this.stop=stop;
    }
    x;
    y;
}*/
/*
class Point {
    constructor(x,y){
        this.x=x;
        this.y=y;
    }
    x;
    y;
}*/
/*
class Path {
    finalx;
    finaly;
    speed;
    text;
    speech;

}*/