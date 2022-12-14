const decreaseEnergy = (max,min) =>{
    return Math.floor(Math.random()*(max-min)) +min
}

const app = Vue.createApp({

    data(){
        return{
            monsterHealth:100,
            playerHealth:100,
            counter:0,
            winner:null,
            logMessages:[]
        }
    },

    watch:{
        playerHealth(value){
            if(value<=0&&this.monsterHealth<=0){
                //A Draw
                this.winner='draw'
            }else if(value<=0) {
                // player lost
                this.winner='Monster'
            }
        },
        monsterHealth(value){
            if(value<=0&& this.playerHealth<=0) {
                // this is draw
               this.winner='draw'
            }else if (value<=0) {
                // player win
                this.winner='player'
            }
        }
    },

 computed:{
 monstarHealthStyle(){
  
    if(this.monsterHealth<0){
       return {width:0+'%'}
    }  else{

       return {width:this.monsterHealth+'%'}
    }  
    

 },
 playerHealthStyle(){
 
    
    if(this.playerHealth<0){
        return {width:0+'%'}
     }  else{
 
        return {width:this.playerHealth+'%'}
     }  
    
 },
 disableSpecialAttack (){
    return this.counter % 3!==0
 }
 },

    methods :{
        startMatch(){
     this.playerHealth=100,
     this.monsterHealth=100,
     this.counter=0,
     this.winner=null,
     this.logMessages=[]
        },
        attackMonster(){
            const attackValue =decreaseEnergy(15,6)
            this.counter++
            this.battleLogs('monster','attack',attackValue)
            this.monsterHealth-=attackValue
            this.attackPlayer()
        },

        attackPlayer(){
            const attackValue = decreaseEnergy(18,8)
            this.playerHealth-=attackValue;
            this.battleLogs('player','attack',attackValue)

        },
        specialAttack(){
            this.counter++
            const attackValue = decreaseEnergy(20,12)
            this.monsterHealth-=attackValue
            this.attackPlayer()
           this. battleLogs('monster','special-attack',attackValue)
        },
        healPlayer(){
            this.counter++
            const healValue = decreaseEnergy(20,12)
            if(this.playerHealth+healValue>100){
                this.playerHealth=100 
            }else {
                this.playerHealth+=healValue

            }
            this.attackPlayer()
            this.battleLogs('player','heal',healValue)
        },
        surrender(){
            this.winner='monster'
        },
        battleLogs(who,what,value){
            this.logMessages.unshift({
                actionBy:who,
                actionHappen:what,
                actionValue:value
            })
        }

    }

})
app.mount('#game')